import { Menu } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-10">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <h1 className="text-xl font-bold text-foreground">PocketAI</h1>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  );
}
