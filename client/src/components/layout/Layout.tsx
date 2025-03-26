
import { ReactNode } from 'react';
import { Header } from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container-wide py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      <footer className="py-6 px-4 border-t border-border text-center text-sm text-muted-foreground">
        <div className="container-wide">
          <p>&copy; {new Date().getFullYear()} SeatFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
