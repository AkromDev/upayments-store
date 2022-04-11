import '../../styles/globals.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
