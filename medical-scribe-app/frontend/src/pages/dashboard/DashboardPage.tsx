import { FileText, Users, Clock, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    {
      name: 'Total Consultations',
      value: '142',
      change: '+12%',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Patients',
      value: '89',
      change: '+5%',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Avg. Time Saved',
      value: '8.2 min',
      change: '+2 min',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      name: 'This Month',
      value: '34',
      change: '+8%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your practice overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Consultations</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">John Doe - Follow-up</p>
              <p className="text-sm text-gray-600">SOAP note generated</p>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Jane Smith - Initial Consultation</p>
              <p className="text-sm text-gray-600">Transcription completed</p>
            </div>
            <span className="text-sm text-gray-500">5 hours ago</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Bob Johnson - Annual Check-up</p>
              <p className="text-sm text-gray-600">Note finalized</p>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
