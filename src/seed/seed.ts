import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { sequelize } from '../config/database';
import {
  Service,
  Project,
  GroupCompany,
  TeamMember,
  Testimonial,
  JobOpening,
  Admin,
} from '../models';

dotenv.config();

const servicesData = [
  {
    slug: 'interior-design',
    title: 'Interior Design',
    icon: 'fa-solid fa-couch',
    summary: 'From concept to final styling, IAI Group crafts refined interiors for homes, offices, hotels and healthcare spaces — blending premium materials, thoughtful space planning and flawless execution.',
    description:
      "IAI Group delivers luxury residential, commercial, hospitality, healthcare and retail interiors under one accountable team — from the first concept sketch through 3D visualization, material selection and final styling. Every project is led by experienced designers and project managers who bring precision, premium materials and a genuine sense of craft to every space we touch.",
    heroImage: 'images/interior.jpeg',
    order: 1,
    highlights: ['Residential Interiors', 'Luxury Villas', 'Corporate Offices', 'Commercial Spaces', 'Hotels & Resorts', 'Restaurants & Cafes', 'Healthcare Interiors', 'Retail Showrooms'],
  },
  {
    slug: 'construction',
    title: 'Construction',
    icon: 'fa-solid fa-helmet-safety',
    summary: 'From residential builds to large-scale commercial and institutional projects, IAI Group delivers construction backed by strong engineering, skilled workforce and unwavering quality standards.',
    description:
      'IAI Group builds residential, commercial, industrial and institutional structures with a single accountable team — from site survey and structural engineering through to final handover. Every project is led by experienced engineers and site supervisors, backed by rigorous safety protocols and quality-tested materials on every build.',
    heroImage: 'images/construction-site.jpg',
    order: 2,
    highlights: ['Residential Construction', 'Commercial Construction', 'Industrial Construction', 'Hospital Construction', 'Educational Buildings', 'Warehouse Construction', 'Renovation & Retrofitting', 'Structural Engineering'],
  },
  {
    slug: 'turnkey-projects',
    title: 'Turnkey Projects',
    icon: 'fa-solid fa-key',
    summary: "From the first sketch to the final key handover, IAI Group manages design, approvals, construction and interiors under a single accountable team — so you deal with one point of contact, not ten.",
    description:
      "Turnkey execution means you work with a single team from concept to completion — architects, engineers, interior designers and site teams, all under one roof, one contract and one accountable partner. No coordination gaps between contractors, no blame-shifting — just a clear plan, tracked progress and a space that's ready to walk into on handover day.",
    heroImage: 'images/25.jpeg',
    order: 3,
    highlights: ['Architectural Design', 'Construction', 'Interior Fit-Out', 'MEP & Electrical', 'Approvals & Documentation', 'Single-Point Project Management', '3D Visualization', 'Ready-To-Move Handover'],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    icon: 'fa-solid fa-city',
    summary: 'With two decades of market expertise, IAI Group develops premium residential and commercial real estate designed for long-term value, quality construction and genuine livability.',
    description:
      "IAI Group's real estate division brings the same construction rigor and design quality that built our reputation, applied to residential and commercial development across India and the Gulf. From site selection to final sale, every development is guided by transparent processes, quality construction and a genuine focus on long-term value for owners and investors.",
    heroImage: 'images/rise.png',
    order: 4,
    highlights: ['Residential Development', 'Commercial Development', 'Land & Site Selection', 'Legal & Documentation', 'Investment Advisory', 'Property Management', 'Sales & Marketing', 'Turnkey Handover'],
  },
  {
    slug: 'commercial-projects',
    title: 'Commercial Projects',
    icon: 'fa-solid fa-briefcase',
    summary: 'Offices, retail, showrooms and mixed-use developments — IAI Group builds commercial spaces engineered for productivity, brand impact and long-term business growth.',
    description:
      'From corporate offices to retail showrooms, IAI Group designs and builds commercial spaces that balance functionality, brand identity and long-term durability. Our commercial projects are led by experienced engineers and designers who understand that every square foot needs to earn its place — for productivity, for customers, and for the bottom line.',
    heroImage: 'images/comme.jpeg',
    order: 5,
    highlights: ['Corporate Offices', 'Retail & Showrooms', 'Mixed-Use Developments', 'Warehousing & Logistics', 'Commercial Interiors', 'Architectural Design', 'Project Management', 'Turnkey Delivery'],
  },
  {
    slug: 'residential-projects',
    title: 'Residential Projects',
    icon: 'fa-solid fa-house-chimney',
    summary: "From luxury villas to gated community homes, IAI Group builds residences that balance comfort, elegance and lasting quality — designed and built around your family's needs.",
    description:
      "IAI Group designs and builds residential spaces — from individual villas to gated communities and high-rise apartments — with the same construction discipline behind our commercial work. Every home is planned around real family life: layout, light, materials and finishes chosen for comfort as much as for aesthetics.",
    heroImage: 'images/resi.jpeg',
    order: 6,
    highlights: ['Luxury Villas', 'Apartments', 'Gated Communities', 'Farmhouses', 'Residential Interiors', 'Modular Kitchens', 'Architectural Design', 'Turnkey Handover'],
  },
  {
    slug: 'builders',
    title: 'Builders',
    icon: 'fa-solid fa-trowel-bricks',
    summary: 'IAI Group brings together skilled tradespeople and experienced site teams to deliver builds of every scale — from foundation to finish.',
    description:
      "Behind every IAI Group project is a full-service building team — civil workers, electricians, plumbers, carpenters and finishing specialists, all coordinated under one site management structure. Whether it's a single room renovation or a large-scale build, our builders bring the same discipline, safety standards and craftsmanship to every job.",
    heroImage: 'images/2.jpeg',
    order: 7,
    highlights: ['Civil Work', 'Electrical Work', 'Plumbing', 'Carpentry & Joinery', 'Ironwork & Fabrication', 'Painting & Finishing', 'Site Supervision', 'Renovation & Repairs'],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality',
    icon: 'fa-solid fa-bed',
    summary: 'IAI Group designs and builds hotels, restaurants and cafes with an atmosphere-first approach — where every detail shapes the guest experience.',
    description:
      'From boutique restaurants to full-scale hotel interiors, IAI Group brings design sensibility and flawless execution to hospitality spaces that need to perform under real guest traffic. Our hospitality projects span India and the Gulf, including collaborations on distinctive concepts like Barkaas Indo-Arabic Restaurants and Bawarchi Restaurant.',
    heroImage: 'images/hospi.png',
    order: 8,
    highlights: ['Hotels & Resorts', 'Restaurants', 'Cafes & Lounges', 'Bars & Rooftop Venues', 'Guest Rooms & Suites', 'Commercial Kitchens', 'Banquet & Event Spaces', 'Spa & Wellness Interiors'],
  },
  {
    slug: 'healthcare-projects',
    title: 'Healthcare Projects',
    icon: 'fa-solid fa-hospital',
    summary: 'IAI Group designs and constructs healthcare facilities that meet rigorous hygiene, safety and functional standards — from clinics to full-scale hospitals.',
    description:
      'Healthcare construction demands a different level of precision — from infection control to specialized MEP systems. IAI Group brings dedicated expertise to every hospital and clinic project. Our healthcare projects include turnkey delivery for facilities like Asian Hospital and complete lab interiors, built to meet international quality standards.',
    heroImage: 'images/asian.jpeg',
    order: 9,
    highlights: ['Hospital Construction', 'Clinics & Diagnostic Centers', 'Lab Interiors', 'ICU & Critical Care Units', 'Medical Colleges', 'HVAC & Air Handling', 'Infection Control Design', 'Diagnostic Imaging Rooms'],
  },
];

