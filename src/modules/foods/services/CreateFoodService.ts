import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICategoryFoodsRepository from '../repositories/ICategoryFoodsRepository';
import Food from '../infra/typeorm/schemas/Food';

interface Extra {
  name: string;
  price: string;
}

interface IRequest {
  title: string;
  description: string;
  price: number;
  image_url?: string;
  extras?: Extra[];
  category_id: string;
  restaurant_id: string;
}
@injectable()
class CreateFoodService {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: IFoodsRepository,

    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    title,
    description,
    price,
    image_url,
    extras,
    category_id,
    restaurant_id,
  }: IRequest): Promise<Food | null> {
    const category = await this.foodCategoryRepository.findId(category_id);

    if (!category) throw new AppError('Category not found');

    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) throw new AppError('Restaurant not found');

    const food = await this.foodsRepository.create({
      title,
      description,
      price,
      image_url: image_url
        ? image_url
        : 'https://images.unsplash.com/photo-1525999147711-835474620964?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1021&q=80',
      available: true,
      extras,
      category_id,
      category,
      restaurant_id,
      restaurant,
    });

    return food;
  }
}

export default CreateFoodService;
