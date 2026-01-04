import { useMemo } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'

export function DataModelPage() {
  const productData = useMemo(() => loadProductData(), [])
  const dataModel = productData.dataModel

  const hasDataModel = !!dataModel

  return (
    <AppLayout>
      {/* Page Header */}
      <div id="data-model-page-header" className="kiosk-page-header">
        <h1 id="data-model-title" className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Data Model
        </h1>
        <p id="data-model-description" className="text-stone-600 dark:text-stone-400">
          Define the core entities and relationships in your product.
        </p>
      </div>

      {/* Page Body */}
      <div id="data-model-page-body" className="kiosk-page-body">
        {!dataModel ? (
          <div id="data-model-empty" className="kiosk-center">
            <EmptyState type="data-model" />
          </div>
        ) : (
          <div id="data-model-grid" className="kiosk-split-2">
            {/* Left Column: Entities */}
            <div id="entities-panel" className="kiosk-card">
              <div id="entities-header" className="kiosk-card-header">
                <h2 id="entities-title" className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Entities
                  <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                    ({dataModel.entities.length})
                  </span>
                </h2>
              </div>
              <div id="entities-body" className="kiosk-card-body kiosk-scroll">
                {dataModel.entities.length === 0 ? (
                  <p id="entities-empty" className="text-stone-500 dark:text-stone-400">No entities defined.</p>
                ) : (
                  <div id="entities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {dataModel.entities.map((entity, index) => (
                      <div
                        id={`entity-${index}`}
                        key={index}
                        className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4"
                      >
                        <h3 id={`entity-name-${index}`} className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                          {entity.name}
                        </h3>
                        <p id={`entity-desc-${index}`} className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                          {entity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Relationships + Actions */}
            <div id="relationships-panel" className="kiosk-card">
              <div id="relationships-header" className="kiosk-card-header">
                <h2 id="relationships-title" className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Relationships
                  <span className="ml-2 text-sm font-normal text-stone-500 dark:text-stone-400">
                    ({dataModel.relationships.length})
                  </span>
                </h2>
              </div>
              <div id="relationships-body" className="kiosk-card-body kiosk-scroll">
                {dataModel.relationships.length === 0 ? (
                  <p id="relationships-empty" className="text-stone-500 dark:text-stone-400">No relationships defined.</p>
                ) : (
                  <ul id="relationships-list" style={{ display: 'grid', gap: '8px' }}>
                    {dataModel.relationships.map((relationship, index) => (
                      <li id={`relationship-${index}`} key={index} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '12px', alignItems: 'start' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 mt-2" />
                        <span className="text-stone-700 dark:text-stone-300">
                          {relationship}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div id="relationships-footer" className="kiosk-card-footer">
                <div id="edit-hint" className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-3">
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Run{' '}
                    <code className="font-mono text-stone-800 dark:text-stone-200">/data-model</code>{' '}
                    to update
                  </p>
                </div>
                {hasDataModel && <NextPhaseButton nextPhase="design" />}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
