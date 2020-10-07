import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('restaurant_tokens')
class RestaurantToken {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  token: string;

  @Column()
  restaurant_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RestaurantToken;
