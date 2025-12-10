import {Router, Request, Response} from 'express';
import {userServices} from './user.service';

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email)

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getUser =  async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers()

    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id 

    const result = await userServices.getSingleUser(id!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User found successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const upadaterUser = async (req: Request, res: Response) => {
  const { name, email } = req?.body;
  const id = req.params.id

  try {
    const result = await userServices.upadaterUser(name, email, id!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "User update successfully",
        result: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

const deleteUser = async (req: Request, res: Response) => {
  const queryParam = req?.params?.id;

  try {
    const result = await userServices.deleteUser(queryParam!)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User delete successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    upadaterUser,
    deleteUser
}