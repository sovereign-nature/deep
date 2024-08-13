import { Resend } from 'resend';

export function sendTokenEmail(
  email: { to: string; claimLink: string },
  apiKey: string
) {
  const resend = new Resend(apiKey);

  const emailData = {
    from: 'DOTphin <dotphin@updates.sovereignnature.com>',
    to: [email.to],
    subject: 'Your DOTphin Proof',
    html: `You can claim your DOTphin Proof by clicking <a href="${email.claimLink}">here</a>.`,
  };

  return resend.emails.send(emailData);
}
