// One-time cleanup: run this BEFORE `npm run seed` if you've seeded more than
// once before and are seeing duplicate Group Companies / Team / Testimonials /
// Job Openings on the site.
//
// Usage (from the backend/ folder):
//   npx ts-node src/seed/dedupe.ts
//
// This uses the same DB connection as the rest of the app (reads backend/.env),
// so no psql or pgAdmin install is needed.

import { sequelize } from '../config/database';

async function run() {
  await sequelize.authenticate();
  console.log('[dedupe] connected to database');

  const queries: { label: string; sql: string }[] = [
    {
      label: 'group_companies',
      sql: `DELETE FROM group_companies a USING group_companies b
            WHERE a.id > b.id AND a.name = b.name;`,
    },
    {
      label: 'team_members',
      sql: `DELETE FROM team_members a USING team_members b
            WHERE a.id > b.id AND a.name = b.name;`,
    },
    {
      label: 'testimonials',
      sql: `DELETE FROM testimonials a USING testimonials b
            WHERE a.id > b.id AND a."clientName" = b."clientName";`,
    },
    {
      label: 'job_openings',
      sql: `DELETE FROM job_openings a USING job_openings b
            WHERE a.id > b.id AND a.title = b.title;`,
    },
  ];

  for (const q of queries) {
    const [, meta]: any = await sequelize.query(q.sql);
    console.log(`[dedupe] ${q.label}: removed ${meta?.rowCount ?? 0} duplicate row(s)`);
  }

  const tables = ['group_companies', 'team_members', 'testimonials', 'job_openings'];
  console.log('\n[dedupe] remaining row counts:');
  for (const t of tables) {
    const [rows]: any = await sequelize.query(`SELECT count(*) FROM ${t};`);
    console.log(`  ${t}: ${rows[0].count}`);
  }

  await sequelize.close();
  console.log('\n[dedupe] done. You can now run: npm run seed');
}

run().catch((err) => {
  console.error('[dedupe] failed:', err);
  process.exit(1);
});