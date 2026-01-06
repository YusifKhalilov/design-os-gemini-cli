import type { Step } from './studioTypes'
import { Lightbulb, Layout, Palette, Box, Layers, Sparkles, Zap } from 'lucide-react'

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  getStatus: (id: number) => 'complete' | 'current' | 'pending'
  onSelect: (id: number) => void
}

const stepIcons = [Lightbulb, Layout, Palette, Box, Layers, Sparkles, Zap]

export function StepIndicator({ steps, currentStep, getStatus, onSelect }: StepIndicatorProps) {
  return (
    <div
      id="step-indicator"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: '4px',
        padding: '16px',
        borderBottom: '1px solid #2a2a2a',
        background: '#181818',
      }}
    >
      {steps.map((step, index) => {
        const Icon = stepIcons[index]
        const status = getStatus(step.id)
        const isActive = step.id === currentStep

        return (
          <button
            key={step.id}
            id={`step-btn-${step.id}`}
            onClick={() => onSelect(step.id)}
            title={step.name}
            style={{
              display: 'grid',
              placeItems: 'center',
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease-out',
              background: isActive
                ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                : status === 'complete'
                ? 'rgba(34, 197, 94, 0.15)'
                : 'transparent',
              color: isActive
                ? 'white'
                : status === 'complete'
                ? '#22c55e'
                : '#666',
              boxShadow: isActive ? '0 4px 12px rgba(220, 38, 38, 0.3)' : 'none',
            }}
          >
            <Icon size={18} />
          </button>
        )
      })}
    </div>
  )
}
