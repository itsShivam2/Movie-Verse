import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTVShowDetails } from "../../apis/tvShowApi";
import Cast from "../../components/cast/Cast";
import Similar from "../../components/similar/Similar";
import StarRating from "../../components/starRating/starRating";
import OfficialVideos from "../../components/videos/OfficialVideos";
import Recommendations from "../../components/recommendations/Recommendations";
import Spinner from "../../components/spinner/Spinner";
import Layout from "../../components/layout/Layout";

function TVShowDetails() {
  const [tvShow, setTVShow] = useState({});
  const { tvShowId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        setLoading(true);
        const response = await getTVShowDetails(tvShowId);
        setTVShow(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [tvShowId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen bg-slate-900">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (Object.keys(tvShow).length === 0) {
    return <div>No TV show details found.</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`;
  const creator = tvShow.created_by?.[0];

  return (
    <Layout>
      <img
        src={backdropUrl}
        className="absolute w-[100vw] h-[100vh] object-cover opacity-10"
      />
      <div className="absolute w-full h-[100vh] bg-[#c9c4c4] mix-blend-overlay"></div>

      <div className="min-h-screen bg-[#04152D] text-white">
        <section className="w-full max-w-full flex flex-col items-center justify-center py-4 px-4 mt-16 md:mt-20">
          <div className="w-full flex flex-col md:flex-row justify-between items-start px-4 my-4">
            <div className="rounded-xl w-full flex justify-center items-center lg:w-2/6 my-4">
              <img
                src={posterUrl}
                className="rounded-xl object-cover object-center h-full md:h-[550px] w-auto"
              />
            </div>
            <div className="w-full lg:w-4/6">
              <div className="w-full px-4 my-4">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  {tvShow.name} {tvShow.first_air_date?.split("-")[0]}
                </h1>
                <h2 className="text-bs text-gray-300 italic font-sans">
                  {tvShow.tagline}
                </h2>
              </div>
              <p className="w-full flex flex-wrap justify-start items-center gap-4 px-4">
                {tvShow.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-2 py-1 bg-rose-600 rounded-md text-white hover:text-gray-300 cursor-pointer"
                  >
                    {genre.name}
                  </span>
                ))}
              </p>
              <div className="w-full flex justify-between items-center gap-6 px-4 my-4">
                <div>
                  <StarRating rating={tvShow.vote_average} />
                </div>
              </div>
              <div className="w-full px-4 text-white">
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <p className="text-left my-2">{tvShow.overview}</p>
              </div>
              <div className="w-full flex justify-between items-start gap-6 px-4 my-6">
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-lg font-semibold">Status</h3>
                  <span className="text-base text-gray-300">
                    {tvShow.status}
                  </span>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-lg font-semibold">First Air Date</h3>
                  <span className="text-base text-gray-300">
                    {tvShow.first_air_date}
                  </span>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-lg font-semibold">Number of Seasons</h3>
                  <span className="text-base text-gray-300">
                    {tvShow.number_of_seasons}
                  </span>
                </div>
              </div>
              <div className="w-full flex-col lg:flex-row justify-between items-start gap-6 px-4 my-6">
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Creator: </h3>
                  <span className="text-base text-gray-300">
                    {creator?.name}
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Total Episodes: </h3>
                  <span className="text-base text-gray-300">
                    {tvShow.number_of_episodes}
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Last Air Date: </h3>
                  <span className="text-base text-gray-300">
                    {tvShow.last_air_date}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start px-4">
            <Cast cast={tvShow.credits?.cast} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Official Videos</h2>
            <OfficialVideos videos={tvShow.videos?.results} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Similar Tv Shows</h2>
            <Similar type="tv" similar={tvShow.similar?.results} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Recommendations</h2>
            <Recommendations
              type="tv"
              recommendations={tvShow.recommendations?.results}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default TVShowDetails;
