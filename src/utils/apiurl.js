// const rootPath = "http://localhost:8000";
const rootPath = "localhost:8000";

const POST_AUTH_API_URL = `${rootPath}/auth/register`;
const POST_LOGIN_API_URL = `${rootPath}/auth/login`;
const POST_EMAIL_VERIFICATION_API_URL = `${rootPath}/auth/emailVerification`;
const UPDATE_AUTH_API_URL = `${rootPath}/auth/update_user`;
const DELETE_AUTH_API_URL = `${rootPath}/auth/delete_user`;

export {
  POST_AUTH_API_URL,
  POST_LOGIN_API_URL,
  POST_EMAIL_VERIFICATION_API_URL,
  UPDATE_AUTH_API_URL,
  DELETE_AUTH_API_URL,
};
