const path = require('path');

const root = process.env.PROJECT_ROOT_DIR || path.join(__dirname, '..');

const getAppConfig = () => ({
  projectName: 'template', // изменить на название своего проекта
  root,
  entry: path.join(root, 'src/App/index.tsx'),
  port: process.env.PORT || 3000,
  mode: process.env.NODE_ENV || 'development',
  analyze: process.env.ANALYZE || 0,
  baseApiUrl: process.env.BASE_API_URL || 'http://outsourcing.nat.tepkom.ru:38080',
  apiPath: process.env.API_PATH || '/',
  useApiProxy: process.env.USE_API_PROXY || false,
});

module.exports = { getAppConfig };
