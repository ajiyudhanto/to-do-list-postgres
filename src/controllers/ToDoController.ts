import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { ToDo } from "../entity/ToDo";

export default class ToDoController {
    public static async findAll(req: Request, res: Response, next: NextFunction) {
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
            res.status(200).json(toDos);   
        } catch (error) {
            next(error)
        }
    }

    public static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const toDoRepository = getRepository(ToDo);
            const results = await toDoRepository.findOne(req.params.id);
            if (!results) throw { name: 'todo not found' }
            return res.status(200).send(results);
        } catch (error) {
            next(error)
        }
    }

    public static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const toDoRepository = getRepository(ToDo);
            const toDo = await toDoRepository.create(req.body);
            const results = await toDoRepository.save(toDo);
            return res.status(201).send(results);       
        } catch (error) {
            next(error)
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const toDoRepository = getRepository(ToDo);
            const toDo = await toDoRepository.findOne(req.params.id);
            if (!toDo) throw { name: 'todo not found' }
            toDoRepository.merge(toDo, req.body);
            const results = await toDoRepository.save(toDo);
            return res.status(201).send({ msg: 'todo edited successfully' });
        } catch (error) {
            next(error)
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const toDoRepository = getRepository(ToDo);
            const results = await toDoRepository.delete(req.params.id);
            if (results.affected === 0) throw { name: 'todo not found' }
            return res.status(200).send({ msg: 'todo deleted successfully' });
        } catch (error) {
            next(error)
        }
    }
}