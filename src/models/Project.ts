import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ProjectAttributes {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  client: string;
  heroImage: string;
  gallery: string[];
  description: string;
  scope: string[];
  featured: boolean;
}

type ProjectCreationAttributes = Optional<ProjectAttributes, 'id' | 'featured' | 'gallery' | 'scope'>;

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public slug!: string;
  public title!: string;
  public category!: string;
  public location!: string;
  public year!: string;
  public area!: string;
  public client!: string;
  public heroImage!: string;
  public gallery!: string[];
  public description!: string;
  public scope!: string[];
  public featured!: boolean;
}

Project.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: false },
    location: { type: DataTypes.STRING(150), allowNull: false },
    year: { type: DataTypes.STRING(50), allowNull: false },
    area: { type: DataTypes.STRING(100), allowNull: true },
    client: { type: DataTypes.STRING(200), allowNull: true },
    heroImage: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    gallery: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    scope: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  { sequelize, tableName: 'projects', modelName: 'Project' }
);
