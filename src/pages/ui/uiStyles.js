/**
 * uiStyles.js
 * Design tokens and shared sx presets extracted from FamiliasPage.jsx.
 * Source of truth for spacing, borderRadius, color, hover, and typography patterns.
 */

// ─── Text overflow safety ────────────────────────────────────────────────────
export const textSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

export const cardTextSx = {
  minWidth: 0,
  overflowWrap: 'anywhere',
  wordBreak: 'break-word',
}

// ─── Surface / Paper presets ─────────────────────────────────────────────────

/** Hero / page-header card — border-radius 3, padded */
export const surfaceHeaderSx = {
  p: { xs: 2, sm: 2.5, md: 3 },
  borderRadius: 3,
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

export const pageSectionHeaderGridSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: { xs: 1.25, sm: 2 },
  alignItems: 'flex-start',
  minWidth: 0,
}

export const pageSectionActionsSx = {
  justifySelf: 'end',
  alignSelf: 'start',
  minWidth: 0,
  maxWidth: { xs: '52vw', sm: 'none' },
  '& .MuiChip-root': {
    maxWidth: '100%',
  },
}

/** Default section card — border-radius 2, padded */
export const surfaceCardSx = {
  p: 2,
  borderRadius: 2,
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

/** Inner section block — borderRadius 2, no elevation */
export const surfaceBlockSx = {
  p: 2,
  borderRadius: 2,
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

export const surfaceNestedBlockSx = {
  p: 1.5,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#fbfcfe',
  minWidth: 0,
  maxWidth: '100%',
}

export const surfaceCompactBlockSx = {
  p: { xs: 1, sm: 1.25 },
  pl: { xs: 1.25, sm: 1.5 },
  borderRadius: 0,
  border: 0,
  borderLeft: '2px solid',
  borderColor: 'rgba(25, 118, 210, 0.18)',
  backgroundColor: 'transparent',
  minWidth: 0,
  maxWidth: '100%',
}

export const surfacePlainBlockSx = {
  p: 0,
  borderRadius: 0,
  border: 0,
  backgroundColor: 'transparent',
  minWidth: 0,
  maxWidth: '100%',
}

/** Compact detail item cell — muted background */
export const surfaceDetailSx = {
  p: 1.5,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: '#f8f9fb',
  minWidth: 0,
  transition: 'all 200ms ease',
}

export const surfaceDetailCompactSx = {
  p: 1.25,
  borderRadius: 1.5,
  border: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.07)',
  backgroundColor: '#fbfcfe',
  minWidth: 0,
  transition: 'all 200ms ease',
}

export const surfaceDetailSoftSx = {
  p: { xs: 1, sm: 1.15 },
  borderRadius: 1.5,
  border: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.06)',
  backgroundColor: '#fbfcfe',
  minWidth: 0,
  transition: 'border-color 160ms ease, background-color 160ms ease',
  '&:hover': {
    borderColor: 'rgba(25, 118, 210, 0.18)',
    backgroundColor: '#ffffff',
  },
}

export const surfaceDetailPlainSx = {
  p: 0,
  pb: 1,
  borderRadius: 0,
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: 'transparent',
  minWidth: 0,
  transition: 'border-color 160ms ease',
  '&:hover': {
    borderColor: 'rgba(25, 118, 210, 0.22)',
  },
}

/** List container (borderRadius 3, no internal padding) */
export const surfaceListSx = {
  borderRadius: 3,
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

export const surfaceEmbeddedListSx = {
  borderRadius: 0,
  border: 0,
  backgroundColor: 'transparent',
  minWidth: 0,
  boxShadow: 'none',
}

// ─── Hover interactions ───────────────────────────────────────────────────────

/** Card lift hover — used on clickable gallery cards */
export const hoverLiftSx = {
  transition: 'all 200ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(17, 24, 39, 0.1)',
    borderColor: 'primary.main',
  },
}

/** Subtle row hover — used on list items */
export const hoverRowSx = {
  transition: 'all 200ms ease',
  '&:hover': {
    borderColor: 'primary.main',
    boxShadow: '0 2px 8px rgba(17, 24, 39, 0.08)',
  },
}

// ─── Grid column presets ──────────────────────────────────────────────────────

/** 2-col detail grid (xs=1, sm=2) */
export const gridDetail2ColSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
  columnGap: { xs: 1.25, sm: 2.25 },
  rowGap: 1.5,
  minWidth: 0,
  maxWidth: '100%',
}

