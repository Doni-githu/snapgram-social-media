import AppRouter from "./AppRouter"
import { Toaster } from "@/components/ui/toaster"
const App = () => {
  return (
    <main className="flex h-screen">
      <AppRouter />
      <Toaster  />
    </main>
  )
}

export default App