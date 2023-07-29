import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AnimatePresence } from "framer-motion";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co/",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </ApolloProvider>
  );
}
