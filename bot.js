const tmi = require("tmi.js");
const dotenv = require("dotenv").config();
const express = require('express');
const cors = require('cors');

const NOME_BOT = process.env.NOME_BOT;
const NOME_CANAL = process.env.NOME_CANAL;
const TOKEN_BOT = process.env.TOKEN_BOT;

const app = express ();
app.use(cors())

let last = ""

const opts = {
    identity: {
      username: NOME_BOT,
      password: TOKEN_BOT,
    },
    channels: [NOME_CANAL],
};

const client = new tmi.client(opts);


function recivedMessage(target, context, msg, bot) {
    // Verifica se a mensagem recebido é do nosso bot
    if (bot) {
        return;
    }

    if (msg.toLowerCase() == "!slot") {
        last = context.username
    }
}

client.on("message", recivedMessage);
client.on("connected", () => {
    client.say(NOME_CANAL, "Em dia patrão");
});

client.connect();

app.listen(8000, () => {
    console.log("Server Listening on PORT:", 8000);
});

app.get("/lastslot", (req,res) => {
    res.send(last)
    last = ""
});

