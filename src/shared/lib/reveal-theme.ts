import { flushSync } from 'react-dom'

let revealing = false

export async function revealTheme(origin: HTMLElement, update: () => void) {
  if (revealing) return
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    update()
    return
  }

  const bounds = origin.getBoundingClientRect()
  const x = bounds.left + bounds.width / 2
  const y = bounds.top + bounds.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const root = document.documentElement
  let applied = false
  let transition: ViewTransition | undefined
  const apply = () => {
    if (applied) return
    applied = true
    flushSync(update)
  }
  revealing = true
  root.dataset.themeReveal = ''

  try {
    const start = document.startViewTransition.bind(document) as (
      options: { update: () => void; types: string[] } | (() => void),
    ) => ViewTransition
    try {
      transition = start({ update: apply, types: ['theme'] })
    } catch {
      transition = start(apply)
    }
    await transition.ready
    await root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 650,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    ).finished
    await transition.finished
  } catch {
    apply()
    transition?.skipTransition()
  } finally {
    delete root.dataset.themeReveal
    revealing = false
  }
}
