import { getCurrentUser } from '@/lib/auth';
import WelcomeWidget from '@/components/dashboard/welcome-widget';
import ClockWidget from '@/components/dashboard/clock-widget';
import NewsFeedWidget from '@/components/dashboard/news-feed-widget';
import PlaceholderWidget from '@/components/dashboard/placeholder-widget';
import { CalendarDays, ListTodo, HardDrive, Link as LinkIcon } from 'lucide-react';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <WelcomeWidget user={user} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ClockWidget />
        
        <PlaceholderWidget 
          title="Calendar" 
          icon={CalendarDays} 
          content="Upcoming events and schedule. (Integration with Google Calendar planned)"
        />
        
        <PlaceholderWidget 
          title="To-Do List" 
          icon={ListTodo}
          content="Manage your tasks. (Simple task management feature planned)"
        />
        
        <PlaceholderWidget 
          title="System Monitoring" 
          icon={HardDrive}
          content="Server stats: CPU, RAM, Disk. (Backend integration required)"
        />
        
        <PlaceholderWidget 
          title="Quick Links" 
          icon={LinkIcon}
          content="Customizable links to your favorite sites. (Feature planned)"
        />

        {/* News Feed Widget spans more columns on larger screens via its internal class */}
        <NewsFeedWidget />

      </div>
    </div>
  );
}
