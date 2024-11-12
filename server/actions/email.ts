import getBaseUrl from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  console.log("send email", email, "token:", token);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["trajikshan1998@gmail.com"],
    subject: "AgroStore Confirmation Email",
    html: `<h1>Click to  <a href=${confirmLink}> Verify your email...`,
  });

  if (error) {
    console.log(error);
  }

  if (data) return data;
};

export const sendPassWordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  console.log("send email", email, "token:", token);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["trajikshan1998@gmail.com"],
    subject: "AgroStore Password Reset Confirmation Email",
    html: `<h1>Click to  <a href=${confirmLink}> reset your password...`,
  });

  if (error) {
    console.log(error);
  }

  if (data) return data;
};
