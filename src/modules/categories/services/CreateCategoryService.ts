import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/schemas/Category';

interface IRequest {
  category_name: string;
}

@injectable()
class CreateCategoriesService {
  constructor(
    @inject('CategoriesRepositories')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      category_name,
    });

    return category;
  }
}

export default CreateCategoriesService;
