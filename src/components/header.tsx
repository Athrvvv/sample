import { SidebarTrigger } from './ui/sidebar';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground">PocketAI</h1>
        </div>
      </div>
    </header>
  );
}
