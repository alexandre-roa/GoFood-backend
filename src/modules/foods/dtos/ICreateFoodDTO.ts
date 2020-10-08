import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';

interface Extra {
  name: string;
  price: string;
}

export default interface ICreateTransactionsDTO {
  title: string;
  description: string;
  price: number;
  image_url: string;
  extras?: Extra[];
  category_id: string;
  category: FoodCategory | undefined;
}
