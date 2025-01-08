import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, Clock, DollarSign } from 'lucide-react';
import { getMovieDetails } from './../apis/movieApi';
import { getTVShowDetails } from './../apis/tvShowApi';

const MediaDetails = ({ id, type = 'movie' }) => {
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState('recommended');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const data = type === 'movie'
                    ? await getMovieDetails(id)
                    : await getTVShowDetails(id);
                setDetails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id, type]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
        );
    }

    if (!details) return null;

    const baseImgUrl = 'https://image.tmdb.org/t/p/original';
    const posterUrl = 'https://image.tmdb.org/t/p/w500';

    const getRatingColor = (rating) => {
        if (rating >= 7.5) return "text-green-500";
        if (rating >= 6) return "text-yellow-500";
        return "text-red-500";
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handlePlayTrailer = () => {
        const trailer = details.videos?.results?.find(
            video => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
          
            <div className="relative min-h-[80vh]">
              
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <img
                        src={details.backdrop_path ? `${baseImgUrl}${details.backdrop_path}` : '/api/placeholder/1920/1080'}
                        alt={details.title || details.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 pt-32">
                    <div className="flex flex-col md:flex-row gap-8">
                      
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <img
                                src={details.poster_path ? `${posterUrl}${details.poster_path}` : '/api/placeholder/500/750'}
                                alt={details.title || details.name}
                                className="w-full rounded-lg shadow-2xl"
                            />
                        </div>

                     
                        <div className="w-full md:w-2/3 lg:w-3/4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {details.title || details.name}
                            </h1>

                            <div className="flex items-center gap-6 mb-6">
                             
                                <div className={`text-xl font-bold ${getRatingColor(details.vote_average)}`}>
                                    {details.vote_average.toFixed(1)}
                                </div>

                               
                                {details.videos?.results?.some(video => video.type === "Trailer") && (
                                    <button
                                        onClick={handlePlayTrailer}
                                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 
                             rounded-full transition duration-300"
                                    >
                                        <Play size={20} />
                                        Play Trailer
                                    </button>
                                )}
                            </div>

                           
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-gray-400" size={20} />
                                    <span>{new Date(details.release_date || details.first_air_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="text-gray-400" size={20} />
                                    <span>{type === 'movie' ? `${details.runtime} min` : `${details.number_of_seasons} Seasons`}</span>
                                </div>
                                {type === 'movie' && details.budget > 0 && (
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="text-gray-400" size={20} />
                                        <span>{formatMoney(details.budget)}</span>
                                    </div>
                                )}
                            </div>

                          
                            <div className="flex flex-wrap gap-2 mb-6">
                                {details.genres.map((genre) => (
                                    <span key={genre.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                           
                            <div className="mb-6">
                                <h2 className="text-xl font-bold mb-2">Overview</h2>
                                <p className="text-gray-300 leading-relaxed">{details.overview}</p>
                            </div>

                          
                            <div>
                                <h2 className="text-xl font-bold mb-2">
                                    {type === 'movie' ? 'Director' : 'Created By'}
                                </h2>
                                <p className="text-gray-300">
                                    {type === 'movie'
                                        ? details.credits?.crew?.find(person => person.job === "Director")?.name
                                        : details.created_by?.map(person => person.name).join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cast */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {details.credits?.cast?.slice(0, 6).map((actor) => (
                        <div key={actor.id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <img
                                src={actor.profile_path ? `${posterUrl}${actor.profile_path}` : '/api/placeholder/200/300'}
                                alt={actor.name}
                                className="w-full aspect-[2/3] object-cover"
                            />
                            <div className="p-3">
                                <h3 className="font-semibold mb-1">{actor.name}</h3>
                                <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recommendations & Similar */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        className={`px-4 py-2 rounded-full transition ${activeTab === 'recommended'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        onClick={() => setActiveTab('recommended')}
                    >
                        Recommended
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full transition ${activeTab === 'similar'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        onClick={() => setActiveTab('similar')}
                    >
                        Similar Titles
                    </button>
                </div>

               
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {(activeTab === 'recommended' ? details.recommendations?.results : details.similar?.results)
                        ?.slice(0, 5)
                        .map((item) => (
                            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition duration-300">
                                <img
                                    src={item.poster_path ? `${posterUrl}${item.poster_path}` : '/api/placeholder/300/450'}
                                    alt={item.title || item.name}
                                    className="w-full aspect-[2/3] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-1">{item.title || item.name}</h3>
                                    <p className="text-sm text-gray-400">
                                        {new Date(item.release_date || item.first_air_date).getFullYear()}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default MediaDetails;