import { ExternalLink, Telescope, Globe, BookOpen, Smartphone } from 'lucide-react';

const resources = [
  {
    category: 'Astronomie & Espace',
    icon: Telescope,
    links: [
      {
        title: 'NASA Earth Observatory',
        url: 'https://earthobservatory.nasa.gov/',
        description: 'Images satellites et données sur la Terre vue de l\'espace'
      },
      {
        title: 'Stellarium Web',
        url: 'https://stellarium-web.org/',
        description: 'Planétarium en ligne pour observer le ciel en temps réel'
      },
      {
        title: 'NASA Space Place',
        url: 'https://spaceplace.nasa.gov/',
        description: 'Ressources éducatives sur l\'espace et l\'astronomie'
      }
    ]
  },
  {
    category: 'Islam & Sciences',
    icon: BookOpen,
    links: [
      {
        title: 'Islamic Astronomy',
        url: 'https://www.muslimheritage.com/topics/astronomy',
        description: 'Histoire de l\'astronomie dans la civilisation islamique'
      },
      {
        title: 'IslamWeb - Sciences',
        url: 'https://www.islamweb.net/',
        description: 'Articles sur les sciences dans la perspective islamique'
      },
      {
        title: 'Muslim Scientists',
        url: 'https://www.1001inventions.com/',
        description: 'Contributions des scientifiques musulmans à l\'histoire'
      }
    ]
  },
  {
    category: 'Géomatique & Cartographie',
    icon: Globe,
    links: [
      {
        title: 'OpenStreetMap',
        url: 'https://www.openstreetmap.org/',
        description: 'Carte collaborative mondiale libre et gratuite'
      },
      {
        title: 'QGIS',
        url: 'https://qgis.org/',
        description: 'Logiciel SIG open source pour analyse géospatiale'
      },
      {
        title: 'NASA WorldWind',
        url: 'https://worldwind.arc.nasa.gov/',
        description: 'Globe virtuel 3D avec données géospatiales'
      }
    ]
  },
  {
    category: 'Applications Mobiles',
    icon: Smartphone,
    links: [
      {
        title: 'Muslim Pro',
        url: 'https://www.muslimpro.com/',
        description: 'Horaires de prière, Qibla, et Coran'
      },
      {
        title: 'Athan - Prayer Times',
        url: 'https://athanapp.com/',
        description: 'Application complète pour les pratiques religieuses'
      },
      {
        title: 'Star Walk 2',
        url: 'https://starwalk.space/',
        description: 'Guide interactif du ciel étoilé avec réalité augmentée'
      }
    ]
  }
];

export const Resources = () => {
  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <ExternalLink className="w-8 h-8 text-rose-300" />
          <h1 className="text-4xl font-bold text-rose-100">Ressources Externes</h1>
        </div>
        <p className="text-purple-200 mb-12">
          Liens curatés vers des outils, sites et applications pour approfondir vos connaissances
        </p>

        <div className="space-y-8">
          {resources.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-rose-100">
                    {category.category}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {category.links.map((link, linkIdx) => (
                    <a
                      key={linkIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-purple-400/30 hover:border-rose-400/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-rose-100 group-hover:text-rose-200">
                          {link.title}
                        </h3>
                        <ExternalLink className="w-5 h-5 text-purple-300 group-hover:text-rose-300 flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-purple-200 text-sm">
                        {link.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 p-8">
          <h3 className="text-2xl font-semibold text-rose-100 mb-4">
            Note sur les Ressources
          </h3>
          <p className="text-purple-200 leading-relaxed">
            Ces ressources sont sélectionnées pour leur qualité éducative et leur fiabilité.
            Nous vous encourageons à explorer, apprendre, et partager vos découvertes.
            N'oubliez pas que la quête de connaissance est un acte d'adoration en Islam :
            "Dis : Sont-ils égaux, ceux qui savent et ceux qui ne savent pas ?" (Az-Zumar 39:9)
          </p>
        </div>
      </div>
    </div>
  );
};
