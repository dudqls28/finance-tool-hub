import {
  TrendingUp,
  Sun,
  Banknote,
  Briefcase,
  PiggyBank,
  Percent,
  type LucideIcon,
} from 'lucide-react'
import type { ToolConfig } from '../config/tools'

const CATEGORY_ICONS: Record<ToolConfig['category'], LucideIcon> = {
  investment: TrendingUp,
  retirement: Sun,
  loan: Banknote,
  salary: Briefcase,
  savings: PiggyBank,
  inflation: Percent,
}

interface CategoryIconProps {
  category: ToolConfig['category']
  className?: string
  size?: number
  /** 카드용: 배경 박스 포함. 툴 페이지용: 아이콘만 */
  variant?: 'card' | 'inline'
}

export function CategoryIcon({ category, className = '', size = 20, variant = 'inline' }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[category]

  if (variant === 'card') {
    return (
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center text-primary ${className}`}
        aria-hidden
      >
        <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
      </span>
    )
  }

  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={2}
      aria-hidden
    />
  )
}
