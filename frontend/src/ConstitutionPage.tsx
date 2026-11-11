import { useState } from 'react'

const articles = [
  {
    number: '01',
    title: 'Name and Location',
    content: [
      { sub: '1.1 Name', text: 'The name of the Community Based Organization shall be The Incubator Platform, hereinafter referred to as TIP.' },
      { sub: '1.2 Location', text: 'The CBO shall be based in Langata Sub-County, Nairobi County, and shall operate within this jurisdiction and surrounding areas as necessary.' },
    ],
  },
  {
    number: '02',
    title: 'Purpose of the Constitution',
    content: [
      { sub: '', text: 'The purpose of the constitution is to form a legal association between the members, the community, partners and other associated organizations. TIP is a non-profit organization, grounded in the spirit of community service in tandem with our mission and vision statements, and in line with our objectives, powered by our core values.' },
    ],
  },
  {
    number: '04',
    title: 'Area of Operation',
    content: [
      { sub: '', text: 'TIP shall operate within Langata Sub-County as its primary area, with exemptions for extended projects through partnerships and capacity-building activities.' },
    ],
  },
  {
    number: '05',
    title: 'Core Values and Code of Conduct',
    content: [
      { sub: '5.1 Core Values', text: 'Integrity, transparency, accountability, respect for diversity, and sustainability.' },
      { sub: '5.2 Code of Conduct', text: 'Members shall act with integrity, transparency, and accountability; respect diversity and inclusion; avoid conflicts of interest; protect organizational resources; maintain confidentiality; and promote environmental conservation. Violations may result in disciplinary action including suspension or expulsion.' },
    ],
  },
  {
    number: '06',
    title: 'Membership',
    content: [
      { sub: '6.1 Categories', text: 'Ordinary Members · Associate Members · Honorary Members' },
      { sub: '6.2 Eligibility', text: 'Open to all supportive persons aged 18 and above, residing in Kenya or approved abroad. Applications are made in writing and vetted by the Board.' },
      { sub: '6.3 Fees', text: "Registration fee: KES 1,000. Payable via cash, M-Pesa, or bank. Members pay contributions as determined by the Board." },
      { sub: '6.4 Cessation', text: 'Membership ceases due to resignation, failure to pay fees, death or incapacitation, or disciplinary expulsion.' },
    ],
  },
  {
    number: '07',
    title: 'Organization Structure and Governance',
    content: [
      { sub: '7.1 Organs', text: 'General Meeting · Board · Sub-committees' },
      { sub: '7.2 Board Composition', text: 'Seven members: Chairperson, Deputy Chairperson, Secretary General, Administrative Secretary, Treasurer, Gender & Inclusion Officer, and Climate Action Coordinator.' },
      { sub: '7.3 Meetings', text: 'Quarterly, with a quorum of 4 members.' },
      { sub: '7.4 Board Powers', text: 'Vet members · Make decisions on behalf of TIP · Manage resources · Lead official meetings and engagements · Perform assigned responsibilities.' },
    ],
  },
  {
    number: '08',
    title: 'Privileges and Responsibilities',
    content: [
      { sub: '8.1 Member Rights', text: 'Access to trainings and workshops · Priority for tasks and opportunities · Networking and job links · Dividends from income projects · Celebrations policy for events · Bereavement support.' },
      { sub: '8.2 Responsibilities', text: 'Uphold the constitution and values · Participate actively · Participate in democratic processes.' },
    ],
  },
  {
    number: '10',
    title: 'General Meetings',
    content: [
      { sub: '10.1 AGM', text: '14-day notice, held annually. Quorum: one-third of members.' },
      { sub: '10.2 SGM / EGM', text: '7-day notice. Convened by the Chairperson or one-third of members.' },
      { sub: '10.3 Procedure', text: 'Decisions require a two-thirds quorum. One vote per member; Chairperson holds the tie-breaking vote.' },
    ],
  },
  {
    number: '11',
    title: 'Finances',
    content: [
      { sub: '11.1 Sources', text: 'Membership fees · Grants and donations · Income-generating activities · Other legal sources.' },
      { sub: '11.2 Management', text: "Managed by the Treasurer and Board. Funds used only for organizational purposes. Bank accounts held in TIP's name. Two signatories required from: Chairperson, Secretary General, Treasurer." },
    ],
  },
  {
    number: '12',
    title: 'Dissolution',
    content: [
      { sub: '12.1 Procedure', text: 'Dissolution requires a two-thirds vote with a quorum above 67%.' },
      { sub: '12.2 Assets', text: 'Remaining assets are transferred to similar organizations and are not distributed to members.' },
    ],
  },
  {
    number: '13',
    title: 'Amendment',
    content: [
      { sub: '', text: 'Amendments require a written proposal, 28-day notice to all members, and a two-thirds majority vote at a general meeting.' },
    ],
  },
  {
    number: '14',
    title: 'General Provisions',
    content: [
      { sub: '', text: 'TIP is non-partisan, non-sectarian, and non-discriminatory. The organization must comply with all applicable laws. Official languages: English and Kiswahili. The official seal is kept by the Administrative Secretary.' },
    ],
  },
]

