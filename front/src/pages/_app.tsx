import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'
import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext'
import AppProvider from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </AppProvider>
    </ChakraProvider>
  )
}
