import { DesignStudioLayout } from '@/components/DesignStudioLayout'

// Demo steps for the design studio
const demoSteps = [
  { id: 'vision', title: 'Product Vision', status: 'complete' as const, description: 'Define what you\'re building' },
  { id: 'tokens', title: 'Design Tokens', status: 'complete' as const, description: 'Colors, typography, motion' },
  { id: 'shell', title: 'Shell Design', status: 'in-progress' as const, description: 'App layout and navigation' },
  { id: 'screens', title: 'Screen Designs', status: 'pending' as const, description: 'Component-by-component UI' },
  { id: 'polish', title: 'Refine & Animate', status: 'pending' as const, description: 'Visual polish and motion' },
]

// Demo components available in the preview
const demoComponents = [
  { id: 'button', name: 'Button', path: 'src/sections/ui/Button.svelte' },
  { id: 'card', name: 'Card', path: 'src/sections/ui/Card.svelte' },
  { id: 'nav', name: 'Navigation', path: 'src/sections/shell/Navigation.svelte' },
]

export function DesignStudioPage() {
  return (
    <DesignStudioLayout
      title="Design Studio"
      steps={demoSteps}
      components={demoComponents}
      previewContent={
        <div
          id="demo-preview-content"
          style={{
            padding: '24px',
            display: 'grid',
            placeItems: 'center',
            height: '100%',
          }}
        >
          <div
            id="demo-component"
            style={{
              padding: '32px 48px',
              background: 'linear-gradient(135deg, #84cc16, #65a30d)',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(101, 163, 13, 0.3)',
              transition: 'transform 0.2s ease',
            }}
          >
            Sample Svelte Component Preview
          </div>
        </div>
      }
    />
  )
}
