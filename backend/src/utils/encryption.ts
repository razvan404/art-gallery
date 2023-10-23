import { randomUUID } from "crypto";
import Cryptr from "cryptr";

const encrypt = (message: string): string => {
  return new Cryptr(process.env.CRYPTR_SECRET_KEY ?? "").encrypt(message);
};

const randomText = (length: number): string => {
  return new Cryptr(process.env.CRYPTR_SECRET_KEY ?? "")
    .encrypt(randomUUID())
    .slice(0, length);
};

export { encrypt, randomText };
