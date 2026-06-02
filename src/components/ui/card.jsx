import { cn } from './utils'

function Card({ className, children, variant = 'default', ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface shadow-card transition-all duration-200',
        variant === 'ghost' && 'border-transparent shadow-none bg-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
