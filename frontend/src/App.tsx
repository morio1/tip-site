import { useState, useRef } from 'react'
import ConstitutionPage from './ConstitutionPage'

// ─── data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Projects', 'Gallery', 'Partners', 'Join', 'Contact']

const PROJECTS = [
  {
    id: 'p1',
    tag: 'Environment',
    title: 'Green Langata Tree Drive',
    desc: 'Planting 10,000 indigenous trees across Langata Sub-County parks, schools, and riparian zones by end of 2025.',
    status: 'Active',
    goal: 'KES 450,000',
    raised: 62,
    image: 'https://images.unsplash.com/photo-1548522904-e5ab6cf5e09b?w=700&h=480&fit=crop&auto=format',
    alt: 'Community members gathering on a green field for a planting day',
  },
  {
    id: 'p2',
    tag: 'Youth',
    title: 'Climate Skills Bootcamp',
    desc: 'A 12-week intensive mentorship and skills program equipping 200 youth with green entrepreneurship and climate literacy.',
    status: 'Fundraising',
    goal: 'KES 280,000',
    raised: 34,
    image: 'https://images.unsplash.com/photo-1630509866818-4c7be20bb76d?w=700&h=480&fit=crop&auto=format',
    alt: 'Youth participants seated in a workshop session outdoors',
  },
  {
    id: 'p3',
    tag: 'Health',
    title: 'Clean Water for Schools',
    desc: 'Installing rainwater harvesting systems and water filtration units in 6 primary schools across Langata.',
    status: 'Fundraising',
    goal: 'KES 360,000',
    raised: 18,
    image: 'https://images.unsplash.com/photo-1616680214084-22670de1bc82?w=700&h=480&fit=crop&auto=format',
    alt: 'Volunteers working together on a community environmental project',
  },
  {
    id: 'p4',
    tag: 'Economy',
    title: 'Solar Micro-Enterprise Hub',
    desc: 'Establishing a solar-powered community workshop where members manufacture and sell eco-friendly products.',
    status: 'Seeking Partners',
    goal: 'KES 620,000',
    raised: 8,
    image: 'https://images.unsplash.com/photo-1753881110611-00755160afd2?w=700&h=480&fit=crop&auto=format',
    alt: 'Solar panels mounted on a rural building',
  },
]

const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1515657834497-26509e295154?w=600&h=700&fit=crop&auto=format',
    alt: 'Community celebration at a cultural gathering',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1547496614-99b29879c916?w=600&h=380&fit=crop&auto=format',
    alt: 'Children learning inside a community education space',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1535090467336-9501f96eef89?w=600&h=380&fit=crop&auto=format',
    alt: 'Hands working the earth in a community garden',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1547496614-d145e2fa88ed?w=600&h=380&fit=crop&auto=format',
    alt: 'Three smiling boys from the Langata community',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?w=600&h=480&fit=crop&auto=format',
    alt: 'Volunteers on a beach clean-up drive',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1615992955236-ec38cbfc6fe2?w=600&h=480&fit=crop&auto=format',
    alt: 'A line of flourishing green plants along a roadside',
    span: '',
  },
]

const PARTNERS = [
  { name: 'Nairobi County Government', type: 'Institutional' },
  { name: 'Kenya Forest Service', type: 'Government' },
  { name: 'UN Environment Programme', type: 'International' },
  { name: 'Local Community Saccos', type: 'Finance' },
  { name: 'Strathmore University', type: 'Academic' },
  { name: 'Safaricom Foundation', type: 'Corporate' },
]

const MEMBERSHIP_TIERS = [
  {
    tier: 'Ordinary Member',
    fee: 'KES 1,000',
    period: 'one-time registration',
    perks: [
      'Access to all workshops & trainings',
      'Priority for project roles',
      'Networking & job opportunities',
      'Dividends from income projects',
      'Bereavement & celebration support',
    ],
    cta: 'Join as Member',
    highlight: false,
  },
  {
    tier: 'Partner Organisation',
    fee: 'Flexible MOU',
    period: 'annual partnership',
    perks: [
      'Co-design community projects',
      'Co-branding on all TIP materials',
      'Access to our youth talent pool',
      'Joint grant applications',
      'Quarterly impact reporting',
    ],
    cta: 'Become a Partner',
    highlight: true,
  },
  {
    tier: 'Project Sponsor',
    fee: 'From KES 50,000',
    period: 'per project',
    perks: [
      'Full project naming rights',
      'Dedicated impact report',
      'Field visit invitation',
      'Social media recognition',
      'Certificate of contribution',
    ],
    cta: 'Sponsor a Project',
    highlight: false,
  },
]

