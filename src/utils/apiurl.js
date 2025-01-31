const rootPath = "http://localhost:8000";

const POST_SALES_API_URL = `${rootPath}/api/sales`;
const POST_TOP10_API_URL = `${rootPath}/api/sales/top10`;
const POST_MARKET_API_URL = `${rootPath}/api/sales/market`;
const POST_AUTH_API_URL = `${rootPath}/auth/register`;
const POST_LOGIN_API_URL = `${rootPath}/auth/login`;
const POST_EMAIL_VERIFICATION_API_URL = `${rootPath}/auth/email-verification`;
const POST_MYPAGE_API_URL = `${rootPath}/auth/mypage`;
const UPDATE_AUTH_API_URL = `${rootPath}/auth/update_user`;
const DELETE_AUTH_API_URL = `${rootPath}/auth/delete_user`;

export const GET_MARKET_API_URL = `${rootPath}/api/market`;
export const GET_TOP10_API_URL = `${rootPath}/api/top10`;

export {
  POST_SALES_API_URL,
  POST_TOP10_API_URL,
  POST_MARKET_API_URL,
  POST_AUTH_API_URL,
  POST_LOGIN_API_URL,
  POST_MYPAGE_API_URL,
  POST_EMAIL_VERIFICATION_API_URL,
  UPDATE_AUTH_API_URL,
  DELETE_AUTH_API_URL,
};
