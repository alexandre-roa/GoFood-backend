import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import RestaurantsRepository from '@modules/restaurants/infra/typeorm/repositories/RestaurantsRepository';

import IRestaurantTokensRepository from '@modules/restaurants/repositories/IRestaurantTokensRepository';
import RestaurantTokensRepository from '@modules/restaurants/infra/typeorm/repositories/RestaurantTokensRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<IRestaurantTokensRepository>(
  'RestaurantTokensRepository',
  RestaurantTokensRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
