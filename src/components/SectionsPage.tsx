import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { getSectionScreenDesigns, getSectionScreenshots, hasSectionSpec, hasSectionData } from '@/lib/section-loader'
import { ChevronRight, Check, Activity, Map, List, FileText, Database } from 'lucide-react'

interface SectionProgress {
  hasSpec: boolean
  hasData: boolean
  hasScreenDesigns: boolean
  screenDesignCount: number
  hasScreenshots: boolean
  screenshotCount: number
}

function getSectionProgress(sectionId: string): SectionProgress {
  const screenDesigns = getSectionScreenDesigns(sectionId)
  const screenshots = getSectionScreenshots(sectionId)
  return {
    hasSpec: hasSectionSpec(sectionId),
    hasData: hasSectionData(sectionId),
    hasScreenDesigns: screenDesigns.length > 0,
    screenDesignCount: screenDesigns.length,
    hasScreenshots: screenshots.length > 0,
    screenshotCount: screenshots.length,
  }
}

export function SectionsPage() {
  const navigate = useNavigate()
  const productData = useMemo(() => loadProductData(), [])

  const sections = productData.roadmap?.sections || []

  // Check for missing phases (Data Model & Design)
  const hasDataModel = !!productData.dataModel
  const hasDesignSystem = !!(productData.designSystem?.colors || productData.designSystem?.typography)
  const hasShell = !!productData.shell?.spec
  const hasDesign = hasDesignSystem || hasShell
  const needsWarning = !hasDataModel || !hasDesign

  // Toggle state for warning animation
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (!needsWarning) return

    // Toggle every 2 seconds
    const interval = setInterval(() => {
      setShowWarning(prev => !prev)
    }, 2000)

    // Initial delay to start the cycle
    const timeout = setTimeout(() => setShowWarning(true), 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [needsWarning])

  // Construct warning text
  const warningText = useMemo(() => {
    const missing: string[] = []
    if (!hasDataModel) missing.push('Data Model')
    if (!hasDesign) missing.push('Design')
    return `Consider completing ${missing.join(' and ')} before designing sections.`
  }, [hasDataModel, hasDesign])

  // Calculate progress for each section
  const sectionProgressMap = useMemo(() => {
    const map: Record<string, SectionProgress> = {}
    for (const section of sections) {
      map[section.id] = getSectionProgress(section.id)
    }
    return map
  }, [sections])

  // Count completed sections
  const completedSections = sections.filter(s => {
    const p = sectionProgressMap[s.id]
    return p?.hasSpec && p?.hasData && p?.hasScreenDesigns
  }).length

  const totalSections = sections.length
  const progressPercentage = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  // Count specific artifacts
  const totalSpecs = sections.filter(s => sectionProgressMap[s.id]?.hasSpec).length
  const totalData = sections.filter(s => sectionProgressMap[s.id]?.hasData).length
  const totalDesigns = sections.filter(s => sectionProgressMap[s.id]?.hasScreenDesigns).length

  return (
    <AppLayout>
      {/* Page Header */}
      <div id="sections-page-header" className="kiosk-page-header">
        <h1 id="sections-title" className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Sections
        </h1>

        {/* Animated Description / Warning */}
        <div
          className="relative h-6 w-full max-w-2xl overflow-hidden"
          style={{ gridColumn: '1 / 7' }}
        >
          <p
            id="sections-description-default"
            className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
              needsWarning && showWarning
                ? 'opacity-0 translate-y-4 pointer-events-none'
                : 'opacity-100 translate-y-0'
            } text-stone-600 dark:text-stone-400`}
          >
            Design each section of your product with specifications, sample data, and screen designs.
          </p>

          {needsWarning && (
            <p
              id="sections-description-warning"
              className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                showWarning
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4 pointer-events-none'
              } text-amber-600 dark:text-amber-400 font-medium`}
            >
              {warningText}
            </p>
          )}
        </div>
      </div>

      {/* Page Body */}
      <div id="sections-page-body" className="kiosk-page-body">

        <div id="sections-grid" className="kiosk-split-2">
          {/* Left Column: Progress */}
          <div id="progress-panel" className="glass-card">
            <div id="progress-header" className="glass-card-header">
              <div id="progress-icon-wrapper" className="glass-card-icon">
                <Activity id="progress-icon" />
              </div>
              <div id="progress-header-text">
                <h2 id="progress-title" className="glass-card-title">
                  Progress
                </h2>
                <p id="progress-subtitle" className="glass-card-subtitle">
                  Completion status
                </p>
              </div>
            </div>

            <div id="progress-body" className="glass-card-body glass-scroll">
              <div className="flex flex-col gap-6">
                {/* Overall Progress */}
                <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {progressPercentage}%
                  </div>
                  <div className="text-sm text-stone-500 dark:text-stone-400">
                    {completedSections} of {totalSections} sections completed
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-stone-900 dark:bg-stone-100 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid gap-3">
                  <StatRow label="Specifications" count={totalSpecs} total={totalSections} icon={FileText} />
                  <StatRow label="Sample Data" count={totalData} total={totalSections} icon={Database} />
                  <StatRow label="Screen Designs" count={totalDesigns} total={totalSections} icon={List} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sections List */}
          <div id="sections-list-panel" className="glass-card">
            <div id="sections-list-header" className="glass-card-header">
              <div id="sections-icon-wrapper" className="glass-card-icon">
                <Map id="sections-icon" />
              </div>
              <div id="sections-list-header-text">
                <h2 id="sections-list-title" className="glass-card-title">
                  Roadmap
                </h2>
                <p id="sections-list-subtitle" className="glass-card-subtitle">
                  {totalSections} sections defined
                </p>
              </div>
            </div>

            <div id="sections-list-body" className="glass-card-body glass-scroll">
              {sections.length === 0 ? (
                <EmptyState type="roadmap" />
              ) : (
                <ul id="sections-list" className="divide-y divide-stone-200 dark:divide-stone-700 -mx-6">
                  {sections.map((section) => {
                    const progress = sectionProgressMap[section.id]
                    const isComplete = progress?.hasSpec && progress?.hasData && progress?.hasScreenDesigns

                    return (
                      <li id={`section-item-${section.id}`} key={section.id}>
                        <button
                          id={`section-btn-${section.id}`}
                          onClick={() => navigate(`/sections/${section.id}`)}
                          className="w-full px-6 py-4 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
                          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '16px', alignItems: 'center' }}
                        >
                          {/* Status indicator */}
                          <div id={`section-status-${section.id}`}>
                            {isComplete ? (
                              <div className="w-8 h-8 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                                <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-medium text-stone-500 dark:text-stone-400">
                                {section.order}
                              </div>
                            )}
                          </div>

                          <div id={`section-info-${section.id}`} className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 id={`section-name-${section.id}`} className="font-medium text-stone-900 dark:text-stone-100 truncate">
                                {section.title}
                              </h3>
                            </div>
                            <p id={`section-desc-${section.id}`} className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1 mb-2">
                              {section.description}
                            </p>

                            {/* Progress indicators */}
                            <div id={`section-progress-${section.id}`} className="flex items-center gap-3">
                              <ProgressDot label="Spec" done={progress?.hasSpec} />
                              <ProgressDot label="Data" done={progress?.hasData} />
                              <ProgressDot
                                label={progress?.screenDesignCount ? `${progress.screenDesignCount} screens` : 'Designs'}
                                done={progress?.hasScreenDesigns}
                              />
                            </div>
                          </div>

                          <ChevronRight className="w-5 h-5 text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" strokeWidth={1.5} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {sections.length > 0 && completedSections === sections.length && (
              <div id="sections-list-footer" className="glass-card-footer">
                <NextPhaseButton nextPhase="export" />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

interface ProgressDotProps {
  label: string
  done?: boolean
  optional?: boolean
}

function ProgressDot({ label, done, optional }: ProgressDotProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
      done
        ? 'text-stone-700 dark:text-stone-300'
        : optional
          ? 'text-stone-400 dark:text-stone-500'
          : 'text-stone-400 dark:text-stone-500'
    }`}>
      {done ? (
        <div className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
      ) : (
        <div className={`w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 ${optional ? 'opacity-50' : ''}`} />
      )}
      {label}
    </span>
  )
}

function StatRow({ label, count, total, icon: Icon }: { label: string, count: number, total: number, icon: any }) {
  const isComplete = count === total && total > 0

  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-stone-50 dark:bg-stone-800/30">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-md ${isComplete ? 'bg-lime-100 dark:bg-lime-900/30 text-lime-600 dark:text-lime-400' : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'}`}>
          <Icon className="w-3.5 h-3.5" strokeWidth={2} />
        </div>
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{label}</span>
      </div>
      <div className="text-sm">
        <span className={`font-semibold ${isComplete ? 'text-lime-600 dark:text-lime-400' : 'text-stone-900 dark:text-stone-100'}`}>
          {count}
        </span>
        <span className="text-stone-400 dark:text-stone-500">/{total}</span>
      </div>
    </div>
  )
}
