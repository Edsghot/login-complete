import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack

const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json("home GET request");
})
/**api router */
app.use('/api',router)

/**iniciamos el servidor y validamos la connecion con la base de datos */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected in port http://localhost:${port}`);
        })
    } catch (e) {
        console.log("Cannot connect to server")
    }
}).catch(error=>{
    console.log("Invalid database connection");
})


