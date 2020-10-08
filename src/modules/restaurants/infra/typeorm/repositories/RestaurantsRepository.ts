import Category from '@modules/categories/infra/typeorm/schemas/Category';
import { getMongoRepository, MongoRepository, Not } from 'typeorm';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICreateRestaurantDTO from '@modules/restaurants/dtos/ICreateRestaurantDTO';

import Restaurant from '../schemas/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: MongoRepository<Restaurant>;

  constructor() {
    this.ormRepository = getMongoRepository(Restaurant);
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

  public async findByCategory(
    restaurant_category: string,
  ): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository.findOne({
      where: { restaurant_category },
    });

    return restaurant;
  }

  public async findAllRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.ormRepository.find();

    return restaurants;
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
