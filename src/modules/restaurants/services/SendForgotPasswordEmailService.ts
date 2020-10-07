import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';
import path from 'path';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';
import IRestaurantTokensRepository from '../repositories/IRestaurantTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('RestaurantTokensRepository')
    private restaurantTokensRepository: IRestaurantTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const restaurant = await this.restaurantsRepository.findByEmail(email);

    if (!restaurant) {
      throw new AppError('Restaurant does not exists.');
    }

    const restaurant_id = JSON.stringify(restaurant.id).replace(/"/g, '');

    const { token } = await this.restaurantTokensRepository.generate(
      restaurant_id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: restaurant.name,
        email: restaurant.email,
      },
      subject: '[GoFood] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: restaurant.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
