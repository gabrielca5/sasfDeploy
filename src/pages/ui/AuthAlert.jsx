import InlineFeedback from './InlineFeedback'

function AuthAlert({ children, severity = 'success' }) {
  return <InlineFeedback severity={severity}>{children}</InlineFeedback>
}

export default AuthAlert
