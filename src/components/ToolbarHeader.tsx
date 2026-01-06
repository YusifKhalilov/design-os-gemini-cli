import { Save, Download, Sparkles } from 'lucide-react'

interface ToolbarHeaderProps {
  componentName: string
  onSave: () => void
  onExport: () => void
}

export function ToolbarHeader({ componentName, onSave, onExport }: ToolbarHeaderProps) {
  return (
    <header
      id="studio-header"
      style={{
        gridColumn: '1 / -1',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        alignItems: 'center',
        padding: '0 20px',
        borderBottom: '1px solid #333',
        background: 'linear-gradient(180deg, #1f1f1f 0%, #1a1a1a 100%)',
      }}
    >
      {/* Logo / App name */}
      <div
        id="header-brand"
        style={{
          gridColumn: '1 / 3',
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          id="logo-icon"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #dc2626, #991b1b)',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)',
          }}
        >
          <Sparkles size={18} color="white" />
        </div>
        <span style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em', color: '#f5f5f5' }}>
          UI Studio
        </span>
      </div>

      {/* Component name - centered */}
      <div id="header-component" style={{ gridColumn: '5 / 9', textAlign: 'center' }}>
        <span
          id="component-name-display"
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#888',
            padding: '6px 16px',
            background: '#252525',
            borderRadius: '9999px',
            border: '1px solid #333',
          }}
        >
          {componentName}
        </span>
      </div>

      {/* Actions */}
      <div
        id="header-actions"
        style={{
          gridColumn: '11 / -1',
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gap: '8px',
          justifyContent: 'end'
        }}
      >
        <button
          id="save-btn"
          onClick={onSave}
          style={{
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            alignItems: 'center',
            gap: '6px',
            background: '#252525',
            color: '#f5f5f5',
            border: '1px solid #333',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <Save size={14} />
          <span>Save</span>
        </button>
        <button
          id="export-btn"
          onClick={onExport}
          style={{
            padding: '8px 16px',
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #dc2626, #991b1b)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          <Download size={14} />
          <span>Export</span>
        </button>
      </div>
    </header>
  )
}
