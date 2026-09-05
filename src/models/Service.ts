import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ServiceSubItem {
  title: string;
  text: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

interface ServiceAttributes {
  id: number;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  heroImage: string;
  highlights: string[];
  order: number;
  active: boolean;

  // Rich detail-page content
  heroTagline: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutChecklist: string[];
  aboutImages: string[];
  subServicesTitle: string;
  subServices: ServiceSubItem[];
  processTitle: string;
  processSteps: ServiceSubItem[];
  whyChooseTitle: string;
  whyChoose: ServiceSubItem[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaText: string;
}

type ServiceCreationAttributes = Optional<
  ServiceAttributes,
  | 'id'
  | 'order'
  | 'active'
  | 'highlights'
  | 'heroTagline'
  | 'aboutTitle'
  | 'aboutParagraphs'
  | 'aboutChecklist'
  | 'aboutImages'
  | 'subServicesTitle'
  | 'subServices'
  | 'processTitle'
  | 'processSteps'
  | 'whyChooseTitle'
  | 'whyChoose'
  | 'faqs'
  | 'ctaTitle'
  | 'ctaText'
>;

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public slug!: string;
  public title!: string;
  public icon!: string;
  public summary!: string;
  public description!: string;
  public heroImage!: string;
  public highlights!: string[];
  public order!: number;
  public active!: boolean;

  public heroTagline!: string;
  public aboutTitle!: string;
  public aboutParagraphs!: string[];
  public aboutChecklist!: string[];
  public aboutImages!: string[];
  public subServicesTitle!: string;
  public subServices!: ServiceSubItem[];
  public processTitle!: string;
  public processSteps!: ServiceSubItem[];
  public whyChooseTitle!: string;
  public whyChoose!: ServiceSubItem[];
  public faqs!: ServiceFaq[];
  public ctaTitle!: string;
  public ctaText!: string;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    slug: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    icon: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'fa-solid fa-building' },
    summary: { type: DataTypes.STRING(400), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    heroImage: { type: DataTypes.STRING(300), allowNull: false, defaultValue: '' },
    highlights: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

    heroTagline: { type: DataTypes.STRING(400), allowNull: false, defaultValue: '' },
    aboutTitle: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    aboutParagraphs: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    aboutChecklist: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    aboutImages: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    subServicesTitle: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    subServices: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    processTitle: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    processSteps: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    whyChooseTitle: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    whyChoose: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    faqs: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    ctaTitle: { type: DataTypes.STRING(200), allowNull: false, defaultValue: '' },
    ctaText: { type: DataTypes.STRING(400), allowNull: false, defaultValue: '' },
  },
  { sequelize, tableName: 'services', modelName: 'Service' }
);