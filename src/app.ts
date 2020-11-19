import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {ToDo} from "./entity/ToDo";

createConnection().then(connection  => {
    const toDoRepository = connection.getRepository(ToDo);
    // create and setup express app
    const app = express();
    const port = process.env.PORT || 3000;
    app.use(express.json());
    
    // register routes
    
    app.get("/todos", async function(req: Request, res: Response) {
        const toDos = await toDoRepository.find();
        res.json(toDos);
    });
    
    app.get("/todos/:id", async function(req: Request, res: Response) {
        const results = await toDoRepository.findOne(req.params.id);
        return res.send(results);
    });
    
    app.post("/todos", async function(req: Request, res: Response) {
        const toDo = await toDoRepository.create(req.body);
        const results = await toDoRepository.save(toDo);
        return res.send(results);
    });
    
    app.put("/todos/:id", async function(req: Request, res: Response) {
        const toDo = await toDoRepository.findOne(req.params.id);
        toDoRepository.merge(toDo, req.body);
        const results = await toDoRepository.save(toDo);
        return res.send(results);
    });
    
    app.delete("/todos/:id", async function(req: Request, res: Response) {
        const results = await toDoRepository.delete(req.params.id);
        return res.send(results);
    });
    
    // start express server
    app.listen(port)
    console.log(`App listening at http://localhost:${port}`);
}).catch(error => console.log("TypeORM connection error: ", error));