/** 3-col detail grid (xs=1, md=3) */
export const gridDetail3ColSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
  columnGap: { xs: 1.25, md: 2.25 },
  rowGap: 1.5,
  minWidth: 0,
  maxWidth: '100%',
}

/** InfoGrid (xs=1, sm=2, lg=3) */
export const gridInfoSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
  columnGap: { xs: 1.25, sm: 2 },
  rowGap: 1.4,
  minWidth: 0,
  maxWidth: '100%',
}

/** Filter grid (xs=1, md=3, xl=8) */
export const gridFilterSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))', xl: 'repeat(8, minmax(0, 1fr))' },
  gap: 1.25,
  minWidth: 0,
}

/** Gallery grid (xs=1, sm=2, lg=3, xl=4) */
export const gridGallerySx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(3, minmax(0, 1fr))',
    xl: 'repeat(4, minmax(0, 1fr))',
  },
  gap: 2,
  mt: 1,
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
}

/** List table columns (xs=1, md=5-column proportional) */
export const gridListRowSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.4fr 1.2fr 0.9fr 0.9fr 1fr' },
  gap: 1,
  alignItems: 'center',
}

// ─── Chip presets ─────────────────────────────────────────────────────────────

/** Status chip — primary highlight bg */
export const chipHighlightSx = {
  backgroundColor: 'primary.50',
  color: 'primary.dark',
  fontWeight: 700,
  maxWidth: '100%',
}

/** Orientador chip — receives backgroundColor/color inline */
export const chipOrientadorBase = {
  fontWeight: 700,
  maxWidth: '100%',
}

// ─── Dialog presets ───────────────────────────────────────────────────────────

export const dialogTitleSx = {
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

// ─── Section list header row ──────────────────────────────────────────────────

export const listHeaderRowSx = {
  display: { xs: 'none', md: 'grid' },
  gridTemplateColumns: '1.4fr 1.2fr 0.9fr 0.9fr 1fr',
  gap: 1,
  px: 0.5,
}

export const gridCards3Sx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
  gap: 2.5,
  minWidth: 0,
}

export const gridStatsSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' },
  gap: 2,
  minWidth: 0,
}

export const gridSplitSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
  gap: 2,
  minWidth: 0,
}

export const gridCalendarSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '3fr 1.1fr' },
  gap: 2,
  minWidth: 0,
}

export const gridChartSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.35fr 0.9fr' },
  gap: 2.5,
  minWidth: 0,
}

export const weekGridSx = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: 0.5,
  minWidth: 0,
}

export const chartBoxSx = {
  height: { xs: 260, sm: 300, md: 320 },
}

export const chartBoxCompactSx = {
  height: { xs: 240, sm: 280, md: 300 },
}

