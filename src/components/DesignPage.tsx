import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { ChevronRight, Layout } from 'lucide-react'

// Map Tailwind color names to actual color values for preview
const colorMap: Record<string, { light: string; base: string; dark: string }> = {
  red: { light: '#fca5a5', base: '#ef4444', dark: '#dc2626' },
  orange: { light: '#fdba74', base: '#f97316', dark: '#ea580c' },
  amber: { light: '#fcd34d', base: '#f59e0b', dark: '#d97706' },
  yellow: { light: '#fde047', base: '#eab308', dark: '#ca8a04' },
  lime: { light: '#bef264', base: '#84cc16', dark: '#65a30d' },
  green: { light: '#86efac', base: '#22c55e', dark: '#16a34a' },
  emerald: { light: '#6ee7b7', base: '#10b981', dark: '#059669' },
  teal: { light: '#5eead4', base: '#14b8a6', dark: '#0d9488' },
  cyan: { light: '#67e8f9', base: '#06b6d4', dark: '#0891b2' },
  sky: { light: '#7dd3fc', base: '#0ea5e9', dark: '#0284c7' },
  blue: { light: '#93c5fd', base: '#3b82f6', dark: '#2563eb' },
  indigo: { light: '#a5b4fc', base: '#6366f1', dark: '#4f46e5' },
  violet: { light: '#c4b5fd', base: '#8b5cf6', dark: '#7c3aed' },
  purple: { light: '#d8b4fe', base: '#a855f7', dark: '#9333ea' },
  fuchsia: { light: '#f0abfc', base: '#d946ef', dark: '#c026d3' },
  pink: { light: '#f9a8d4', base: '#ec4899', dark: '#db2777' },
  rose: { light: '#fda4af', base: '#f43f5e', dark: '#e11d48' },
  slate: { light: '#cbd5e1', base: '#64748b', dark: '#475569' },
  gray: { light: '#d1d5db', base: '#6b7280', dark: '#4b5563' },
  zinc: { light: '#d4d4d8', base: '#71717a', dark: '#52525b' },
  neutral: { light: '#d4d4d4', base: '#737373', dark: '#525252' },
  stone: { light: '#d6d3d1', base: '#78716c', dark: '#57534e' },
}


