import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>
      <p className="text-gray-600 mb-6">Registration page - To be implemented</p>
      <div className="text-center">
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
