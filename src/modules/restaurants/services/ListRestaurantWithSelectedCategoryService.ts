import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';

import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';
import AppError from '@shared/errors/AppError';

interface IRequest {
  category_name: string;
  user_id: string;
}

@injectable()
class ListRestaurantWithSelectedCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    category_name,
    user_id,
  }: IRequest): Promise<Restaurant> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) throw new AppError('User not found');

    const category = await this.categoriesRepository.findCategory(
      category_name,
    );

    if (!category) {
      throw new AppError('Category does not exists!');
    }

    const restaurant = await this.restaurantsRepository.findByCategory(
      category.category_name,
    );

    if (!restaurant)
      throw new AppError('There is no one restaurant with this category');

    return restaurant;
  }
}

export default ListRestaurantWithSelectedCategoryService;
