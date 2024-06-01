import { AppError } from "@src/errors/AppError";
import { getEnv } from "@src/utils/getEnv";
import { formatTimeInWordsWithUnit } from "@src/utils/formatTimeInWordsWithUnit";
import nodemailer from "nodemailer";

const url = getEnv("FRONTEND_URL");

class EmailService {
  private static toSendEmail = process.env.NODE_ENV === "production";
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "international.romeo333@gmail.com",
      pass: "ozyk wwyb qhmx irsy",
    },
    secure: true,
  });


  public static sendVerificationEmail(email: string, token: string) {
    if (!this.toSendEmail) {
      return "Email sending disabled";
    }

    const mailOptions = {
      from: '"My Company" <international.romeo333@gmail.com>',
      to: email,
      subject: `Email Verification`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #007bff;">Email Verification</h2>
          <p style="font-size: 16px;">You requested for email verification, kindly use this Link <a
            style="color: #007bff; text-decoration: none;" href=${url}/verify-email?token=${encodeURIComponent(token)}">
            Verify your email address</a> to verify your email address.</p>
      <b>Note that this link will expire in the next ${formatTimeInWordsWithUnit(
      getEnv("tokenExpiry.EMAIL_VERIFICATION"))}</b>
            </div>
      `,
    };

    this.transporter.sendMail(mailOptions);
    return "Verification email sent successfully";
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
              <a
                href="${url}/reset-password?token=${encodeURIComponent(token)}"
              >
              <br/>
              Reset Password
              </a></p>
            <p>
              <b>Note that this link will expire in the next ${formatTimeInWordsWithUnit(
      getEnv("tokenExpiry.PASSWORD_RESET"))}</b>
            </p>`,
      };

      await this.transporter.sendMail(message);
      return "Password reset email sent successfully";
    } catch (error: any) {
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

    await this.transporter.sendMail(message);
    return "Password reset email sent successfully";
  }
}

export default EmailService;
