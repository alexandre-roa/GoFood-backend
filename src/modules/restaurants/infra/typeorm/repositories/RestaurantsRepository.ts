import { getRepository, Repository, Not } from 'typeorm';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICreateRestaurantDTO from '@modules/restaurants/dtos/ICreateRestaurantDTO';
import IFindAllRestaurantsDTO from '@modules/restaurants/dtos/IFindAllRestaurantsDTO';

import Restaurant from '../schemas/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: Repository<Restaurant>;

  constructor() {
    this.ormRepository = getRepository(Restaurant);
  }

  public async findById(id: string): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository.findOne(id);

    return restaurant;
  }

  public async findByEmail(email: string): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository.findOne({
      where: { email },
    });

    return restaurant;
  }

  public async findAllProviders({
    except_restaurant_id,
  }: IFindAllRestaurantsDTO): Promise<Restaurant[]> {
    let restaurant: Restaurant[];

    if (except_restaurant_id) {
      restaurant = await this.ormRepository.find({
        where: {
          id: Not(except_restaurant_id),
        },
      });
    } else {
      restaurant = await this.ormRepository.find();
    }

    return restaurant;
  }

  public async create(
    RestaurantData: ICreateRestaurantDTO,
  ): Promise<Restaurant> {
    const restaurant = this.ormRepository.create(RestaurantData);

    await this.ormRepository.save(restaurant);

    return restaurant;
  }

  public async save(restaurant: Restaurant): Promise<Restaurant> {
    return this.ormRepository.save(restaurant);
  }
}

export default RestaurantsRepository;
