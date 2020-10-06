import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import Restaurant from '../infra/typeorm/schemas/Restaurant';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Restaurant> {
    const checkRestaurantExists = await this.restaurantsRepository.findByEmail(
      email,
    );

    if (checkRestaurantExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const restaurant = await this.restaurantsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return restaurant;
  }
}

export default CreateRestaurantsService;
