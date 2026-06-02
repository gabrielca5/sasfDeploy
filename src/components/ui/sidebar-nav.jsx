import { NavLink } from 'react-router-dom'
import { cn } from './utils'

function SidebarNav({ logoSrc, navItems, onSignOut }) {
  return (
    <aside className="sticky top-0 z-10 hidden h-screen w-72 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-white px-5 py-8 shadow-sm lg:flex">
      <div className="flex items-center gap-3">
        <img src={logoSrc} alt="Logo SASF" className="h-12 w-12 rounded-2xl object-contain" />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">SASF</p>
          <p className="text-lg font-black text-foreground">Chico Mendes</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.slug}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'border-primary bg-primary/10 text-primary shadow-sm'
                  : 'border-transparent text-foreground hover:border-border hover:bg-surface-muted',
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex w-full items-center justify-center rounded-3xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}

export default SidebarNav
