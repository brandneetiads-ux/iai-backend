import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as admin from '../controllers/adminController';

const router = Router();
router.use(requireAuth);

router.get('/stats', admin.dashboardStats);

router.get('/services', admin.servicesAdmin.list);
router.post('/services', admin.servicesAdmin.create);
router.put('/services/:id', admin.servicesAdmin.update);
router.delete('/services/:id', admin.servicesAdmin.remove);

router.get('/projects', admin.projectsAdmin.list);
router.post('/projects', admin.projectsAdmin.create);
router.put('/projects/:id', admin.projectsAdmin.update);
router.delete('/projects/:id', admin.projectsAdmin.remove);

router.get('/team', admin.teamAdmin.list);
router.post('/team', admin.teamAdmin.create);
router.put('/team/:id', admin.teamAdmin.update);
router.delete('/team/:id', admin.teamAdmin.remove);

router.get('/testimonials', admin.testimonialsAdmin.list);
router.post('/testimonials', admin.testimonialsAdmin.create);
router.put('/testimonials/:id', admin.testimonialsAdmin.update);
router.delete('/testimonials/:id', admin.testimonialsAdmin.remove);

router.get('/careers', admin.jobsAdmin.list);
router.post('/careers', admin.jobsAdmin.create);
router.put('/careers/:id', admin.jobsAdmin.update);
router.delete('/careers/:id', admin.jobsAdmin.remove);

router.get('/group-companies', admin.groupCompaniesAdmin.list);
router.post('/group-companies', admin.groupCompaniesAdmin.create);
router.put('/group-companies/:id', admin.groupCompaniesAdmin.update);
router.delete('/group-companies/:id', admin.groupCompaniesAdmin.remove);

router.get('/contact-messages', admin.listContactMessages);
router.patch('/contact-messages/:id/status', admin.updateContactStatus);

router.get('/channel-partner-leads', admin.listChannelPartnerLeads);
router.patch('/channel-partner-leads/:id/status', admin.updateChannelPartnerStatus);

router.get('/job-applications', admin.listJobApplications);
router.patch('/job-applications/:id/status', admin.updateJobApplicationStatus);

export default router;