export const calendarSurfaceSx = {
  backgroundColor: '#ffffff',
  '& .rbc-calendar': { fontFamily: 'inherit', minHeight: 580, backgroundColor: '#ffffff' },
  '& .rbc-toolbar': { mb: 1.5, flexWrap: 'wrap', gap: 1 },
  '& .rbc-toolbar button': {
    border: '1px solid #e5e7eb',
    borderRadius: '8px !important',
    px: 1.5,
    py: 0.5,
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#374151',
    cursor: 'pointer',
    background: '#fff',
    '&:hover': { background: '#f3f4f6' },
    '&.rbc-active': {
      background: '#1e88e5 !important',
      color: '#fff !important',
      borderColor: '#1e88e5 !important',
    },
  },
  '& .rbc-month-view': {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  '& .rbc-header': {
    py: 0.75,
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#6b7280',
    borderColor: '#e5e7eb',
  },
  '& .rbc-day-bg': { backgroundColor: '#ffffff', borderColor: '#f3f4f6 !important' },
  '& .rbc-off-range-bg': { background: '#fafafa' },
  '& .rbc-today': { background: 'rgba(30,136,229,0.06) !important' },
  '& .rbc-event': {
    background: '#1e88e5',
    borderRadius: '6px !important',
    fontSize: '0.75rem',
    fontWeight: 600,
    border: 'none !important',
    px: '6px !important',
  },
  '& .rbc-show-more': {
    color: '#1e88e5',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  '& .rbc-date-cell': {
    px: 0.75,
    pt: 0.5,
    fontSize: '0.8125rem',
    fontWeight: 600,
  },
  '& .rbc-time-view': {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    border: '1px solid #e5e7eb',
  },
  '& .rbc-agenda-view': { backgroundColor: '#ffffff' },
  '& .rbc-agenda-view table': { fontSize: '0.875rem', backgroundColor: '#ffffff' },
}

export const iconTilePrimarySx = {
  width: 42,
  height: 42,
  borderRadius: 2,
  display: 'grid',
  placeItems: 'center',
  color: 'primary.main',
  backgroundColor: 'primary.50',
  flexShrink: 0,
}

export const iconTileMutedSx = {
  width: 36,
  height: 36,
  borderRadius: 2,
  display: 'grid',
  placeItems: 'center',
  color: 'text.secondary',
  backgroundColor: '#f3f4f6',
  flexShrink: 0,
}

export const footerDividerSx = {
  mt: 'auto',
  pt: 1.5,
  borderTop: '1px solid',
  borderColor: 'divider',
}

export const footerPlainSx = {
  mt: 0,
  pt: 0,
  borderTop: 0,
}

export const sectionHeadingSx = {
  minWidth: 0,
}

export const sectionHeadingPlainSx = {
  minWidth: 0,
  pb: 0.75,
  borderBottom: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
}

export const sectionHeadingCompactSx = {
  minWidth: 0,
  pb: 0.25,
}

export const sectionTitleTextSx = {
  fontWeight: 800,
  minWidth: 0,
}

export const detailItemRootSx = {
  '& .DetailItem-copyButton': {
    opacity: 0,
  },
  '&:hover .DetailItem-copyButton, &:focus-within .DetailItem-copyButton': {
    opacity: 0.68,
  },
  '@media (hover: none)': {
    '& .DetailItem-copyButton': {
      opacity: 0.45,
    },
  },
}

export const detailItemIconSx = {
  flexShrink: 0,
  pt: 0.15,
  color: 'primary.main',
  opacity: 0.72,
  '& .MuiSvgIcon-root': {
    fontSize: 18,
  },
}

export const detailItemLabelSx = {
  ...textSx,
  fontWeight: 700,
  fontSize: '0.68rem',
  lineHeight: 1.35,
  letterSpacing: 0,
  textTransform: 'uppercase',
}

export const detailItemValueSx = {
  ...textSx,
  fontWeight: 650,
  lineHeight: 1.45,
}

export const detailItemCopyButtonSx = {
  flexShrink: 0,
  mt: -0.35,
  mr: -0.5,
  color: 'text.secondary',
  transition: 'opacity 160ms ease, color 160ms ease',
  '&:hover': {
    color: 'primary.main',
    backgroundColor: 'rgba(25, 118, 210, 0.06)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 15,
  },
}

export const dialogActionsSx = {
  px: 3,
  py: 2,
}

export const buttonStartSx = {
  alignSelf: 'flex-start',
}

export const noWrapTextSx = {
  ...textSx,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const containedSx = {
  minWidth: 0,
  maxWidth: '100%',
}

export const containedNoWrapSx = {
  ...containedSx,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const containedChildrenSx = {
  '& > *': {
    minWidth: 0,
    maxWidth: '100%',
  },
}

export const chipContainedSx = {
  minWidth: 0,
  maxWidth: '100%',
  '& .MuiChip-label': {
    minWidth: 0,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  '& .MuiChip-icon': {
    flexShrink: 0,
  },
}

// ─── Action panel header ──────────────────────────────────────────────────────

export const sectionTitleSx = {
  p: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
}

// ─── Action buttons ─────────────────────────────────────────────────────────

export const surfaceActionCardSx = {
  ...surfaceCardSx,
  borderRadius: 2.5,
}

export const surfaceActionCardCompactSx = {
  p: 1.25,
  borderRadius: 2,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#fbfcfe',
  minWidth: 0,
}

export const actionButtonGroupSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(3, minmax(0, 1fr))',
  },
  gap: 1,
  minWidth: 0,
  maxWidth: '100%',
}

export const actionButtonGroupCompactSx = {
  ...actionButtonGroupSx,
  gap: 0.75,
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(5, minmax(0, 1fr))',
  },
  '& .MuiButton-root': {
    minHeight: 34,
    px: 1,
    fontSize: '0.78rem',
  },
}

export const actionButtonSx = {
  minHeight: 40,
  minWidth: 0,
  maxWidth: '100%',
  px: 1.5,
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '& .MuiButton-startIcon': {
    flexShrink: 0,
    mr: 0.75,
    ml: 0,
  },
  '& .MuiButton-endIcon': {
    flexShrink: 0,
    ml: 0.75,
    mr: 0,
  },
}

// ─── Flow intro ─────────────────────────────────────────────────────────────

export const flowIntroTimelineSx = {
  listStyle: 'none',
  p: 0,
  m: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  minWidth: 0,
}

export const flowIntroStepSx = ({ isLast }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr)',
  columnGap: { xs: 1.25, sm: 1.75 },
  minWidth: 0,
  pb: isLast ? 0 : { xs: 2.25, sm: 2.5 },
  '&::after': isLast
    ? {}
    : {
        content: '""',
        position: 'absolute',
        top: 40,
        bottom: 0,
        left: 19,
        width: 2,
        borderRadius: 999,
        backgroundColor: 'rgba(17, 24, 39, 0.12)',
      },
})

