export type Picture = {
  id?: string;
  createdAt?: Date;
  title: string;
  description?: string;
  image: string;
  author?: {
    id: string;
    profileImage: string;
  };
  authorId?: string;
  typeId?: number;
};
