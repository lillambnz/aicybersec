import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, Calendar, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 45,
      gender: 'Female',
      email: 'sarah.j@email.com',
      phone: '+61 412 345 678',
      lastVisit: '2 days ago',
      consultations: 12,
      status: 'active',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 32,
      gender: 'Male',
      email: 'm.chen@email.com',
      phone: '+61 423 456 789',
      lastVisit: '1 week ago',
      consultations: 5,
      status: 'active',
      conditions: ['Asthma'],
    },
    {
      id: 3,
      name: 'Emma Williams',
      age: 58,
      gender: 'Female',
      email: 'emma.w@email.com',
      phone: '+61 434 567 890',
      lastVisit: '3 weeks ago',
      consultations: 24,
      status: 'active',
      conditions: ['Arthritis', 'Osteoporosis'],
    },
    {
      id: 4,
      name: 'David Lee',
      age: 41,
      gender: 'Male',
      email: 'd.lee@email.com',
      phone: '+61 445 678 901',
      lastVisit: '1 month ago',
      consultations: 8,
      status: 'inactive',
      conditions: [],
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">{patients.length} total patients in your practice</p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          Add New Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search patients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          <Button variant="outline" icon={<Filter size={18} />}>
            Filters
          </Button>
        </div>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient, index) => (
          <Card
            key={patient.id}
            hover
            className="animate-slide-up cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {patient.age} years • {patient.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={patient.status === 'active' ? 'success' : 'default'}>
                  {patient.status}
                </Badge>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                {patient.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                {patient.phone}
              </div>
            </div>

            {/* Conditions */}
            {patient.conditions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.map((condition, idx) => (
                    <Badge key={idx} variant="warning" size="sm">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <FileText size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-900">{patient.consultations}</span>
                  <span className="text-gray-500">visits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-gray-500">Last: {patient.lastVisit}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No patients found matching "{searchQuery}"</p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </Card>
      )}
    </div>
  );
};

export default PatientsPage;