export const flowIntroMarkerSx = {
  position: 'relative',
  zIndex: 1,
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  backgroundColor: 'primary.50',
  border: '1px solid',
  borderColor: 'rgba(25, 118, 210, 0.28)',
  color: 'primary.dark',
  fontWeight: 800,
}

export const flowIntroStepContentSx = {
  minWidth: 0,
  pt: 0.35,
  pb: 0.25,
}

export const flowIntroDialogHeaderSx = {
  minWidth: 0,
  pb: 0.5,
}

export const flowIntroFooterSx = {
  mt: 2.5,
  pt: 2,
  borderTop: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  minWidth: 0,
}

export const flowIntroActionsSx = {
  width: '100%',
  '& .MuiButton-root': {
    width: { xs: '100%', sm: 'auto' },
  },
  '& > :last-child': {
    ml: { sm: 'auto' },
  },
}

// ─── Form screens ───────────────────────────────────────────────────────────

export const formFlowLayoutSx = {
  pb: { xs: 8, md: 10 },
}

export const formFlowLayoutContentSx = {
  gap: { xs: 1.5, md: 2 },
}

export const formFlowFormSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1, md: 1.25 },
  minWidth: 0,
  pb: { xs: 8, md: 9 },
}

export const formStepperShellSx = {
  px: { xs: 0, sm: 0.5 },
  py: { xs: 0.25, sm: 0.35 },
  backgroundColor: 'transparent',
  minWidth: 0,
  width: '100%',
  alignSelf: 'stretch',
  display: 'block',
}

export const formStepperStackSx = {
  minWidth: 0,
  width: '100%',
  alignItems: 'stretch',
}

export const formStepperHeaderSx = {
  display: { xs: 'none', sm: 'block' },
  mb: 0.5,
  minWidth: 0,
}

export const formStepperTitleSx = {
  display: 'block',
}

export const formStepperSubtitleSx = {
  display: 'block',
  lineHeight: 1.35,
}

export const formStepperGridSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  minWidth: 0,
  width: 'max-content',
  maxWidth: '100%',
  gridColumn: 2,
  justifySelf: 'center',
  px: { xs: 0.25, sm: 0.5 },
  py: 0.25,
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    height: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(107, 114, 128, 0.28)',
    borderRadius: 999,
  },
}

export const formStepperTrackSx = {
  display: { xs: 'none', sm: 'grid' },
  gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
  '&::before, &::after': {
    content: '""',
    minWidth: 0,
  },
}

export const formStepItemSx = ({ isCompleted, isLast }) => ({
  position: 'relative',
  flex: '0 0 72px',
  width: 72,
  minHeight: 34,
  '&::after': isLast
    ? {}
    : {
        content: '""',
        position: 'absolute',
        top: 15,
        left: 'calc(50% + 17px)',
        width: 38,
        height: 2,
        borderRadius: 999,
        backgroundColor: isCompleted ? 'primary.main' : 'rgba(17, 24, 39, 0.12)',
        transition: 'background-color 160ms ease',
        zIndex: 0,
      },
})

