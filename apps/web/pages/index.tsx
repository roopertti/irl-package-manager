import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function Web() {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [])

  return (
    <div>
      <h1>Web</h1>
      {session && <button onClick={() => signOut()}>Log out</button>}
      <button onClick={() => signIn()}>Google log in</button>
    </div>
  )
}
