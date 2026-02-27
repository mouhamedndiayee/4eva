import { Link } from 'react-router-dom';
import { RotatingMessage } from '../components/home/RotatingMessage';
import { LunarCalendar } from '../components/home/LunarCalendar';
import { Moon3D } from '../components/home/Moon3D';
import { SkyWidget } from '../components/home/SkyWidget';
import { useAuth } from '../hooks/useAuth';
import { LogIn } from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-screen">
      <RotatingMessage />

      <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-100 mb-4">
            4eva.sn
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Sourate Fussilat 41:53 – « Nous leur montrerons Nos signes dans l'univers et en eux-mêmes
            jusqu'à ce qu'il leur devienne évident que c'est la vérité »
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <LunarCalendar />
            <SkyWidget />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Moon3D />
            <p className="text-purple-200 text-center mt-6 italic">
              "C'est Lui qui a fait du soleil une clarté et de la lune une lumière" - Yunus 10:5
            </p>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 p-8">
          <h2 className="text-3xl font-semibold text-rose-100 mb-4">
            Bienvenue sur 4eva
          </h2>
          <p className="text-purple-200 text-lg leading-relaxed mb-6">
            Un espace dédié à la contemplation du cosmos comme signe divin (Ayah).
            Explorez l'astronomie islamique, la géomatique, et enrichissez votre connaissance
            des sciences spatiales à travers le prisme de la foi.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/library"
              className="bg-purple-500/20 hover:bg-purple-500/30 rounded-xl p-6 transition-colors border border-purple-400/30"
            >
              <h3 className="text-xl font-semibold text-rose-100 mb-2">Bibliothèque</h3>
              <p className="text-purple-200 text-sm">
                Articles sur l'astronomie islamique et la géomatique
              </p>
            </Link>
            <Link
              to="/map"
              className="bg-indigo-500/20 hover:bg-indigo-500/30 rounded-xl p-6 transition-colors border border-indigo-400/30"
            >
              <h3 className="text-xl font-semibold text-rose-100 mb-2">Carte Interactive</h3>
              <p className="text-purple-200 text-sm">
                Explorez les sites historiques du monde musulman
              </p>
            </Link>
            <Link
              to="/meditation"
              className="bg-rose-500/20 hover:bg-rose-500/30 rounded-xl p-6 transition-colors border border-rose-400/30"
            >
              <h3 className="text-xl font-semibold text-rose-100 mb-2">Méditation</h3>
              <p className="text-purple-200 text-sm">
                Guidée sous les étoiles avec versets du cosmos
              </p>
            </Link>
          </div>
        </section>
      </div>

      {!user && (
        <Link
          to="/login"
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white rounded-full shadow-2xl shadow-rose-500/50 hover:shadow-rose-500/70 transition-all flex items-center gap-2 text-lg font-semibold"
        >
          <LogIn className="w-5 h-5" />
          Se connecter
        </Link>
      )}
    </div>
  );
};
