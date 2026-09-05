import { Request, Response } from 'express';
import {
  Service,
  Project,
  TeamMember,
  Testimonial,
  JobOpening,
  ContactMessage,
  ChannelPartner,
  JobApplication,
  GroupCompany,
} from '../models';

// Generic factory to keep this file short: builds list/create/update/delete handlers for a model.
function crudFor(model: any) {
  return {
    list: async (_req: Request, res: Response) => {
      const items = await model.findAll({ order: [['id', 'DESC']] });
      res.json(items);
    },
    create: async (req: Request, res: Response) => {
      const item = await model.create(req.body);
      res.status(201).json(item);
    },
    update: async (req: Request, res: Response) => {
      const item = await model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.update(req.body);
      res.json(item);
    },
    remove: async (req: Request, res: Response) => {
      const item = await model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      res.status(204).send();
    },
  };
}

export const servicesAdmin = crudFor(Service);
export const projectsAdmin = crudFor(Project);
export const teamAdmin = crudFor(TeamMember);
export const testimonialsAdmin = crudFor(Testimonial);
export const jobsAdmin = crudFor(JobOpening);
export const groupCompaniesAdmin = crudFor(GroupCompany);

// Submissions are read/update-status only (never created by admins)
export async function listContactMessages(_req: Request, res: Response) {
  res.json(await ContactMessage.findAll({ order: [['id', 'DESC']] }));
}
export async function updateContactStatus(req: Request, res: Response) {
  const item = await ContactMessage.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.update({ status: req.body.status });
  res.json(item);
}

export async function listChannelPartnerLeads(_req: Request, res: Response) {
  res.json(await ChannelPartner.findAll({ order: [['id', 'DESC']] }));
}
export async function updateChannelPartnerStatus(req: Request, res: Response) {
  const item = await ChannelPartner.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.update({ status: req.body.status });
  res.json(item);
}

export async function listJobApplications(_req: Request, res: Response) {
  res.json(await JobApplication.findAll({ order: [['id', 'DESC']] }));
}
export async function updateJobApplicationStatus(req: Request, res: Response) {
  const item = await JobApplication.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.update({ status: req.body.status });
  res.json(item);
}

export async function dashboardStats(_req: Request, res: Response) {
  const [services, projects, team, contacts, partners, applications] = await Promise.all([
    Service.count(),
    Project.count(),
    TeamMember.count(),
    ContactMessage.count({ where: { status: 'new' } }),
    ChannelPartner.count({ where: { status: 'new' } }),
    JobApplication.count({ where: { status: 'new' } }),
  ]);
  res.json({ services, projects, team, newContacts: contacts, newPartnerLeads: partners, newApplications: applications });
}
