import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface Component {
  id: string
  name: string
  type: string
}

interface PreviewCanvasProps {
  selectedComponent?: Component
  deviceFrame: 'desktop' | 'tablet' | 'mobile'
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void
}

const deviceWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
}

export function PreviewCanvas({ selectedComponent, deviceFrame, onDeviceChange }: PreviewCanvasProps) {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => setZoom((z) => Math.min(z + 25, 200))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 25, 50))
  const handleZoomReset = () => setZoom(100)

  return (
    <>
      {/* Canvas area */}
      <div
        id="preview-canvas"
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: '32px',
          background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.03) 0%, transparent 50%), linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)',
          overflow: 'auto',
        }}
      >
        <div
          id="preview-frame"
          style={{
            width: deviceWidths[deviceFrame],
            maxWidth: deviceFrame === 'desktop' ? '1200px' : undefined,
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
            minHeight: '400px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 60px rgba(220, 38, 38, 0.05)',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
          }}
        >
          {/* Rendered component preview */}
          <div
            id="preview-content"
            style={{
              padding: '32px',
              minHeight: '100%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {selectedComponent ? (
              <div
                id="component-preview"
                style={{
                  padding: '24px 40px',
                  background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '15px',
                  boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              >
                {selectedComponent.name}
              </div>
            ) : (
              <p style={{ color: '#666', fontSize: '14px' }}>
                Select a component to preview
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        id="preview-toolbar"
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 20px',
          borderTop: '1px solid #333',
          background: '#151515',
        }}
      >
        {/* Device selector */}
        <div id="device-selector" style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
            const Icon = device === 'desktop' ? Monitor : device === 'tablet' ? Tablet : Smartphone
            const isActive = deviceFrame === device
            return (
              <button
                key={device}
                id={`device-${device}`}
                onClick={() => onDeviceChange(device)}
                title={device.charAt(0).toUpperCase() + device.slice(1)}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? '#dc2626' : 'transparent',
                  color: isActive ? 'white' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-out',
                }}
              >
                <Icon size={16} />
              </button>
            )
          })}
        </div>

        {/* Zoom display */}
        <div id="zoom-display" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#666', fontFamily: 'JetBrains Mono, monospace' }}>
            {zoom}%
          </span>
        </div>

        {/* Zoom controls */}
        <div id="zoom-controls" style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
          {[
            { id: 'zoom-out', icon: ZoomOut, action: handleZoomOut, title: 'Zoom Out' },
            { id: 'zoom-reset', icon: RotateCcw, action: handleZoomReset, title: 'Reset Zoom' },
            { id: 'zoom-in', icon: ZoomIn, action: handleZoomIn, title: 'Zoom In' },
          ].map(({ id, icon: Icon, action, title }) => (
            <button
              key={id}
              id={id}
              onClick={action}
              title={title}
              style={{
                display: 'grid',
                placeItems: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.15s ease-out',
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 8px 48px rgba(220, 38, 38, 0.5); }
        }
      `}</style>
    </>
  )
}
