import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurant_categories')
class Category {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  category_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
