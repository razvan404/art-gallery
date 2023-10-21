import Cryptr from "cryptr";

const encrypt = (message: string): string => {
  return new Cryptr(process.env.CRYPTR_SECRET_KEY ?? "").encrypt(message);
};

export { encrypt };
