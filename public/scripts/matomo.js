// eslint-disable-next-line no-undef
var _paq = (window._paq = window._paq || [])
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView'])
_paq.push(['enableLinkTracking'])
;(function () {
  var u = '//matomo.monboreseau.be/'
  _paq.push(['setTrackerUrl', u + 'matomo.php'])
  _paq.push(['setSiteId', '1'])

  // eslint-disable-next-line no-undef
  var d = document,
    g = d.createElement('script'),
    s = d.getElementsByTagName('script')[0]
  g.async = true
  g.src = u + 'matomo.js'
  s.parentNode.insertBefore(g, s)
})()

// eslint-disable-next-line no-undef
console.info('Matomo is loaded')
