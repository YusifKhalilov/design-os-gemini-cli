import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { PhaseWarningBanner } from '@/components/PhaseWarningBanner'
import { SpecCard } from '@/components/SpecCard'
import { DataCard } from '@/components/DataCard'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { loadProductData } from '@/lib/product-loader'
import { loadSectionData } from '@/lib/section-loader'
import { ChevronRight, Layout, Image, Download, ArrowRight, LayoutList, Check } from 'lucide-react'

/**
 * Determine the status of each step based on what data exists
 * Steps: 1. Section Overview (Spec), 2. Sample Data, 3. Screen Designs, 4. Screenshots
 */
function getStepStatuses(sectionData: ReturnType<typeof loadSectionData> | null): StepStatus[] {
  const hasSpec = !!sectionData?.specParsed
  const hasData = !!sectionData?.data
  const hasScreenDesigns = !!(sectionData?.screenDesigns && sectionData.screenDesigns.length > 0)
  const hasScreenshots = !!(sectionData?.screenshots && sectionData.screenshots.length > 0)

  const steps: boolean[] = [hasSpec, hasData, hasScreenDesigns, hasScreenshots]
  const firstIncomplete = steps.findIndex((done) => !done)

  return steps.map((done, index) => {
    if (done) return 'completed'
    if (index === firstIncomplete) return 'current'
    return 'upcoming'
  })
}

/**
 * Check if the required steps for a section are complete (Spec, Data, Screen Designs)
 * Screenshots are optional and don't count toward completion
 */
function areRequiredStepsComplete(sectionData: ReturnType<typeof loadSectionData> | null): boolean {
  const hasSpec = !!sectionData?.specParsed
  const hasData = !!sectionData?.data
  const hasScreenDesigns = !!(sectionData?.screenDesigns && sectionData.screenDesigns.length > 0)
  return hasSpec && hasData && hasScreenDesigns
}

