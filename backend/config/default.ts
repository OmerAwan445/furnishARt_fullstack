/* EMPTY FIELD WILL COME FROM custom-environment-variables.ts file \
AND THEY ARE COMMON IN DEV AND PRODUCTION

==== ORDER FOR COMIPLATION OF CONFIG FILES ===
## default.ts (always)
## production.ts (only if NODE_ENV=production)
## custom-environment-variables.ts (always)
*/
export default {
  db: {
    port: "5432",
    host: "localhost",
    name: "",
    user: "",
    password: "",
  },
  server: {
    port: 3001,
  },
  FRONTEND_URL: "http://localhost:3000",
  DEV_ENV: "",
  JWT: {
    access_token_secret: "",
    access_token_expiry: "",
  },
  NODEMAILER: {
    SMTP_PASSWORD: "",
    SMTP_SERVICE: "",
    SMTP_FROM_EMAIL: "",
  },
  tokenExpiry: {
    EMAIL_VERIFICATION: "",
    PASSWORD_RESET: "",
  },
  VerificationTokenSecret: "",
  RESEND_VERIFICATION_EMAIL_TIME: 600, // 10 minutes in seconds (60*10)
  RESEND_FORGET_PASS_EMAIL_TIME: 600, // 10 minutes in seconds (60*10)
};
