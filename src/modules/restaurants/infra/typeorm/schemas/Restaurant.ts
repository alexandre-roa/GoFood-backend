import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Food from '@modules/foods/infra/typeorm/schemas/Food';

@Entity('restaurants')
class Restaurant {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  restaurant_category: string;

  @OneToMany(() => Food, food => food.restaurant)
  foods: Food[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Restaurant;
