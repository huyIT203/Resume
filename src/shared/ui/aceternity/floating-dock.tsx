// Adapted from https://ui.aceternity.com/registry/floating-dock.json.
// Vertical axis and transform magnification keep the dock's layout stable.
import { useEffect, useId, useRef, useState, type ReactNode, type PointerEvent } from 'react'
import { Link } from 'react-router'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import styles from './floating-dock.module.css'

type DockItemBase = {
  id: string
  title: string
  tooltip?: ReactNode
  label?: string
  active?: boolean
  pressed?: boolean
  icon: (animate: boolean) => ReactNode
}

export type FloatingDockItem = DockItemBase &
  (
    | { href: string; external?: boolean; onSelect?: never }
    | { onSelect: () => void; href?: never; external?: never }
  )

export function FloatingDock({
  items,
  label,
  onSky = false,
}: {
  items: FloatingDockItem[]
  label: string
  onSky?: boolean
}) {
  const mouseY = useMotionValue(Infinity)
  const centers = useRef(new Map<string, number>())
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const reset = () => {
      centers.current.clear()
      mouseY.set(Infinity)
    }
    window.addEventListener('resize', reset)
    return () => window.removeEventListener('resize', reset)
  }, [mouseY])

  return (
    <nav
      className={`${styles.dock}${onSky ? ` ${styles.onSky}` : ''}`}
      aria-label={label}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse' || reducedMotion) return
        if (!centers.current.size) {
          for (const slot of event.currentTarget.querySelectorAll<HTMLElement>('[data-dock-id]')) {
            const bounds = slot.getBoundingClientRect()
            centers.current.set(slot.dataset.dockId!, bounds.top + bounds.height / 2)
          }
        }
        mouseY.set(event.clientY)
      }}
      onPointerLeave={() => {
        mouseY.set(Infinity)
        centers.current.clear()
      }}
    >
      <ul className={styles.items}>
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseY={mouseY}
            getCenter={() => centers.current.get(item.id) ?? 0}
          />
        ))}
      </ul>
    </nav>
  )
}

function DockIcon({
  item,
  mouseY,
  getCenter,
}: {
  item: FloatingDockItem
  mouseY: MotionValue<number>
  getCenter: () => number
}) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const tooltipId = useId()
  const focusScale = useMotionValue(1)
  const distance = useTransform(mouseY, (value) => value - getCenter())
  const pointerScale = useTransform(distance, [-120, 0, 120], [1, 1.35, 1])
  const targetScale = useTransform(() => Math.max(pointerScale.get(), focusScale.get()))
  const scale = useSpring(targetScale, { mass: 0.1, stiffness: 150, damping: 12 })
  const showingLabel = (hovered || focused) && !dismissed

  useEffect(() => {
    if (!showingLabel) return
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDismissed(true)
    }
    window.addEventListener('keydown', dismiss)
    return () => window.removeEventListener('keydown', dismiss)
  }, [showingLabel])

  useEffect(() => {
    focusScale.set(focused ? 1.35 : 1)
  }, [focused, focusScale])

  const content = (
    <>
      <motion.span className={styles.surface} style={{ scale: reducedMotion ? 1 : scale }}>
        {item.icon(!reducedMotion && (hovered || focused))}
      </motion.span>
      {item.active && <span className={styles.activeDot} aria-hidden="true" />}
    </>
  )
  const controlProps = {
    className: `${styles.control}${item.active ? ` ${styles.active}` : ''}`,
    'aria-label': item.label ?? item.title,
    'aria-describedby': showingLabel ? tooltipId : undefined,
    onFocus: () => {
      setFocused(true)
      setDismissed(false)
    },
    onBlur: () => setFocused(false),
  }

  return (
    <li
      className={styles.slot}
      data-dock-id={item.id}
      onPointerEnter={(event: PointerEvent) => {
        if (event.pointerType === 'mouse') {
          setHovered(true)
          setDismissed(false)
        }
      }}
      onPointerLeave={() => setHovered(false)}
    >
      {item.href !== undefined ? (
        item.external ? (
          <a {...controlProps} href={item.href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        ) : (
          <Link {...controlProps} to={item.href} aria-current={item.active ? 'page' : undefined}>
            {content}
          </Link>
        )
      ) : (
        <button {...controlProps} type="button" aria-pressed={item.pressed} onClick={item.onSelect}>
          {content}
        </button>
      )}
      <AnimatePresence>
        {showingLabel && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            className={styles.tooltip}
            initial={{ opacity: 0, x: reducedMotion ? 0 : -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : -3 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
          >
            {item.tooltip ?? item.title}
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  )
}
