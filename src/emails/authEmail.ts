import { transport } from "../config/nodemailer"

type EmailType = {
    name: string,
    email: string,
    token: string
}

export class AuthEmail {
    static sendPasswordResetToken = async(user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashTrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Reestablece tu cuenta',
            html: `<p>Hola: ${user.name}, has solicitado reestablecer tu password</p>
            <p>Visita el siguiente enlace:</p>
            <a href="#">Reestablecer Password</a>
            <p>e ingrese el código: <b>${user.token}</b></p>`
        })
        console.log('Mensaje enviado', email.messageId)
    }

    static sendConfirmationEmail = async(user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashTrackr.com>',
            to: user.email,
            subject: 'CashTrackr - confirma tu cuenta',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en Cashtrackr, ya esta casi lista</p>
            <p>Visita el siguiente enlace:</p>
            <a href="#">Confirma cuenta</a>
            <p>e ingrese el código: <b>${user.token}</b></p>`
        })
        console.log('Mensaje enviado', email.messageId)
    }
}