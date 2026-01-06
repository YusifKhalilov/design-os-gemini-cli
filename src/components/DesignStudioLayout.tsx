import { useState, type ReactNode } from 'react'
import { PhaseNav } from './PhaseNav'
import { ThemeToggle } from './ThemeToggle'
import { StepsPanel } from './StepsPanel'
import { PreviewPanel } from './PreviewPanel'

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

interface DesignStudioLayoutProps {
  steps: Step[]
  components: Component[]
  previewContent?: ReactNode
  title?: string
}

export function DesignStudioLayout({
  steps,
  components,
  previewContent,
  title = 'Design Studio',
}: DesignStudioLayoutProps) {
  const [selectedComponentId, setSelectedComponentId] = useState<string | undefined>(
    components.length > 0 ? components[0].id : undefined
  )
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isDarkPreview, setIsDarkPreview] = useState(false)

  const selectedComponent = components.find((c) => c.id === selectedComponentId)

  return (
    <div id="design-studio-root" className="kiosk-root bg-background">
      {/* Main content with 4+6 split */}
      <main id="design-studio-content" className="kiosk-content">
        {/* Header row */}
        <div id="design-studio-header" className="kiosk-page-header">
          <h1
            id="design-studio-title"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              gridColumn: '1 / 5',
            }}
          >
            {title}
          </h1>
        </div>

        {/* 4+6 body split */}
        <div id="design-studio-body" className="kiosk-page-body kiosk-split-4-6">
          {/* Left panel (4 cols) - Steps and controls */}
          <StepsPanel
            steps={steps}
            components={components}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
          />

          {/* Right panel (8 cols remaining) - Preview */}
          <PreviewPanel
            selectedComponent={selectedComponent?.name}
            deviceFrame={deviceFrame}
            onDeviceChange={setDeviceFrame}
            isDarkPreview={isDarkPreview}
            onToggleTheme={() => setIsDarkPreview(!isDarkPreview)}
          >
            {previewContent}
          </PreviewPanel>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div id="glass-bottom-nav-wrapper" className="glass-bottom-nav-wrapper">
        <nav id="glass-bottom-nav" className="glass-bottom-nav">
          <div id="nav-spacer-left" />
          <PhaseNav />
          <ThemeToggle />
        </nav>
      </div>
    </div>
  )
}