export const formStepButtonSx = ({ isActive }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  p: 0,
  m: 0,
  border: 0,
  background: 'transparent',
  appearance: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
  color: 'inherit',
  font: 'inherit',
  textAlign: 'center',
  cursor: 'pointer',
  minWidth: 0,
  minHeight: 34,
  '& .flow-step-indicator': {
    boxShadow: isActive ? '0 0 0 4px rgba(30, 136, 229, 0.12)' : 'none',
  },
  '&:hover .flow-step-indicator': {
    borderColor: 'primary.main',
    backgroundColor: isActive ? 'primary.main' : '#f8fbff',
  },
  '&:focus-visible': {
    outline: 'none',
  },
  '&:focus-visible .flow-step-indicator': {
    boxShadow: '0 0 0 4px rgba(30, 136, 229, 0.18)',
  },
})

export const formStepIndicatorSx = ({ isActive, isCompleted }) => ({
  width: 30,
  height: 30,
  borderRadius: '50%',
  border: '2px solid',
  borderColor: isActive || isCompleted ? 'primary.main' : 'rgba(17, 24, 39, 0.18)',
  backgroundColor: isActive ? 'primary.main' : isCompleted ? 'primary.50' : '#ffffff',
  color: isActive ? '#ffffff' : isCompleted ? 'primary.dark' : 'text.secondary',
  display: 'grid',
  placeItems: 'center',
  fontSize: '0.78rem',
  fontWeight: 800,
  lineHeight: 1,
  transition: 'border-color 160ms ease, background-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
})

export const formStepLabelSx = ({ isActive, isCompleted }) => ({
  width: '100%',
  maxWidth: 138,
  minHeight: 30,
  px: 0.5,
  color: isActive ? 'text.primary' : isCompleted ? 'primary.dark' : 'text.secondary',
  fontWeight: isActive ? 800 : 650,
  lineHeight: 1.2,
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflowWrap: 'anywhere',
})

export const formStepperMobileProgressSx = {
  display: { xs: 'block', sm: 'none' },
  width: '100%',
  maxWidth: 520,
  mx: 'auto',
}

export const formStepperNavigationSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'minmax(150px, 1fr) auto minmax(150px, 1fr)' },
  gap: 1,
  alignItems: 'center',
  justifyItems: 'center',
  width: '100%',
  maxWidth: 520,
  mx: 'auto',
  minWidth: 0,
}

export const formStepperNavigationButtonSx = {
  width: { xs: '100%', sm: '100%' },
  minWidth: { sm: 150 },
  whiteSpace: 'nowrap',
}

export const formStepperNavigationCountSx = {
  textAlign: 'center',
  minWidth: { sm: 54 },
  whiteSpace: 'nowrap',
}

export const formHeaderShellSx = {
  p: { xs: 1.25, sm: 1.5 },
  borderRadius: 0,
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: 'transparent',
  minWidth: 0,
}

export const formHeaderGridSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: { xs: 1, sm: 1.5 },
  alignItems: 'flex-start',
  minWidth: 0,
}

export const formHeaderMetaSx = {
  justifySelf: 'end',
  alignSelf: 'start',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: 1,
  minWidth: 0,
  maxWidth: { xs: '46vw', sm: 'none' },
  '& .MuiChip-root': {
    maxWidth: '100%',
  },
}

export const formBackLinkSx = {
  mt: 0.5,
  px: 0,
  minWidth: 'auto',
  width: 'fit-content',
  alignSelf: 'flex-start',
}

export const formMetaChipSx = {
  backgroundColor: 'rgba(30, 136, 229, 0.1)',
  color: 'primary.dark',
  fontWeight: 800,
}

export const formTitleActionsSx = {
  alignItems: { xs: 'stretch', lg: 'flex-end' },
  minWidth: { xs: '100%', lg: 170 },
}

export const formPageHeaderTopSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1.1, sm: 1.35 },
  minWidth: 0,
  width: '100%',
}

export const formCardSx = {
  borderRadius: 2,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
  boxShadow: '0 10px 28px rgba(17, 24, 39, 0.06)',
  overflow: 'visible',
  minWidth: 0,
}

export const formCardBodySx = {
  p: { xs: 1, sm: 1.25, md: 1.5 },
  pt: { xs: 0.85, sm: 1 },
  minWidth: 0,
}

export const formCardPlainSx = {
  border: 0,
  borderRadius: 0,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  overflow: 'visible',
}

export const formSectionSx = {
  p: { xs: 0.75, sm: 1 },
  pl: { xs: 0.75, sm: 1 },
  borderRadius: 0,
  border: 0,
  backgroundColor: 'transparent',
  minWidth: 0,
}

