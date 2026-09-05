import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface JobApplicationAttributes {
  id: number;
  jobId: number | null;
  fullName: string;
  email: string;
  phone: string;
  positionApplied: string;
  message: string;
  resumePath: string;
  status: string;
}

type JobApplicationCreationAttributes = Optional<JobApplicationAttributes, 'id' | 'jobId' | 'message' | 'resumePath' | 'status'>;

export class JobApplication extends Model<JobApplicationAttributes, JobApplicationCreationAttributes> implements JobApplicationAttributes {
  public id!: number;
  public jobId!: number | null;
  public fullName!: string;
  public email!: string;
  public phone!: string;
  public positionApplied!: string;
  public message!: string;
  public resumePath!: string;
  public status!: string;
}

JobApplication.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    jobId: { type: DataTypes.INTEGER, allowNull: true },
    fullName: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(30), allowNull: false },
    positionApplied: { type: DataTypes.STRING(150), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
    resumePath: { type: DataTypes.STRING(300), allowNull: true, defaultValue: '' },
    status: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'new' },
  },
  { sequelize, tableName: 'job_applications', modelName: 'JobApplication' }
);
