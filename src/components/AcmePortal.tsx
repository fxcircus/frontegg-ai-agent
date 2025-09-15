import { AcmeHeader } from './AcmeHeader';
import { AcmeDashboard } from './AcmeDashboard';
import { JennyChatPanel } from './JennyChatPanel';
import { ThemeToggle } from './ThemeToggle';

interface AcmePortalProps {
  isAuthenticated: boolean;
}

export function AcmePortal({ isAuthenticated }: AcmePortalProps) {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <AcmeHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dashboard - 70% width */}
        <div className="flex-1 flex flex-col">
          <AcmeDashboard />
        </div>

        {/* Chat Panel - 30% width, full height */}
        <div className="w-[450px] h-full flex flex-col">
          <JennyChatPanel isAuthenticated={isAuthenticated} />
        </div>
      </div>

      {/* Theme Toggle - positioned in bottom left */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}