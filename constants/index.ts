export const APPLICATION_PATH = '/application';

const isDev = process.env.NODE_ENV === 'development';

export const REQUEST_URL = isDev
  ? 'http://localhost:4100'
  : 'https://shop-api.jweboy.asia';
