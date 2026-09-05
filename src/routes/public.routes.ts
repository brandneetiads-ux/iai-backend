import { Router } from 'express';
import * as ctrl from '../controllers/publicController';

const router = Router();

router.get('/services', ctrl.listServices);
router.get('/services/:slug', ctrl.getServiceBySlug);

router.get('/projects', ctrl.listProjects);
router.get('/projects/categories', ctrl.listProjectCategories);
router.get('/projects/:slug', ctrl.getProjectBySlug);

router.get('/group-companies', ctrl.listGroupCompanies);
router.get('/team', ctrl.listTeam);
router.get('/testimonials', ctrl.listTestimonials);

router.get('/careers', ctrl.listJobOpenings);
router.get('/careers/:id', ctrl.getJobById);

export default router;
