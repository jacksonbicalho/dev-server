ARG DOCKER_WORK_DIR_DEFAULT=/usr/src/app

# #############################
# # base: build for Base
# #############################
FROM node:18-alpine As base
ARG DOCKER_LABEL_KEY
ARG DOCKER_LABEL_VALUE
ENV DOCKER_LABEL_KEY ${DOCKER_LABEL_KEY}
ENV DOCKER_LABEL_VALUE ${DOCKER_LABEL_VALUE}
LABEL ${DOCKER_LABEL_KEY}=${DOCKER_LABEL_VALUE}

ONBUILD ENV YARN_VERSION 1.22.19

ONBUILD ARG NODE_ENV
ONBUILD ENV NODE_ENV ${NODE_ENV:-builder}

ONBUILD ARG DOCKER_USER_UID
ONBUILD ENV DOCKER_USER_UID ${DOCKER_USER_UID:-36891}

ONBUILD ARG DOCKER_USER_NAME ${DOCKER_USER_NAME}
ONBUILD ENV DOCKER_USER_NAME ${DOCKER_USER_NAME}


ONBUILD ARG NPM_TOKEN ${NPM_TOKEN}
ONBUILD ARG NPM_TOKEN ${NPM_TOKEN}

ONBUILD ENV YARN_TOKEN ${YARN_TOKEN}
ONBUILD ENV YARN_TOKEN ${YARN_TOKEN}

ONBUILD ARG DOCKER_WORK_DIR
ONBUILD ENV DOCKER_WORK_DIR ${DOCKER_WORK_DIR:-$DOCKER_WORK_DIR_DEFAULT}

ONBUILD COPY \
  package.json* \
  yarn.lock* \
  .yarnrc* \
  .npmrc* \
  npm-shrinkwrap.json* \
  package-lock.json* \
  pnpm-lock.yaml* ./

ONBUILD RUN rm -rf /usr/local/bin/yarn \
  && rm -rf /usr/local/bin/yarnpkg \
  && deluser --remove-home node \
  && apk --no-cache update \
  && apk add --no-cache \
  make \
  python3 \
  bash \
  curl \
  --virtual builds-deps \
  && apk add git \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz \
  && yarn --version \
  && curl -sfL RUN curl -sf https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin/ \
  && apk del builds-deps \
  && rm -rf /var/cache/apk/* \
  && addgroup -S ${DOCKER_USER_NAME} -g ${DOCKER_USER_UID} \
  && adduser -S -G ${DOCKER_USER_NAME} -u ${DOCKER_USER_UID} ${DOCKER_USER_NAME}

ONBUILD COPY ./docker/docker-entrypoint.sh /usr/local/bin/
ONBUILD COPY ./docker/current-version.sh /usr/local/bin/
ONBUILD RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ONBUILD RUN chmod +x /usr/local/bin/current-version.sh

ONBUILD WORKDIR ${DOCKER_WORK_DIR}

ONBUILD COPY . ./


ONBUILD RUN ls -l \
  && yarn \
  && ls /usr/local/bin/ \
  && /usr/local/bin/node-prune \
  && chown -R ${DOCKER_USER_NAME}:${DOCKER_USER_NAME} ./

ONBUILD USER ${DOCKER_USER_NAME}

ONBUILD ENV GIT_CONFIG_USER_NAME ${GIT_CONFIG_USER_NAME}
ONBUILD ENV GIT_CONFIG_USER_NAME ${GIT_CONFIG_USER_NAME}

ONBUILD ENV GIT_CONFIG_USER_EMAIL ${GIT_CONFIG_USER_EMAIL}
ONBUILD ENV GIT_CONFIG_USER_EMAIL ${GIT_CONFIG_USER_EMAIL}


ONBUILD RUN git config --global user.name "${GIT_CONFIG_USER_NAME}" \
  && git config --global user.email "${GIT_CONFIG_USER_EMAIL}"

ONBUILD RUN --mount=type=secret,id=npmrc,target=${HOME}/.npmrc

ONBUILD RUN yarn --skip-integrity-check --network-concurrency 1 --frozen-lockfile



#####################################
# development
#####################################
FROM base as development
ARG DOCKER_LABEL_KEY
ARG DOCKER_LABEL_VALUE
ENV DOCKER_LABEL_KEY ${DOCKER_LABEL_KEY}
ENV DOCKER_LABEL_VALUE ${DOCKER_LABEL_VALUE}
LABEL ${DOCKER_LABEL_KEY}=${DOCKER_LABEL_VALUE}

RUN git config --global user.email "jacksonbicalho@gmail.com" \
  && git config --global user.name "Jackson Bicalho"

ENV NODE_ENV=development

ARG SERVER_PORT
ENV SERVER_PORT ${SERVER_PORT}


ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG YARN_TOKEN
ENV YARN_TOKEN ${YARN_TOKEN}
ENV YARN_TOKEN ${YARN_TOKEN}

EXPOSE ${SERVER_PORT}

ENTRYPOINT ["docker-entrypoint.sh"]


