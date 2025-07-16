export type Category = {
  id: number;
  name: string;
};

export type Activity = {
  id: string;
  category: number;
  date: Date;
  name: string;
  description: string;
};
