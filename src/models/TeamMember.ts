import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TeamMemberAttributes {
  id: number;
  name: string;
  position: string;
  department: string;
  photo: string;
  bio: string;
  linkedin: string;
  order: number;
}

type TeamMemberCreationAttributes = Optional<TeamMemberAttributes, 'id' | 'order' | 'bio' | 'linkedin'>;

export class TeamMember extends Model<TeamMemberAttributes, TeamMemberCreationAttributes> implements TeamMemberAttributes {
  public id!: number;
  public name!: string;
  public position!: string;
  public department!: string;
  public photo!: string;
  public bio!: string;
  public linkedin!: string;
  public order!: number;
}

TeamMember.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    position: { type: DataTypes.STRING(150), allowNull: false },
    department: { type: DataTypes.STRING(150), allowNull: false, defaultValue: '' },
    photo: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    bio: { type: DataTypes.STRING(500), allowNull: false, defaultValue: '' },
    linkedin: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, tableName: 'team_members', modelName: 'TeamMember' }
);