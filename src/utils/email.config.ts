import { createTransport } from 'nodemailer'
import 'dotenv/config'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
})

export const mail = (userEmail: string, userName: string, token: string) => {
    transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: userEmail,
        subject: 'Confirmação seu e-mail de cadastro',
        html: `<h2>Olá, ${userName}!</h2><p>Para a sua segurança, confirme se este é o endereço de e-mail que você cadastrou no Payment Service.</p><p>Clique no link abaixo:</p><a href="https://localhost:3002/confirm-email/${token}">${token}</a> `
    })
}

