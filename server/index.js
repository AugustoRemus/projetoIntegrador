//import express from "express";
const express = require('express');

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.listen(3001, ()=> {console.log('servidor on')});




server.get('/', (req, res)=> {
    res.send("<h1>pagina inicial</h1>");
});



server.post('/Ususario', (req, res) =>{

    res.send(`subimeter cliente`);
});


server.get('/Usuario', (req, res) =>{

  

    res.send('recebendo usuario');

});



server.put('/Usuario', (req, res) =>{

  

    res.send('substituindo usuario');

});




server.delete('/Usuario', (req, res) =>{

  

    res.send('deletando Usuario');

});







server.post('/Senha', (req, res) =>{

    res.send(`subimeter Senha`);
});


server.get('/Senha', (req, res) =>{

  

    res.send('recebendo Senha');

});



server.put('/Senha', (req, res) =>{

  

    res.send('substituindo Senha');

});




server.delete('/Senha', (req, res) =>{

  

    res.send('deletando Senha');

});










server.post('/Api', (req, res) =>{

    res.send(`subimeter Api`);
});


server.get('/Api', (req, res) =>{

  

    res.send('recebendo Api');

});



server.put('/Api', (req, res) =>{

  

    res.send('substituindo Api');

});




server.delete('/Api', (req, res) =>{

  

    res.send('deletando Api');

});






server.post('/Status', (req, res) =>{

    res.send(`subimeter Status`);
});


server.get('/Status', (req, res) =>{

  

    res.send('recebendo Status');

});



server.put('/Status', (req, res) =>{

  

    res.send('substituindo Status');

});




server.delete('/Status', (req, res) =>{

  

    res.send('deletando Status');

});









export default App;
