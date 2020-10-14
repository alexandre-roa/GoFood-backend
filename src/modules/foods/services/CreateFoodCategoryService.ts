import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import FoodCategory from '../infra/typeorm/schemas/FoodCategory';

interface IRequest {
  title: string;
  image_url?: string;
  restaurant_id: string;
}
@injectable()
class CreateFoodCategoryService {
  constructor(
    @inject('FoodCategoryRepository')
    private foodCategoryRepository: ICategoryFoodsRepository,
  ) {}

  public async execute({
    title,
    image_url,
    restaurant_id,
  }: IRequest): Promise<FoodCategory | null> {
    const checkCategoryExist = await this.foodCategoryRepository.findOne(
      title,
      restaurant_id,
    );

    if (checkCategoryExist) {
      throw new AppError('Category is already exists');
    }

    const category = await this.foodCategoryRepository.create({
      title,
      available: true,
      image_url: image_url
        ? image_url
        : 'https://images.unsplash.com/photo-1525999147711-835474620964?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1021&q=80',
      restaurant_id,
    });

    return category;
  }
}

export default CreateFoodCategoryService;
