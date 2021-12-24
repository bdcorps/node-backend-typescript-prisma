import { Prisma } from ".prisma/client";

import { prisma } from "../lib/prisma"

export async function createUser(data: Prisma.UserUncheckedCreateInput) {
  const user = await prisma.user.create({
    data: {
      name: data.name
    }
  })

  return user;
}

export async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}