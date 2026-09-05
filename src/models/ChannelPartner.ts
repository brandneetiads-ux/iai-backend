import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ChannelPartnerAttributes {
  id: number;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  status: string;
}

type ChannelPartnerCreationAttributes = Optional<ChannelPartnerAttributes, 'id' | 'companyName' | 'message' | 'status'>;

export class ChannelPartner extends Model<ChannelPartnerAttributes, ChannelPartnerCreationAttributes> implements ChannelPartnerAttributes {
  public id!: number;
  public fullName!: string;
  public companyName!: string;
  public email!: string;
  public phone!: string;
  public city!: string;
  public message!: string;
  public status!: string;
}

ChannelPartner.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING(150), allowNull: false },
    companyName: { type: DataTypes.STRING(200), allowNull: true, defaultValue: '' },
    email: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(30), allowNull: false },
    city: { type: DataTypes.STRING(150), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
    status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'new' },
  },
  { sequelize, tableName: 'channel_partners', modelName: 'ChannelPartner' }
);
