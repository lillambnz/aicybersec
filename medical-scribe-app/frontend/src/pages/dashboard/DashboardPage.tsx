import { Plus, Mic, Calendar, TrendingUp, Clock, CheckCircle, Users, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const DashboardPage = () => {
  const stats = [
    {
      label: 'Consultations Today',
      value: '8',
      change: '+2 from yesterday',
      trend: 'up',
      icon: FileText,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'Active Patients',
      value: '89',
      change: '+12 this month',
      trend: 'up',
      icon: Users,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      label: 'Time Saved Today',
      value: '47 min',
      change: 'Avg 6 min/consult',
      trend: 'neutral',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Completion Rate',
      value: '94%',
      change: '+3% this week',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentConsultations = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10 minutes ago',
      type: 'Follow-up',
      status: 'completed',
      note: 'SOAP note generated',
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '1 hour ago',
      type: 'Initial Consultation',
      status: 'transcribing',
      note: 'Transcription in progress',
    },
    {
      id: 3,
      patient: 'Emma Williams',
      time: '2 hours ago',
      type: 'Annual Check-up',
      status: 'completed',
      note: 'Exported to EHR',
    },
  ];

  const upcomingAppointments = [
    { time: '2:00 PM', patient: 'John Smith', type: 'Follow-up' },
    { time: '2:30 PM', patient: 'Lisa Brown', type: 'Initial' },
    { time: '3:15 PM', patient: 'David Lee', type: 'Check-up' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good afternoon, Dr. Smith</h1>
          <p className="text-gray-600 mt-1">You have 3 appointments scheduled for today</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={<Calendar size={18} />}>
            View Schedule
          </Button>
          <Button variant="primary" icon={<Mic size={18} />}>
            Start Consultation
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Consultations - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Consultations</h2>
            <Link to="/consultations">
              <Button variant="ghost" size="sm" icon={<ArrowRight size={16} />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentConsultations.map((consult) => (
              <div
                key={consult.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {consult.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{consult.patient}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="info" size="sm">{consult.type}</Badge>
                      <span className="text-sm text-gray-500">• {consult.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {consult.status === 'completed' ? (
                    <Badge variant="success">
                      <CheckCircle size={12} className="mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <div className="animate-pulse-subtle mr-1 w-2 h-2 bg-warning-600 rounded-full inline-block"></div>
                      Processing
                    </Badge>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{consult.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <Button variant="outline" className="w-full" icon={<Plus size={18} />}>
              New Consultation
            </Button>
          </div>
        </Card>

        {/* Sidebar - Upcoming Appointments */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-primary-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-14 text-center">
                      <p className="text-sm font-bold text-primary-600">{apt.time}</p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{apt.patient}</p>
                    <p className="text-sm text-gray-500">{apt.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View Full Calendar
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Quick Start</h3>
              <p className="text-sm text-primary-100 mb-4">
                Begin a new consultation with voice recording
              </p>
              <Button variant="secondary" className="w-full bg-white text-primary-700 hover:bg-gray-100">
                Start Recording
              </Button>
            </div>
          </Card>

          {/* Weekly Summary */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">This Week</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Consultations</span>
                <span className="font-semibold text-gray-900">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Notes Generated</span>
                <span className="font-semibold text-gray-900">34</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Time Saved</span>
                <span className="font-semibold text-accent-600">4h 12m</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