export const formGridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(4, minmax(0, 1fr))',
  },
  columnGap: { xs: 1, sm: 1.25, md: 1.5 },
  rowGap: { xs: 1.9, sm: 4 },
  minWidth: 0,
  maxWidth: '100%',
}

export const formGridCompactSx = {
  ...formGridSx,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
  columnGap: { xs: 1, sm: 1.25 },
  rowGap: 1.75,
  alignItems: 'start',
}

export const formGridStrategySx = {
  ...formGridSx,
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
  columnGap: { xs: 1, md: 1.35 },
  rowGap: 1.85,
  alignItems: 'start',
}

export const formNaturalidadeGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '120px minmax(0, 1fr)' },
  gap: { xs: 1.8, sm: 2 },
  minWidth: 0,
}

export const formFieldSx = {
  minWidth: 0,
}

export const formReadOnlyGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
  gap: { xs: 0.85, sm: 1 },
  minWidth: 0,
}

export const formReadOnlyItemSx = {
  minWidth: 0,
}

export const formReadOnlyLabelSx = {
  display: 'block',
  fontWeight: 700,
  lineHeight: 1.25,
}

export const formReadOnlyValueSx = {
  mt: 0.25,
  fontWeight: 600,
  color: 'text.primary',
  lineHeight: 1.35,
  ...textSx,
}

export const formInputSx = {
  '& .MuiInputBase-root': {
    backgroundColor: '#ffffff',
    borderRadius: 1,
    minHeight: 36,
  },
  '& .MuiInputBase-input': {
    py: 0.75,
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'text.disabled',
    opacity: 0.75,
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
  },
  '& .MuiFormHelperText-root': {
    ml: 0,
    mt: 0.35,
  },
}

export const formTextAreaSx = {
  ...formInputSx,
  '& .MuiInputBase-root': {
    ...formInputSx['& .MuiInputBase-root'],
    alignItems: 'flex-start',
  },
}

export const formControlSx = {
  gap: 0.3,
  minWidth: 0,
  '& .MuiFormHelperText-root': {
    mx: 0,
  },
}

export const formHelperTextSx = {
  mx: 0,
  mt: 0.25,
}

export const formLabelSx = {
  fontWeight: 700,
  color: 'text.primary',
  fontSize: '0.82rem',
  lineHeight: 1.25,
}

export const formOptionGroupSx = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: 0.75,
  rowGap: 0.1,
}

export const formOptionControlSx = {
  ml: 0,
  mr: 0.75,
  minHeight: 26,
  width: 'auto',
  '& .MuiRadio-root, & .MuiCheckbox-root': {
    p: 0.35,
  },
  '& .MuiFormControlLabel-label': {
    fontSize: '0.82rem',
  },
}

export const formYesNoGroupSx = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 0.5,
  minWidth: 0,
}

export const formYesNoOptionSx = ({ checked }) => ({
  m: 0,
  px: 0.75,
  width: 'auto',
  minWidth: 76,
  minHeight: 32,
  borderRadius: 1,
  border: '1px solid',
  borderColor: checked ? 'primary.main' : 'rgba(17, 24, 39, 0.12)',
  backgroundColor: checked ? 'primary.50' : '#ffffff',
  transition: 'border-color 160ms ease, background-color 160ms ease',
  '& .MuiRadio-root': {
    p: 0.5,
  },
  '& .MuiFormControlLabel-label': {
    fontSize: '0.82rem',
    fontWeight: checked ? 800 : 600,
  },
})

export const formChipWrapSx = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.5,
  minWidth: 0,
}

export const formMultiSelectSx = {
  backgroundColor: '#ffffff',
  borderRadius: 1.5,
}

export const formSignatureShellSx = {
  p: 0,
  border: 0,
  backgroundColor: 'transparent',
  minWidth: 0,
}

export const formSignatureCanvasFrameSx = ({ signed = false, error = false } = {}) => ({
  border: '1px dashed',
  borderColor: error ? 'error.main' : signed ? 'rgba(25, 118, 210, 0.38)' : 'rgba(17, 24, 39, 0.24)',
  borderRadius: 1.5,
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  transition: 'border-color 160ms ease, background-color 160ms ease',
  '&:hover': {
    borderColor: error ? 'error.main' : 'primary.main',
    backgroundColor: '#fbfdff',
  },
})

export const formSignatureCanvasSx = {
  width: '100%',
  height: { xs: 140, sm: 160 },
  display: 'block',
  touchAction: 'none',
  cursor: 'crosshair',
}

