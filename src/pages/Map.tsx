import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface HistoricalSite {
  name: string;
  lat: number;
  lon: number;
  description: string;
  category: string;
}

const historicalSites: HistoricalSite[] = [
  {
    name: 'La Mecque',
    lat: 21.4225,
    lon: 39.8262,
    description: 'Ville sainte de l\'Islam, lieu de naissance du Prophète Muhammad (PBSL) et destination du Hajj.',
    category: 'Lieu Saint'
  },
  {
    name: 'Médine',
    lat: 24.4672,
    lon: 39.6118,
    description: 'Deuxième ville sainte, abritant la Mosquée du Prophète et sa tombe.',
    category: 'Lieu Saint'
  },
  {
    name: 'Al-Aqsa (Jérusalem)',
    lat: 31.7767,
    lon: 35.2345,
    description: 'Troisième lieu saint de l\'Islam, première Qibla et lieu de l\'ascension nocturne (Isra et Miraj).',
    category: 'Lieu Saint'
  },
  {
    name: 'Observatoire de Maragha',
    lat: 37.3897,
    lon: 46.2478,
    description: 'Observatoire fondé en 1259 par Nasir al-Din al-Tusi, centre majeur de l\'astronomie médiévale.',
    category: 'Observatoire'
  },
  {
    name: 'Maison de la Sagesse (Bagdad)',
    lat: 33.3152,
    lon: 44.3661,
    description: 'Centre intellectuel de l\'âge d\'or islamique (IXe siècle), lieu de traduction et recherche scientifique.',
    category: 'Centre Savoir'
  },
  {
    name: 'Grande Mosquée de Cordoue',
    lat: 37.8788,
    lon: -4.7797,
    description: 'Chef-d\'œuvre de l\'architecture islamique en Al-Andalus, symbole de la civilisation musulmane en Europe.',
    category: 'Mosquée Historique'
  },
  {
    name: 'Université Al-Qarawiyyin (Fès)',
    lat: 34.0649,
    lon: -4.9738,
    description: 'Fondée en 859, la plus ancienne université en activité continue au monde selon l\'UNESCO.',
    category: 'Centre Savoir'
  },
  {
    name: 'Tombouctou',
    lat: 16.7666,
    lon: -3.0026,
    description: 'Centre intellectuel et commercial du monde musulman médiéval, célèbre pour ses manuscrits.',
    category: 'Centre Savoir'
  },
  {
    name: 'Samarcande',
    lat: 39.6542,
    lon: 66.9597,
    description: 'Ville de la Route de la Soie, centre astronomique avec l\'observatoire d\'Ulugh Beg (XVe siècle).',
    category: 'Observatoire'
  },
  {
    name: 'Observatoire du Caire',
    lat: 30.0444,
    lon: 31.2357,
    description: 'Centre astronomique fondé sous les Fatimides, contributions majeures à la science islamique.',
    category: 'Observatoire'
  },
  {
    name: 'Grande Mosquée de Djenné',
    lat: 13.9059,
    lon: -4.5544,
    description: 'Plus grande structure en terre cuite au monde, patrimoine mondial de l\'UNESCO.',
    category: 'Mosquée Historique'
  },
  {
    name: 'Alhambra (Grenade)',
    lat: 37.1773,
    lon: -3.5881,
    description: 'Palais et forteresse nasride, chef-d\'œuvre de l\'art islamique en Espagne.',
    category: 'Patrimoine'
  }
];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Lieu Saint':
      return '#ec4899';
    case 'Observatoire':
      return '#a855f7';
    case 'Centre Savoir':
      return '#6366f1';
    case 'Mosquée Historique':
      return '#f59e0b';
    default:
      return '#8b5cf6';
  }
};

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [25, 30],
      zoom: 3,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      className: 'map-tiles',
    }).addTo(map);

    historicalSites.forEach((site) => {
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${getCategoryColor(site.category)}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([site.lat, site.lon], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="color: #1a0a2e; padding: 8px; max-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #831843;">
            ${site.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #7e22ce; font-weight: 600;">
            ${site.category}
          </p>
          <p style="margin: 0; font-size: 14px; line-height: 1.5;">
            ${site.description}
          </p>
        </div>
      `);
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-8 h-8 text-rose-300" />
          <h1 className="text-4xl font-bold text-rose-100">Carte du Monde Musulman</h1>
        </div>
        <p className="text-purple-200 mb-8">
          Explorez les mosquées historiques, centres de savoir et observatoires du monde musulman
        </p>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white"></div>
              <span className="text-purple-200 text-sm">Lieu Saint</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white"></div>
              <span className="text-purple-200 text-sm">Observatoire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
              <span className="text-purple-200 text-sm">Centre Savoir</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
              <span className="text-purple-200 text-sm">Mosquée Historique</span>
            </div>
          </div>
        </div>

        <div
          ref={mapRef}
          className="w-full h-[600px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-rose-500/20"
        />

        <div className="mt-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-6">
          <p className="text-purple-200 text-center italic">
            "Dis : Parcourez la terre et voyez comment Il a commencé la création" - Al-Ankabut 29:20
          </p>
        </div>
      </div>
    </div>
  );
};
