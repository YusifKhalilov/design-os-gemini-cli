import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadProductData } from '@/lib/product-loader'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { ProductOverviewCard } from '@/components/ProductOverviewCard'
import { SectionsCard } from '@/components/SectionsCard'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { FileText, Map } from 'lucide-react'

export function ProductPage() {
  const navigate = useNavigate()
  const productData = useMemo(() => loadProductData(), [])

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const allStepsComplete = hasOverview && hasRoadmap

  return (
    <AppLayout>
      {/* Page Header */}
      <div id="product-page-header" className="kiosk-page-header">
        <h1 id="product-title" className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Product Definition
        </h1>
        <p id="product-description" className="text-stone-600 dark:text-stone-400">
          Define your product vision and break it into development sections.
        </p>
      </div>

      {/* Page Body - Two column kiosk layout */}
      <div id="product-page-body" className="kiosk-page-body">
        <div id="product-grid" className="kiosk-split-2">
          {/* Left Column: Product Vision */}
          <div id="product-vision-panel" className="glass-card">
            <div id="vision-header" className="glass-card-header">
              <div id="vision-icon-wrapper" className="glass-card-icon">
                <FileText id="vision-icon" />
              </div>
              <div id="vision-header-text">
                <h2 id="vision-title" className="glass-card-title">
                  Product Vision
                </h2>
                <p id="vision-subtitle" className="glass-card-subtitle">
                  Define what you're building and why
                </p>
              </div>
            </div>
            <div id="vision-body" className="glass-card-body glass-scroll">
              {productData.overview ? (
                <ProductOverviewCard overview={productData.overview} />
              ) : (
                <EmptyState type="overview" />
              )}
            </div>
          </div>

          {/* Right Column: Roadmap */}
          <div id="product-roadmap-panel" className="glass-card">
            <div id="roadmap-header" className="glass-card-header">
              <div id="roadmap-icon-wrapper" className="glass-card-icon">
                <Map id="roadmap-icon" />
              </div>
              <div id="roadmap-header-text">
                <h2 id="roadmap-title" className="glass-card-title">
                  Roadmap
                </h2>
                <p id="roadmap-subtitle" className="glass-card-subtitle">
                  Break down into development sections
                </p>
              </div>
            </div>
            <div id="roadmap-body" className="glass-card-body glass-scroll">
              {productData.roadmap ? (
                <SectionsCard
                  roadmap={productData.roadmap}
                  onSectionClick={(sectionId) => navigate(`/sections/${sectionId}`)}
                />
              ) : (
                <EmptyState type="roadmap" />
              )}
            </div>
            {allStepsComplete && (
              <div id="roadmap-footer" className="glass-card-footer">
                <NextPhaseButton nextPhase="data-model" />
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