const groupCompaniesData = [
  { name: 'WAK Interiors', leaderName: 'Mr. Ahmed Khan', logo: 'images/WAk.png', description: 'Premium interior design solutions for modern living & workspaces.', website: 'https://www.wakinterior.com', order: 1 },
   { name: 'IAI Construction', leaderName: 'Mr. Ahmed Khan', logo: 'images/iai-logo.png', description: 'Building dreams into reality — construction & turnkey excellence.', website: 'https://www.iaigroup.in', order: 2 },
  { name: 'BrandNeeti Advertising', leaderName: 'Mr. Asarar Ahamad', logo: 'images/BrandNeeti.png', description: 'Strategic branding & digital marketing solutions to grow your business.', website: 'https://www.brandneetiads.com', order: 3 },
  { name: 'IndoWorld Entertainment', leaderName: 'Mr. Himanshu Pandey', logo: 'images/indo.png', description: 'Entertainment, media & creative productions for a digital tomorrow.', website: 'https://www.indotv.org', order: 4 },
];

const teamData = [
  { name: 'Wakeel Ahmed Khan', position: 'Director', department: 'Group Leadership', photo: 'images/wakeel.png', bio: 'Director of BrandNeeti and part of IAI Group\'s core leadership.', order: 1 },
  { name: 'Mr. Ahmed Khan', position: 'Director', department: 'WAK Interiors', photo: 'images/WAk.png', bio: 'Leads WAK Interiors, the group\'s interior design studio.', order: 2 },
  { name: 'Mr. Asarar Ahamad', position: 'Director', department: 'BrandNeeti Advertising Solutions Co.', photo: 'images/BrandNeeti.png', bio: 'Leads the group\'s branding and advertising division.', order: 3 },
  { name: 'Mr. Bashir Ahmed', position: 'Director', department: 'IAI Construction', photo: 'images/iai-logo.png', bio: 'Leads IAI Construction, the group\'s construction arm.', order: 4 },
  { name: 'Mr. Himanshu Pandey', position: 'Director', department: 'IndoWorld Entertainment', photo: 'images/indo.png', bio: 'Leads IndoWorld Entertainment.', order: 5 },
];

