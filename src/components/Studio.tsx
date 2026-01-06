import { useState, useEffect } from 'react'
import { StepIndicator } from './StepIndicator'
import { StepContent } from './StepContent.tsx'
import { LivePreview } from './LivePreview.tsx'

import { STEPS, type StepData } from './studioTypes'

const simpleHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return hash.toString()
}

export function Studio() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepData, setStepData] = useState<StepData>({})

  // Load step data from product folder
  useEffect(() => {
    const loadData = async () => {
      try {
        const modules = import.meta.glob('../../product/*.json')
        const newData: StepData = {}

        const ignoredHashes = new Set(JSON.parse(localStorage.getItem('design_os_ignored_hashes') || '[]'))

        for (const path in modules) {
          const mod = await modules[path]() as { default: any }
          const content = mod.default
          const hash = simpleHash(JSON.stringify(content))

          if (ignoredHashes.has(hash)) continue

          const fileName = path.split('/').pop()?.replace('.json', '')

          if (fileName === 'idea') {
            newData.idea = content
          } else if (fileName === 'layout') {
            newData.layout = content
          } else if (fileName === 'tokens') {
            newData.tokens = content
          }
        }

        setStepData(prev => ({ ...prev, ...newData }))
      } catch (error) {
        console.error('Error loading product data:', error)
      }
    }

    loadData()
  }, [])

  const getStepStatus = (stepId: number): 'complete' | 'current' | 'pending' => {
    const stepKey = STEPS[stepId - 1].name.toLowerCase() as keyof StepData
    if (stepData[stepKey]) return 'complete'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  const handleReset = () => {
    const ignored = new Set(JSON.parse(localStorage.getItem('design_os_ignored_hashes') || '[]'))

    Object.values(stepData).forEach(data => {
      if (data) ignored.add(simpleHash(JSON.stringify(data)))
    })

    localStorage.setItem('design_os_ignored_hashes', JSON.stringify([...ignored]))
    setStepData({})
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
        <LivePreview stepData={stepData} onReset={handleReset} />
      </main>
    </div>
  )
}
