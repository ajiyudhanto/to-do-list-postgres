import * as express from "express";
import { createConnection } from "typeorm";
import router from './routes/index'
import errorHandler from './middlewares/errorHandler'

createConnection().then(connection  => {
    // create and setup express app
    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());
    app.use(router)
    app.use(errorHandler)
    
    // start express server
    app.listen(port)
    console.log(`App listening at http://localhost:${port}`);
}).catch(error => console.log("TypeORM connection error: ", error));