import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PhaseNav } from './PhaseNav'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: ReactNode
  /** Optional title shown in the header (for sub-pages) */
  title?: string
  /** Optional back navigation path */
  backTo?: string
  /** Optional back label */
  backLabel?: string
  /** Whether to show the phase nav (default: true) */
  showPhaseNav?: boolean
}

export function AppLayout({
  children,
  title,
  backTo,
  backLabel = 'Back',
  showPhaseNav = true,
}: AppLayoutProps) {
  const navigate = useNavigate()

  // Determine if this is a sub-page (has back navigation)
  const isSubPage = !!backTo

  return (
    <div id="app-root" className="kiosk-root bg-background">
      {/* Main content area - fills viewport minus nav */}
      <main id="main-content" className="kiosk-content">
        {/* Sub-page header (conditional) */}
        {isSubPage && (
          <div id="subpage-header" className="kiosk-page-header">
            <div id="subpage-nav" style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', alignItems: 'center', gap: '8px' }}>
              <Button
                id="back-button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(backTo)}
                className="glass-nav-btn"
                style={{ width: 'auto', padding: '4px 12px', borderRadius: '9999px' }}
              >
                <ArrowLeft className="glass-nav-icon" style={{ marginRight: '6px' }} strokeWidth={1.5} />
                <span style={{ fontSize: '12px', fontWeight: 500 }}>{backLabel}</span>
              </Button>
              {title && (
                <>
                  <div id="subpage-divider" style={{ width: '1px', height: '16px', background: 'rgba(0,0,0,0.1)' }} />
                  <h1 id="subpage-title" style={{ fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {title}
                  </h1>
                </>
              )}
            </div>
          </div>
        )}

        {/* Page content */}
        {children}
      </main>

      {/* Bottom Navigation */}
      <div id="glass-bottom-nav-wrapper" className="glass-bottom-nav-wrapper">
        <nav id="glass-bottom-nav" className="glass-bottom-nav">
          <div id="nav-spacer-left" />
          {showPhaseNav && <PhaseNav />}
          <ThemeToggle />
        </nav>
      </div>
    </div>
  )
}
