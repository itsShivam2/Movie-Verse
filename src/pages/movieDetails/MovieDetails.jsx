import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../apis/movieApi";
import Cast from "../../components/cast/Cast";
import Similar from "../../components/similar/Similar";
import StarRating from "../../components/starRating/starRating";
import OfficialVideos from "../../components/videos/OfficialVideos";
import Recommendations from "../../components/recommendations/Recommendations";
import Spinner from "../../components/spinner/Spinner";
import Layout from "../../components/layout/Layout";
function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(movieId);
        setMovie(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (Object.keys(movie).length === 0) {
    return <div>Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
  const director = movie.credits?.crew?.find(
    (member) => member.known_for_department === "Directing"
  );

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen h-screen flex justify-center items-center bg-[#04152D] text-white">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <img
        src={backdropUrl}
        className="absolute w-[100vw] object-cover opacity-30"
      />
      <div className="absolute w-full h-[110vh] bg-[#c9c4c4] mix-blend-overlay"></div>
      <div
        className="min-h-screen bg-[#04152D] text-white"
        // style={{
        //   backgroundImage: `url(${backdropUrl})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   opacity: 0.99,
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
        <section className="w-full max-w-full flex flex-col items-center justify-center py-4 px-4 mt-16 md:mt-20">
          <div className="w-full flex flex-col md:flex-row justify-between items-start px-4 my-4">
            {/* left */}
            <div className="rounded-xl w-full flex justify-center items-center lg:w-2/6 my-4">
              <img
                src={posterUrl}
                className="rounded-xl object-cover object-center h-full md:h-[550px] w-auto"
              />
            </div>
            {/* right */}
            <div className="w-full lg:w-4/6">
              <div className="w-full px-4 my-4">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  {movie.title} {movie.release_date?.split("-")[0]}
                </h1>
                <h2 className="text-bs text-gray-300 italic font-sans">
                  {movie.tagline}
                </h2>
              </div>

              <p className="w-full flex flex-wrap justify-start items-center gap-4 px-4">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className=" px-2 py-1 bg-rose-600 rounded-md text-white hover:text-gray-300 cursor-pointer"
                  >
                    {genre.name}
                  </span>
                ))}
              </p>

              <div className="w-full flex justify-between items-center gap-6 px-4 my-4">
                <div>
                  <StarRating rating={movie.vote_average} />
                </div>
              </div>

              <div className="w-full px-4 text-white">
                <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                <p className="text-left my-2">{movie.overview}</p>
              </div>

              <div className="w-full flex justify-between items-start gap-6 px-4 my-6">
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-base sm:text-lg font-semibold">Status</h3>
                  <span className="text-sm sm:text-base text-gray-300">
                    {movie.status}
                  </span>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Release Date
                  </h3>
                  <span className="text-sm sm:text-base text-gray-300">
                    {movie.release_date}
                  </span>
                </div>
                <div className="w-1/3 flex flex-col justify-center items-start gap-1">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Runtime
                  </h3>
                  <span className="text-sm sm:text-base text-gray-300">
                    {movie.runtime} min
                  </span>
                </div>
              </div>

              <div className="w-full flex-col lg:flex-row justify-between items-start gap-6 px-4 my-6">
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Budget: </h3>
                  <span className="text-base text-gray-300">
                    ${Number(movie.budget) / 1000000} M
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Box Office: </h3>
                  <span className="text-base text-gray-300">
                    ${(Number(movie?.revenue) / 1000000).toFixed(2)} M
                  </span>
                </div>
                <div className="w-full flex flex-row justify-between items-center gap-1 mb-2 pb-2 border-b-2 border-gray-700">
                  <h3 className="text-lg font-semibold">Director: </h3>
                  <span className="text-base text-gray-300">
                    {director?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-start px-4">
            <Cast cast={movie.credits?.cast} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Official Videos</h2>
            <OfficialVideos videos={movie.videos?.results} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Similar Movies</h2>
            <Similar type="movie" similar={movie.similar?.results} />
          </div>
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold mb-4">Recommendations</h2>
            <Recommendations
              type="movie"
              recommendations={movie.recommendations?.results}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default MovieDetails;
