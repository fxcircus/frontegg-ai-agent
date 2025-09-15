import { useAuth } from '@frontegg/react';
import { motion } from 'framer-motion';

export function AcmeDashboard() {
  const { user } = useAuth();


  const projects = [
    {
      name: 'SSO Implementation',
      status: 'In Progress',
      dueDate: 'Oct 15, 2025',
      priority: 'high',
      description: 'Enterprise SSO feature for major client'
    },
    {
      name: 'Customer Portal Redesign',
      status: 'In Review',
      dueDate: 'Oct 22, 2025',
      priority: 'medium',
      description: 'UX improvements for customer dashboard'
    },
    {
      name: 'Q4 Security Audit',
      status: 'Planning',
      dueDate: 'Nov 1, 2025',
      priority: 'low',
      description: 'Annual security compliance review'
    },
    {
      name: 'API Rate Limiting',
      status: 'In Progress',
      dueDate: 'Oct 18, 2025',
      priority: 'high',
      description: 'Implement rate limiting for public APIs'
    }
  ];

  const announcements = [
    {
      type: 'event',
      title: 'Q3 Earnings Call',
      description: 'Tomorrow at 2:00 PM EST',
      isNew: true
    },
    {
      type: 'policy',
      title: 'New Parking Policy',
      description: 'Please review the updated guidelines',
      isNew: true
    },
    {
      type: 'team',
      title: 'Welcome New Team Members!',
      description: 'Join us in welcoming 3 new engineers',
      isNew: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'planning': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'event': return '📅';
      case 'policy': return '📋';
      case 'team': return '👥';
      case 'reminder': return '⏰';
      default: return '📢';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Here's what's happening at Acme Corp today
        </p>
      </div>


      {/* Announcements */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Company Announcements
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          {announcements.map((announcement, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start space-x-3">
                <span className="text-xl mt-0.5">{getAnnouncementIcon(announcement.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {announcement.title}
                    </h4>
                    {announcement.isNew && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {announcement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Projects
        </h3>
        <div className="space-y-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 ${getPriorityColor(project.priority)} border-r border-t border-b border-gray-200 dark:border-gray-700`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Due</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.dueDate}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}