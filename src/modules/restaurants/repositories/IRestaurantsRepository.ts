import Restaurant from '../infra/typeorm/schemas/Restaurant';
import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllRestaurantsDTO';

export default interface IRestaurantsRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | undefined>;
  findByEmail(email: string): Promise<Restaurant | undefined>;
  create(data: ICreateRestaurantDTO): Promise<Restaurant>;
  save(restaurant: Restaurant): Promise<Restaurant>;
}
