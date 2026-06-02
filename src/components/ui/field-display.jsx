function FieldDisplay({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-4 text-sm shadow-sm">
      <div className="flex items-start gap-3 text-primary">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">{label}</p>
      <p className="mt-2 font-semibold text-foreground">{value || '—'}</p>
    </div>
  )
}

export default FieldDisplay
