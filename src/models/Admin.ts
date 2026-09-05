import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface AdminAttributes {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

type AdminCreationAttributes = Optional<AdminAttributes, 'id' | 'role'>;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public name!: string;
  public role!: string;
}

Admin.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING(300), allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
    role: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'admin' },
  },
  { sequelize, tableName: 'admins', modelName: 'Admin' }
);
