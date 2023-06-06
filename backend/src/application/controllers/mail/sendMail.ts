import nodemailer, { Transporter } from 'nodemailer';
import { Notification } from '@/infra/repositories/mysql/entities';
import env from '@/main/config/env';

export async function sendEmail(notification: Notification, recipients: string | string[]) {
  // Configuração do transporte SMTP
  const transporter: Transporter = nodemailer.createTransport({
    host: env.mailHost, // servidor SMTP
    port: 587, // porta do servidor SMTP
    secure: false, // define se a conexão deve usar SSL/TLS (true para usar SSL/TLS)
    tls: {
      rejectUnauthorized: false, // Desabilita a verificação de certificado
    },
    auth: {
      user: env.mailUser, // endereço de e-mail do remetente
      pass: env.mailPw, // senha do remetente
    },
  });

  // Configuração do e-mail
  const mailOptions = {
    from: env.mailUser, // endereço de e-mail do remetente
    to: recipients, // endereço(s) de e-mail do(s) destinatário(s)
    subject: 'Notificação de Solicitação',
    text: notification.text, // conteúdo do e-mail obtido da notificação
    html: `<p>${notification.text}</p>`, // conteúdo do e-mail em formato HTML
  };

  try {
    // Envio do e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para: '${recipients}`, info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}
