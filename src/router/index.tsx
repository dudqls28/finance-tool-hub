import { Home } from '../pages/Home'
import { ToolPage } from '../pages/ToolPage'

export const router = [
  { path: '/', Component: Home },
  { path: '/tools', Component: Home },
  { path: '/tools/:slug', Component: ToolPage },
]
