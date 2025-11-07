import { Outlet } from 'react-router-dom';
import { FileText } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-12 h-12 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Medical Scribe</h1>
          </div>
          <p className="text-gray-600">
            AI-powered clinical documentation for healthcare professionals
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 Medical Scribe. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
