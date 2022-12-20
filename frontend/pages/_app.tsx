import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core'
import { HeaderMegaMenu } from '../components/header';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);


  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ colorScheme}} withGlobalStyles withNormalizeCSS>
      <HeaderMegaMenu/>
      <Component {...pageProps} />
    </MantineProvider>
    </ColorSchemeProvider>
  );
  
}
