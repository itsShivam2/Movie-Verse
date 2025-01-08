import React, { useState, useEffect, useCallback } from 'react';
import { Search, ArrowLeft, Layout } from 'lucide-react';
import debounce from 'lodash/debounce';
import {
    getPopularMovies,
    getTopRatedMovies,
    searchAll
} from './../apis/movieApi';
import {
    getPopularTVShows,
    getTopRatedTVShows
} from './../apis/tvShowApi';
import MediaDetails from './Details';
import Navbar from './../components/navbar/Navbar';
import Footer from './../components/footer/Footer';

const SkeletonGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
            <div
                key={index}
                className="rounded-lg overflow-hidden bg-gray-800 animate-pulse"
            >
                <div className="aspect-[2/3] bg-gray-700"></div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        ))}
    </div>
);

const MovieApp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [trendingContent, setTrendingContent] = useState({ movies: [], shows: [] });
    const [popularContent, setPopularContent] = useState({ movies: [], shows: [] });
    const [topRatedContent, setTopRatedContent] = useState({ movies: [], shows: [] });
    const [activeTab, setActiveTab] = useState({
        trending: 'movies',
        popular: 'movies',
        topRated: 'movies'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedContent, setSelectedContent] = useState(null);

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query.trim()) {
                const results = await searchAll(query);
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleContentSelect = (item, mediaType) => {
        setSelectedContent({
            id: item.id,
            type: item.media_type || mediaType || (item.first_air_date ? 'tv' : 'movie')
        });
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleBackToMain = () => {
        setSelectedContent(null);
    };

    const fetchContent = async () => {
        try {
            setIsLoading(true);
            const [popularMovies, popularShows, topMovies, topShows] = await Promise.all([
                getPopularMovies(),
                getPopularTVShows(),
                getTopRatedMovies(),
                getTopRatedTVShows()
            ]);

            setPopularContent({ movies: popularMovies, shows: popularShows });
            setTopRatedContent({ movies: topMovies, shows: topShows });
            setTrendingContent({ movies: popularMovies.slice(0, 10), shows: popularShows.slice(0, 10) });
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const renderContentGrid = (content, type) => {
        const items = content[activeTab[type]] || [];
        const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition duration-300 cursor-pointer"
                        onClick={() => handleContentSelect(item, activeTab[type] === 'movies' ? 'movie' : 'tv')}
                    >
                        <div className="aspect-[2/3] relative">
                            <img
                                src={item.poster_path ? `${baseImgUrl}${item.poster_path}` : '/api/placeholder/500/750'}
                                alt={item.title || item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-gray-900/80 rounded-full p-2">
                                <div className="text-sm font-bold text-yellow-500">
                                    {item.vote_average?.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold mb-1 truncate">
                                {item.title || item.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {new Date(item.release_date || item.first_air_date).getFullYear()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (selectedContent) {
        return (
            <div className="min-h-screen bg-gray-900">
                <button
                    onClick={handleBackToMain}
                    className="fixed top-4 left-4 z-50 bg-gray-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    <ArrowLeft className="text-white" size={24} />
                </button>
                <MediaDetails id={selectedContent.id} type={selectedContent.type} />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-gray-100">
                {/* Hero */}
                <div className="relative h-[70vh] overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <video src="./../../public/Ocean.mp4" autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                        {/* <source src="./../../public/Ocean.mp4" type="video/mp4" /> */}
                    </video>

                    <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
                        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center">
                            Discover Your Next Favorite
                        </h1>

                        <div className="w-full max-w-2xl relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search for movies, TV shows..."
                                className="w-full px-6 py-4 rounded-full bg-gray-800/80 backdrop-blur-sm 
                               border border-gray-700 focus:border-blue-500 outline-none
                               text-lg placeholder-gray-400"
                            />
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />

                            {/* Search */}
                            {searchResults.length > 0 && (
                                <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                                    {searchResults.map((result) => (
                                        <div
                                            key={result.id}
                                            className="p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-4"
                                            onClick={() => handleContentSelect(result)}
                                        >
                                            <img
                                                src={result.poster_path ? `${baseImgUrl}${result.poster_path}` : '/api/placeholder/100/150'}
                                                alt={result.title || result.name}
                                                className="w-12 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{result.title || result.name}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {result.media_type === 'movie' ? 'Movie' : 'TV Show'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main */}
                <main className="container mx-auto px-4 py-12">
                    {isLoading ? (
                        <>
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold capitalize mb-6">
                                    Trending
                                </h2>
                                <SkeletonGrid />
                            </section>
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold capitalize mb-6">
                                    Popular
                                </h2>
                                <SkeletonGrid />
                            </section>
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold capitalize mb-6">
                                    Top Rated
                                </h2>
                                <SkeletonGrid />
                            </section>
                        </>
                    ) : (
                        <>
                            {['trending', 'popular', 'topRated'].map((section) => (
                                <section key={section} className="mb-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold capitalize">
                                            {section === 'topRated' ? 'Top Rated' : section}
                                        </h2>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() =>
                                                    setActiveTab((prev) => ({
                                                        ...prev,
                                                        [section]: 'movies',
                                                    }))
                                                }
                                                className={`px-4 py-2 rounded-full transition ${activeTab[section] === 'movies'
                                                        ? 'bg-blue-600 hover:bg-blue-700'
                                                        : 'bg-gray-800 hover:bg-gray-700'
                                                    }`}
                                            >
                                                Movies
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setActiveTab((prev) => ({
                                                        ...prev,
                                                        [section]: 'shows',
                                                    }))
                                                }
                                                className={`px-4 py-2 rounded-full transition ${activeTab[section] === 'shows'
                                                        ? 'bg-blue-600 hover:bg-blue-700'
                                                        : 'bg-gray-800 hover:bg-gray-700'
                                                    }`}
                                            >
                                                TV Shows
                                            </button>
                                        </div>
                                    </div>

                                    {renderContentGrid(
                                        section === 'trending'
                                            ? trendingContent
                                            : section === 'popular'
                                                ? popularContent
                                                : topRatedContent,
                                        section
                                    )}
                                </section>
                            ))}
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MovieApp;