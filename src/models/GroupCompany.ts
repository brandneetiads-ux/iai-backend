import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface GroupCompanyAttributes {
  id: number;
  name: string;
  leaderName: string;
  logo: string;
  description: string;
  website: string;
  order: number;
}

type GroupCompanyCreationAttributes = Optional<GroupCompanyAttributes, 'id' | 'order' | 'description' | 'website'>;

export class GroupCompany extends Model<GroupCompanyAttributes, GroupCompanyCreationAttributes> implements GroupCompanyAttributes {
  public id!: number;
  public name!: string;
  public leaderName!: string;
  public logo!: string;
  public description!: string;
  public website!: string;
  public order!: number;
}

GroupCompany.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    leaderName: { type: DataTypes.STRING(150), allowNull: false },
    logo: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    description: { type: DataTypes.STRING(400), allowNull: false, defaultValue: '' },
    website: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, tableName: 'group_companies', modelName: 'GroupCompany' }
);