import { createBrowserRouter } from 'react-router-dom'
import { Studio } from '@/components/Studio'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Studio />,
  },
])
