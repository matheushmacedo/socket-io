const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    // * Indica que qualquer URL pode fazer a requisicao
    // mas poderia colocar somente uma URL para poder fazer a requisicao, caso viesse de outra daria erro e nao continuaria
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); // aceita esses metodos
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get('/', function (req, res) {
    res.send('Bemm vindo Matheus!!');
});

const server = app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

io = socket(server, {cors: {origin: "*"}});

// .on sao os dados recebidos
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("Sala_conectar", (dados) => {
        console.log("Sala selecionada: " + dados);
        socket.join(dados);
    });

    socket.on("enviar_mensagem", (dados) => {
        console.log(dados);
        // realizo um broadcast para que todos nesta sala recebam a mensagem
        socket.to(dados.sala).emit("receber_mensagem", dados.conteudo);
    });
});