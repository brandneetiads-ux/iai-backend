import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TestimonialAttributes {
  id: number;
  clientName: string;
  clientRole: string;
  message: string;
  rating: number;
  photo: string;
  approved: boolean;
}

type TestimonialCreationAttributes = Optional<TestimonialAttributes, 'id' | 'rating' | 'photo' | 'approved'>;

export class Testimonial extends Model<TestimonialAttributes, TestimonialCreationAttributes> implements TestimonialAttributes {
  public id!: number;
  public clientName!: string;
  public clientRole!: string;
  public message!: string;
  public rating!: number;
  public photo!: string;
  public approved!: boolean;
}

Testimonial.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientName: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    clientRole: { type: DataTypes.STRING(150), allowNull: false, defaultValue: '' },
    message: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    photo: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    approved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    sequelize,
    tableName: 'testimonials',
    modelName: 'Testimonial',
  }
);