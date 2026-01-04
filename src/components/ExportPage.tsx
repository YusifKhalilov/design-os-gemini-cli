import { useMemo, useState } from 'react'
import { Check, AlertTriangle, FileText, FolderTree, Download, Package, Trash2, Sparkles, Zap, Palette, Layers, Terminal, BookOpen } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { AppLayout } from '@/components/AppLayout'
import { loadProductData, hasExportZip, getExportZipUrl } from '@/lib/product-loader'
import { getAllSectionIds, getSectionScreenDesigns } from '@/lib/section-loader'

export function ExportPage() {
  const productData = useMemo(() => loadProductData(), [])
  const [activeTab, setActiveTab] = useState<'included' | 'howto'>('included')

  // Get section stats
  const sectionStats = useMemo(() => {
    const allSectionIds = getAllSectionIds()
    const sectionCount = productData.roadmap?.sections.length || 0
    const sectionsWithScreenDesigns = allSectionIds.filter(id => {
      const screenDesigns = getSectionScreenDesigns(id)
      return screenDesigns.length > 0
    }).length
    return { sectionCount, sectionsWithScreenDesigns, allSectionIds }
  }, [productData.roadmap])

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const hasDataModel = !!productData.dataModel
  const hasDesignSystem = !!productData.designSystem
  const hasShell = !!productData.shell
  const hasSections = sectionStats.sectionsWithScreenDesigns > 0

  const completedCount = [hasOverview, hasRoadmap, hasDataModel, hasDesignSystem, hasShell, hasSections].filter(Boolean).length
  const totalCount = 6
  const requiredComplete = hasOverview && hasRoadmap && hasSections

  // Check for export zip
  const exportZipAvailable = hasExportZip()
  const exportZipUrl = getExportZipUrl()

  const checklistItems = [
    { id: 'overview', label: 'Product Overview', isComplete: hasOverview, icon: FileText, description: 'Vision, goals, and target audience' },
    { id: 'roadmap', label: 'Product Roadmap', isComplete: hasRoadmap, icon: Layers, description: 'Milestones and section planning' },
    { id: 'dataModel', label: 'Data Model', isComplete: hasDataModel, icon: Zap, description: 'Entities and relationships' },
    { id: 'designSystem', label: 'Design System', isComplete: hasDesignSystem, icon: Palette, description: 'Colors, typography, and tokens' },
    { id: 'shell', label: 'Application Shell', isComplete: hasShell, icon: Layers, description: 'Navigation and layout structure' },
    { id: 'sections', label: `Screen Designs (${sectionStats.sectionsWithScreenDesigns}/${sectionStats.sectionCount})`, isComplete: hasSections, icon: Sparkles, description: 'UI mockups for each section' },
  ]

  const packageContents = [
    {
      title: 'Prompts',
      description: 'Ready-to-use prompts for your coding agent',
      items: ['one-shot-prompt.md', 'section-prompt.md'],
      icon: Terminal,
      color: 'lime'
    },
    {
      title: 'Instructions',
      description: 'Implementation guides',
      items: ['product-overview.md', 'milestones/'],
      icon: BookOpen,
      color: 'amber'
    },
    {
      title: 'Design System',
      description: 'Styling configuration',
      items: ['CSS tokens', 'Tailwind config'],
      icon: Palette,
      color: 'sky'
    },
    {
      title: 'Components',
      description: 'React components',
      items: ['Shell', 'Sections', 'Screenshots'],
      icon: Layers,
      color: 'violet'
    },
  ]

  return (
    <AppLayout>
      {/* Page Header */}
      <div id="export-page-header" className="kiosk-page-header">
        <h1 id="export-title" className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Export
        </h1>
        <p id="export-description" className="text-stone-600 dark:text-stone-400">
          Generate a complete handoff package for your development team.
        </p>
      </div>

      {/* Page Body - Two Column Layout */}
      <div id="export-page-body" className="kiosk-page-body">
        <div id="export-two-column" className="export-two-column">

          {/* LEFT COLUMN: Checklist + Action */}
          <div id="export-left-column" className="export-left-column">
            {/* Checklist Grid */}
            <div id="export-checklist-section" className="export-checklist-section">
              <h3 id="export-checklist-label" className="export-section-label">
                <FolderTree className="w-4 h-4" strokeWidth={1.5} />
                Completion Checklist
              </h3>
              <div id="export-checklist-grid" className="export-checklist-grid">
                {checklistItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      id={`checklist-item-${item.id}`}
                      className={`export-checklist-item ${item.isComplete ? 'is-complete' : 'is-pending'}`}
                    >
                      <div id={`checklist-icon-${item.id}`} className="export-checklist-icon">
                        {item.isComplete ? (
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                        ) : (
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        )}
                      </div>
                      <div id={`checklist-content-${item.id}`} className="export-checklist-content">
                        <span id={`checklist-label-${item.id}`} className="export-checklist-label">{item.label}</span>
                        <span id={`checklist-desc-${item.id}`} className="export-checklist-desc">{item.description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Package Preview / Action Section */}
            <div id="export-action-section" className="export-action-section">
              {exportZipAvailable && exportZipUrl ? (
                <div id="export-download-panel" className="export-download-panel">
                  <div id="export-download-badge" className="export-download-badge">
                    <Package className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div id="export-download-info" className="export-download-info">
                    <h3 id="export-download-title" className="export-download-title">Package Ready</h3>
                    <p id="export-download-file" className="export-download-file">product-plan.zip</p>
                  </div>
                  <a
                    id="export-download-btn"
                    href={exportZipUrl}
                    download="product-plan.zip"
                    className="export-download-btn"
                  >
                    <Download className="w-5 h-5" strokeWidth={2} />
                    Download
                  </a>
                </div>
              ) : requiredComplete ? (
                <div id="export-generate-panel" className="export-generate-panel">
                  <div id="export-generate-icon" className="export-generate-icon">
                    <Terminal className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div id="export-generate-info" className="export-generate-info">
                    <h3 id="export-generate-title" className="export-generate-title">Generate Package</h3>
                    <p id="export-generate-desc" className="export-generate-desc">Run the export command:</p>
                  </div>
                  <code id="export-generate-cmd" className="export-generate-cmd">/export-product</code>
                </div>
              ) : null}
            </div>

            {/* Danger Zone */}
            <div id="export-danger-section" className="export-danger-section">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button id="export-reset-btn" className="export-reset-btn">
                    <Trash2 className="w-4 h-4" />
                    <span>Reset Project</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your entire product design.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={async () => {
                        try {
                          const res = await fetch('/__reset-project', { method: 'DELETE' })
                          if (res.ok) {
                            window.location.reload()
                          } else {
                            console.error('Failed to reset project')
                            alert('Failed to reset project')
                          }
                        } catch (err) {
                          console.error('Error resetting project:', err)
                          alert('Error resetting project')
                        }
                      }}
                    >
                      Reset Everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* RIGHT COLUMN: Status + Tabbed Info */}
          <div id="export-right-column" className="export-right-column">
            {/* Status Section */}
            <div id="export-status-section" className="export-status-section">
              <div id="export-progress-ring" className="export-progress-ring">
                <svg viewBox="0 0 100 100" className="export-ring-svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-stone-200 dark:text-stone-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(completedCount / totalCount) * 264} 264`}
                    transform="rotate(-90 50 50)"
                    className="export-ring-progress"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="100%" stopColor="#65a30d" />
                    </linearGradient>
                  </defs>
                </svg>
                <div id="export-ring-content" className="export-ring-content">
                  <span id="export-ring-count" className="export-ring-count">{completedCount}</span>
                  <span id="export-ring-total" className="export-ring-total">/ {totalCount}</span>
                </div>
              </div>
              <div id="export-status-text" className="export-status-text">
                {requiredComplete ? (
                  <>
                    <div id="export-status-icon-ready" className="export-status-icon is-ready">
                      <Check className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <h2 id="export-status-title" className="export-status-title">Ready to Export</h2>
                    <p id="export-status-desc" className="export-status-desc">All required items complete</p>
                  </>
                ) : (
                  <>
                    <div id="export-status-icon-pending" className="export-status-icon is-pending">
                      <AlertTriangle className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h2 id="export-status-title" className="export-status-title">Not Ready</h2>
                    <p id="export-status-desc" className="export-status-desc">Complete required items first</p>
                  </>
                )}
              </div>
            </div>

            {/* Tabbed Section: What's Included / How to Use */}
            <div id="export-tabs-panel" className="export-tabs-panel">
              {/* Tab Headers */}
              <div id="export-tabs-header" className="export-tabs-header">
                <button
                  id="export-tab-included"
                  className={`export-tab-btn ${activeTab === 'included' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('included')}
                >
                  <FolderTree className="w-4 h-4" strokeWidth={1.5} />
                  <span>What's Included</span>
                </button>
                <button
                  id="export-tab-howto"
                  className={`export-tab-btn ${activeTab === 'howto' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('howto')}
                >
                  <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                  <span>How to Use</span>
                </button>
              </div>

              {/* Tab Content */}
              <div id="export-tabs-content" className="export-tabs-content">
                {activeTab === 'included' && (
                  <div id="export-contents-grid" className="export-contents-grid">
                    {packageContents.map((pkg, index) => {
                      const Icon = pkg.icon
                      return (
                        <div
                          key={index}
                          id={`export-content-${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`export-content-card accent-${pkg.color}`}
                        >
                          <div id={`export-content-header-${index}`} className="export-content-header">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                            <div id={`export-content-meta-${index}`} className="export-content-meta">
                              <h4 id={`export-content-title-${index}`} className="export-content-title">{pkg.title}</h4>
                              <p id={`export-content-desc-${index}`} className="export-content-desc">{pkg.description}</p>
                            </div>
                          </div>
                          <ul id={`export-content-list-${index}`} className="export-content-list">
                            {pkg.items.map((item, i) => (
                              <li key={i} id={`export-content-item-${index}-${i}`} className="export-content-item">{item}</li>
                            ))}
                        </ul>
                        </div>
                      )
                    })}
                  </div>
                )}

                {activeTab === 'howto' && (
                  <div id="export-howto-content" className="export-howto-content">
                    <div id="export-howto-incremental" className="export-howto-card">
                      <h4 id="export-howto-inc-title">Incremental</h4>
                      <p id="export-howto-inc-desc">Build milestone by milestone using <code>instructions/incremental/</code> files</p>
                    </div>
                    <div id="export-howto-oneshot" className="export-howto-card">
                      <h4 id="export-howto-one-title">One-Shot</h4>
                      <p id="export-howto-one-desc">Use <code>prompts/one-shot-prompt.md</code> to build everything at once</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
