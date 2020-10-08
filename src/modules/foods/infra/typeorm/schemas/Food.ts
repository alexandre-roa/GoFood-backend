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

  @Column()
  image_url: string;

  @Column()
  extras: Extra[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Food;