// ─── sub-components ──────────────────────────────────────────────────────────

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      style={{
        height: '3px',
        backgroundColor: 'var(--color-rule)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: '0.75rem',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: 'var(--color-forest-light)',
          borderRadius: '2px',
          transition: 'width 0.6s ease',
        }}
      />
    </div>
  )
}

function Tag({ label, color = 'var(--color-ochre)' }: { label: string; color?: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        border: `1px solid ${color}`,
        padding: '0.2rem 0.5rem',
        borderRadius: '2px',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  )
}

function ContactModal({
  mode,
  onClose,
}: {
  mode: 'sponsor' | 'invite' | 'join' | 'partner' | null
  onClose: () => void
}) {
  if (!mode) return null
  const titles: Record<string, string> = {
    sponsor: 'Sponsor a Project',
    invite: 'Invite TIP to Your Project',
    join: 'Join The Incubator Platform',
    partner: 'Become a Partner Organisation',
  }
  const descriptions: Record<string, string> = {
    sponsor: "Support a specific TIP project with funding. We'll send you a tailored impact proposal within 72 hours.",
    invite: "Have a project that needs community youth muscle? Invite TIP to collaborate.",
    join: "Become an Ordinary Member of TIP and help drive change in Langata Sub-County.",
    partner: "Establish a formal partnership MOU with TIP for co-designed community programs.",
  }
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26,24,18,0.7)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-parchment)',
          maxWidth: '540px',
          width: '100%',
          padding: '3rem',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-mist)',
            fontSize: '1.2rem',
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-ochre)',
            marginBottom: '0.75rem',
          }}
        >
          Get in touch
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 400,
            color: 'var(--color-ink)',
            marginBottom: '0.75rem',
          }}
        >
          {titles[mode]}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: 'var(--color-mist)',
            fontWeight: 300,
            lineHeight: 1.65,
            marginBottom: '2rem',
          }}
        >
          {descriptions[mode]}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Full Name', type: 'text', placeholder: 'Your full name' },
            { label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
            { label: 'Organisation (optional)', type: 'text', placeholder: 'Where are you from?' },
          ].map((field) => (
            <div key={field.label}>
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-mist)',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  border: '1px solid var(--color-rule)',
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--color-ink)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <div>
            <label
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-mist)',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us more..."
              style={{
                width: '100%',
                padding: '0.7rem 0.9rem',
                border: '1px solid var(--color-rule)',
                backgroundColor: 'transparent',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--color-ink)',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            style={{
              backgroundColor: 'var(--color-forest)',
              color: 'var(--color-parchment)',
              border: 'none',
              padding: '0.85rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              alignSelf: 'flex-start',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest-mid)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest)')
            }
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── main ────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<'home' | 'constitution'>('home')
  const [modal, setModal] = useState<'sponsor' | 'invite' | 'join' | 'partner' | null>(null)
  const [navOpen, setNavOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  if (page === 'constitution') {
    return <ConstitutionPage onBack={() => { setPage('home'); window.scrollTo({ top: 0 }) }} />
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setNavOpen(false)
  }

  return (
    <div style={{ backgroundColor: 'var(--color-parchment)', minHeight: '100vh' }}>
      <ContactModal mode={modal} onClose={() => setModal(null)} />

      {/* ── Nav ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--color-rule)',
          backgroundColor: 'rgba(245,240,232,0.92)',
          backdropFilter: 'blur(8px)',
          padding: '1.1rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C4 1 2 3 2 5.5c0 3.5 5 7.5 5 7.5s5-4 5-7.5C12 3 10 1 7 1z" fill="#f5f0e8" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              fontWeight: 400,
              color: 'var(--color-forest)',
              letterSpacing: '-0.01em',
            }}
          >
            TIP
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-mist)',
              letterSpacing: '0.08em',
              marginLeft: '0.25rem',
            }}
          >
            The Incubator Platform
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: 'var(--color-mist)',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'color 0.15s',
                padding: 0,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-forest)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-mist)')}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => { setPage('constitution'); window.scrollTo({ top: 0 }) }}
            style={{
              background: 'none',
              border: '1px solid var(--color-rule)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-mist)',
              cursor: 'pointer',
              padding: '0.4rem 0.9rem',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-forest)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-rule)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-mist)' }}
          >
            Constitution
          </button>
          <button
            onClick={() => setModal('join')}
            style={{
              backgroundColor: 'var(--color-forest)',
              color: 'var(--color-parchment)',
              border: 'none',
              padding: '0.5rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest-mid)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest)')
            }
          >
            Join Now
          </button>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        id="about"
        style={{
          position: 'relative',
          minHeight: '95vh',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          overflow: 'hidden',
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: '7rem 4rem 5rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--color-rule)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <Tag label="Youth-Led" />
              <Tag label="Langata, Nairobi" color="var(--color-forest-light)" />
              <Tag label="Est. 2025" color="var(--color-mist)" />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 6vw, 6rem)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: 'var(--color-ink)',
                marginBottom: '2.5rem',
              }}
            >
              Building a<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-forest)' }}>Greener</em><br />
              Langata
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--color-mist)',
                fontWeight: 300,
                maxWidth: '46ch',
                marginBottom: '3rem',
              }}
            >
              The Incubator Platform is a community-based organization empowering youth to lead climate action, build green enterprises, and create lasting change in their neighbourhoods.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setModal('join')}
                style={{
                  backgroundColor: 'var(--color-forest)',
                  color: 'var(--color-parchment)',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest-mid)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest)')
                }
              >
                Join the Cause
              </button>
              <button
                onClick={() => scrollTo('projects')}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-ink)',
                  border: '1px solid var(--color-rule)',
                  padding: '0.85rem 2rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-forest)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-rule)'
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-ink)'
                }}
              >
                See Our Projects
              </button>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid var(--color-rule)',
              paddingTop: '2rem',
            }}
          >
            {[
              { n: '200+', label: 'Youth Reached' },
              { n: '4', label: 'Active Projects' },
              { n: '10K', label: 'Trees Targeted' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingRight: i < 2 ? '1.5rem' : 0,
                  borderRight: i < 2 ? '1px solid var(--color-rule)' : 'none',
                  paddingLeft: i > 0 ? '1.5rem' : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    fontWeight: 300,
                    color: 'var(--color-forest)',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}
                >
                  {s.n}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-mist)',
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo mosaic */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '60% 40%',
            position: 'relative',
          }}
        >
          <div style={{ overflow: 'hidden', backgroundColor: 'var(--color-forest)' }}>
            <img
              src="https://images.unsplash.com/photo-1515657834497-26509e295154?w=800&h=600&fit=crop&auto=format"
              alt="Community members gathered in celebration and solidarity"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--color-rule)',
                borderRight: '1px solid var(--color-rule)',
                backgroundColor: 'var(--color-parchment-dark)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1547496614-99b29879c916?w=400&h=300&fit=crop&auto=format"
                alt="Children learning in a community space"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
            </div>
            <div
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--color-rule)',
                backgroundColor: 'var(--color-parchment-dark)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1535090467336-9501f96eef89?w=400&h=300&fit=crop&auto=format"
                alt="Hands tending to earth in a community garden"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact bar ── */}
      <div
        style={{
          backgroundColor: 'var(--color-forest)',
          padding: '2.5rem 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-parchment)',
          }}
        >
          "Every tree planted is a vote for the future."
        </p>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Members', value: '47' },
            { label: 'Projects Completed', value: '3' },
            { label: 'Partner Orgs', value: '6' },
            { label: 'Sub-County', value: 'Langata' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 400,
                  color: 'var(--color-ochre-light)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.5)',
                  marginTop: '0.25rem',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--color-rule)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ochre)',
                marginBottom: '0.75rem',
              }}
            >
              On The Ground
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--color-ink)',
              }}
            >
              Our Projects
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setModal('sponsor')}
              style={{
                backgroundColor: 'var(--color-ochre)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Sponsor a Project
            </button>
            <button
              onClick={() => setModal('invite')}
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-rule)',
                padding: '0.7rem 1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = 'var(--color-rule)')
              }
            >
              Invite Us
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--color-rule)',
            border: '1px solid var(--color-rule)',
          }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              style={{ backgroundColor: 'var(--color-parchment)', overflow: 'hidden' }}
            >
              <div style={{ height: '220px', overflow: 'hidden', backgroundColor: 'var(--color-forest)' }}>
                <img
                  src={p.image}
                  alt={p.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8,
                    transition: 'transform 0.4s ease, opacity 0.3s',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
                    ;(e.currentTarget as HTMLElement).style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    ;(e.currentTarget as HTMLElement).style.opacity = '0.8'
                  }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <Tag label={p.tag} />
                  <Tag
                    label={p.status}
                    color={
                      p.status === 'Active'
                        ? 'var(--color-forest-light)'
                        : p.status === 'Fundraising'
                        ? 'var(--color-ochre)'
                        : 'var(--color-mist)'
                    }
                  />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: 'var(--color-ink)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    lineHeight: 1.65,
                    color: 'var(--color-mist)',
                    fontWeight: 300,
                    marginBottom: '1.25rem',
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        color: 'var(--color-mist)',
                        letterSpacing: '0.08em',
                        marginBottom: '0.25rem',
                      }}
                    >
                      Goal: {p.goal}
                    </p>
                    <ProgressBar pct={p.raised} />
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'var(--color-forest-light)',
                        letterSpacing: '0.08em',
                        marginTop: '0.35rem',
                      }}
                    >
                      {p.raised}% funded
                    </p>
                  </div>
                  <button
                    onClick={() => setModal('sponsor')}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-forest)',
                      color: 'var(--color-forest)',
                      padding: '0.5rem 1.1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginLeft: '1.5rem',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest)'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--color-parchment)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--color-forest)'
                    }}
                  >
                    Fund This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Invite CTA strip */}
        <div
          style={{
            marginTop: '2.5rem',
            border: '1px solid var(--color-rule)',
            padding: '2rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--color-parchment-dark)',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 400,
                color: 'var(--color-ink)',
                marginBottom: '0.35rem',
              }}
            >
              Have a project that needs us?
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-mist)',
                fontWeight: 300,
              }}
            >
              TIP brings organised youth energy, local knowledge, and logistical capacity to partner-led initiatives.
            </p>
          </div>
          <button
            onClick={() => setModal('invite')}
            style={{
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-parchment)',
              border: 'none',
              padding: '0.8rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Invite TIP to Your Project →
          </button>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              marginBottom: '0.75rem',
            }}
          >
            From the Field
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-ink)',
            }}
          >
            Gallery
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: '1px',
            backgroundColor: 'var(--color-rule)',
            border: '1px solid var(--color-rule)',
          }}
        >
          {GALLERY.map((img, i) => (
            <div
              key={i}
              style={{
                overflow: 'hidden',
                backgroundColor: 'var(--color-forest)',
                gridRow: i === 0 ? 'span 2' : undefined,
                height: i === 0 ? '100%' : '260px',
                minHeight: i === 0 ? '520px' : undefined,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.82,
                  transition: 'transform 0.5s ease, opacity 0.3s',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
                  ;(e.currentTarget as HTMLElement).style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                  ;(e.currentTarget as HTMLElement).style.opacity = '0.82'
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Partners ── */}
      <section
        id="partners"
        style={{
          padding: '6rem 4rem',
          borderBottom: '1px solid var(--color-rule)',
          backgroundColor: 'var(--color-parchment-dark)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-ochre)',
                marginBottom: '0.75rem',
              }}
            >
              Collaboration
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 300,
                color: 'var(--color-ink)',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}
            >
              Our Partners &amp;<br />
              <em style={{ fontStyle: 'italic' }}>Allies</em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                color: 'var(--color-mist)',
                fontWeight: 300,
                marginBottom: '2rem',
              }}
            >
              We actively seek mission-aligned partners — government bodies, NGOs, academic institutions, and corporates — to amplify community impact.
            </p>
            <button
              onClick={() => setModal('partner')}
              style={{
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-parchment)',
                border: 'none',
                padding: '0.8rem 1.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest-mid)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-forest)')
              }
            >
              Become a Partner
            </button>
          </div>

          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
                border: '1px solid var(--color-rule)',
              }}
            >
              {PARTNERS.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    padding: '2rem 1.75rem',
                    borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--color-rule)' : 'none',
                    borderBottom: i < 3 ? '1px solid var(--color-rule)' : 'none',
                    transition: 'background-color 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-parchment)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')
                  }
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-forest-light)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {p.type}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      lineHeight: 1.3,
                    }}
                  >
                    {p.name}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '1px',
                border: '1px solid var(--color-rule)',
                borderTop: 'none',
                padding: '1.5rem 1.75rem',
                backgroundColor: 'var(--color-parchment)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '1px dashed var(--color-rule)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ color: 'var(--color-mist)', fontSize: '1.1rem' }}>+</span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--color-mist)',
                  fontWeight: 300,
                }}
              >
                Your organisation could be listed here.{' '}
                <button
                  onClick={() => setModal('partner')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-forest)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  Reach out to partner with TIP.
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Join / Membership ── */}
      <section id="join" style={{ padding: '6rem 4rem', borderBottom: '1px solid var(--color-rule)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              marginBottom: '0.75rem',
            }}
          >
            Be Part of It
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--color-ink)',
              marginBottom: '1rem',
            }}
          >
            Join the Cause
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-mist)',
              fontWeight: 300,
              maxWidth: '50ch',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Whether you want to volunteer, contribute funding, or forge a formal partnership, there is a meaningful place for you in TIP.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            border: '1px solid var(--color-rule)',
          }}
        >
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <div
              key={tier.tier}
              style={{
                padding: '3rem 2.5rem',
                borderRight: i < 2 ? '1px solid var(--color-rule)' : 'none',
                backgroundColor: tier.highlight ? 'var(--color-forest)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: tier.highlight ? 'rgba(245,240,232,0.5)' : 'var(--color-mist)',
                    marginBottom: '1rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} — {tier.period}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    color: tier.highlight ? 'var(--color-parchment)' : 'var(--color-ink)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {tier.tier}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: tier.highlight ? 'var(--color-ochre-light)' : 'var(--color-ochre)',
                    marginBottom: '2rem',
                  }}
                >
                  {tier.fee}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0' }}>
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        color: tier.highlight ? 'rgba(245,240,232,0.75)' : 'var(--color-mist)',
                        fontWeight: 300,
                        paddingBottom: '0.6rem',
                        paddingLeft: '1rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: tier.highlight ? 'var(--color-ochre-light)' : 'var(--color-forest-light)',
                        }}
                      >
                        ·
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() =>
                  setModal(
                    tier.tier === 'Ordinary Member'
                      ? 'join'
                      : tier.tier === 'Partner Organisation'
                      ? 'partner'
                      : 'sponsor'
                  )
                }
                style={{
                  backgroundColor: tier.highlight ? 'var(--color-ochre)' : 'var(--color-forest)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  width: '100%',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact / CTA ── */}
      <section
        id="contact"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderBottom: '1px solid var(--color-rule)',
        }}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px',
            backgroundColor: 'var(--color-forest)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1603703182693-51a19941fa59?w=900&h=700&fit=crop&auto=format"
            alt="Community members walking together in a shared purpose"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(45,80,22,0.85) 0%, rgba(45,80,22,0.4) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '4rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.5)',
                marginBottom: '1rem',
              }}
            >
              Location
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 300,
                color: 'var(--color-parchment)',
                lineHeight: 1.3,
              }}
            >
              Langata Sub-County<br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-ochre-light)' }}>Nairobi, Kenya</em>
            </p>
          </div>
        </div>

        <div style={{ padding: '5rem 4rem', backgroundColor: 'var(--color-parchment-dark)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              marginBottom: '1rem',
            }}
          >
            Get Involved
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 300,
              color: 'var(--color-ink)',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            Ready to make<br />
            <em style={{ fontStyle: 'italic' }}>something happen?</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: 'var(--color-mist)',
              fontWeight: 300,
              marginBottom: '2.5rem',
            }}
          >
            Whether you want to join as a member, partner your organisation, sponsor a project, or invite TIP to participate in your initiative — we want to hear from you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Join as a Member', action: () => setModal('join') },
              { label: 'Become a Partner', action: () => setModal('partner') },
              { label: 'Sponsor a Project', action: () => setModal('sponsor') },
              { label: 'Invite Us to Your Project', action: () => setModal('invite') },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--color-rule)',
                  backgroundColor: 'var(--color-parchment)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-ink)',
                  textAlign: 'left',
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)'
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'white'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-rule)'
                  ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-parchment)'
                }}
              >
                <span>{item.label}</span>
                <span style={{ color: 'var(--color-forest)', fontSize: '1rem' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          backgroundColor: 'var(--color-ink)',
          padding: '3rem 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              border: '1px solid rgba(90,140,48,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C4 1 2 3 2 5.5c0 3.5 5 7.5 5 7.5s5-4 5-7.5C12 3 10 1 7 1z" fill="#5a8c30" />
            </svg>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                color: 'var(--color-parchment)',
                fontWeight: 400,
              }}
            >
              The Incubator Platform
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                color: 'rgba(245,240,232,0.35)',
                textTransform: 'uppercase',
              }}
            >
              Langata Sub-County · Nairobi, Kenya · Est. 2025
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.35)',
                cursor: 'pointer',
                transition: 'color 0.15s',
                padding: 0,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.8)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(245,240,232,0.35)')
              }
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => { setPage('constitution'); window.scrollTo({ top: 0 }) }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-ochre)',
              cursor: 'pointer',
              transition: 'color 0.15s',
              padding: 0,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-ochre-light)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-ochre)')}
          >
            Constitution ↗
          </button>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'rgba(245,240,232,0.2)',
            letterSpacing: '0.05em',
          }}
        >
          Non-partisan · Non-sectarian · Non-discriminatory
        </p>
      </footer>
    </div>
  )
}
