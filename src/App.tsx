import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthGuard } from './components/AuthGuard';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Library } from './pages/Library';
import { Map } from './pages/Map';
import { Journal } from './pages/Journal';
import { Quiz } from './pages/Quiz';
import { Meditation } from './pages/Meditation';
import { Resources } from './pages/Resources';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/library" element={<Library />} />
          <Route path="/map" element={<Map />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/resources" element={<Resources />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/journal"
            element={
              <AuthGuard>
                <Journal />
              </AuthGuard>
            }
          />
          <Route
            path="/quiz"
            element={
              <AuthGuard>
                <Quiz />
              </AuthGuard>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
