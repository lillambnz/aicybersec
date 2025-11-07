import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Filter, CheckCircle, Clock, FileText, Calendar, User, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const ConsultationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const consultations = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      date: 'Today, 10:30 AM',
      type: 'Follow-up',
      duration: '15 min',
      status: 'completed',
      noteType: 'SOAP',
      diagnosis: 'Hypertension - stable',
    },
    {
      id: 2,
      patient: 'Michael Chen',
      date: 'Today, 11:45 AM',
      type: 'Initial Consultation',
      duration: '28 min',
      status: 'transcribing',
      noteType: 'CHEDDAR',
      diagnosis: 'Pending',
    },
    {
      id: 3,
      patient: 'Emma Williams',
      date: 'Yesterday, 2:15 PM',
      type: 'Annual Check-up',
      duration: '22 min',
      status: 'completed',
      noteType: 'SOAP',
      diagnosis: 'Arthritis - routine follow-up',
    },
    {
      id: 4,
      patient: 'David Lee',
      date: 'Jan 15, 2025',
      type: 'Follow-up',
      duration: '12 min',
      status: 'completed',
      noteType: 'DAP',
      diagnosis: 'Asthma - well controlled',
    },
    {
      id: 5,
      patient: 'Lisa Brown',
      date: 'Jan 14, 2025',
      type: 'Urgent Care',
      duration: '18 min',
      status: 'completed',
      noteType: 'SOAP',
      diagnosis: 'Upper respiratory infection',
    },
  ];

  const stats = [
    { label: 'Total Consultations', value: '142', icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'This Week', value: '34', icon: Calendar, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Avg Duration', value: '18 min', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Consultations</h1>
          <p className="text-gray-600 mt-1">Manage and review your patient consultations</p>
        </div>
        <Button variant="primary" icon={<Mic size={18} />}>
          Start New Consultation
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['all', 'today', 'week', 'month'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={<Filter size={16} />}>
            More Filters
          </Button>
        </div>
      </Card>

      {/* Consultations List */}
      <div className="space-y-4">
        {consultations.map((consult, index) => (
          <Link key={consult.id} to={`/consultations/${consult.id}`}>
            <Card
              hover
              className="animate-slide-up transition-all"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                {/* Left Section - Patient Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {consult.patient.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{consult.patient}</h3>
                      <Badge variant="info" size="sm">{consult.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{consult.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{consult.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText size={14} />
                        <span>{consult.noteType} note</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Diagnosis */}
                <div className="hidden lg:block flex-1 px-6">
                  <p className="text-xs font-medium text-gray-500 mb-1">Diagnosis</p>
                  <p className="text-sm text-gray-900">{consult.diagnosis}</p>
                </div>

                {/* Right Section - Status */}
                <div className="flex items-center gap-4">
                  {consult.status === 'completed' ? (
                    <Badge variant="success">
                      <CheckCircle size={14} className="mr-1.5" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <div className="animate-pulse-subtle mr-1.5 w-2 h-2 bg-warning-600 rounded-full inline-block"></div>
                      Processing
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Action Card */}
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Plus size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Ready for your next patient?</h3>
              <p className="text-sm text-gray-600">Start a new consultation and let AI handle the notes</p>
            </div>
          </div>
          <Button variant="primary" icon={<Mic size={18} />}>
            Start Recording
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConsultationsPage;