const testimonialsData = [
  { clientName: 'Restaurant Owner', clientRole: 'Hospitality Client · Lucknow, India', message: 'IAI Group transformed our restaurant into a beautiful space. The design and quality exceeded our expectations — every detail was handled with genuine craftsmanship.', rating: 5 },
  { clientName: 'Facility Manager', clientRole: 'Commercial Client · Lucknow, India', message: "From planning to handover, the team's professionalism stood out. Our commercial space was delivered on time without compromising an inch on quality.", rating: 5 },
  { clientName: 'Restaurant Owner', clientRole: 'Hospitality Client · Lucknow, UP', message: 'The interior design team understood exactly what we wanted, even when we struggled to put it into words. The result exceeded our expectations.', rating: 5 },
  { clientName: 'Station Head', clientRole: 'Studio Client · Muscat, Oman', message: 'IAI Group delivered our studio interior with great acoustic planning and creative design. Professional from day one to final handover.', rating: 5 },
  { clientName: 'Director', clientRole: 'Corporate Client · Lucknow & Ajmer', message: 'Professional team with great ideas. Our office interior was completed on time with premium quality throughout.', rating: 5 },
  { clientName: 'Operations Manager', clientRole: 'Corporate Client · Muscat, Oman', message: 'Excellent experience working with IAI Group. Their dedication and project management are outstanding.', rating: 5 },
  { clientName: 'Hospital Administrator', clientRole: 'Healthcare Client · Lucknow, India', message: 'The hospital interiors were executed perfectly with proper planning and international hygiene standards.', rating: 5 },
  { clientName: 'Station Head', clientRole: 'Multi-City Studio Client · Lucknow, Bareilly, Kanpur & Aligarh', message: 'High quality work, exceptional and timely delivery across all four cities. Highly recommended!', rating: 5 },
  { clientName: 'Chief Executive Officer', clientRole: 'Corporate Client · Muscat, Oman', message: "A trusted partner for our commercial fit-out. IAI Group's attention to detail and timeline discipline stood out.", rating: 5 },
];

