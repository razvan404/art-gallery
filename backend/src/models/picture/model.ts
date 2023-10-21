export type Picture = {
  id: string;
  createdAt: Date;
  title: string;
  url: string;
  authorId: string | null;
  typeId: number;
};
