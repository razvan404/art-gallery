import { db } from "../../utils/database";
import { type User } from "./model";

export const findAll = async (): Promise<User[]> => {
  return await db.user.findMany({
    select: {
      id: true,
      username: true,
    },
  });
};

export const findById = async (id: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
    },
  });
};
