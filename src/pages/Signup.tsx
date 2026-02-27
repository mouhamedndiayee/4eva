import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Moon, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center shadow-lg shadow-rose-500/50">
              <Moon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-rose-100">4eva</h1>
          </div>
          <p className="text-purple-200">Créez votre compte</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-500/20 border border-rose-400/50 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-300" />
                <p className="text-rose-200 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <p className="text-green-200 text-sm">
                  Compte créé avec succès ! Redirection...
                </p>
              </div>
            )}

            <div>
              <label className="block text-rose-200 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-rose-200 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-rose-200 text-sm font-medium mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all"
            >
              {loading ? 'Création...' : "S'inscrire"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-purple-200 text-sm">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-rose-300 hover:text-rose-200 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
