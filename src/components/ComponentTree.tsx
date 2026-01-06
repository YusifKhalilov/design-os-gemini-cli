import { Box, MousePointer, Type, Square, Navigation, Plus } from 'lucide-react'

interface Component {
  id: string
  name: string
  type: 'container' | 'button' | 'input' | 'card' | 'nav'
}

interface ComponentTreeProps {
  components: Component[]
  selectedId: string
  onSelect: (id: string) => void
}

const typeIcons = {
  container: Box,
  button: MousePointer,
  input: Type,
  card: Square,
  nav: Navigation,
}

export function ComponentTree({ components, selectedId, onSelect }: ComponentTreeProps) {
  return (
    <div
      id="component-tree-wrapper"
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        height: '100%',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}
    >
      {/* Section header */}
      <div
        id="tree-header"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid #333',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888' }}>
          Components
        </span>
        <button
          id="add-component-btn"
          style={{
            width: '28px',
            height: '28px',
            display: 'grid',
            placeItems: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            color: '#888',
            cursor: 'pointer',
          }}
          title="Add Component"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Tree list - VERTICAL */}
      <div
        id="tree-list"
        style={{
          display: 'grid',
          gap: '4px',
          padding: '12px',
          overflowY: 'auto',
          alignContent: 'start',
        }}
      >
        {components.map((comp) => {
          const Icon = typeIcons[comp.type] || Box
          const isSelected = comp.id === selectedId

          return (
            <button
              key={comp.id}
              id={`tree-item-${comp.id}`}
              onClick={() => onSelect(comp.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr auto',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                border: isSelected ? '1px solid rgba(220, 38, 38, 0.4)' : '1px solid transparent',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(185, 28, 28, 0.1))'
                  : 'transparent',
                color: isSelected ? '#ef4444' : '#999',
                transition: 'all 0.15s ease-out',
                textAlign: 'left',
              }}
            >
              <Icon size={16} style={{ opacity: isSelected ? 1 : 0.6 }} />
              <span style={{ fontSize: '13px', fontWeight: isSelected ? 500 : 400 }}>
                {comp.name}
              </span>
              {isSelected && (
                <div
                  id={`selected-indicator-${comp.id}`}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    boxShadow: '0 0 8px #ef4444',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div
        id="tree-footer"
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #333',
          background: '#151515',
        }}
      >
        <p style={{ fontSize: '11px', color: '#666' }}>
          {components.length} components
        </p>
      </div>
    </div>
  )
}
