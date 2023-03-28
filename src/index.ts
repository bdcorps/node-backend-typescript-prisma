import bodyParser from "body-parser";
import cors from 'cors';
import express, { Application } from "express";
import prisma from "./lib/prisma";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if you want anyone to be able to connect
app.use(cors({ origin: true }))

// if you want only your frontend to connect
app.use(cors({ origin: "http://localhost:3000" }))

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get a user by id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(user);
});

// Create a new user
app.post("/users", async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const newUser = await prisma.user.create({
    data: { email, firstName, lastName },
  });
  res.status(201).json(newUser);
});

// Update a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { email, firstName, lastName },
  });
  res.json(updatedUser);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json(deletedUser);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
