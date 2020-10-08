import Category from '../infra/typeorm/schemas/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findCategory(category_name: string): Promise<Category | undefined>;
  listCategories(): Promise<Category[] | undefined>;
}
