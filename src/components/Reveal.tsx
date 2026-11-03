import type { ComponentProps } from 'react';
import { Fade } from '@animate-ui/react/primitives/effects/fade';

/** Animate UI's entrance primitive respects the app's motion preferences. */
export function Reveal(props: ComponentProps<typeof Fade>) {
  return <Fade {...props} />;
}
