import { useState, useEffect } from 'react';
import { Moon, Star, Compass } from 'lucide-react';
import SunCalc from 'suncalc';

interface Location {
  lat: number;
  lon: number;
  city: string;
}

const DAKAR_LOCATION: Location = {
  lat: 14.6937,
  lon: -17.4441,
  city: 'Dakar'
};

const getMoonPhaseText = (phase: number): string => {
  if (phase < 0.03) return 'Nouvelle Lune';
  if (phase < 0.22) return 'Premier Croissant';
  if (phase < 0.28) return 'Premier Quartier';
  if (phase < 0.47) return 'Lune Gibbeuse Croissante';
  if (phase < 0.53) return 'Pleine Lune';
  if (phase < 0.72) return 'Lune Gibbeuse Décroissante';
  if (phase < 0.78) return 'Dernier Quartier';
  if (phase < 0.97) return 'Dernier Croissant';
  return 'Nouvelle Lune';
};

const calculateQibla = (lat: number, lon: number): number => {
  const meccaLat = 21.4225;
  const meccaLon = 39.8262;

  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (meccaLat * Math.PI) / 180;
  const Δλ = ((meccaLon - lon) * Math.PI) / 180;

  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);

  let θ = Math.atan2(y, x);
  θ = ((θ * 180) / Math.PI + 360) % 360;

  return Math.round(θ);
};

const calculatePrayerTimes = (lat: number, lon: number) => {
  const date = new Date();
  const times = SunCalc.getTimes(date, lat, lon);

  return {
    fajr: new Date(times.dawn.getTime() + 10 * 60000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    dhuhr: new Date(times.solarNoon.getTime() + 5 * 60000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    asr: new Date(times.goldenHour.getTime() - 120 * 60000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    maghrib: new Date(times.sunset.getTime() + 3 * 60000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    isha: new Date(times.dusk.getTime() + 10 * 60000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };
};

export const SkyWidget = () => {
  const [location, setLocation] = useState<Location>(DAKAR_LOCATION);
  const [moonPhase, setMoonPhase] = useState('');
  const [illumination, setIllumination] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: '', dhuhr: '', asr: '', maghrib: '', isha: ''
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city: 'Votre Position'
          });
        },
        () => {
          setLocation(DAKAR_LOCATION);
        }
      );
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const moonIllum = SunCalc.getMoonIllumination(now);
    setMoonPhase(getMoonPhaseText(moonIllum.phase));
    setIllumination(Math.round(moonIllum.fraction * 100));
    setQiblaDirection(calculateQibla(location.lat, location.lon));
    setPrayerTimes(calculatePrayerTimes(location.lat, location.lon));
  }, [location]);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-6">
      <h3 className="text-2xl font-semibold text-rose-100 mb-6 flex items-center gap-2">
        <Star className="w-6 h-6 text-purple-400" />
        Le Ciel à {location.city}
      </h3>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-5 h-5 text-rose-300" />
            <h4 className="text-lg font-medium text-rose-200">Phase Lunaire</h4>
          </div>
          <p className="text-purple-200 text-xl">{moonPhase}</p>
          <p className="text-purple-300/70 text-sm mt-1">Illumination : {illumination}%</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-5 h-5 text-rose-300" />
            <h4 className="text-lg font-medium text-rose-200">Direction Qibla</h4>
          </div>
          <p className="text-purple-200 text-3xl font-bold">{qiblaDirection}°</p>
          <p className="text-purple-300/70 text-sm mt-1">Direction vers La Mecque</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <h4 className="text-lg font-medium text-rose-200 mb-3">Horaires de Prière</h4>
          <div className="space-y-2">
            {[
              { name: 'Fajr', time: prayerTimes.fajr },
              { name: 'Dhuhr', time: prayerTimes.dhuhr },
              { name: 'Asr', time: prayerTimes.asr },
              { name: 'Maghrib', time: prayerTimes.maghrib },
              { name: 'Isha', time: prayerTimes.isha }
            ].map((prayer) => (
              <div key={prayer.name} className="flex justify-between items-center">
                <span className="text-purple-200">{prayer.name}</span>
                <span className="text-rose-200 font-mono">{prayer.time}</span>
              </div>
            ))}
          </div>
          <p className="text-purple-300/50 text-xs mt-3">
            * Horaires approximatifs basés sur votre géolocalisation
          </p>
        </div>
      </div>
    </div>
  );
};
