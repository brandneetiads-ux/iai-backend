import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface JobOpeningAttributes {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  active: boolean;
}

type JobOpeningCreationAttributes = Optional<JobOpeningAttributes, 'id' | 'active' | 'requirements'>;

export class JobOpening extends Model<JobOpeningAttributes, JobOpeningCreationAttributes> implements JobOpeningAttributes {
  public id!: number;
  public title!: string;
  public department!: string;
  public location!: string;
  public type!: string;
  public description!: string;
  public requirements!: string[];
  public active!: boolean;
}

JobOpening.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    department: { type: DataTypes.STRING(150), allowNull: false },
    location: { type: DataTypes.STRING(150), allowNull: false, defaultValue: 'Lucknow, India' },
    type: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'Full-time' },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    requirements: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: 'job_openings', modelName: 'JobOpening' }
);