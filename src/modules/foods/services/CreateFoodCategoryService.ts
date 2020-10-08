import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICategoryFoodsRepository from '@modules/foods/repositories/ICategoryFoodsRepository';
import FoodCategory from '../infra/typeorm/schemas/FoodCategory';

interface IRequest {
  title: string;
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
    restaurant_id,
  }: IRequest): Promise<FoodCategory | null> {
    const checkCategoryExist = await this.foodCategoryRepository.findOne(title);

    if (checkCategoryExist) {
      throw new AppError('Category is already exists');
    }

    const category = await this.foodCategoryRepository.create({
      title,
      restaurant_id,
    });

    return category;
  }
}

export default CreateFoodCategoryService;
