import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ToDo } from "../entity/ToDo";

export default class ToDoController {
    public static async findAll(req: Request, res: Response) {
        function compare( a, b ) {
            if ( a.date < b.date ){
                return -1;
            }
            if ( a.date > b.date ){
                return 1;
            }
            if ( a.status > b.status ){
                return -1;
            }
            if ( a.status < b.status ){
                return 1;
            }
            return 0;
        }
        try {
            const toDoRepository = getRepository(ToDo);
            const toDos = await toDoRepository.find();
            toDos.sort( compare );
            res.json(toDos);   
        } catch (error) {
            console.log(error)
        }
    }

    public static async findById(req: Request, res: Response) {
        try {
            const toDoRepository = getRepository(ToDo);
            const results = await toDoRepository.findOne(req.params.id);
            return res.send(results);
        } catch (error) {
            console.log(error)
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const toDoRepository = getRepository(ToDo);
            const toDo = await toDoRepository.create(req.body);
            const results = await toDoRepository.save(toDo);
            return res.send(results);       
        } catch (error) {
            console.log(error)
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const toDoRepository = getRepository(ToDo);
            const toDo = await toDoRepository.findOne(req.params.id);
            toDoRepository.merge(toDo, req.body);
            const results = await toDoRepository.save(toDo);
            return res.send({ msg: 'todo edited successfully' });
        } catch (error) {
            console.log(error)
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const toDoRepository = getRepository(ToDo);
            const results = await toDoRepository.delete(req.params.id);
            return res.send({ msg: 'todo deleted successfully' });
        } catch (error) {
            console.log(error)
        }
    }
}