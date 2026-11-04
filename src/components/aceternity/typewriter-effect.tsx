// Adapted from Aceternity UI's character-stagger Typewriter Effect.
// https://ui.aceternity.com/components/typewriter-effect
import { useEffect, useRef, type ReactNode } from 'react'
import { motion, stagger, useAnimate, useInView, useReducedMotion } from 'motion/react'

export type TypewriterWord = { text: string; className?: string; render?: (letters: ReactNode) => ReactNode }

export function TypewriterEffect({ words, start = true, onComplete, className, cursorClassName }: {
  words: TypewriterWord[]
  start?: boolean
  onComplete?: () => void
  className?: string
  cursorClassName?: string
}) {
  const [scope, animate] = useAnimate<HTMLSpanElement>()
  const inView = useInView(scope, { once: true })
  const reducedMotion = useReducedMotion()
  const callback = useRef(onComplete)
  callback.current = onComplete

  useEffect(() => {
    if (!start || !inView) return
    let cancelled = false
    const controls = animate('[data-typewriter-character]', { opacity: 1 }, {
      duration: reducedMotion ? 0 : 0.16,
      delay: reducedMotion ? 0 : stagger(0.045, { startDelay: 0.2 }),
      ease: 'easeInOut',
    })
    void controls.then(() => { if (!cancelled) callback.current?.() })
    return () => { cancelled = true; controls.stop() }
  }, [animate, inView, reducedMotion, start])

  return <span ref={scope} className={className}>
    <span className="sr-only">{words.map(word => word.text).join('')}</span>
    <span aria-hidden="true">
      {words.map((word, index) => {
        const letters = <span className={word.className}>{Array.from(word.text).map((char, characterIndex) => <motion.span
          key={characterIndex} data-typewriter-character initial={{ opacity: reducedMotion ? 1 : 0 }}
        >{char}</motion.span>)}</span>
        return <span key={index}>{word.render ? word.render(letters) : letters}</span>
      })}
      {start && !reducedMotion && <span className={cursorClassName}/>} 
    </span>
  </span>
}
