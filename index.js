const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


const EMAIL =  'vicentepaiva79@gmail.com';
const PASSWORD = 'epuabgwyrfzcmjud';
const EMAIL_DESTINO = 'vicentepaivadev@gmail.com';
const SMTP_HOST = 'smtp.gmail.com';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

async function enviarEmail(valorDolar) {
    const message = {
        from: EMAIL,
        to: EMAIL_DESTINO,
        subject: 'Valor do Dólar Canadense',
        text: `O valor do dólar Canadense em relação ao Real é: ${valorDolar}`
    };

    try {
        await transporter.sendMail(message)
        console.log('Email enviado com sucesso!')
    } catch (error) {
        console.error('Ocorreu um erro ao enviar o email:', error.message )
    }
}


async function ataulizarValorDolar() {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/CAD')
        console.log(response)
        const valorDolar = response.data.rates.BRL;
        await enviarEmail(valorDolar)
    } catch (error) {
        console.error('Ocorreu um erro ao obter o valor do dólar canadense:', error.message)
    }
}


cron.schedule('0 0 * * *', () => {
    ataulizarValorDolar();
})
// ataulizarValorDolar()