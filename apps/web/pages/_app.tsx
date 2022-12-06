import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ElementType } from 'react'

type Props = {
  Component: ElementType
  pageProps: { session: Session }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: Props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
