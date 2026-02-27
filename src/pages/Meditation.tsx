import { useState } from 'react';
import { Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

const meditations = [
  {
    id: 1,
    title: 'Contemplation des Étoiles',
    duration: '5 minutes',
    description: 'Une méditation guidée sur les signes divins dans le ciel étoilé',
    verses: [
      '"En vérité, dans la création des cieux et de la terre, et dans l\'alternance de la nuit et du jour, il y a certes des signes pour les doués d\'intelligence" (Al-Imran 3:190)',
      'Pause et silence - 30 secondes',
      '"Qui, debout, assis, couchés sur leurs côtés, invoquent Allah et méditent sur la création des cieux et de la terre (disant): "Notre Seigneur! Tu n\'as pas créé cela en vain. Gloire à Toi!" (Al-Imran 3:191)',
      'Pause et silence - 60 secondes',
      '"C\'est Lui qui a fait du soleil une clarté et de la lune une lumière, et Il en a déterminé les phases afin que vous sachiez le nombre des années et le calcul du temps" (Yunus 10:5)',
      'Pause finale - contemplation libre - 90 secondes'
    ]
  },
  {
    id: 2,
    title: 'Méditation sur l\'Immensité du Cosmos',
    duration: '7 minutes',
    description: 'Réflexion sur la grandeur de la création divine à travers l\'univers',
    verses: [
      '"Le Créateur des cieux et de la terre. Comment aurait-Il un enfant, quand Il n\'a pas de compagne? C\'est Lui qui a tout créé, et Il est Omniscient" (Al-An\'am 6:101)',
      'Pause et silence - 40 secondes',
      '"Il a créé les cieux sans piliers que vous puissiez voir; et Il a enfoncé des montagnes fermes dans la terre pour l\'empêcher de basculer avec vous; et Il y a propagé des animaux de toute espèce" (Luqman 31:10)',
      'Pause et silence - 60 secondes',
      '"N\'ont-ils pas médité sur le royaume des cieux et de la terre, et toute chose qu\'Allah a créée?" (Al-A\'raf 7:185)',
      'Contemplation personnelle - 120 secondes'
    ]
  },
  {
    id: 3,
    title: 'Gratitude sous les Étoiles',
    duration: '6 minutes',
    description: 'Expression de reconnaissance pour les merveilles de la création',
    verses: [
      '"Et si vous comptez les bienfaits d\'Allah, vous ne saurez pas les dénombrer. Car Allah est Pardonneur, et Miséricordieux" (An-Nahl 16:18)',
      'Pause - Énumérez mentalement 5 bienfaits - 60 secondes',
      '"C\'est Lui qui vous a assigné la nuit pour que vous vous y reposiez, et le jour pour y voir clair. Voilà bien des signes pour les gens qui entendent" (Yunus 10:67)',
      'Pause et silence - 45 secondes',
      '"Allah est la Lumière des cieux et de la terre" (An-Nur 24:35)',
      'Méditation finale en gratitude - 90 secondes'
    ]
  }
];

export const Meditation = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<typeof meditations[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startMeditation = (meditation: typeof meditations[0]) => {
    setSelectedMeditation(meditation);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (timer) clearTimeout(timer);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playStep();
    }
  };

  const playStep = () => {
    if (!selectedMeditation) return;

    if (currentStep < selectedMeditation.verses.length - 1) {
      const delay = selectedMeditation.verses[currentStep].includes('Pause') ? 5000 : 8000;
      const newTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, delay);
      setTimer(newTimer);
    } else {
      setIsPlaying(false);
    }
  };

  const reset = () => {
    if (timer) clearTimeout(timer);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const closeMeditation = () => {
    if (timer) clearTimeout(timer);
    setSelectedMeditation(null);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  if (selectedMeditation) {
    return (
      <div className="w-full min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={closeMeditation}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-rose-200 transition-colors"
          >
            ← Retour
          </button>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8 text-center">
            <Sparkles className="w-16 h-16 text-rose-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-rose-100 mb-2">
              {selectedMeditation.title}
            </h2>
            <p className="text-purple-200 mb-8">{selectedMeditation.description}</p>

            <div className="min-h-[200px] flex items-center justify-center mb-8">
              <p className="text-xl text-purple-100 leading-relaxed max-w-2xl italic">
                {selectedMeditation.verses[currentStep]}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-purple-300 text-sm">
                  Étape {currentStep + 1} sur {selectedMeditation.verses.length}
                </span>
              </div>
              <div className="w-full max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / selectedMeditation.verses.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={togglePlay}
                className="p-4 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 rounded-full shadow-lg shadow-rose-500/30 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>

              <button
                onClick={reset}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <RotateCcw className="w-6 h-6 text-rose-200" />
              </button>
            </div>

            <p className="text-purple-300/70 text-sm mt-8">
              Trouvez un endroit calme, fermez les yeux, et laissez-vous guider...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-rose-300" />
          <h1 className="text-4xl font-bold text-rose-100">Méditation Guidée</h1>
        </div>
        <p className="text-purple-200 mb-12">
          Contemplation spirituelle sous les étoiles avec des versets du Coran
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {meditations.map((meditation) => (
            <div
              key={meditation.id}
              onClick={() => startMeditation(meditation)}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 p-6 hover:shadow-rose-500/30 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-rose-100 mb-2">
                {meditation.title}
              </h3>
              <p className="text-purple-300 text-sm mb-3">{meditation.duration}</p>
              <p className="text-purple-200 text-sm">
                {meditation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8">
          <h3 className="text-2xl font-semibold text-rose-100 mb-4">
            Guide de Méditation
          </h3>
          <div className="space-y-4 text-purple-200">
            <p>
              <strong className="text-rose-200">Préparation :</strong> Trouvez un endroit calme,
              de préférence où vous pouvez voir le ciel étoilé. Installez-vous confortablement.
            </p>
            <p>
              <strong className="text-rose-200">Durant la méditation :</strong> Écoutez attentivement
              les versets, puis profitez des pauses de silence pour méditer sur leur signification.
            </p>
            <p>
              <strong className="text-rose-200">Après :</strong> Prenez quelques instants pour noter
              vos réflexions dans votre journal de contemplation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