const boardRoles = [
  { role: 'Chairperson', duties: 'Chairs meetings, signs official documents, acts as primary spokesperson.' },
  { role: 'Deputy Chairperson', duties: 'Assists the Chairperson and coordinates sub-committees.' },
  { role: 'Secretary General', duties: 'Operational head, leads partnerships, mobilization, and external communications.' },
  { role: 'Administrative Secretary', duties: 'Manages administration, records, notices, and meeting minutes.' },
  { role: 'Treasurer', duties: 'Financial reporting, managing organizational funds, and serving as signatory.' },
  { role: 'Gender & Inclusion Officer', duties: 'Promotes equality and inclusion across all programs.' },
  { role: 'Climate Action Coordinator', duties: 'Manages climate programs, partnerships, and documentation.' },
]

const goals = [
  { letter: 'A', title: 'Youth Empowerment', desc: 'Equip youth with skills, knowledge, and opportunities through workshops, mentorship, and youth-led local projects.' },
  { letter: 'B', title: 'Environmental Sustainability', desc: 'Promote eco-friendly practices, conservation, clean-up drives, tree planting, and eco-tourism initiatives.' },
  { letter: 'C', title: 'Economic Sustainability', desc: 'Encourage sustainable business practices, green entrepreneurship, and partnerships for economic development.' },
  { letter: 'D', title: 'Public Health', desc: 'Enhance awareness and access to healthcare through awareness campaigns and provider partnerships.' },
]

