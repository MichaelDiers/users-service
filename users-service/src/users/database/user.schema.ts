import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * The document type for users.
 */
export type UserDocument = User & Document;

/**
 * Describes the schema for users.
 */
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

/**
 * The mongodb schema for users.
 */
export const UserSchema = SchemaFactory.createForClass(User);
