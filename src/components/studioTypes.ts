export interface Step {
  id: number
  name: string
  command: string
}

export interface StepData {
  idea?: {
    name: string
    description: string
    targetUsers: string
    features: string[]
  }
  layout?: {
    type: 'sidebar' | 'topnav' | 'dashboard' | 'minimal'
    description: string
  }
  tokens?: {
    colors: { primary: string; secondary: string; neutral: string }
    fonts: { heading: string; body: string }
    motion: { duration: string; easing: string }
  }
  shell?: { complete: boolean }
  components?: { files: string[] }
  polish?: { complete: boolean }
  animate?: { complete: boolean }
}

export const STEPS = [
  { id: 1, name: 'Idea', command: '/idea' },
  { id: 2, name: 'Layout', command: '/layout' },
  { id: 3, name: 'Tokens', command: '/tokens' },
  { id: 4, name: 'Shell', command: '/shell' },
  { id: 5, name: 'Components', command: '/components' },
  { id: 6, name: 'Polish', command: '/polish' },
  { id: 7, name: 'Animate', command: '/animate' },
]
