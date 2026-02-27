import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { ContemplationEntry } from '../types';
import { BookHeart, Plus, Calendar as CalendarIcon, Star } from 'lucide-react';

export const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ContemplationEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    verse_reference: '',
    observation_type: 'reflection'
  });

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('contemplation_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase
      .from('contemplation_entries')
      .insert([
        {
          ...formData,
          user_id: user.id
        }
      ]);

    if (!error) {
      setFormData({
        title: '',
        content: '',
        verse_reference: '',
        observation_type: 'reflection'
      });
      setShowForm(false);
      fetchEntries();
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-rose-200 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BookHeart className="w-8 h-8 text-rose-300" />
              <h1 className="text-4xl font-bold text-rose-100">Journal de Contemplation</h1>
            </div>
            <p className="text-purple-200">
              Partagez vos réflexions sur les signes divins dans l'univers
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nouvelle entrée
          </button>
        </div>

        {showForm && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-6 mb-8">
            <h3 className="text-xl font-semibold text-rose-100 mb-4">Nouvelle Contemplation</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-rose-200 text-sm font-medium mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="Le titre de votre réflexion"
                  required
                />
              </div>

              <div>
                <label className="block text-rose-200 text-sm font-medium mb-2">
                  Type d'observation
                </label>
                <select
                  value={formData.observation_type}
                  onChange={(e) => setFormData({ ...formData, observation_type: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                >
                  <option value="reflection">Réflexion spirituelle</option>
                  <option value="celestial">Observation céleste</option>
                  <option value="scientific">Découverte scientifique</option>
                  <option value="gratitude">Gratitude</option>
                </select>
              </div>

              <div>
                <label className="block text-rose-200 text-sm font-medium mb-2">
                  Référence coranique (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.verse_reference}
                  onChange={(e) => setFormData({ ...formData, verse_reference: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="Ex: Sourate Al-Baqarah 2:164"
                />
              </div>

              <div>
                <label className="block text-rose-200 text-sm font-medium mb-2">
                  Votre contemplation
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-purple-400/30 rounded-lg text-rose-100 placeholder-purple-300/50 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="Partagez vos pensées et observations..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-rose-500/30 transition-all"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-rose-200 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-12 text-center">
            <BookHeart className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-purple-200 text-lg">Aucune entrée dans votre journal.</p>
            <p className="text-purple-300/70 mt-2">
              Commencez à noter vos contemplations et observations célestes.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 p-6 hover:shadow-rose-500/30 transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-rose-100 mb-2">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-purple-300">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="capitalize">{entry.observation_type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {new Date(entry.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {entry.verse_reference && (
                  <div className="bg-purple-500/20 rounded-lg p-4 mb-4 border border-purple-400/30">
                    <p className="text-purple-200 text-sm italic">
                      "{entry.verse_reference}"
                    </p>
                  </div>
                )}

                <p className="text-purple-200 leading-relaxed whitespace-pre-line">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
