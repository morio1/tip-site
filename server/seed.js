// seed.js — populates the database with the content already on the site,
// so CRUD starts from real data instead of an empty database.
// Run with: npm run seed   (safe to re-run — it clears and reloads each table)

const db = require('./db');

const projects = [
  {
    tag: 'Environment', title: 'Green Langata Tree Drive',
    description: 'Planting 10,000 indigenous trees across Langata Sub-County parks, schools, and riparian zones by end of 2025.',
    status: 'Active', goal_kes: 450000, raised_pct: 62,
    image_url: 'https://images.unsplash.com/photo-1548522904-e5ab6cf5e09b?w=700&h=480&fit=crop&auto=format',
    image_alt: 'Community members gathering on a green field for a planting day',
  },
  {
    tag: 'Youth', title: 'Climate Skills Bootcamp',
    description: 'A 12-week intensive mentorship and skills program equipping 200 youth with green entrepreneurship and climate literacy.',
    status: 'Fundraising', goal_kes: 280000, raised_pct: 34,
    image_url: 'https://images.unsplash.com/photo-1630509866818-4c7be20bb76d?w=700&h=480&fit=crop&auto=format',
    image_alt: 'Youth participants seated in a workshop session outdoors',
  },
  {
    tag: 'Health', title: 'Clean Water for Schools',
    description: 'Installing rainwater harvesting systems and water filtration units in 6 primary schools across Langata.',
    status: 'Fundraising', goal_kes: 360000, raised_pct: 18,
    image_url: 'https://images.unsplash.com/photo-1616680214084-22670de1bc82?w=700&h=480&fit=crop&auto=format',
    image_alt: 'Volunteers working together on a community environmental project',
  },
  {
    tag: 'Economy', title: 'Solar Micro-Enterprise Hub',
    description: 'Establishing a solar-powered community workshop where members manufacture and sell eco-friendly products.',
    status: 'Seeking Partners', goal_kes: 620000, raised_pct: 8,
    image_url: 'https://images.unsplash.com/photo-1753881110611-00755160afd2?w=700&h=480&fit=crop&auto=format',
    image_alt: 'Solar panels mounted on a rural building',
  },
];

const partners = [
  { name: 'Nairobi County Government', type: 'Institutional' },
  { name: 'Kenya Forest Service', type: 'Government' },
  { name: 'UN Environment Programme', type: 'International' },
  { name: 'Local Community Saccos', type: 'Finance' },
  { name: 'Strathmore University', type: 'Academic' },
  { name: 'Safaricom Foundation', type: 'Corporate' },
];

const gallery = [
  { image_url: 'https://images.unsplash.com/photo-1515657834497-26509e295154?w=600&h=700&fit=crop&auto=format', image_alt: 'Community celebration at a cultural gathering', is_tall: 1 },
  { image_url: 'https://images.unsplash.com/photo-1547496614-99b29879c916?w=600&h=380&fit=crop&auto=format', image_alt: 'Children learning inside a community education space', is_tall: 0 },
  { image_url: 'https://images.unsplash.com/photo-1535090467336-9501f96eef89?w=600&h=380&fit=crop&auto=format', image_alt: 'Hands working the earth in a community garden', is_tall: 0 },
  { image_url: 'https://images.unsplash.com/photo-1547496614-d145e2fa88ed?w=600&h=380&fit=crop&auto=format', image_alt: 'Three smiling boys from the Langata community', is_tall: 0 },
  { image_url: 'https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?w=600&h=480&fit=crop&auto=format', image_alt: 'Volunteers on a beach clean-up drive', is_tall: 0 },
  { image_url: 'https://images.unsplash.com/photo-1615992955236-ec38cbfc6fe2?w=600&h=480&fit=crop&auto=format', image_alt: 'A line of flourishing green plants along a roadside', is_tall: 0 },
];

const tiers = [
  {
    tier: 'Ordinary Member', fee: 'KES 1,000', period: 'one-time registration',
    perks: ['Access to all workshops & trainings', 'Priority for project roles', 'Networking & job opportunities', 'Dividends from income projects', 'Bereavement & celebration support'],
    cta: 'Join as Member', modal_mode: 'join', highlight: 0,
  },
  {
    tier: 'Partner Organisation', fee: 'Flexible MOU', period: 'annual partnership',
    perks: ['Co-design community projects', 'Co-branding on all TIP materials', 'Access to our youth talent pool', 'Joint grant applications', 'Quarterly impact reporting'],
    cta: 'Become a Partner', modal_mode: 'partner', highlight: 1,
  },
  {
    tier: 'Project Sponsor', fee: 'From KES 50,000', period: 'per project',
    perks: ['Full project naming rights', 'Dedicated impact report', 'Field visit invitation', 'Social media recognition', 'Certificate of contribution'],
    cta: 'Sponsor a Project', modal_mode: 'sponsor', highlight: 0,
  },
];

const stats = [
  { key: 'youth_reached', label: 'Youth Reached', value: '200+', scope: 'hero' },
  { key: 'active_projects', label: 'Active Projects', value: '4', scope: 'hero' },
  { key: 'trees_targeted', label: 'Trees Targeted', value: '10K', scope: 'hero' },
  { key: 'members', label: 'Members', value: '47', scope: 'impact' },
  { key: 'projects_completed', label: 'Projects Completed', value: '3', scope: 'impact' },
  { key: 'partner_orgs', label: 'Partner Orgs', value: '6', scope: 'impact' },
  { key: 'sub_county', label: 'Sub-County', value: 'Langata', scope: 'impact' },
];

function run() {
  if (process.argv.includes('--if-empty')) {
    const count = db.prepare('SELECT COUNT(*) AS n FROM projects').get().n;
    if (count > 0) {
      console.log('✓ Database already has data — skipping seed (run "npm run seed" to force-reset).');
      return;
    }
  }

  const insertProject = db.prepare(`
    INSERT INTO projects (tag, title, description, status, goal_kes, raised_pct, image_url, image_alt, sort_order)
    VALUES (@tag, @title, @description, @status, @goal_kes, @raised_pct, @image_url, @image_alt, @sort_order)
  `);
  const insertPartner = db.prepare(`INSERT INTO partners (name, type, sort_order) VALUES (@name, @type, @sort_order)`);
  const insertGallery = db.prepare(`INSERT INTO gallery (image_url, image_alt, is_tall, sort_order) VALUES (@image_url, @image_alt, @is_tall, @sort_order)`);
  const insertTier = db.prepare(`
    INSERT INTO membership_tiers (tier, fee, period, perks, cta, modal_mode, highlight, sort_order)
    VALUES (@tier, @fee, @period, @perks, @cta, @modal_mode, @highlight, @sort_order)
  `);
  const insertStat = db.prepare(`INSERT OR REPLACE INTO site_stats (key, label, value, scope) VALUES (@key, @label, @value, @scope)`);

  const seedAll = db.transaction(() => {
    db.exec('DELETE FROM projects; DELETE FROM partners; DELETE FROM gallery; DELETE FROM membership_tiers;');

    projects.forEach((p, i) => insertProject.run({ ...p, sort_order: i }));
    partners.forEach((p, i) => insertPartner.run({ ...p, sort_order: i }));
    gallery.forEach((g, i) => insertGallery.run({ ...g, sort_order: i }));
    tiers.forEach((t, i) => insertTier.run({ ...t, perks: JSON.stringify(t.perks), sort_order: i }));
    stats.forEach((s) => insertStat.run(s));
  });

  seedAll();
  console.log('✓ Seeded projects, partners, gallery, membership_tiers, site_stats.');
}

run();
