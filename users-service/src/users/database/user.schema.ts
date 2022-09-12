import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  /**
   * The display name of the user.
   */
  @Prop({ required: true, unique: true })
  displayName: string;

  /**
   * The email of the user as a hash value.
   */
  @Prop({ required: true })
  email: string;

  /**
   * The unqiue id of the user.
   */
  @Prop({ required: true, unique: true })
  guid: string;

  /**
   * The password of the user as a hash value.
   */
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
