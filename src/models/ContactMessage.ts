import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ContactMessageAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
}

type ContactMessageCreationAttributes = Optional<ContactMessageAttributes, 'id' | 'subject' | 'status'>;

export class ContactMessage extends Model<ContactMessageAttributes, ContactMessageCreationAttributes> implements ContactMessageAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public subject!: string;
  public message!: string;
  public status!: string;
}

ContactMessage.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(30), allowNull: false, defaultValue: '' },
    subject: { type: DataTypes.STRING(200), allowNull: false, defaultValue: 'General Enquiry' },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'new' },
  },
  { sequelize, tableName: 'contact_messages', modelName: 'ContactMessage' }
);
