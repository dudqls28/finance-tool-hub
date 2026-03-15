import { Link } from 'react-router-dom'
import { toolsConfig } from '../config/tools'
import type { ToolConfig } from '../config/tools'

interface RelatedToolsProps {
  relatedToolIds: string[]
  currentToolId: string
}

export function RelatedTools({ relatedToolIds, currentToolId }: RelatedToolsProps) {
  const tools = relatedToolIds
    .map((id) => toolsConfig.find((t) => t.id === id))
    .filter((t): t is ToolConfig => t != null && t.id !== currentToolId)
    .slice(0, 4)

  if (tools.length === 0) return null

  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50/50 p-6">
      <h2 className="text-lg font-semibold text-text">관련 계산기</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              to={`/tools/${tool.slug}`}
              className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-text shadow-sm hover:border-primary hover:text-primary"
            >
              {tool.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
