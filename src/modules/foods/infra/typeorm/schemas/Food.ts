import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import FoodCategory from './FoodCategory';
import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';

interface Extra {
  name: string;
  price: string;
}

@Entity('foods')
class Food {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => FoodCategory, category => category.food, {
    eager: true,
  })
  @JoinColumn({ name: 'food_category_id' })
  category: FoodCategory;

  @ManyToOne(() => Restaurant, restaurant => restaurant.foods)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
  image_url: string;

  @Column()
  available: boolean;

  @Column()
  extras: Extra[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Food;