export const formSignatureFooterSx = {
  minWidth: 0,
  gap: 1.25,
}

export const formSignatureStatusSx = ({ signed = false } = {}) => ({
  height: 22,
  fontWeight: 800,
  backgroundColor: signed ? 'primary.50' : '#f3f4f6',
  color: signed ? 'primary.dark' : 'text.secondary',
})

export const requiredAsteriskSx = {
  color: 'error.main',
  fontWeight: 800,
}

export const formErrorMessageSx = {
  mx: 0,
  mt: 0.4,
  fontWeight: 600,
}

export const formRepeatableRowSx = {
  p: 0.85,
  borderRadius: 1.25,
  borderColor: 'rgba(17, 24, 39, 0.1)',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

export const formRepeatableHeaderSx = {
  pb: 0.65,
  borderBottom: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.07)',
  minWidth: 0,
}

export const formRepeatableLabelSx = {
  height: 22,
  fontWeight: 800,
  backgroundColor: '#f3f7fb',
  color: 'primary.dark',
}

export const formRepeatableRemoveButtonSx = {
  minHeight: 28,
  px: 0.75,
  fontSize: '0.76rem',
  borderRadius: 1,
  justifyContent: 'center',
  '& .MuiButton-startIcon': {
    mr: 0.4,
    ml: 0,
  },
}

export const formAddRowButtonSx = {
  alignSelf: 'center',
  minHeight: 34,
  px: 1.1,
  borderRadius: 1.25,
  borderColor: 'rgba(25, 118, 210, 0.28)',
  backgroundColor: '#ffffff',
}

export const formActionsBarSx = {
  p: { xs: 1.25, sm: 1.5 },
  borderRadius: 2,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#ffffff',
  minWidth: 0,
}

export const formActionsFooterSx = {
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  p: { xs: 1, sm: 1.15 },
  borderTop: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.96)',
  backdropFilter: 'blur(10px)',
  minWidth: 0,
}

export const formActionsFooterToolbarSx = {
  width: '100%',
  '& > :first-of-type': {
    flexShrink: 0,
  },
  '& > :last-child': {
    ml: { sm: 'auto' },
  },
}

export const formActionsFooterMetaSx = {
  textAlign: { xs: 'center', sm: 'left' },
  fontWeight: 700,
  minWidth: 0,
}

export const termPrintSurfaceSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1.5, sm: 2 },
  p: { xs: 1.25, sm: 2 },
  border: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.12)',
  borderRadius: 1.5,
  backgroundColor: '#ffffff',
  minWidth: 0,
  '@media print': {
    border: 0,
    borderRadius: 0,
    p: 0,
  },
}

export const termDocumentTitleSx = {
  fontWeight: 800,
  lineHeight: 1.25,
  color: 'text.primary',
}

export const termParagraphSx = {
  lineHeight: 1.8,
  color: 'text.primary',
}

export const termInlineValueSx = {
  display: 'inline',
  fontWeight: 800,
  borderBottom: '1px solid rgba(17, 24, 39, 0.34)',
  px: 0.25,
  overflowWrap: 'anywhere',
}

export const termDetailsGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
  gap: 1,
  minWidth: 0,
}

export const termDetailItemSx = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.25,
  p: 1,
  borderRadius: 1,
  border: '1px solid rgba(17, 24, 39, 0.08)',
  backgroundColor: 'rgba(248, 250, 252, 0.86)',
  minWidth: 0,
}

export const termDetailLabelSx = {
  color: 'text.secondary',
  fontWeight: 800,
  textTransform: 'uppercase',
}

export const termDetailValueSx = {
  color: 'text.primary',
  fontWeight: 700,
  overflowWrap: 'anywhere',
}

export const termSignatureGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
  gap: 2,
  mt: 1,
}

export const termSignatureLineSx = {
  minWidth: 0,
  pt: 4,
}

export const termSignatureLabelSx = {
  borderTop: '1px solid rgba(17, 24, 39, 0.42)',
  pt: 0.75,
}

export const formProgressSx = {
  p: { xs: 1, sm: 1.1 },
  borderRadius: 1.5,
  border: '1px solid',
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: 'rgba(255, 255, 255, 0.72)',
  minWidth: 0,
}

export const formProgressLabelSx = {
  fontWeight: 800,
  lineHeight: 1.25,
}

