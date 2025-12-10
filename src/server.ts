import express, { Request, Response, NextFunction } from "express";
import config from './config/index';
import initDB, {pool} from './config/db';
import {userRouter} from './modules/user/user.routes';
import {todosRouter} from './modules/todos/todos.routes';
const app = express();
const port = config.port;


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



app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