const jobsData = [
  {
    title: 'Senior Architect',
    department: 'Design',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Lead architectural design for residential, commercial and hospitality projects from concept through construction drawings.',
    requirements: ["Bachelor's/Master's in Architecture", '5+ years professional experience', 'Strong AutoCAD/Revit skills'],
  },
  {
    title: 'Civil Site Engineer',
    department: 'Construction',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Oversee day-to-day execution on active construction sites, coordinate with contractors and ensure quality/safety compliance.',
    requirements: ['B.Tech/Diploma in Civil Engineering', '3+ years site experience', 'Familiarity with MEP coordination'],
  },
  {
    title: 'Interior Design Lead',
    department: 'Design',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Lead a small design team, develop concepts, mood boards and working drawings for residential, hospitality and commercial fit-out projects.',
    requirements: ["Bachelor's in Interior Design/Architecture", '5+ years experience, 2+ leading a team', 'Proficiency in AutoCAD, SketchUp, 3ds Max'],
  },
  {
    title: 'Project Manager – Turnkey Projects',
    department: 'Project Management',
    location: 'PAN India',
    type: 'Full-time',
    description: 'Own end-to-end delivery of turnkey projects — design, procurement, construction and fit-out — as the single point of contact for clients.',
    requirements: ['Engineering or PM degree/certification (PMP a plus)', '7+ years managing turnkey/construction projects', 'Willingness to travel across India'],
  },
  {
    title: 'Business Development Executive',
    department: 'Sales & Partnerships',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: "Identify and develop new business opportunities across IAI Group's construction, interior and real estate divisions.",
    requirements: ['2+ years B2B sales experience', 'Strong communication skills', 'Real estate/construction sector experience preferred'],
  },
  {
    title: 'Quantity Surveyor',
    department: 'Construction',
    location: 'Lucknow, India',
    type: 'Full-time',
    description: 'Prepare cost estimates, BOQs and tender documents, and monitor project costs through to final account.',
    requirements: ['Degree/Diploma in Civil Engineering or Quantity Surveying', '3+ years QS experience', 'Strong MS Excel skills'],
  },
  {
    title: '3D Visualiser / Interior Designer',
    department: 'Design',
    location: 'Remote / Lucknow',
    type: 'Contract',
    description: 'Produce photorealistic 3D renders and walkthroughs for interior and architectural projects to support client presentations.',
    requirements: ['Proficiency in 3ds Max, V-Ray/Corona, Photoshop', 'Strong portfolio of interior/architectural renders', 'Ability to work to tight deadlines'],
  },
  {
    title: 'Site Supervisor',
    department: 'Construction',
    location: 'Multiple Locations',
    type: 'Full-time',
    description: 'Supervise daily site activities, labour and material coordination, and ensure work proceeds to drawings and schedule.',
    requirements: ['ITI/Diploma in Civil/related field', '3+ years supervisory experience', 'Willingness to relocate/travel between sites'],
  },
];

async function seed() {
  await sequelize.authenticate();
  console.log('[seed] Connected. Syncing schema...');
  await sequelize.sync({ alter: true });

  console.log('[seed] Seeding services...');
  for (const s of servicesData) {
    await Service.upsert(s as any);
  }

  console.log('[seed] Clearing old project rows so stale/removed projects and categories don\'t linger...');
  await Project.destroy({ where: {}, truncate: true });

  console.log('[seed] Seeding projects from real IAI Group project data...');
  const projectsJsonPath = path.join(__dirname, 'projects.json');
  const rawProjects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf-8'));
  let i = 0;
  for (const [slug, p] of Object.entries<any>(rawProjects)) {
    await Project.upsert({
      slug,
      title: p.title,
      category: p.cat,
      location: p.loc,
      year: p.year,
      area: p.area || '',
      client: p.client || '',
      heroImage: p.heroImg || '',
      gallery: p.gallery || [],
      description: p.description || '',
      scope: p.scope || [],
      featured: i < 6,
    } as any);
    i++;
  }

  console.log('[seed] Seeding group companies...');
  await GroupCompany.destroy({ where: {}, truncate: true });
  for (const g of groupCompaniesData) {
    await GroupCompany.upsert(g as any);
  }

  console.log('[seed] Seeding team members...');
  await TeamMember.destroy({ where: {}, truncate: true });
  for (const t of teamData) {
    await TeamMember.upsert(t as any);
  }

  console.log('[seed] Seeding testimonials...');
  await Testimonial.destroy({ where: {}, truncate: true });
  for (const t of testimonialsData) {
    await Testimonial.upsert(t as any);
  }

  console.log('[seed] Seeding job openings...');
  await JobOpening.destroy({ where: {}, truncate: true });
  for (const j of jobsData) {
    await JobOpening.upsert(j as any);
  }

  console.log('[seed] Seeding admin user...');
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@iaigroup.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'change_me_on_first_login';
  const existing = await Admin.findOne({ where: { email: adminEmail } });
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await Admin.create({ email: adminEmail, passwordHash, name: 'IAI Group Admin', role: 'admin' });
    console.log(`[seed] Admin created: ${adminEmail} (password set from .env ADMIN_PASSWORD)`);
  } else {
    console.log('[seed] Admin already exists, skipping.');
  }

  console.log('[seed] Done. Seeded', Object.keys(rawProjects).length, 'projects and', servicesData.length, 'services.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});