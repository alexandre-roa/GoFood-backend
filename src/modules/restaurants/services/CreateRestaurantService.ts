import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import Restaurant from '../infra/typeorm/schemas/Restaurant';

interface IRequest {
  name: string;
  email: string;
  password: string;
  restaurant_category: string;
}

@injectable()
class CreateRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('CategoriesRepositories')
    private categoriesRepositories: ICategoriesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    restaurant_category,
  }: IRequest): Promise<Restaurant> {
    const checkRestaurantExists = await this.restaurantsRepository.findByEmail(
      email,
    );

    const checkCategoryExists = await this.categoriesRepositories.findCategory(
      restaurant_category,
    );

    if (checkRestaurantExists) {
      throw new AppError('Email address already used.');
    }

    if (!checkCategoryExists) {
      throw new AppError('Category does not exists!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const restaurant = await this.restaurantsRepository.create({
      name,
      email,
      password: hashedPassword,
      restaurant_category,
    });

    return restaurant;
  }
}

export default CreateRestaurantsService;
