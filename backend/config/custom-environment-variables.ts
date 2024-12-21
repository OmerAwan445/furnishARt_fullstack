/* ALL DEFINED ENV ARE COMMON ENV FOR DEV AND PROD
AND THE FIELD VALUE WILL BE THE KEY NAME IN .env FILE
FOR EXAMPLE db.name = "DB_NAME" HERE IT MEANS IN .env FILE
THERE WILL BE A FIELD LIKE DB_NAME=ANY_VALUE
*/

// eslint-disable-next-line
export default {
  db: {
    name: 'DB_NAME',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
  },
  JWT: {
    access_token_secret: "JWT_ACCESS_TOKEN_SECRET",
    access_token_expiry: "JWT_ACCESS_TOKEN_EXPIRY",
  },
  NODEMAILER: {
    SMTP_PASSWORD: "SMTP_PASSWORD",
    SMTP_SERVICE: "SMTP_SERVICE",
    SMTP_FROM_EMAIL: "SMTP_FROM_EMAIL",
  },
  stripe: {
    secret_key: "STRIPE_SECRET_KEY",
  },
  VerificationTokenSecret: "VERIFICATION_TOKEN_SECRET",
  tokenExpiry: {
    EMAIL_VERIFICATION: "EMAIL_VERIFICATION_TOKEN_EXPIRY",
    PASSWORD_RESET: "PASSWORD_RESET_TOKEN_EXPIRY",
  },
  Cloudflare: {
    endpoint: "CLOUDFLARE_ENDPOINT",
    accessKey: "CLOUDFLARE_R2_ACCESS_KEY",
    secretKey: "CLOUDFLARE_R2_SECRET_KEY",
    bucket_name: "CLOUDFLARE_R2_BUCKET_NAME",
    bucket_public_url: "CLOUDFLARE_R2_BUCKET_PUBLIC_URL",
  },
};
