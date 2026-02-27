import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Weekend } from '../types';
import { Calendar, Clock, Image as ImageIcon } from 'lucide-react';

const calculateDaysUntil = (dateString: string) => {
  const target = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateHoursUntil = (dateString: string) => {
  const target = new Date(dateString);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60)) % 24;
  return diffHours;
};

export const Dashboard = () => {
  const [weekends, setWeekends] = useState<Weekend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeekends();
  }, []);

  const fetchWeekends = async () => {
    const { data, error } = await supabase
      .from('weekends')
      .select('*')
      .order('start_date', { ascending: false });

    if (!error && data) {
      setWeekends(data);
    }
    setLoading(false);
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-rose-100 mb-2">Tableau de Bord</h1>
        <p className="text-purple-200 mb-12">Vos week-ends et expériences partagées</p>

        {weekends.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-12 text-center">
            <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-purple-200 text-lg">
              Aucun week-end n'est prévu pour le moment.
            </p>
            <p className="text-purple-300/70 mt-2">
              Les moments précieux apparaîtront ici bientôt.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {weekends.map((weekend) => {
              const daysUntil = calculateDaysUntil(weekend.start_date);
              const hoursUntil = calculateHoursUntil(weekend.start_date);
              const isAvailable = daysUntil <= 0;

              return (
                <div
                  key={weekend.id}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 overflow-hidden hover:shadow-rose-500/30 transition-shadow"
                >
                  {weekend.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={weekend.image_url}
                        alt={weekend.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-rose-100 mb-2">
                      {weekend.title}
                    </h3>
                    <p className="text-purple-200 mb-4">{weekend.description}</p>

                    <div className="flex items-center gap-2 text-purple-300 text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(weekend.start_date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {!isAvailable ? (
                      <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="w-5 h-5 text-rose-300" />
                          <p className="text-rose-200 font-medium">
                            Ce week-end n'est pas encore disponible
                          </p>
                        </div>
                        <p className="text-purple-200 text-lg mb-4">
                          Patience, le moment viendra bientôt...
                        </p>
                        <div className="text-3xl font-bold text-rose-100">
                          {daysUntil} jour{daysUntil > 1 ? 's' : ''} et {hoursUntil} heure{hoursUntil > 1 ? 's' : ''}
                        </div>

                        <div className="mt-6 pt-6 border-t border-purple-400/30">
                          <p className="text-purple-300 text-sm mb-3">En attendant, amusez-vous :</p>
                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href="https://play2048.co/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center text-rose-200 text-sm transition-colors"
                            >
                              2048
                            </a>
                            <a
                              href="https://flappybird.io/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center text-rose-200 text-sm transition-colors"
                            >
                              Flappy Bird
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {Array.isArray(weekend.sections) && weekend.sections.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-rose-200 mb-3">Activités :</h4>
                            <div className="space-y-3">
                              {weekend.sections.map((section, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white/5 rounded-lg p-4 border border-purple-400/20"
                                >
                                  <h5 className="font-medium text-purple-200 mb-2">{section.title}</h5>
                                  <p className="text-purple-300/80 text-sm">{section.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
