import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Article } from '../types';
import { Book, Tag, Calendar as CalendarIcon } from 'lucide-react';

export const Library = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-rose-200 text-xl">Chargement...</div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="w-full min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-rose-200 transition-colors"
          >
            ← Retour à la bibliothèque
          </button>

          {selectedArticle.image_url && (
            <div className="h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <img
                src={selectedArticle.image_url}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-8">
            <div className="flex items-center gap-2 text-purple-300 text-sm mb-4">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{selectedArticle.category}</span>
              <span className="mx-2">•</span>
              <CalendarIcon className="w-4 h-4" />
              <span>
                {new Date(selectedArticle.created_at).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-rose-100 mb-6">
              {selectedArticle.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              <div className="text-purple-200 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>

            {selectedArticle.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-purple-400/30">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-200 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-8 h-8 text-rose-300" />
          <h1 className="text-4xl font-bold text-rose-100">Bibliothèque du Savoir</h1>
        </div>
        <p className="text-purple-200 mb-8">
          Astronomie islamique, géomatique, sciences spatiales et culture
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-rose-500/30 text-rose-100 border border-rose-400/50'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              {category === 'all' ? 'Tous' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-600/30 p-12 text-center">
            <Book className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <p className="text-purple-200 text-lg">Aucun article dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-rose-500/20 overflow-hidden hover:shadow-rose-500/30 transition-shadow cursor-pointer group"
              >
                {article.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 text-purple-300 text-xs mb-3">
                    <Tag className="w-3 h-3" />
                    <span className="capitalize">{article.category}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-rose-100 mb-2 group-hover:text-rose-200 transition-colors">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-purple-200 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
