const express = require ('express');

const aplicacion = express();

const puerto = 3000;

aplicacion.set('view engine', 'ejs');
aplicacion.set('views',__dirname+'/views')

aplicacion.use(express.static(__dirname+'/public'));

aplicacion.get('/',(req,resp)=>{
    resp.render('index')
});

aplicacion.get('/contacto', (req,resp)=>{
    resp.render('contacto')
})

aplicacion.get('/donaciones', (req, res) => {
    res.render('donaciones'); 
});

aplicacion.get('/cuidados', (req, res) => {
    res.render('cuidados'); 
});

aplicacion.use((req,resp,next)=>{
    resp.status(404).render('404')
})

aplicacion.listen (puerto, ()=>{
    console.log('Escucahndo las peticiones:D desde el puerto', puerto)
});



/*const http = require('http');

const servidor = http.createServer((req, resp)=>{
    resp.end('Esto es una respuesta a tu solicitud')
});

const puerto=3000;

servidor.listen(puerto,()=>{
    console.log("Servidor escuchando solicitudes")



/*const express = require ('express');

const aplicacion = express();

const puerto = 3000;

aplicacion.get('/',(req,resp)=>{
    resp.send('Pagina de inicio')
});

aplicacion.listen (puerto, ()=>{
    console.log('Escucahndo las peticiones:D desde el puerto', puerto)
});*/

/*const http = require('http');

const servidor = http.createServer((req, resp)=>{
    resp.end('Esto es una respuesta a tu solicitud')
});

const puerto=3000;

servidor.listen(puerto,()=>{
    console.log("Servidor escuchando solicitudes")
});*/