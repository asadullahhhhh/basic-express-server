import {Router} from 'express';
import {todosController} from './todos.controller';

const router = Router()

router.post("/", todosController.createTodos)

router.get("/", todosController.getTodos)


export const todosRouter = router