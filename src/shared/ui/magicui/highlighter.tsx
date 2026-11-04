// Adapted from Magic UI's Highlighter: https://magicui.design/docs/components/highlighter
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { annotate } from 'rough-notation'

type HighlighterProps = {
  children: ReactNode
  enabled?: boolean
  color?: string
  action?: 'highlight' | 'underline'
  className?: string
}

export function Highlighter({
  children,
  enabled = true,
  color = '#f4efa1',
  action = 'highlight',
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return
    const annotation = annotate(element, {
      type: action,
      color,
      animationDuration: 700,
      animate: !reducedMotion,
      iterations: 2,
      padding: action === 'highlight' ? 0 : 3,
      strokeWidth: 2.5,
      multiline: true,
    })
    annotation.show()
    return () => annotation.remove()
  }, [enabled, color, action, reducedMotion])

  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        isolation: 'isolate',
        // The annotation is inserted next to its target; contain both in this wrapper.
        clipPath: action === 'highlight' ? 'inset(-0.15em 0)' : undefined,
      }}
    >
      <span ref={elementRef} style={{ display: 'inline-block' }}>
        {children}
      </span>
    </span>
  )
}
