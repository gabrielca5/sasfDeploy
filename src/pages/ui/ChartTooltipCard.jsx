import { Typography } from '@mui/material'
import PageCard from './PageCard'

function ChartTooltipCard({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <PageCard surface="detail">
      <Typography variant="body2" fontWeight={700} gutterBottom>
        {label}
      </Typography>
      {payload.map((entry) => (
        <Typography key={entry.dataKey ?? entry.name} variant="caption" display="block" color="text.secondary">
          {entry.name}: {entry.value}
        </Typography>
      ))}
    </PageCard>
  )
}

export default ChartTooltipCard
