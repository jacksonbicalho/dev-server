ARG DOCKER_WORK_DIR_DEFAULT=/usr/src/app
ARG NODE_VERSION=18.18.2
ARG YARN_VERSION=1.22.19


# #############################
# # base: build for Base
# #############################
FROM node:${NODE_VERSION}-alpine As base
ARG DOCKER_LABEL_KEY
ARG DOCKER_LABEL_VALUE
ENV DOCKER_LABEL_KEY ${DOCKER_LABEL_KEY}
ENV DOCKER_LABEL_VALUE ${DOCKER_LABEL_VALUE}
LABEL ${DOCKER_LABEL_KEY}=${DOCKER_LABEL_VALUE}

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
  ./

ONBUILD RUN rm -rf ./cache

ONBUILD RUN rm -rf /usr/local/bin/yarn \
  && rm -rf /usr/local/bin/yarnpkg \
  && npm uninstall --loglevel warn --global pnpm \
  # && npm uninstall --loglevel warn --global npm \
  && deluser --remove-home node \
  && apk --no-cache update \
  && apk --no-cache upgrade \
  && apk add --no-cache \
  bash \
  make \
  python3 \
  curl \
  git \
  && apk add --no-cache \
  --virtual builds-deps \
  && curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz \
  && yarn --version \
  && curl -sfL RUN curl -sf https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin/ \
  && apk del builds-deps \
  && rm -rf /var/cache/apk/* \
  && addgroup -S ${DOCKER_USER_NAME} -g ${DOCKER_USER_UID}

ONBUILD RUN adduser -S -G ${DOCKER_USER_NAME} -u ${DOCKER_USER_UID} ${DOCKER_USER_NAME} \
 --shell /bin/bash \
 --home /home/${DOCKER_USER_NAME} \
 -k /etc/skel

ONBUILD WORKDIR ${DOCKER_WORK_DIR}

ONBUILD COPY . ./

ONBUILD COPY ./docker/*.sh /usr/local/bin/
ONBUILD RUN chmod -R +x /usr/local/bin/
ONBUILD RUN command install-dependencies.sh

ONBUILD RUN ls -l \
  && ls /usr/local/bin/ \
  && /usr/local/bin/node-prune \
  && chown -R ${DOCKER_USER_NAME}:${DOCKER_USER_NAME} ./

ONBUILD ENV GIT_CONFIG_USER_NAME ${GIT_CONFIG_USER_NAME}
ONBUILD ENV GIT_CONFIG_USER_NAME ${GIT_CONFIG_USER_NAME}

ONBUILD ENV GIT_CONFIG_USER_EMAIL ${GIT_CONFIG_USER_EMAIL}
ONBUILD ENV GIT_CONFIG_USER_EMAIL ${GIT_CONFIG_USER_EMAIL}

ONBUILD RUN git config --global user.name "${GIT_CONFIG_USER_NAME}" \
  && git config --global user.email "${GIT_CONFIG_USER_EMAIL}"

ONBUILD RUN --mount=type=secret,id=npmrc,target=${DOCKER_WORK_DIR}/.npmrc

ONBUILD ENV NODE_REPL_HISTORY=''

ONBUILD USER ${DOCKER_USER_NAME}

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "node" ]


#####################################
# development
#####################################
FROM base as dev
ARG DOCKER_LABEL_KEY
ARG DOCKER_LABEL_VALUE
ENV DOCKER_LABEL_KEY ${DOCKER_LABEL_KEY}
ENV DOCKER_LABEL_VALUE ${DOCKER_LABEL_VALUE}
LABEL ${DOCKER_LABEL_KEY}=${DOCKER_LABEL_VALUE}

ENV NODE_ENV=development

ARG SERVER_PORT
ENV SERVER_PORT ${SERVER_PORT}


ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG YARN_TOKEN
ENV YARN_TOKEN ${YARN_TOKEN}
ENV YARN_TOKEN ${YARN_TOKEN}

EXPOSE ${SERVER_PORT}

CMD [ "node" ]

#####################################
# development
#####################################
FROM base as publish
ARG DOCKER_LABEL_KEY
ARG DOCKER_LABEL_VALUE
ENV DOCKER_LABEL_KEY ${DOCKER_LABEL_KEY}
ENV DOCKER_LABEL_VALUE ${DOCKER_LABEL_VALUE}
LABEL ${DOCKER_LABEL_KEY}=${DOCKER_LABEL_VALUE}

ENV NODE_ENV=production

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG YARN_TOKEN
ENV YARN_TOKEN ${YARN_TOKEN}
ENV YARN_TOKEN ${YARN_TOKEN}

EXPOSE ${SERVER_PORT}

CMD [ "yarn" "publish --access public --new-version ${HOME}/docker/current-version.sh" ]
