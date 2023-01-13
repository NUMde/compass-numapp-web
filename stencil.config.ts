import { Config } from '@stencil/core';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import visualizer from 'rollup-plugin-visualizer';
import { sass } from '@stencil/sass';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

// https://stenciljs.com/docs/config
export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  buildEs5: 'prod', // false | 'prod' | true
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: '/',
      copy: [
        { src: 'global/assets', dest: 'assets' },
        { src: 'custom/assets', dest: 'assets' },
      ],
    },
  ],
  plugins: [sass(), env.npm_lifecycle_event === 'analyze' ? visualizer() : null],
  rollupPlugins: {
    before: [
      nodeResolve({
        preferBuiltins: false,
        browser: true,
        modulesOnly: true,
        mainFields: [],
      }),
    ],
  },
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    moduleDirectories: ['node_modules', 'src'],
  },
  devServer: {
    port: parseInt(env.PORT ?? '3434', 10),
  },
  env: {
    ENVIRONMENT: env.ENVIRONMENT,
    API_BASE_URL: env.API_BASE_URL,
    FALLBACK_CERTIFICATE: env.FALLBACK_CERTIFICATE?.replace(/\\n/g, '\n'),
  },
};
