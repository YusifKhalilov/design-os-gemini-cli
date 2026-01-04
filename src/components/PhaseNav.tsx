import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { FileText, Boxes, Layout, LayoutList, Package } from 'lucide-react'
import { loadProductData, hasExportZip } from '@/lib/product-loader'
import { getAllSectionIds, getSectionScreenDesigns } from '@/lib/section-loader'

export type Phase = 'product' | 'data-model' | 'design' | 'sections' | 'export'

interface PhaseConfig {
  id: Phase
  label: string
  icon: typeof FileText
  path: string
}

const phases: PhaseConfig[] = [
  { id: 'product', label: 'Product', icon: FileText, path: '/' },
  { id: 'data-model', label: 'Data Model', icon: Boxes, path: '/data-model' },
  { id: 'design', label: 'Design', icon: Layout, path: '/design' },
  { id: 'sections', label: 'Sections', icon: LayoutList, path: '/sections' },
  { id: 'export', label: 'Export', icon: Package, path: '/export' },
]

export type PhaseStatus = 'completed' | 'current' | 'upcoming'

interface PhaseInfo {
  phase: PhaseConfig
  status: PhaseStatus
  isComplete: boolean
}

const usePhaseStatuses = (): PhaseInfo[] => {
  const location = useLocation()
  const productData = useMemo(() => loadProductData(), [])

  // Calculate completion status for each phase
  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const hasDataModel = !!productData.dataModel
  const hasDesignSystem = !!productData.designSystem
  const hasShell = !!productData.shell

  const sectionIds = useMemo(() => getAllSectionIds(), [])
  const sectionsWithScreenDesigns = useMemo(() => {
    return sectionIds.filter(id => getSectionScreenDesigns(id).length > 0).length
  }, [sectionIds])
  const hasSections = sectionsWithScreenDesigns > 0

  // Determine current phase from URL
  const currentPath = location.pathname
  let currentPhaseId: Phase = 'product'

  if (currentPath === '/' || currentPath === '/product') {
    currentPhaseId = 'product'
  } else if (currentPath === '/data-model') {
    currentPhaseId = 'data-model'
  } else if (currentPath === '/design' || currentPath === '/design-system' || currentPath.startsWith('/shell')) {
    currentPhaseId = 'design'
  } else if (currentPath === '/sections' || currentPath.startsWith('/sections/')) {
    currentPhaseId = 'sections'
  } else if (currentPath === '/export') {
    currentPhaseId = 'export'
  }

  // Check if export zip exists
  const exportZipExists = hasExportZip()

  // Determine completion status
  const phaseComplete: Record<Phase, boolean> = {
    'product': hasOverview && hasRoadmap,
    'data-model': hasDataModel,
    'design': hasDesignSystem || hasShell,
    'sections': hasSections,
    'export': exportZipExists,
  }

  return phases.map(phase => {
    const isComplete = phaseComplete[phase.id]
    let status: PhaseStatus
    if (phase.id === currentPhaseId) {
      status = 'current'
    } else if (isComplete) {
      status = 'completed'
    } else {
      status = 'upcoming'
    }
    return { phase, status, isComplete }
  })
}

export const PhaseNav = () => {
  const navigate = useNavigate()
  const phaseInfos = usePhaseStatuses()

  return (
    <nav id="phase-nav" className="glass-nav">
      {phaseInfos.map(({ phase, status, isComplete }, index) => {
        const Icon = phase.icon
        const isFirst = index === 0
        const isCurrent = status === 'current'
        const prevIsComplete = index > 0 && phaseInfos[index - 1].isComplete

        return (
          <div id={`phase-item-${phase.id}`} key={phase.id} className="glass-nav-item" style={{ display: 'grid', gridAutoFlow: 'column', alignItems: 'center' }}>
            {/* Connector line */}
            {!isFirst && (
              <div
                id={`phase-connector-${phase.id}`}
                className={`glass-nav-connector ${prevIsComplete || isComplete ? 'is-active' : ''}`}
              />
            )}

            {/* Phase button container */}
            <div id={`phase-btn-container-${phase.id}`} style={{ position: 'relative' }}>
              <button
                id={`phase-btn-${phase.id}`}
                onClick={() => navigate(phase.path)}
                className={`glass-nav-btn ${isCurrent ? 'is-current' : ''}`}
                aria-label={phase.label}
              >
                <Icon
                  className="glass-nav-icon"
                  strokeWidth={1.5}
                />

                {/* Completion indicator */}
                {isComplete && (
                  <span id={`phase-complete-${phase.id}`} className="glass-nav-complete">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>

              {/* Tooltip */}
              <span id={`phase-tooltip-${phase.id}`} className="glass-tooltip">
                {phase.label}
              </span>
            </div>
          </div>
        )
      })}
    </nav>
  )
}

export { phases }
