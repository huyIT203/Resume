import { motion } from 'motion/react'
import { IconWrapper, useAnimateIconContext, type IconProps } from '@animate-ui/react/icons'

function PortraitDrawing({ size, ...props }: IconProps<'default'>) {
  const { controls } = useAnimateIconContext()

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.g
        initial="initial"
        animate={controls}
        variants={{
          initial: { rotate: 0 },
          animate: { rotate: [0, -7, 5, 0], transition: { duration: 0.55 } },
        }}
        style={{ transformOrigin: '12px 12px' }}
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="8.5" r="2.5" />
        <path d="M7.5 17v-1a4.5 4.5 0 0 1 9 0v1" />
        <path d="M4 18h16" />
      </motion.g>
    </motion.svg>
  )
}

export function Portrait(props: IconProps<'default'>) {
  return <IconWrapper icon={PortraitDrawing} {...props} />
}
