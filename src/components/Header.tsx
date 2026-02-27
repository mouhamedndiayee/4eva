import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Moon, LogOut } from 'lucide-react';

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-purple-950/90 backdrop-blur-md border-b border-purple-600/40">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center shadow-lg shadow-rose-500/50 group-hover:shadow-rose-500/70 transition-shadow">
            <Moon className="w-5 h-5 text-white" />
          </div>
          <span className="text-rose-100 font-semibold text-lg">4eva</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link to="/" className="text-rose-200 hover:text-rose-100 transition-colors hidden lg:inline">
            Accueil
          </Link>
          <Link to="/library" className="text-rose-200 hover:text-rose-100 transition-colors">
            Bibliothèque
          </Link>
          <Link to="/map" className="text-rose-200 hover:text-rose-100 transition-colors hidden md:inline">
            Carte
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-rose-200 hover:text-rose-100 transition-colors">
                Dashboard
              </Link>
              <Link to="/journal" className="text-rose-200 hover:text-rose-100 transition-colors hidden lg:inline">
                Journal
              </Link>
              <Link to="/quiz" className="text-rose-200 hover:text-rose-100 transition-colors">
                Quiz
              </Link>
              <button
                onClick={handleSignOut}
                className="text-rose-200 hover:text-rose-100 transition-colors flex items-center gap-1"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 transition-colors"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
