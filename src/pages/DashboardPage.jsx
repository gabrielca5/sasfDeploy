import { useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'

function DashboardPage() {
  const { sectionSlug, formId, actionSlug } = useParams()
  const resolvedSectionSlug = sectionSlug ?? (formId ? 'cadastro' : undefined)

  return <DashboardLayout sectionSlug={resolvedSectionSlug} formId={formId} actionSlug={actionSlug} />
}

export default DashboardPage