import { Download, Monitor, Tablet, Smartphone, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import type { StepData } from './Studio'

interface LivePreviewProps {
  stepData: StepData
  onReset: () => void
}

export function LivePreview({ stepData, onReset }: LivePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  }

  // Determine preview content based on completed steps
  const hasIdea = !!stepData.idea
  const hasLayout = !!stepData.layout
  const hasTokens = !!stepData.tokens

  return (
    <div
      id="live-preview"
      style={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Preview canvas */}
      <div
        id="preview-canvas"
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: '32px',
          overflow: 'auto',
          background: 'radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.03) 0%, transparent 50%)',
        }}
      >
        <div
          id="preview-frame"
          style={{
            width: deviceWidths[device],
            maxWidth: device === 'desktop' ? '1000px' : undefined,
            minHeight: '500px',
            background: hasTokens ? stepData.tokens?.colors.neutral : '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
          }}
        >
          {!hasIdea ? (
            <EmptyPreview />
          ) : (
            <AppPreview stepData={stepData} />
          )}
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
          borderTop: '1px solid #2a2a2a',
          background: '#141414',
        }}
      >
        {/* Device selector */}
        <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => {
            const Icon = d === 'desktop' ? Monitor : d === 'tablet' ? Tablet : Smartphone
            return (
              <button
                key={d}
                onClick={() => setDevice(d)}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: 'none',
                  background: device === d ? '#dc2626' : 'transparent',
                  color: device === d ? 'white' : '#666',
                  cursor: 'pointer',
                }}
              >
                <Icon size={16} />
              </button>
            )
          })}
        </div>

        {/* Status */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>
            {hasTokens ? 'Preview with tokens' : hasLayout ? 'Preview with layout' : hasIdea ? 'Basic preview' : 'No data yet'}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '8px' }}>
          <button
            id="reset-btn"
            onClick={onReset}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#2a2a2a',
              color: '#888',
              border: '1px solid #333',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            id="export-btn"
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <Download size={14} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptyPreview() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100%',
        minHeight: '400px',
        padding: '32px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🎨</div>
        <p style={{ fontSize: '14px', color: '#666' }}>Complete steps to see your app</p>
      </div>
    </div>
  )
}

function AppPreview({ stepData }: { stepData: StepData }) {
  const layout = stepData.layout?.type || 'minimal'
  const colors = stepData.tokens?.colors
  const fonts = stepData.tokens?.fonts

  return (
    <div
      style={{
        height: '100%',
        minHeight: '400px',
        fontFamily: fonts?.body || 'inherit',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${colors?.primary || '#333'}33`,
          background: colors?.primary ? `${colors.primary}11` : '#1f1f1f',
        }}
      >
        <span style={{ fontWeight: 600, fontFamily: fonts?.heading || 'inherit' }}>
          {stepData.idea?.name || 'App'}
        </span>
      </div>

      {/* Layout based content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: layout === 'sidebar' ? '200px 1fr' : '1fr',
          height: 'calc(100% - 57px)',
        }}
      >
        {layout === 'sidebar' && (
          <div
            style={{
              padding: '16px',
              borderRight: '1px solid #333',
              background: '#161616',
            }}
          >
            <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px' }}>Navigation</p>
            {stepData.idea?.features.slice(0, 4).map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  marginBottom: '4px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: i === 0 ? colors?.primary || '#dc2626' : '#888',
                  background: i === 0 ? `${colors?.primary || '#dc2626'}15` : 'transparent',
                }}
              >
                {f}
              </div>
            ))}
          </div>
        )}
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: fonts?.heading || 'inherit' }}>
            {stepData.idea?.features[0] || 'Main Feature'}
          </h2>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
            {stepData.idea?.description || 'App description will appear here'}
          </p>
        </div>
      </div>
    </div>
  )
}
