import { randomUUID } from "crypto";
import Cryptr from "cryptr";

const encrypt = (message: string): string => {
  return new Cryptr(process.env.CRYPTR_SECRET_KEY ?? "").encrypt(message);
};

const randomFileName = (format): string => {
  return (
    new Cryptr(process.env.CRYPTR_SECRET_KEY ?? "")
      .encrypt(randomUUID())
      .slice(0, 16) + `.${format}"
  );
};

export { encrypt, randomFileName };
