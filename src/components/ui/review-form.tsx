'use client';

import { useState } from 'react';
import { Star, MessageSquare, X } from 'lucide-react';

export function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setShowForm(false);
      setRating(0);
      setName('');
      setComment('');
    }, 4000);
  };

  return (
    <>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:scale-105 transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          Écrire un avis
        </button>
      )}

      {showForm && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-purple-400" />
              Écrire votre avis
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-bold mb-3">Votre note</label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(i + 1)}
                    className="transition-all hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        i < (hoverRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white font-bold mb-3">Votre nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez votre nom"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-3">Votre avis</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience avec ce produit..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Publier mon avis
            </button>
          </form>
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Merci de votre intérêt !
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                <span className="font-bold">Seuls les utilisateurs vérifiés peuvent laisser un avis.</span>
                <br />
                <br />
                Vous pourrez publier votre avis après avoir acheté et utilisé le produit.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setShowMessage(false)}
                  className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
                >
                  J'ai compris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
