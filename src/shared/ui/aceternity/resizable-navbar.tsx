'use client'
// Adapted from https://ui.aceternity.com/registry/resizable-navbar.json.
// React Router links, keyboard controls and threshold-based surface styling for this app.
import { Link } from 'react-router'
import { cn } from '@/shared/lib/cn'
import { Menu as IconMenu2, X as IconX } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

import React, { useEffect, useId, useRef, useState } from 'react'

interface NavbarProps {
  children: React.ReactNode
  className?: string
  label: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: {
    name: string
    link: string
    active?: boolean
    external?: boolean
    label?: string
  }[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
  id: string
}

export const Navbar = ({ children, className, label }: NavbarProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [hidden, setHidden] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY)
    let travel = 0
    const updateDirection = () => {
      const y = Math.max(0, window.scrollY)
      const delta = y - previousY
      previousY = y
      if (y <= 8) {
        travel = 0
        setHidden(false)
        return
      }
      if (!delta) return
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
      if (Math.abs(travel) < 8) return

      const nav = navRef.current
      if (nav?.contains(document.activeElement) || nav?.querySelector('[aria-expanded="true"]'))
        return

      // Direction changes trigger a single transition, independent of scroll distance.
      setHidden(travel > 0)
    }
    window.addEventListener('scroll', updateDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateDirection)
  }, [])

  useEffect(() => {
    const marker = ref.current
    if (!marker) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <span
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[100px] h-px w-px"
      />
      <motion.nav
        ref={navRef}
        aria-label={label}
        aria-hidden={hidden || undefined}
        inert={hidden}
        initial={false}
        animate={{
          y: hidden && !reducedMotion ? 'calc(-100% - 2rem)' : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: hidden ? 'none' : undefined }}
        className={cn('fixed inset-x-0 top-4 z-40 w-full px-4', className)}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) && (child.type === NavBody || child.type === MobileNav)
            ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
            : child,
        )}
      </motion.nav>
    </>
  )
}

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      data-compact={!!visible}
      style={{
        minWidth: '720px',
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const hoverId = useId()
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative hidden flex-row items-center justify-center gap-1 text-sm font-medium lg:flex',
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onFocus={() => setHovered(idx)}
          onBlur={() => setHovered(null)}
          onClick={onItemClick}
          className="relative rounded-full px-4 py-3"
          key={`link-${idx}`}
          to={item.link}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          aria-label={item.label}
          aria-current={item.active ? 'page' : undefined}
        >
          {(hovered === idx || (hovered === null && item.active)) && (
            <motion.div
              layoutId={reducedMotion ? undefined : hoverId}
              className="absolute inset-0 h-full w-full rounded-full bg-current/10"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      data-compact={!!visible}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-3xl bg-transparent px-3 py-2 lg:hidden',
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  )
}

export const MobileNavMenu = ({ children, className, isOpen, onClose, id }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950',
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
  label,
  buttonRef,
}: {
  isOpen: boolean
  onClick: () => void
  controls: string
  label: string
  buttonRef?: React.Ref<HTMLButtonElement>
}) => {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls={controls}
      className="grid size-11 place-items-center rounded-full"
    >
      {isOpen ? <IconX size={22} aria-hidden="true" /> : <IconMenu2 size={22} aria-hidden="true" />}
    </button>
  )
}

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img src="https://assets.aceternity.com/logo-dark.png" alt="logo" width={30} height={30} />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  )
}

export const NavbarButton = ({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
} & (React.ComponentPropsWithoutRef<'a'> | React.ComponentPropsWithoutRef<'button'>)) => {
  const baseStyles =
    'px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center'

  const variantStyles = {
    primary:
      'shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    secondary: 'bg-transparent shadow-none dark:text-white',
    dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
    gradient:
      'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
  }

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
