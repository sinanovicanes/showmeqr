import express from "express";
import bodyParser from "body-parser";
import { Database } from "./classes/database";
import cors from "cors";
import { Config } from "./config";

const db = Database.getInstance();
const app = express();

app.use(cors({origin: Config.origin}));
app.use(bodyParser.json({limit: '1024kb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/GetUserConnections', async (req, res) => {
    const address = req.body.address;

    res.json(await db.getUserConnections(address));
});

app.post('/Login', async (req, res) => {
    const username = req.body.username?.toString();
    const password = req.body.password?.toString();

    if (username == undefined || password == undefined) return res.json(false);

    res.json(await db.login({username: username, password: password}));
});

app.post('/NewConnection', async (req, res) => {
    const userId = Number(req.body.userId);
    const name = req.body.name?.toString();
    const username = req.body.username?.toString();

    if (name == undefined || username == undefined) return res.json(false);

    res.json(db.newConnection(userId, name, username));
});

app.post('/RemoveConnection', async (req, res) => {
    const userId = Number(req.body.userId);
    const name = req.body.name?.toString();

    if (name == undefined) return res.json(false);

    res.json(db.removeConnection(userId, name));
});

app.post('/UpdateUserImage', async (req, res) => {
    const userId = Number(req.body.userId);
    const image = req.body.image?.toString();

    if (image == undefined) return res.json(false);

    res.json(db.updateUserImage(userId, image));
})

app.post('/Register', async (req, res) => {
    const username = req.body.username?.toString()
    const password = req.body.password?.toString()
    const mail = req.body.mail?.toString()
    
    if (username == undefined || password == undefined || mail == undefined) return res.json(false);

    res.json(await db.newUser({
        username,
        password,
        mail
    }));
});

app.listen(5000);