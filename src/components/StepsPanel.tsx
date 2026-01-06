import type { ReactNode } from 'react'
import { Check, Circle } from 'lucide-react'

interface Step {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'complete'
  description?: string
}

interface Component {
  id: string
  name: string
  path: string
}

interface StepsPanelProps {
  steps: Step[]
  components: Component[]
  selectedComponentId?: string
  onSelectComponent?: (id: string) => void
  children?: ReactNode
}

export function StepsPanel({
  steps,
  components,
  selectedComponentId,
  onSelectComponent,
}: StepsPanelProps) {
  return (
    <div id="steps-panel" className="kiosk-card">
      <div id="steps-panel-header" className="kiosk-card-header">
        <h2 id="steps-panel-title" style={{ fontSize: '14px', fontWeight: 600 }}>
          Design Progress
        </h2>
      </div>

      <div id="steps-panel-body" className="kiosk-card-body kiosk-scroll">
        {/* Step indicators */}
        <div id="steps-list" style={{ display: 'grid', gap: '8px', marginBottom: '24px' }}>
          {steps.map((step, index) => (
            <div
              id={`step-${step.id}`}
              key={step.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr',
                gap: '12px',
                alignItems: 'start',
                padding: '12px',
                borderRadius: 'var(--radius)',
                background: step.status === 'in-progress'
                  ? 'var(--accent)'
                  : 'transparent',
              }}
            >
              <div
                id={`step-indicator-${step.id}`}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: step.status === 'complete'
                    ? 'linear-gradient(135deg, #84cc16, #65a30d)'
                    : step.status === 'in-progress'
                    ? 'var(--primary)'
                    : 'var(--muted)',
                }}
              >
                {step.status === 'complete' ? (
                  <Check size={14} color="white" strokeWidth={2.5} />
                ) : (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: step.status === 'in-progress'
                      ? 'var(--primary-foreground)'
                      : 'var(--muted-foreground)',
                  }}>
                    {index + 1}
                  </span>
                )}
              </div>
              <div id={`step-content-${step.id}`}>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: step.status === 'in-progress'
                    ? 'var(--foreground)'
                    : 'var(--muted-foreground)',
                }}>
                  {step.title}
                </p>
                {step.description && (
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--muted-foreground)',
                    marginTop: '2px',
                  }}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Component selector */}
        {components.length > 0 && (
          <div id="component-selector-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <label
              id="component-selector-label"
              htmlFor="component-select"
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--muted-foreground)',
                marginBottom: '8px',
              }}
            >
              Preview Component
            </label>
            <select
              id="component-select"
              value={selectedComponentId || ''}
              onChange={(e) => onSelectComponent?.(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '13px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'var(--background)',
                color: 'var(--foreground)',
                cursor: 'pointer',
              }}
            >
              <option value="">Select a component...</option>
              {components.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
