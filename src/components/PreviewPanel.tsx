import type { ReactNode } from 'react'
import { Monitor, Tablet, Smartphone, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DeviceFrame = 'desktop' | 'tablet' | 'mobile'

interface PreviewPanelProps {
  selectedComponent?: string
  deviceFrame: DeviceFrame
  onDeviceChange: (device: DeviceFrame) => void
  isDarkPreview: boolean
  onToggleTheme: () => void
  children?: ReactNode
}

const deviceWidths: Record<DeviceFrame, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

export function PreviewPanel({
  selectedComponent,
  deviceFrame,
  onDeviceChange,
  isDarkPreview,
  onToggleTheme,
  children,
}: PreviewPanelProps) {
  return (
    <div
      id="preview-panel"
      className="kiosk-card"
      style={{
        background: isDarkPreview
          ? 'oklch(0.216 0.006 56.043)'
          : 'var(--card)',
      }}
    >
      {/* Preview toolbar */}
      <div
        id="preview-toolbar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Device selector */}
        <div id="device-selector" style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
          <Button
            id="device-desktop-btn"
            variant={deviceFrame === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onDeviceChange('desktop')}
            style={{ padding: '6px 10px' }}
          >
            <Monitor size={16} />
          </Button>
          <Button
            id="device-tablet-btn"
            variant={deviceFrame === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onDeviceChange('tablet')}
            style={{ padding: '6px 10px' }}
          >
            <Tablet size={16} />
          </Button>
          <Button
            id="device-mobile-btn"
            variant={deviceFrame === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onDeviceChange('mobile')}
            style={{ padding: '6px 10px' }}
          >
            <Smartphone size={16} />
          </Button>
        </div>

        {/* Component name */}
        <div id="preview-title" style={{ textAlign: 'center' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: 500,
            color: isDarkPreview ? 'rgba(250,250,249,0.7)' : 'var(--muted-foreground)',
          }}>
            {selectedComponent || 'No component selected'}
          </span>
        </div>

        {/* Theme toggle */}
        <Button
          id="preview-theme-toggle"
          variant="ghost"
          size="sm"
          onClick={onToggleTheme}
          style={{ padding: '6px 10px' }}
        >
          {isDarkPreview ? (
            <Sun size={16} color="#fafaf9" />
          ) : (
            <Moon size={16} />
          )}
        </Button>
      </div>

      {/* Preview area */}
      <div
        id="preview-content"
        className="kiosk-card-body"
        style={{
          display: 'grid',
          placeItems: 'center',
          overflow: 'auto',
        }}
      >
        <div
          id="preview-frame"
          style={{
            width: deviceWidths[deviceFrame],
            maxWidth: '100%',
            height: '100%',
            background: isDarkPreview
              ? 'oklch(0.268 0.007 34.298)'
              : 'var(--background)',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${isDarkPreview ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`,
            overflow: 'auto',
            transition: 'width 0.3s ease',
          }}
        >
          {children || (
            <div
              id="preview-empty"
              style={{
                display: 'grid',
                placeItems: 'center',
                height: '100%',
                minHeight: '200px',
              }}
            >
              <p style={{
                fontSize: '13px',
                color: isDarkPreview ? 'rgba(250,250,249,0.5)' : 'var(--muted-foreground)',
              }}>
                Select a component to preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
