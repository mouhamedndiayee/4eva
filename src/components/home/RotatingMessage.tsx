import { useState, useEffect } from 'react';

const messages = [ { text: "Nous leur montrerons Nos signes dans l’univers et en eux-mêmes.", lang: "Français" }, 
  { text: "سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ", lang: "العربية" }, 
  { text: "We will show them Our signs in the universe and within themselves", lang: "English" }, 
  { text: "Dina nu leen wan sunuy màndarga ci àdduna bi ak ci seen biir.", lang: "Wolof" }, 
  { text: "Les mostraremos Nuestros signos en el universo y en ellos mismos", lang: "Español" }, 
  { text: "Wir werden ihnen Unsere Zeichen im Universum und in sich selbst zeigen", lang: "Deutsch" }, 
  { text: "われは宇宙と彼ら自身の中に、われの印を示すであろう。", lang: "日本語" },  
  { text: "Tokolakisa bango bilembo na biso na molɔ́ngɔ́ mpe na kati na bango moko.", lang: "Lingala" }, 
  { text: "Mostreremo loro i Nostri segni nell'universo e dentro di loro.", lang: "Italiano" }, 
  { text: "우리는 그들에게 우주와 그들 자신 안에서 우리의 징표를 보여줄 것이다.", lang: "한국어" }, 
];

export const RotatingMessage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-8 px-4">
      <div className="relative h-24 flex items-center justify-center">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-1000 ${
              index === currentIndex
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform translate-y-4'
            }`}
          >
            <p className="text-2xl md:text-3xl font-light text-rose-100 mb-2">
              {message.text}
            </p>
            <p className="text-sm text-rose-300/60">{message.lang}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
