import { cn } from './utils'

const variants = {
  default: 'bg-surface-muted text-muted border border-border',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
}

function Badge({ className, variant = 'default', children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] sm:text-[0.65rem]',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
