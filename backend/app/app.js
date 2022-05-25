const express = require('express');
const cors = require('cors');
const baseRoutes = require('./routes');
const userControllerRoutes = require('./controllers/user.controller');
const documentControllerRoutes = require('./controllers/document.controller');
const bodyParser = require('body-parser');
const { application } = require('express');

class App {
    constructor() {
        this.server = express();
        this.server.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
            this.server.use(cors())
            next();
        })
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.initRoutes();
    }

    initRoutes() {
        this.server.use(baseRoutes);
        this.server.use(userControllerRoutes);
        this.server.use(documentControllerRoutes);
    }
}

module.exports = new App().server;