export const formProgressHelperSx = {
  lineHeight: 1.25,
}

export const formProgressBarSx = {
  height: 5,
  borderRadius: 999,
  backgroundColor: 'rgba(17, 24, 39, 0.1)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 999,
  },
}

export const formAlertSx = {
  borderRadius: 1.5,
}

// ─── System states / feedback ───────────────────────────────────────────────

export const pageStateSx = {
  p: { xs: 2, sm: 2.5 },
  borderRadius: 2,
  borderColor: 'divider',
  backgroundColor: '#ffffff',
  minWidth: 0,
  maxWidth: '100%',
}

export const pageStateCompactSx = {
  p: 1.5,
  borderRadius: 2,
  borderColor: 'rgba(17, 24, 39, 0.08)',
  backgroundColor: '#fbfcfe',
  minWidth: 0,
  maxWidth: '100%',
}

export const pageStateCenteredSx = {
  alignItems: 'center',
  textAlign: 'center',
}

export const pageStateIconSx = {
  width: 42,
  height: 42,
  borderRadius: 2,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
}

export const pageStateIconCompactSx = {
  width: 34,
  height: 34,
  borderRadius: 1.5,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
}

export const inlineFeedbackSx = {
  borderRadius: 1.5,
  alignItems: 'flex-start',
  '& .MuiAlert-message': {
    minWidth: 0,
  },
}

export const statusBannerSx = {
  borderRadius: 2,
  alignItems: 'flex-start',
  '& .MuiAlert-message': {
    minWidth: 0,
    width: '100%',
  },
}

export const skeletonBlockSx = {
  borderRadius: 2,
  backgroundColor: 'rgba(17, 24, 39, 0.08)',
}

// ─── Auth layout ─────────────────────────────────────────────────────────────

export const authShellSx = {
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: { xs: 'center', md: 'flex-start' },
  background: 'linear-gradient(150deg, #f0f7ff 0%, #e8f4fd 50%, #f5f9ff 100%)',
  px: { xs: 2, sm: 3 },
}

export const authContentSx = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: 440,
  mx: { xs: 'auto', md: 0 },
  ml: { md: '8vw', lg: '12vw' },
}

export const authIllustrationSx = {
  position: 'fixed',
  right: { xs: '-20%', sm: '-10%', md: '-4%', lg: '0%' },
  bottom: { xs: '-8%', sm: '-12%', md: '-14%' },
  width: { xs: '90vw', sm: '60vw', md: '48vw', lg: '44vw' },
  maxWidth: 860,
  height: 'auto',
  opacity: { xs: 0.1, sm: 0.16, md: 0.22, lg: 0.28 },
  filter: 'saturate(0.85) contrast(1.05)',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 0,
  display: 'block',
}

export const authCardSx = {
  borderRadius: 3,
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 40px rgba(17,24,39,0.10), 0 2px 8px rgba(17,24,39,0.05)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
}

export const authCardBodySx = {
  p: { xs: 3, sm: 4 },
}

export const authCardBodyWithFooterSx = {
  ...authCardBodySx,
  pb: 2.5,
}

export const authHeaderSx = {
  textAlign: 'center',
  mb: 3,
}

export const authIconFrameSx = {
  width: 48,
  height: 48,
  borderRadius: '12px',
  backgroundColor: 'primary.50',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mx: 'auto',
  mb: 1.5,
}

export const authIconSx = {
  color: 'primary.main',
  fontSize: 22,
}

export const authTitleSx = {
  fontWeight: 800,
  letterSpacing: '-0.01em',
}

export const authSubtitleSx = {
  mt: 0.5,
}

export const authFormSx = {
  mt: 0,
}

export const authSubmitButtonSx = {
  mt: 0.5,
  py: 1.25,
  fontWeight: 700,
  fontSize: '0.9375rem',
}

export const authInlineAlertSx = {
  mt: 0.5,
}

export const authFooterSx = {
  px: { xs: 3, sm: 4 },
  py: 2,
  borderTop: '1px solid #f3f4f6',
  textAlign: 'center',
  backgroundColor: '#fafafa',
}

export const authInlineFooterSx = {
  mt: 3,
  textAlign: 'center',
  borderTop: '1px solid #f3f4f6',
  pt: 2.5,
}

export const authLinkSx = {
  fontWeight: 700,
  color: 'primary.main',
}

export const authDividerSx = {
  mb: 3,
}
