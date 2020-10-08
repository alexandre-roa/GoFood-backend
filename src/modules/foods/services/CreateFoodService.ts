import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
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
  image_url: string;
  extras?: Extra[];
  category_id: string;
}
@injectable()
class CreateFoodService {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: IFoodsRepository,

    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,
  ) {}

  public async execute({
    title,
    description,
    price,
    image_url,
    extras,
    category_id,
  }: IRequest): Promise<Food | null> {
    const category = await this.foodCategoryRepository.findId(category_id);

    if (!category) throw new AppError('Category not found');

    const food = await this.foodsRepository.create({
      title,
      description,
      price,
      image_url,
      extras,
      category_id,
      category,
    });

    return food;
  }
}

export default CreateFoodService;
