import { injectable, inject } from 'tsyringe';

import Restaurant from '../infra/typeorm/schemas/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

// interface IRequest {
//   provider_id: string;
//   day: number;
//   month: number;
//   year: number;
// }

@injectable()
class ListRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantsRepository.findAllRestaurants();

    return restaurants;
  }
}

export default ListRestaurantsService;
