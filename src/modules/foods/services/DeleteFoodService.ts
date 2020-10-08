import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFoodsRepository from '@modules/foods/repositories/IFoodsRepository';
import ICategoryFoodsRepository from '../repositories/ICategoryFoodsRepository';
import Food from '../infra/typeorm/schemas/Food';

@injectable()
class CreateFoodService {
  constructor(
    @inject('FoodsRepository')
    private foodsRepository: IFoodsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.foodsRepository.delete(id);
  }
}

export default CreateFoodService;