function ArticleAccordion({ article }: { article: (typeof articles)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid var(--color-rule)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-6 py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-ochre)', letterSpacing: '0.1em', paddingTop: '0.15rem', flexShrink: 0, minWidth: '2.2rem' }}>
          {article.number}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-ink)', flex: 1 }}>
          {article.title}
        </span>
        <span style={{ color: 'var(--color-mist)', fontSize: '1rem', transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          +
        </span>
      </button>
      {open && (
        <div style={{ paddingLeft: '3.2rem', paddingBottom: '1.5rem' }}>
          {article.content.map((c, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              {c.sub && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--color-mist)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  {c.sub}
                </p>
              )}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-ink)', fontWeight: 300, maxWidth: '56ch' }}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ConstitutionPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ backgroundColor: 'var(--color-parchment)', minHeight: '100vh' }}>

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--color-rule)', backgroundColor: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(8px)', padding: '1.1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C4 1 2 3 2 5.5c0 3.5 5 7.5 5 7.5s5-4 5-7.5C12 3 10 1 7 1z" fill="#f5f0e8" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: 'var(--color-forest)' }}>TIP</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-mist)', letterSpacing: '0.08em', marginLeft: '0.25rem' }}>The Incubator Platform</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-ochre)' }}>
            Constitution · Adopted 28 Oct 2025
          </span>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid var(--color-rule)', padding: '0.45rem 1rem', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mist)', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-forest)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-rule)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-mist)' }}
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '88vh', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ padding: '6rem 4rem 4rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--color-rule)' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: '2rem' }}>
              Constitution · Adopted 28 Oct 2025 · Langata Sub-County, Nairobi
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--color-ink)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
              The<br />
              <em style={{ fontStyle: 'italic' }}>Incubator</em><br />
              Platform
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-mist)', fontWeight: 300, maxWidth: '42ch' }}>
              A community-based organization empowering the youth of Langata Sub-County as agents of environmental change, climate resilience, and sustainable futures.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem' }}>
            {[{ label: 'Founded', value: '2025' }, { label: 'Location', value: 'Nairobi' }, { label: 'Focus', value: 'Climate & Youth' }].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '0.25rem' }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--color-ink)' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-forest)' }}>
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=1100&fit=crop&auto=format"
            alt="Youth planting trees in a community green space in Nairobi"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.55, display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(45,80,22,0.3) 0%, rgba(45,80,22,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '1rem' }}>Preamble</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, color: 'rgba(245,240,232,0.9)', fontWeight: 300, maxWidth: '44ch' }}>
              "We, the youth and community members of Langata Sub-County, recognizing the urgent need to address climate change and its impacts on our communities, do hereby establish this organization to promote climate resilience, environmental sustainability, and youth development."
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ padding: '4rem', borderRight: '1px solid var(--color-rule)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '1.5rem' }}>Art. 3.1 — Vision</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 400, lineHeight: 1.25, color: 'var(--color-forest)', marginBottom: '1.5rem' }}>
            A thriving, resilient community where youth are empowered and the environment is protected.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-mist)', fontWeight: 300 }}>
            Economic opportunities are sustainable, and public health is accessible for all generations.
          </p>
        </div>
        <div style={{ padding: '4rem', backgroundColor: 'var(--color-parchment-dark)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-mist)', marginBottom: '1.5rem' }}>Art. 3.2 — Mission</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 400, lineHeight: 1.25, color: 'var(--color-ink)', marginBottom: '1.5rem' }}>
            Holistic community development through integration of youth, environment, economy, and health.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-mist)', fontWeight: 300 }}>
            Ensuring a healthier, more prosperous future for all generations through sustained, community-led action.
          </p>
        </div>
      </section>

      {/* Goals */}
      <section style={{ padding: '5rem 4rem', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: '0.75rem' }}>Article 3.3</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-ink)' }}>Goals</h2>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-mist)', fontWeight: 300, maxWidth: '35ch', textAlign: 'right' }}>
            Four interlocking pillars that guide TIP's programs and investments.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--color-rule)' }}>
          {goals.map((g, i) => (
            <div key={g.letter} style={{ padding: '2.5rem 2rem', borderRight: i < 3 ? '1px solid var(--color-rule)' : 'none', transition: 'background-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-parchment-dark)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
            >
              <div style={{ width: '40px', height: '40px', border: '1px solid var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', borderRadius: '50%' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontStyle: 'italic', color: 'var(--color-forest)' }}>{g.letter}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>{g.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--color-mist)', fontWeight: 300 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Governance */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ padding: '5rem 4rem', borderRight: '1px solid var(--color-rule)', backgroundColor: 'var(--color-forest)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '1.5rem' }}>Article 07 — 09</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.15, color: 'var(--color-parchment)', marginBottom: '2rem' }}>
            Governance &amp;<br /><em style={{ fontStyle: 'italic' }}>Board</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.65)', fontWeight: 300 }}>
            The Board comprises seven elected members who meet quarterly. A quorum of four is required for decisions.
          </p>
        </div>
        <div style={{ padding: '5rem 4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {boardRoles.map((br, i) => (
              <div key={br.role} style={{ padding: '1.75rem 0', borderBottom: i < boardRoles.length - 2 ? '1px solid var(--color-rule)' : 'none', paddingRight: i % 2 === 0 ? '2.5rem' : '0', paddingLeft: i % 2 === 1 ? '2.5rem' : '0', borderRight: i % 2 === 0 ? '1px solid var(--color-rule)' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: '0.5rem' }}>{String(i + 1).padStart(2, '0')}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: 'var(--color-ink)', marginBottom: '0.5rem' }}>{br.role}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.55, color: 'var(--color-mist)', fontWeight: 300 }}>{br.duties}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles accordion */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ padding: '5rem 4rem', borderRight: '1px solid var(--color-rule)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: '1.5rem' }}>Full Text</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, color: 'var(--color-ink)', marginBottom: '1.5rem' }}>
            Articles of<br /><em style={{ fontStyle: 'italic' }}>the Constitution</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--color-mist)', fontWeight: 300 }}>
            Select any article to expand its provisions. All articles were ratified at the founding general meeting on 28 October 2025.
          </p>
        </div>
        <div style={{ padding: '5rem 4rem' }}>
          {articles.map(article => <ArticleAccordion key={article.number} article={article} />)}
          <div style={{ borderTop: '1px solid var(--color-rule)' }} />
        </div>
      </section>

      {/* Adoption footer */}
      <footer style={{ padding: '5rem 4rem', backgroundColor: 'var(--color-ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: '1.5rem' }}>Article 15 — Adoption</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-parchment)', lineHeight: 1.2, marginBottom: '1rem' }}>
              Adopted in Nairobi<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-ochre-light)' }}>28 October 2025</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.5)', fontWeight: 300 }}>
              This constitution was duly adopted at the founding meeting of The Incubator Platform by the elected Board and founding members.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '1.5rem' }}>Signatories</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {boardRoles.map(br => (
                <div key={br.role} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(245,240,232,0.55)', fontWeight: 300, minWidth: '14rem' }}>{br.role}</span>
                  <div style={{ flex: 1, borderBottom: '1px solid rgba(200,191,168,0.25)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(200,191,168,0.15)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgba(90,140,48,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4 1 2 3 2 5.5c0 3.5 5 7.5 5 7.5s5-4 5-7.5C12 3 10 1 7 1z" fill="#5a8c30" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)' }}>
              ← Back to The Incubator Platform
            </span>
          </button>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(245,240,232,0.25)', letterSpacing: '0.05em' }}>
            Non-partisan · Non-sectarian · Non-discriminatory
          </p>
        </div>
      </footer>
    </div>
  )
}
