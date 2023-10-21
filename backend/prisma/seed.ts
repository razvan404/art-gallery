import { db } from "../src/utils/database";
import { configDotenv } from "dotenv";
import { encrypt } from "../src/utils/encryption";

configDotenv();

type User = {
  username: string;
  email: string;
  password: string;
};

const createUser = (
  username: string,
  email: string,
  password: string
): User => ({
  username: username,
  email: encrypt(email),
  password: encrypt(password),
});

type PictureType = {
  name: string;
};

const createPictureType = (type: string): PictureType => ({
  name: type,
});

type Picture = {
  title: string;
  description: string;
  url: string;
};

const createPicture = (
  title: string,
  description: string,
  url: string
): Picture => ({
  title: title,
  description: description,
  url: url,
});

const getUsers = (): User[] => [
  createUser("razvan", "razvan@gmail.com", "razvan"),
  createUser("alex", "alex@gmail.com", "alex"),
  createUser("andrei", "andrei@gmail.com", "andrei"),
  createUser("bogdan", "bogdan@gmail.com", "bogdan"),
  createUser("gabi", "gabi@gmail.com", "gabi"),
  createUser("mihai", "mihai@gmail.com", "mihai"),
  createUser("nicu", "nicu@gmail.com", "nicu"),
  createUser("cosmin", "cosmin@gmail.com", "cosmin"),
  createUser("rares", "rares@gmail.com", "rares"),
  createUser("sergiu", "sergiu@gmail.com", "sergiu"),
  createUser("denis", "denis@gmail.com", "denis"),
];

const getPictureTypes = (): PictureType[] => [
  createPictureType("Photography"),
  createPictureType("Painting"),
  createPictureType("Digital Art"),
  createPictureType("AI Generated"),
];

const getPictures = (): Picture[] => [
  createPicture(
    "title1",
    "descr1",
    "https://w.wallhaven.cc/full/rr/wallhaven-rrpp6m.png"
  ),
  createPicture(
    "title2",
    "descr2",
    "https://w.wallhaven.cc/full/m3/wallhaven-m3zjx1.jpg"
  ),
];

const seed = async () => {
  try {
    await Promise.all(
      getUsers().map((user) => {
        return db.user.create({
          data: {
            username: user.username,
            password: user.password,
            email: user.email,
          },
        });
      })
    );
  } catch (error) {
    console.log("Couldn't seed all the users");
  }
  try {
    await Promise.all(
      getPictureTypes().map((type) => {
        return db.pictureType.create({
          data: {
            name: type.name,
          },
        });
      })
    );
  } catch (error) {
    console.log("Couldn't seed all the picture types");
  }
  const author = await db.user.findFirst({
    where: {
      username: "razvan",
    },
  });
  const type1 = await db.pictureType.findFirst({
    where: {
      name: "Photography",
    },
  });
  const type2 = await db.pictureType.findFirst({
    where: {
      name: "Digital Art",
    },
  });

  const types = [type1, type2];

  try {
    await Promise.all(
      getPictures().map((picture, idx) => {
        const { title, description, url } = picture;
        return db.picture.create({
          data: {
            title: title,
            description: description,
            url: url,
            // @ts-expect-error
            typeId: types[idx].id,
            // @ts-expect-error
            authorId: author.id,
          },
        });
      })
    );
  } catch (error) {
    console.log("Couldn't seed all the pictures");
  }
};

seed();
