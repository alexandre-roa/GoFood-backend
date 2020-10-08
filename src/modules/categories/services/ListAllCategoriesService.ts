import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/schemas/Category';
import AppError from '@shared/errors/AppError';

@injectable()
class ListAllCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const category = await this.categoriesRepository.listCategories();

    return category;
  }
}

export default ListAllCategoriesService;
