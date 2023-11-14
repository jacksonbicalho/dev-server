import handler from 'serve-handler';
import https, { RequestOptions } from 'node:https';

export type ConfigType = {
  contenPublic: string;
};

export const server = (options: RequestOptions, config: ConfigType) =>
  https.createServer(options, (request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    const { contenPublic } = config;
    return handler(request, response, {
      renderSingle: true,
      cleanUrls: true,
      public: contenPublic,
      rewrites: [{ source: '/**', destination: '/index.html' }],
      headers: [
        {
          source: '**/*.@(jpg|jpeg|gif|png)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'max-age=7200'
            }
          ]
        }
      ]
    });
  });
