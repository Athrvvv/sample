import { SidebarTrigger } from './ui/sidebar';
import { cn } from '@/lib/utils';
import { useSidebar } from './ui/sidebar';

export function Header() {
  const { state: sidebarState } = useSidebar();
  return (
    <header className={cn("fixed top-0 right-0 bg-background/80 backdrop-blur-sm z-10 transition-all duration-300 ease-in-out", sidebarState === 'expanded' ? 'left-0 md:left-64' : 'left-0 md:left-16')}>
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-foreground">PocketAI</h1>
        </div>
      </div>
    </header>
  );
}
