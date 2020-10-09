import FoodCategory from '@modules/foods/infra/typeorm/schemas/FoodCategory';
import ICreateCategoryFoodDTO from '../dtos/ICreateCategoryFoodDTO';

export default interface ICategoryFoodsRepository {
  create(data: ICreateCategoryFoodDTO): Promise<FoodCategory>;
  findId(category_id: string | undefined): Promise<FoodCategory | undefined>;
  findOne(categoryTitle: string): Promise<FoodCategory | undefined>;
  find(restaurant_id: string): Promise<FoodCategory[] | undefined>;
  delete(category_id: string): Promise<void | FoodCategory[]>;
}
