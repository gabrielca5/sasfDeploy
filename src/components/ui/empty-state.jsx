function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{title}</p>
      <p className="mt-3 text-base font-semibold text-foreground">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  )
}

export default EmptyState
