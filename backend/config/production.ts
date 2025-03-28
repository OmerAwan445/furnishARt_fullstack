import dotenv from "dotenv";
dotenv.config();

/* IN THIS FILE EMPTY FIELDS MEANS THAT THESE FIELDS WILL BE FILLED BY THE
custom-environment-variables.js FILE
AND THEY ARE COMMON ON DEV AND PRODUCTION
FILLED FIELDS MEANS THAT THEY ARE ONLY USED IN PRODUCTION (ONLY WHEN NODE_ENV=production)
and they will be overriden over default.ts file
*/
export default {
  db: {
    port: process.env.DB_PORT,
    name: '',
    user: '',
    host: process.env.DB_HOST,
    password: '',
  },
  server: {
    port: process.env.PORT,
  },
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT: {
    access_token_secret: "",
    access_token_expiry: "",
  },
  stripe: {
    secret_key: "",
  },
  NODEMAILER: {
    SMTP_PASSWORD: "",
    SMTP_SERVICE: "",
    SMTP_FROM_EMAIL: "",
  },
  VerificationTokenSecret: "",
  tokenExpiry: {
    EMAIL_VERIFICATION: "",
    PASSWORD_RESET: "",
  },

};


