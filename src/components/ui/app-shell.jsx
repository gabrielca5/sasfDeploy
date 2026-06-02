import { NavLink } from 'react-router-dom'
import SidebarNav from './sidebar-nav'
import { cn } from './utils'

function AppShell({ logoSrc, navItems, onSignOut, children }) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-foreground">
      <div className="mx-auto flex max-w-[1600px] min-h-screen">
        <SidebarNav logoSrc={logoSrc} navItems={navItems} onSignOut={onSignOut} />

        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <div className="rounded-3xl border border-border bg-white p-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
              SASF
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-3xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
            >
              Sair
            </button>
          </div>

          <div className="mb-4 hidden gap-2 overflow-x-auto lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.slug}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 rounded-3xl border px-4 py-3 text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-transparent bg-white text-foreground hover:border-border hover:bg-surface-muted',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppShell
