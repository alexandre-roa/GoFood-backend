import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';
import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';

interface Extra {
  name: string;
  price: string;
}

export default interface IFoodDTO {
  title: string;
  description: string;
  price: number;
  image_url?: string;
  extras?: Extra[];
  category_id: string;
  available: boolean;
  category: FoodCategory | undefined;
  restaurant_id: string;
  restaurant: Restaurant | undefined;
}
