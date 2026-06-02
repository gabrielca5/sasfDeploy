import { cn } from './utils'

function PageHeader({ title, description, actions, className, children }) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{title?.label ?? title}</p>
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title?.heading ?? title}</h1>
            {title?.subheading && <p className="mt-2 text-sm text-muted max-w-2xl">{title.subheading}</p>}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      {description ? <p className="text-sm text-muted max-w-3xl">{description}</p> : null}
      {children}
    </div>
  )
}

export default PageHeader
