import {
  Entity,
  ObjectIdColumn,
  Column,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Food from './Food';

import Restaurant from '@modules/restaurants/infra/typeorm/schemas/Restaurant';

@Entity('food_categories')
class FoodCategory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  restaurant_id: string;

  @Column()
  available: boolean;

  @Column()
  image_url: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Food, food => food.category)
  food: Food;
}

export default FoodCategory;
