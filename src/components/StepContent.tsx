import type { Step, StepData } from './studioTypes'

interface StepContentProps {
  step: Step
  data: StepData
  status: 'complete' | 'current' | 'pending'
}

export function StepContent({ step, data }: StepContentProps) {
  const stepKey = step.name.toLowerCase() as keyof StepData
  const stepData = data[stepKey]

  return (
    <div
      id="step-content"
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gap: '16px',
        padding: '20px',
        overflow: 'auto',
        height: '100%',
      }}
    >
      {/* Step title */}
      <div id="step-title-section">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
          {step.name}
        </h2>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Step {step.id} of 7
        </p>
      </div>

      {/* Step content - either prompt or data */}
      <div id="step-data-section">
        {!stepData ? (
          <NotStartedView command={step.command} />
        ) : (
          <CompletedView stepKey={stepKey} data={data} />
        )}
      </div>
    </div>
  )
}

function NotStartedView({ command }: { command: string }) {
  return (
    <div
      id="not-started-view"
      style={{
        display: 'grid',
        gap: '16px',
        padding: '24px',
        background: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid #2a2a2a',
      }}
    >
      <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>
        This step hasn't been completed yet.
      </p>
      <div
        id="command-prompt"
        style={{
          display: 'grid',
          gap: '8px',
          padding: '16px',
          background: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #333',
        }}
      >
        <p style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Run this command
        </p>
        <code
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#dc2626',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {command}
        </code>
      </div>
    </div>
  )
}

function CompletedView({ stepKey, data }: { stepKey: keyof StepData; data: StepData }) {
  switch (stepKey) {
    case 'idea':
      return <IdeaView data={data.idea!} />
    case 'layout':
      return <LayoutView data={data.layout!} />
    case 'tokens':
      return <TokensView data={data.tokens!} />
    case 'shell':
    case 'components':
    case 'polish':
    case 'animate':
      return <GenericCompleteView name={stepKey} />
    default:
      return null
  }
}

function IdeaView({ data }: { data: NonNullable<StepData['idea']> }) {
  return (
    <div id="idea-view" style={{ display: 'grid', gap: '16px' }}>
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '4px', textTransform: 'uppercase' }}>Project Name</p>
        <p style={{ fontSize: '16px', fontWeight: 600 }}>{data.name}</p>
      </div>
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '4px', textTransform: 'uppercase' }}>Description</p>
        <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>{data.description}</p>
      </div>
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '4px', textTransform: 'uppercase' }}>Target Users</p>
        <p style={{ fontSize: '14px', color: '#ccc' }}>{data.targetUsers}</p>
      </div>
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>Features</p>
        <div style={{ display: 'grid', gap: '6px' }}>
          {data.features.map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '6px 1fr', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626' }} />
              <span style={{ fontSize: '13px', color: '#ccc' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LayoutView({ data }: { data: NonNullable<StepData['layout']> }) {
  const layoutVisuals: Record<string, { icon: string; preview: string }> = {
    sidebar: { icon: '◧', preview: '┃ Content' },
    topnav: { icon: '▬', preview: '━━━━\nContent' },
    dashboard: { icon: '▦', preview: '┏━┳━┓\n┃ ┃ ┃' },
    minimal: { icon: '□', preview: 'Content' },
  }
  const visual = layoutVisuals[data.type] || layoutVisuals.minimal

  return (
    <div id="layout-view" style={{ display: 'grid', gap: '16px' }}>
      <div
        style={{
          padding: '32px',
          background: 'linear-gradient(135deg, #1a1a1a, #222)',
          borderRadius: '12px',
          border: '1px solid #2a2a2a',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '12px', color: '#dc2626' }}>{visual.icon}</div>
        <p style={{ fontSize: '18px', fontWeight: 600, textTransform: 'capitalize' }}>{data.type}</p>
        <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Layout Style</p>
      </div>
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '14px', color: '#ccc', lineHeight: 1.5 }}>{data.description}</p>
      </div>
    </div>
  )
}

function TokensView({ data }: { data: NonNullable<StepData['tokens']> }) {
  return (
    <div id="tokens-view" style={{ display: 'grid', gap: '16px' }}>
      {/* Colors */}
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px', textTransform: 'uppercase' }}>Colors</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {Object.entries(data.colors).map(([name, color]) => (
            <div key={name} style={{ display: 'grid', gap: '6px' }}>
              <div
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  background: color,
                  border: '1px solid #333',
                }}
              />
              <p style={{ fontSize: '11px', color: '#888', textTransform: 'capitalize', textAlign: 'center' }}>{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px', textTransform: 'uppercase' }}>Typography</p>
        <div style={{ display: 'grid', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>Heading</p>
            <p style={{ fontSize: '20px', fontWeight: 600 }}>{data.fonts.heading}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>Body</p>
            <p style={{ fontSize: '14px' }}>{data.fonts.body}</p>
          </div>
        </div>
      </div>

      {/* Motion */}
      <div style={{ padding: '16px', background: '#1a1a1a', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
        <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px', textTransform: 'uppercase' }}>Motion</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>Duration</p>
            <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>{data.motion.duration}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>Easing</p>
            <p style={{ fontSize: '14px', fontFamily: 'monospace' }}>{data.motion.easing}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GenericCompleteView({ name }: { name: string }) {
  return (
    <div
      style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
      <p style={{ fontSize: '14px', color: '#22c55e', textTransform: 'capitalize' }}>{name} complete</p>
    </div>
  )
}
