import express, { Request, Response, NextFunction } from "express";
import config from './config/index';
import initDB, {pool} from './config/db';
import {userRouter} from './modules/user/user.routes';
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
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req?.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *
    `,
      [user_id, title]
    );

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
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM todos
    `);

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
});

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
