import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"

function App() {


  return (
   <>
   <SignedOut>
        <SignInButton>
          <Button className="bg-amber-300 hover:bg-amber-500">
            SignIn
          </Button>
        </SignInButton>

      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
   </>
  )
}

export default App
