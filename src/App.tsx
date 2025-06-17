
import { ApiTester } from './components/ApiTester/ApiTester';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Tester</h1>
          <p className="text-gray-600">Test your APIs with ease - Built with Axios</p>
        </div>
        <ApiTester />
      </div>
    </div>
  );
}

export default App;