import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Slider,
  createEmotionCache,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { rtlCache, ltrCache } from "../lib/style-cache";
import { HeaderMegaMenu } from "../components/header";
import { AuthProvider } from "../lib/auth-context";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <div>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
            emotionCache={ltrCache}
          >
            <NotificationsProvider>
              <AuthProvider>
                <HeaderMegaMenu />
                <Component {...pageProps} />
              </AuthProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