export function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const navigate = useNavigate()

  // Load product data to get section info
  const productData = useMemo(() => loadProductData(), [])
  const sections = productData.roadmap?.sections || []
  const section = sections.find((s) => s.id === sectionId)
  const currentIndex = sections.findIndex((s) => s.id === sectionId)

  // Load section-specific data (spec, data.json, screen designs, screenshots)
  const sectionData = useMemo(
    () => (sectionId ? loadSectionData(sectionId) : null),
    [sectionId]
  )

  // Handle missing section
  if (!section) {
    return (
      <AppLayout backTo="/sections" backLabel="Sections">
        <div className="text-center py-12">
          <p className="text-stone-600 dark:text-stone-400">
            Section not found: {sectionId}
          </p>
        </div>
      </AppLayout>
    )
  }

  const stepStatuses = getStepStatuses(sectionData)
  const requiredStepsComplete = areRequiredStepsComplete(sectionData)

  // Next section navigation logic
  const isLastSection = currentIndex === sections.length - 1 || currentIndex === -1
  const nextSection = !isLastSection ? sections[currentIndex + 1] : null

  return (
    <AppLayout backTo="/sections" backLabel="Sections" title={section.title}>
      <div id="section-page-body" className="kiosk-page-body">
        <div id="section-page-grid" className="kiosk-split-2">
          {/* Left Panel: Overview & Status */}
          <div id="section-overview-panel" className="glass-card">
            <div id="section-overview-header" className="glass-card-header">
              <div id="section-overview-icon" className="glass-card-icon">
                <LayoutList className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </div>
              <div id="section-overview-text">
                <h1 id="section-title" className="glass-card-title text-2xl mb-1">{section.title}</h1>
                <p id="section-description" className="glass-card-subtitle text-base line-clamp-none">{section.description}</p>
              </div>
            </div>

            <div id="section-status-body" className="glass-card-body p-6 space-y-6">
              <PhaseWarningBanner />

              <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4 border border-stone-200 dark:border-stone-700/50">
                <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3">Section Completion</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400">Specification</span>
                    {stepStatuses[0] === 'completed' ? (
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400">Sample Data</span>
                    {stepStatuses[1] === 'completed' ? (
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700" />
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500 dark:text-stone-400">Screen Designs</span>
                    {stepStatuses[2] === 'completed' ? (
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-stone-200 dark:bg-stone-700" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {requiredStepsComplete && (
               <div className="glass-card-footer">
                  {nextSection ? (
                    <button
                      onClick={() => navigate(`/sections/${nextSection.id}`)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors group"
                    >
                      <span className="font-medium text-sm">Next: {nextSection.title}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/sections')}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors group"
                    >
                      <span className="font-medium text-sm">Return to Roadmap</span>
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  )}
               </div>
            )}
          </div>

          {/* Right Panel: Content Timeline */}
          <div id="section-steps-panel" className="glass-card">
            <div id="section-steps-header" className="glass-card-header">
              <div id="section-steps-icon" className="glass-card-icon">
                <Layout className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </div>
              <div id="section-steps-header-text">
                <h2 id="section-steps-title" className="glass-card-title">Development Steps</h2>
                <p id="section-steps-subtitle" className="glass-card-subtitle">Complete these steps to define the section</p>
              </div>
            </div>

            <div id="section-steps-body" className="glass-card-body glass-scroll p-6">
              <div id="section-steps-list" className="space-y-8 max-w-3xl">
                {/* Step 1: Section Overview (Spec) */}
                <StepIndicator step={1} status={stepStatuses[0]}>
                  <SpecCard spec={sectionData?.specParsed || null} sectionTitle="Section Overview" />
                </StepIndicator>

                {/* Step 2: Sample Data */}
                <StepIndicator step={2} status={stepStatuses[1]}>
                  <DataCard data={sectionData?.data || null} />
                </StepIndicator>

                {/* Step 3: Screen Designs */}
                <StepIndicator step={3} status={stepStatuses[2]}>
                  {!sectionData?.screenDesigns || sectionData.screenDesigns.length === 0 ? (
                    <EmptyState type="screen-designs" />
                  ) : (
                    <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                          Screen Designs
                          <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                            ({sectionData.screenDesigns.length})
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="divide-y divide-stone-200 dark:divide-stone-700">
                          {sectionData.screenDesigns.map((screenDesign) => (
                            <li key={screenDesign.name}>
                              <Link
                                to={`/sections/${sectionId}/screen-designs/${screenDesign.name}`}
                                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0">
                                    <Layout className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
                                  </div>
                                  <span className="font-medium text-stone-900 dark:text-stone-100 truncate">
                                    {screenDesign.name}
                                  </span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0" strokeWidth={1.5} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </StepIndicator>

                {/* Step 4: Screenshots */}
                <StepIndicator step={4} status={stepStatuses[3]} isLast>
                  {!sectionData?.screenshots || sectionData.screenshots.length === 0 ? (
                    <Card className="border-stone-200 dark:border-stone-700 shadow-sm border-dashed">
                      <CardContent className="py-8">
                        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
                          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-3">
                            <Image className="w-5 h-5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-base font-medium text-stone-600 dark:text-stone-400 mb-1">
                            No screenshots captured yet
                          </h3>
                          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                            Capture screenshots of your screen designs for documentation
                          </p>
                          <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5 w-full">
                            <p className="text-xs text-stone-500 dark:text-stone-400 mb-0.5">
                              Run in Claude Code:
                            </p>
                            <code className="text-sm font-mono text-stone-700 dark:text-stone-300">
                              /screenshot-design
                            </code>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                          Screenshots
                          <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                            ({sectionData.screenshots.length})
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {sectionData.screenshots.map((screenshot) => (
                            <div key={screenshot.name} className="group">
                              <div className="aspect-video rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                                <img
                                  src={screenshot.url}
                                  alt={screenshot.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <p className="text-sm text-stone-600 dark:text-stone-400 truncate">
                                  {screenshot.name}
                                </p>
                                <a
                                  href={screenshot.url}
                                  download={`${screenshot.name}.png`}
                                  className="shrink-0 p-1.5 rounded-md text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                  title="Download screenshot"
                                >
                                  <Download className="w-4 h-4" strokeWidth={1.5} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </StepIndicator>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>

  )
}
