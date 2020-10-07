import Restaurant from '../infra/typeorm/schemas/Restaurant';
import Category from '@modules/categories/infra/typeorm/schemas/Category';
import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

export default interface IRestaurantsRepository {
  findAllRestaurants(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | undefined>;
  findByEmail(email: string): Promise<Restaurant | undefined>;
  create(data: ICreateRestaurantDTO): Promise<Restaurant>;
  save(restaurant: Restaurant): Promise<Restaurant>;
}
