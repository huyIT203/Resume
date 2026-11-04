import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

export function ScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map<string, number>())
  useLayoutEffect(() => {
    document.getElementById('main')?.focus({ preventScroll: true })
    const top = navigationType === 'POP' ? (positions.current.get(location.key) ?? 0) : 0
    window.scrollTo({ top, left: 0, behavior: 'instant' })
    return () => {
      positions.current.set(location.key, window.scrollY)
    }
  }, [location.key, navigationType])
  return null
}
