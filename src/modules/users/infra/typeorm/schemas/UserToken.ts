import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
