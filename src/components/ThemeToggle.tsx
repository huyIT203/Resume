import { useEffect, useState } from 'react';
import { ThemeToggler } from '@animate-ui/react/primitives/effects/theme-toggler';
import { ThemeTogglerButton, ThemeTogglerButtonIcon, type ThemeSelection } from './animate-ui/buttons/theme-toggler';
import { Sun } from './animate-ui/icons/sun';
import { Moon } from './animate-ui/icons/moon';
import { SunMoon } from './animate-ui/icons/sun-moon';

const storageKey = 'portfolio-theme';
const readTheme = (): ThemeSelection => {
  try { const value = localStorage.getItem(storageKey); if (value === 'light' || value === 'dark' || value === 'system') return value; } catch { /* Storage is optional. */ }
  return 'system';
};
const systemIsDark = () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeToggle({ locale = 'vi' }: { locale?: 'vi' | 'en' }) {
  const [theme, setTheme] = useState<ThemeSelection>(readTheme);
  const [darkSystem, setDarkSystem] = useState(systemIsDark);
  const resolved = theme === 'system' ? (darkSystem ? 'dark' : 'light') : theme;
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setDarkSystem(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    try { localStorage.setItem(storageKey, theme); } catch { /* Storage is optional. */ }
  }, [theme, resolved]);
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const labels = locale === 'vi' ? { light: 'sáng', dark: 'tối', system: 'hệ thống' } : { light: 'light', dark: 'dark', system: 'system' };
  const label = locale === 'vi' ? `Giao diện ${labels[theme]}. Chuyển sang ${labels[next]}` : `${labels[theme]} theme. Switch to ${labels[next]}`;
  return <ThemeToggler theme={theme} resolvedTheme={resolved} setTheme={setTheme} direction="ltr">
    {({ effective, resolved: previewResolved, toggleTheme }) => <ThemeTogglerButton
      theme={effective} resolvedTheme={previewResolved} setTheme={toggleTheme}
      variant="ghost" className="theme-toggle" aria-label={label} title={label}>
      <ThemeTogglerButtonIcon light={<Sun size={18} />} dark={<Moon size={18} />} system={<SunMoon size={18} />} />
    </ThemeTogglerButton>}
  </ThemeToggler>;
}
