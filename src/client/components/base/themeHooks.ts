import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { theme } from './Theme';

/**
 * Returns the active theme in the current context.
 */
export function useTheme(): typeof theme {
  const themeContext = useContext(ThemeContext);

  return themeContext;
}
