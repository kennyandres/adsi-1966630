import express from "express"
import cors from 'cors'
import { dbconnection } from "../database/config.js"
import categoria from "../routes/categoria.js"
import usuario from "../routes/usuario.js"

class server {
    constructor() {
        this.app = express() //express
        this.port = process.env.PORT
        this.conectardb();  //conectar BD
        this.middlewares(); //iniciar middlewares
        this.routes();  //routes
    }

    async conectardb() {
        await dbconnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use('/api/categoria',categoria)
        this.app.use('/api/usuario',usuario)



    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en el puerto ${this.port}`);
        })

    }
}
export { server }