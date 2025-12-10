import {Request, Response} from 'express';
import {todosServies} from './todos.service';

const createTodos =  async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;

  try {
    const result = await todosServies.createTodos(user_id, title)

    res.status(201).json({
      success: true,
      message: "Data insert successful",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "Data inset faild",
    });
  }
}

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServies.getTodos()

    res.status(200).json({
      success: true,
      message: "Todos found successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const todosController = {
    createTodos,
    getTodos
}