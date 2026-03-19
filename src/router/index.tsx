import { Home } from '../pages/Home'
import { Tools } from '../pages/Tools'
import { ToolPage } from '../pages/ToolPage'

export const router = [
  { path: '/', Component: Home },
  { path: '/tools', Component: Tools },
  { path: '/tools/:slug', Component: ToolPage },
]
