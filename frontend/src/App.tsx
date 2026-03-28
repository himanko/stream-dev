import { ThemeProvider } from "@/components/commons/theme-provider";
import Navbar from "@/components/commons/navbar";
import AppRouter from "@/router"; // Imports your new index.tsx file

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-12">
          {/* All your routing logic is now neatly handled here! */}
          <AppRouter />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
