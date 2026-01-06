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
      id="step-indicator-container"
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '16px 0',
      }}
    >
      <div
        id="step-dock"
        className="glass-panel"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: `repeat(${steps.length}, auto)`,
          gap: '8px',
          padding: '8px',
          borderRadius: '9999px', // Pill shape
          background: 'rgba(30, 30, 30, 0.6)', // Slightly lighter than base
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isActive
                  ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                  : status === 'complete'
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'transparent',
                color: isActive
                  ? 'white'
                  : status === 'complete'
                  ? '#22c55e'
                  : '#888',
                boxShadow: isActive ? '0 4px 12px rgba(220, 38, 38, 0.4)' : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon size={20} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
