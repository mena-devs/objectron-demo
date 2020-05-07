import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

const analytics = Analytics({
  app: 'objectron',
  plugins: [
    googleAnalytics({
      trackingId: 'UA-101100111-3',
    })
  ]
});

export default analytics