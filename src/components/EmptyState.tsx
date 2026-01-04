import { FileText, Map, ClipboardList, Database, Layout, Package, Boxes, Palette, PanelLeft } from 'lucide-react'

type EmptyStateType = 'overview' | 'roadmap' | 'spec' | 'data' | 'screen-designs' | 'data-model' | 'design-system' | 'shell' | 'export'

interface EmptyStateProps {
  type: EmptyStateType
}

const config: Record<EmptyStateType, {
  icon: typeof FileText
  title: string
  command: string
  description: string
}> = {
  overview: {
    icon: FileText,
    title: 'No product defined yet',
    command: '/product-vision',
    description: 'Define your product vision, key problems, and features',
  },
  roadmap: {
    icon: Map,
    title: 'No roadmap defined yet',
    command: '/product-roadmap',
    description: 'Break down your product into development sections',
  },
  spec: {
    icon: ClipboardList,
    title: 'No specification defined yet',
    command: '/shape-section',
    description: 'Define the user flows and UI requirements',
  },
  data: {
    icon: Database,
    title: 'No sample data generated yet',
    command: '/sample-data',
    description: 'Create realistic sample data for screen designs',
  },
  'screen-designs': {
    icon: Layout,
    title: 'No screen designs created yet',
    command: '/design-screen',
    description: 'Create screen designs for this section',
  },
  'data-model': {
    icon: Boxes,
    title: 'No data model defined yet',
    command: '/data-model',
    description: 'Define the core entities and relationships',
  },
  'design-system': {
    icon: Palette,
    title: 'No design tokens defined yet',
    command: '/design-tokens',
    description: 'Choose colors and typography for your product',
  },
  shell: {
    icon: PanelLeft,
    title: 'No application shell designed yet',
    command: '/design-shell',
    description: 'Design the navigation and layout',
  },
  export: {
    icon: Package,
    title: 'Ready to export',
    command: '/export-product',
    description: 'Generate the complete handoff package',
  },
}

export function EmptyState({ type }: EmptyStateProps) {
  const { icon: Icon, title, command, description } = config[type]

  return (
    <div id={`empty-state-${type}`} className="empty-state-container">
      <div id={`empty-state-${type}-icon-wrapper`} className="empty-state-icon">
        <Icon id={`empty-state-${type}-icon`} strokeWidth={1.5} />
      </div>
      <h3 id={`empty-state-${type}-title`} className="empty-state-title">
        {title}
      </h3>
      <p id={`empty-state-${type}-description`} className="empty-state-description">
        {description}
      </p>
      <div id={`empty-state-${type}-command-box`} className="empty-state-command">
        <p id={`empty-state-${type}-command-label`} className="empty-state-command-label">
          Run in Gemini CLI:
        </p>
        <code id={`empty-state-${type}-command-text`} className="empty-state-command-text">
          {command}
        </code>
      </div>
    </div>
  )
}
