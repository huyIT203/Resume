import type { ComponentProps, ReactNode } from 'react';
import * as CollapsiblePrimitive from '@animate-ui/react/primitives/radix-ui/collapsible';
import * as ContextMenuPrimitive from '@animate-ui/react/primitives/radix-ui/context-menu';
import * as DropdownMenuPrimitive from '@animate-ui/react/primitives/radix-ui/dropdown-menu';
import { Button } from '@animate-ui/react/primitives/buttons/button';
import { Ellipsis } from './animate-ui/icons/ellipsis';
import { cn } from './cn';

export const Collapsible = CollapsiblePrimitive.Root;
export function CollapsibleTrigger({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" className={cn('ui-collapsible-trigger', className)} {...props} />;
}
export function CollapsibleContent({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return <CollapsiblePrimitive.Content data-slot="collapsible-content" className={cn('ui-collapsible-content', className)} {...props} />;
}

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export function ContextMenuContent({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return <ContextMenuPrimitive.Portal><ContextMenuPrimitive.Content data-slot="context-menu-content" className={cn('ui-menu-content', className)} {...props} /></ContextMenuPrimitive.Portal>;
}
export function ContextMenuItem({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Item>) {
  return <ContextMenuPrimitive.Item data-slot="context-menu-item" className={cn('ui-menu-item', className)} {...props} />;
}
export function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn('ui-menu-separator', className)} {...props} />;
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export function DropdownMenuContent({ className, sideOffset = 6, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content data-slot="dropdown-menu-content" sideOffset={sideOffset} className={cn('ui-menu-content', className)} {...props} /></DropdownMenuPrimitive.Portal>;
}
export function DropdownMenuItem({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return <DropdownMenuPrimitive.Item data-slot="dropdown-menu-item" className={cn('ui-menu-item', className)} {...props} />;
}
export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn('ui-menu-separator', className)} {...props} />;
}

export type ProjectAction = { label: string; onSelect?: () => void; href?: string; icon?: ReactNode };
type ProjectActionsProps = { children: ReactNode; actions: ProjectAction[]; label: string; className?: string };

/** The same actions work by right-click, a visible menu button, and keyboard. */
export function ProjectActions({ children, actions, label, className }: ProjectActionsProps) {
  const items = (kind: 'context' | 'dropdown') => {
    const Item = kind === 'context' ? ContextMenuItem : DropdownMenuItem;
    return actions.map((action) => action.href ?
      <Item key={action.label} asChild onSelect={action.onSelect}>
        <a href={action.href} target={action.href.startsWith('http') ? '_blank' : undefined} rel={action.href.startsWith('http') ? 'noreferrer' : undefined}>{action.icon}<span>{action.label}</span></a>
      </Item> :
      <Item key={action.label} onSelect={action.onSelect}>{action.icon}<span>{action.label}</span></Item>);
  };
  return <ContextMenu>
    <ContextMenuTrigger asChild><div className={cn('project-actions-root', className)}>
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button className="project-actions-trigger" aria-label={label} title={label}><Ellipsis size={18} animateOnHover /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" aria-label={label}>{items('dropdown')}</DropdownMenuContent>
      </DropdownMenu>
    </div></ContextMenuTrigger>
    <ContextMenuContent aria-label={label}>{items('context')}</ContextMenuContent>
  </ContextMenu>;
}