export function DesignPage() {
  const productData = useMemo(() => loadProductData(), [])
  const designSystem = productData.designSystem
  const shell = productData.shell

  const hasDesignSystem = !!(designSystem?.colors || designSystem?.typography)
  const hasShell = !!shell?.spec
  const allStepsComplete = hasDesignSystem && hasShell

  return (
    <AppLayout>
      {/* Page Header */}
      <div id="design-page-header" className="kiosk-page-header">
        <h1 id="design-title" className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
          Design System
        </h1>
        <p id="design-description" className="text-stone-600 dark:text-stone-400">
          Define the visual foundation and application shell for your product.
        </p>
      </div>

      {/* Page Body - Two column kiosk layout */}
      <div id="design-page-body" className="kiosk-page-body">
        <div id="design-grid" className="kiosk-split-2">
          {/* Left Column: Design Tokens */}
          <div id="tokens-panel" className="kiosk-card">
            <div id="tokens-header" className="kiosk-card-header">
              <h2 id="tokens-title" className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Design Tokens
              </h2>
              <p id="tokens-subtitle" className="text-sm text-stone-500 dark:text-stone-400">
                Colors and typography
              </p>
            </div>
            <div id="tokens-body" className="kiosk-card-body kiosk-scroll">
              {!designSystem?.colors && !designSystem?.typography ? (
                <EmptyState type="design-system" />
              ) : (
                <div id="tokens-content" style={{ display: 'grid', gap: '24px' }}>
                  {/* Colors */}
                  {designSystem?.colors && (
                    <div id="colors-section">
                      <h4 id="colors-label" className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                        Colors
                      </h4>
                      <div id="colors-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <ColorSwatch label="Primary" colorName={designSystem.colors.primary} />
                        <ColorSwatch label="Secondary" colorName={designSystem.colors.secondary} />
                        <ColorSwatch label="Neutral" colorName={designSystem.colors.neutral} />
                      </div>
                    </div>
                  )}

                  {/* Typography */}
                  {designSystem?.typography && (
                    <div id="typography-section">
                      <h4 id="typography-label" className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                        Typography
                      </h4>
                      <div id="typography-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <div id="heading-font">
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Heading</p>
                          <p className="font-semibold text-stone-900 dark:text-stone-100">{designSystem.typography.heading}</p>
                        </div>
                        <div id="body-font">
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Body</p>
                          <p className="text-stone-900 dark:text-stone-100">{designSystem.typography.body}</p>
                        </div>
                        <div id="mono-font">
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Mono</p>
                          <p className="font-mono text-stone-900 dark:text-stone-100">{designSystem.typography.mono}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div id="tokens-footer" className="kiosk-card-footer">
              <div id="tokens-hint" className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-tokens</code> to update
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Application Shell */}
          <div id="shell-panel" className="kiosk-card">
            <div id="shell-header" className="kiosk-card-header">
              <h2 id="shell-title" className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Application Shell
              </h2>
              <p id="shell-subtitle" className="text-sm text-stone-500 dark:text-stone-400">
                Navigation and layout structure
              </p>
            </div>
            <div id="shell-body" className="kiosk-card-body kiosk-scroll">
              {!shell?.spec ? (
                <EmptyState type="shell" />
              ) : (
                <div id="shell-content" style={{ display: 'grid', gap: '16px' }}>
                  {/* Overview */}
                  {shell.spec.overview && (
                    <p id="shell-overview" className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      {shell.spec.overview}
                    </p>
                  )}

                  {/* Navigation items */}
                  {shell.spec.navigationItems.length > 0 && (
                    <div id="nav-items-section">
                      <h4 id="nav-items-label" className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                        Navigation
                      </h4>
                      <ul id="nav-items-list" style={{ display: 'grid', gap: '4px' }}>
                        {shell.spec.navigationItems.map((item, index) => {
                          const parts = item.split(/\*\*([^*]+)\*\*/)
                          return (
                            <li id={`nav-item-${index}`} key={index} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px', alignItems: 'center' }} className="text-stone-700 dark:text-stone-300">
                              <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                              <span>
                                {parts.map((part, i) =>
                                  i % 2 === 1 ? (
                                    <strong key={i} className="font-semibold">{part}</strong>
                                  ) : (
                                    <span key={i}>{part}</span>
                                  )
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}

                  {/* View Shell Design Link */}
                  {shell.hasComponents && (
                    <div id="shell-link-section" className="pt-2 border-t border-stone-100 dark:border-stone-800">
                      <Link
                        id="shell-design-link"
                        to="/shell/design"
                        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '12px', alignItems: 'center' }}
                        className="py-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                      >
                        <div id="shell-icon-wrapper" className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-700" style={{ display: 'grid', placeItems: 'center' }}>
                          <Layout className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                          View Shell Design
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div id="shell-footer" className="kiosk-card-footer">
              <div id="shell-hint" className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-shell</code> to update
                </p>
              </div>
              {allStepsComplete && <NextPhaseButton nextPhase="sections" />}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

interface ColorSwatchProps {
  label: string
  colorName: string
}

function ColorSwatch({ label, colorName }: ColorSwatchProps) {
  const colors = colorMap[colorName] || colorMap.stone

  return (
    <div>
      <div id={`swatch-${label.toLowerCase()}`} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2px' }} className="mb-2">
        <div
          id={`${label.toLowerCase()}-light`}
          className="h-14 rounded-l-md"
          style={{ backgroundColor: colors.light }}
          title={`${colorName}-300`}
        />
        <div
          id={`${label.toLowerCase()}-base`}
          className="h-14"
          style={{ backgroundColor: colors.base }}
          title={`${colorName}-500`}
        />
        <div
          id={`${label.toLowerCase()}-dark`}
          className="h-14 rounded-r-md"
          style={{ backgroundColor: colors.dark }}
          title={`${colorName}-600`}
        />
      </div>
      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{label}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{colorName}</p>
    </div>
  )
}
