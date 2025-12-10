import {Router, Request, Response} from 'express';
import {pool} from '../../config/db';
import logger from '../../middleware/logger';
import {userController} from './user.controller';

const router = Router()

// router(handel the routes) -> controller(handel the req and res) -> services(handel the buisness logic/database logic)

router.post('/', userController.createUser)

router.get('/', logger, userController.getUser)

router.get('/:id', userController.getSingleUser)

router.put('/:id', userController.upadaterUser)

router.delete('/:id', userController.deleteUser)

export const userRouter = router 