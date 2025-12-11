import express, { Request, Response, NextFunction } from "express";
import initDB, {pool} from './config/db';
import {userRouter} from './modules/user/user.routes';
import {todosRouter} from './modules/todos/todos.routes';
import {authRouter} from './modules/auth/auth.routes';
const app = express();


//perser middleware
app.use(express.json());

//initializing database 
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("gelo world");
});

// user curd
app.use("/users", userRouter)


// TODOS curd
app.use("/todos", todosRouter)

// auth login
app.use("/auth", authRouter)



app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

export default app
