import { Router } from 'express'
import ToDoController from '../controllers/ToDoController' 

const router = Router()

router.get('/todos', ToDoController.findAll)
router.get('/todos/:id', ToDoController.findById)
router.post('/todos', ToDoController.create)
router.put('/todos/:id', ToDoController.update)
router.delete('/todos/:id', ToDoController.delete)

export default router