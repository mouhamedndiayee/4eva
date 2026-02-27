import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
  'Ramadan', 'Shawwal', 'Dhul-Qadah', 'Dhul-Hijjah'
];

const GREGORIAN_MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

const toHijri = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find(p => p.type === 'year')?.value || '';
  const monthName = parts.find(p => p.type === 'month')?.value || '';
  const day = parts.find(p => p.type === 'day')?.value || '';

  return { year, monthName, day };
};

export const LunarCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const hijri = toHijri(date);
    const isToday =
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    days.push(
      <div
        key={day}
        className={`aspect-square p-1 rounded-lg flex flex-col items-center justify-center text-xs ${
          isToday
            ? 'bg-rose-500/30 border border-rose-400/50 shadow-lg shadow-rose-500/30'
            : 'bg-white/5 hover:bg-white/10'
        } transition-colors`}
      >
        <div className={`font-semibold ${isToday ? 'text-rose-100' : 'text-rose-200'}`}>
          {day}
        </div>
        <div className="text-purple-300/70 text-[10px]">{hijri.day}</div>
      </div>
    );
  }

  const hijriToday = toHijri(today);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-rose-200" />
        </button>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-rose-100">
            {GREGORIAN_MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <p className="text-sm text-purple-300">
            {hijriToday.monthName} {hijriToday.year}
          </p>
        </div>

        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-rose-200" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-purple-300">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
};
