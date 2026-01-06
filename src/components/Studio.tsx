import { useState, useEffect } from 'react'
import { StepIndicator } from './StepIndicator'
import { StepContent } from './StepContent'
import { LivePreview } from './LivePreview'

export interface StepData {
  idea?: {
    name: string
    description: string
    targetUsers: string
    features: string[]
  }
  layout?: {
    type: 'sidebar' | 'topnav' | 'dashboard' | 'minimal'
    description: string
  }
  tokens?: {
    colors: { primary: string; secondary: string; neutral: string }
    fonts: { heading: string; body: string }
    motion: { duration: string; easing: string }
  }
  shell?: { complete: boolean }
  components?: { files: string[] }
  polish?: { complete: boolean }
  animate?: { complete: boolean }
}

const STEPS = [
  { id: 1, name: 'Idea', command: '/idea' },
  { id: 2, name: 'Layout', command: '/layout' },
  { id: 3, name: 'Tokens', command: '/tokens' },
  { id: 4, name: 'Shell', command: '/shell' },
  { id: 5, name: 'Components', command: '/components' },
  { id: 6, name: 'Polish', command: '/polish' },
  { id: 7, name: 'Animate', command: '/animate' },
]

export function Studio() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepData, setStepData] = useState<StepData>({})

  // Load step data from product folder (simulated for now)
  useEffect(() => {
    // In real implementation, this would read from product/*.json files
    // For now, we'll start empty
  }, [])

  const getStepStatus = (stepId: number): 'complete' | 'current' | 'pending' => {
    const stepKey = STEPS[stepId - 1].name.toLowerCase() as keyof StepData
    if (stepData[stepKey]) return 'complete'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  return (
    <div
      id="studio-root"
      style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#0f0f0f',
        color: '#f5f5f5',
      }}
    >
      {/* LEFT PANEL */}
      <aside
        id="left-panel"
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          borderRight: '1px solid #2a2a2a',
          overflow: 'hidden',
          background: '#141414',
        }}
      >
        {/* Step indicators - horizontal row */}
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          getStatus={getStepStatus}
          onSelect={setCurrentStep}
        />

        {/* Step content - info below */}
        <StepContent
          step={STEPS[currentStep - 1]}
          data={stepData}
          status={getStepStatus(currentStep)}
        />
      </aside>

      {/* RIGHT PANEL - Always live preview */}
      <main
        id="right-panel"
        style={{
          display: 'grid',
          gridTemplateRows: '1fr',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        <LivePreview stepData={stepData} onReset={() => setStepData({})} />
      </main>
    </div>
  )
}
