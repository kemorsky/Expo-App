import { Resend } from "resend";
import { config } from "dotenv";

config();

const resend = new Resend(process.env.RESEND_API_KEY!);
const fromEmail = process.env.RESEND_FROM_EMAIL!;

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const { error } = await resend.emails.send({
    from: fromEmail ?? '',
    to,
    subject,
    html,
  });

  if (error) {
    if (error.statusCode === 429) {
        console.warn("Resend rate limit hit", {
        to,
        code: error.statusCode,
      });

      return;
    }

    console.error("Resend email failed", error);
    throw new Error("EMAIL_DELIVERY_FAILED");
  }
}
