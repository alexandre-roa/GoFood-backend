import { getMongoRepository, MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import IRestaurantTokenRepository from '@modules/restaurants/repositories/IRestaurantTokensRepository';
import RestaurantToken from '../schemas/RestaurantToken';

class RestaurantTokensRepository implements IRestaurantTokenRepository {
  private ormRepository: MongoRepository<RestaurantToken>;

  constructor() {
    this.ormRepository = getMongoRepository(RestaurantToken);
  }

  public async findByToken(
    token: string,
  ): Promise<RestaurantToken | undefined> {
    const restaurantToken = await this.ormRepository.findOne({
      where: { token },
    });

    return restaurantToken;
  }

  public async generate(restaurant_id: string): Promise<RestaurantToken> {
    const token = uuid();
    const restaurantToken = this.ormRepository.create({
      restaurant_id,
      token,
    });

    await this.ormRepository.save(restaurantToken);

    return restaurantToken;
  }
}

export default RestaurantTokensRepository;
