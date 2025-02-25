import { AppError } from "@src/errors/AppError";
import { formatTimeInWordsWithUnit } from "@src/utils/formatTimeInWordsWithUnit";
import { getEnv } from "@src/utils/getEnv";
import nodemailer from "nodemailer";

const url = getEnv("FRONTEND_URL");

class EmailSvs {
  private static toSendEmail = true; // !isDevEnvironment;
  private static transporter = nodemailer.createTransport({
    service: getEnv("NODEMAILER.SMTP_SERVICE"),
    auth: {
      user: getEnv("NODEMAILER.SMTP_FROM_EMAIL"),
      pass: getEnv("NODEMAILER.SMTP_PASSWORD"),
    },
    secure: true,
  });

  public static async sendVerificationEmail(email: string, token: string) {
    if (!this.toSendEmail) {
      return "Email sending disabled";
    }

    const mailOptions = {
      from: '"FurnishARt Team"',
      to: email,
      subject: `Email Verification`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #007bff;">Email Verification</h2>
          <p style="font-size: 16px;">You requested for email verification, kindly use this Link <a
            style="color: #007bff; text-decoration: none;" target="_blank" href=${url}/verify-email?token=${token}>
            Verify your email address</a> to verify your email address.</p>
          <b>Note that this link will expire in the next ${formatTimeInWordsWithUnit(Number(getEnv("tokenExpiry.EMAIL_VERIFICATION")))}</b>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return "Verification email sent successfully";
    } catch (error: any) {
      console.error('Error sending verification email:', error); // Log the error
      throw new AppError(error.message, 500);
    }
  }

  public static async sendForgotPasswordEmail(email: string, token: string) {
    if (!this.toSendEmail) {
      return "Email sending disabled";
    }

    try {
      const message = {
        to: email,
        subject: "Forgot Password",
        html: `
          <p>To reset your password, please click the link below.
            <a target="_blank" href="${url}/reset-password?token=${token}">
              <br/>
              Reset Password
            </a>
          </p>
          <p>
            <b>Note that this link will expire in the next ${formatTimeInWordsWithUnit(getEnv("tokenExpiry.PASSWORD_RESET"))}</b>
          </p>
        `,
      };

      await this.transporter.sendMail(message);
      return "Password reset email sent successfully";
    } catch (error: any) {
      console.error('Error sending forgot password email:', error); // Log the error
      throw new AppError(error.message, 500);
    }
  }

  public static async sendResetPasswordEmail(email: string) {
    if (!this.toSendEmail) {
      return "Email sending disabled";
    }

    const message = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Password Reset Successful",
      html: "<p>Your password has been changed successfully.</p>",
    };

    try {
      await this.transporter.sendMail(message);
      return "Password reset email sent successfully";
    } catch (error: any) {
      console.error('Error sending reset password email:', error); // Log the error
      throw new AppError(error.message, 500);
    }
  }
}

export default EmailSvs;
