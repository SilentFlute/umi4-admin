// import { defineConfig } from "umi";
// import proxy from './proxy';

//不使用defineConfig则能在其他地方获取这些配置
export default {
  plugins: [
    '@umijs/plugins/dist/dva'
  ],
  // proxy,
  dva: {},
  title: 'UMI4 Admin',
  favicons: [
    '/favicon.svg'
  ]
};
