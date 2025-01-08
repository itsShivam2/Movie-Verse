import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../apis/movieApi';
import { getTVShowDetails } from '../../apis/tvShowApi';
import Layout from '../../components/layout/Layout';

const MediaDetails = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId, tvShowId } = useParams();
  const id = type === 'movie' ? movieId : tvShowId;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await (type === 'movie' ? getMovieDetails(id) : getTVShowDetails(id));
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, type]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={backdropUrl}
            alt="backdrop"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="relative group">
                <img
                  src={posterUrl}
                  alt={data.title || data.name}
                  className="w-full rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                  <button className="bg-rose-500 text-white px-6 py-3 rounded-full flex items-center gap-2 transform -translate-y-4 group-hover:translate-y-0 transition duration-300">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 overflow-y-auto max-h-[calc(100vh-150px)] pr-4 custom-scrollbar">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {data.title || data.name}
                  <span className="text-2xl text-gray-400 ml-3">
                    ({new Date(data.release_date || data.first_air_date).getFullYear()})
                  </span>
                </h1>
                <div className="flex items-center gap-4 text-lg text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{data.vote_average?.toFixed(1)}</span>
                  </div>
                  {data.runtime && (
                    <span>{data.runtime} min</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-lg leading-relaxed text-gray-300">{data.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    label: type === 'movie' ? 'Budget' : 'Seasons',
                    value: type === 'movie' 
                      ? `$${(data.budget / 1000000).toFixed(1)}M`
                      : data.number_of_seasons
                  },
                  {
                    label: type === 'movie' ? 'Revenue' : 'Episodes',
                    value: type === 'movie'
                      ? `$${(data.revenue / 1000000).toFixed(1)}M`
                      : data.number_of_episodes
                  },
                  {
                    label: type === 'movie' ? 'Director' : 'Creator',
                    value: type === 'movie'
                      ? data.credits?.crew?.find(m => m.job === 'Director')?.name
                      : data.created_by?.[0]?.name
                  },
                  {
                    label: type === 'movie' ? 'Release Date' : 'First Air Date',
                    value: new Date(data.release_date || data.first_air_date).toLocaleDateString()
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition">
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {data.credits?.cast?.slice(0, 8).map((member) => (
                    <div key={member.id} className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition">
                      <img
                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                        alt={member.name}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-medium text-sm truncate">{member.name}</h4>
                      <p className="text-sm text-gray-400 truncate">{member.character}</p>
                    </div>
                  ))}
                </div>
              </div>

              {data.videos?.results?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.videos.results.slice(0, 4).map((video) => (
                      <div key={video.id} className="bg-white/5 rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="215"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          className="w-full"
                          allowFullScreen
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </Layout>
  );
};

export default MediaDetails;