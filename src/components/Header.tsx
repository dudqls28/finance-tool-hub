import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-primary">
          Finance Tool Hub
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-sm text-text hover:text-primary">
            홈
          </Link>
          <Link to="/tools" className="text-sm text-text hover:text-primary">
            계산기
          </Link>
        </nav>
      </div>
    </header>
  )
}
