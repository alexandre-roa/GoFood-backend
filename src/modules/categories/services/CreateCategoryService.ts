import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/schemas/Category';
import AppError from '@shared/errors/AppError';

interface IRequest {
  category_name: string;
}

@injectable()
class CreateCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_name }: IRequest): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findCategory(
      category_name,
    );

    if (checkCategoryExists) {
      throw new AppError('Category already exists!');
    }

    const category = await this.categoriesRepository.create({
      category_name,
    });

    return category;
  }
}

export default CreateCategoriesService;
