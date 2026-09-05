import { Request, Response } from 'express';
import { Service, Project, GroupCompany, TeamMember, Testimonial, JobOpening } from '../models';

// ---- Services ----
export async function listServices(req: Request, res: Response) {
  const services = await Service.findAll({ where: { active: true }, order: [['order', 'ASC']] });
  res.json(services);
}

export async function getServiceBySlug(req: Request, res: Response) {
  const service = await Service.findOne({ where: { slug: req.params.slug, active: true } });
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
}

// ---- Projects ----
export async function listProjects(req: Request, res: Response) {
  const { category, featured } = req.query;
  const where: any = {};
  if (category) where.category = category;
  if (featured === 'true') where.featured = true;
  const projects = await Project.findAll({ where, order: [['id', 'DESC']] });
  res.json(projects);
}

export async function getProjectBySlug(req: Request, res: Response) {
  const project = await Project.findOne({ where: { slug: req.params.slug } });
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}

export async function listProjectCategories(req: Request, res: Response) {
  const projects = await Project.findAll({ attributes: ['category'] });
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  res.json(categories);
}

// ---- Group companies ----
export async function listGroupCompanies(req: Request, res: Response) {
  const companies = await GroupCompany.findAll({ order: [['order', 'ASC']] });
  res.json(companies);
}

// ---- Team ----
export async function listTeam(req: Request, res: Response) {
  const team = await TeamMember.findAll({ order: [['order', 'ASC']] });
  res.json(team);
}

// ---- Testimonials ----
export async function listTestimonials(req: Request, res: Response) {
  const testimonials = await Testimonial.findAll({ where: { approved: true }, order: [['id', 'DESC']] });
  res.json(testimonials);
}

// ---- Careers ----
export async function listJobOpenings(req: Request, res: Response) {
  const jobs = await JobOpening.findAll({ where: { active: true }, order: [['id', 'DESC']] });
  res.json(jobs);
}

export async function getJobById(req: Request, res: Response) {
  const job = await JobOpening.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job opening not found' });
  res.json(job);
}
