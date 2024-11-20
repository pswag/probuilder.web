const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Añadir esto si también envías JSON

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'probuildercl@gmail.com',
    pass: 'sdga hptj dtnh riez' // Asegúrate de usar la contraseña de aplicación de Google
  }
});

// Ruta para enviar el correo
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Datos recibidos:', { name, email, message }); // Verifica los datos

  const mailOptions = {
    from: email,
    to: 'probuildercl@gmail.com', // Asegúrate de que esta dirección sea correcta
    subject: 'Nuevo mensaje desde el formulario',
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Correo enviado exitosamente');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
