

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Prisma } from ".prisma/client";
import { createUser, getAllUsers } from "./models";


const app = express();

app.use(helmet());
app.use(cors());
cors({ credentials: true, origin: true })

app.use(express.json());

app.get("/", (req, res) => {
  res.json({"message": "hello world"})
})

app.post("/user", async (req, res) => {
  const { name } = req.body;

  const newUser: Prisma.UserUncheckedCreateInput = { name }

  const savedUser = await createUser(newUser);
  res.json({ savedUser })

})


app.get("/users", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json({ allUsers })
})

export default app;
