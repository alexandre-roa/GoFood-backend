import Category from '../infra/typeorm/schemas/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
}
