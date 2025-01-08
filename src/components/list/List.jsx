import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function MediaList({ title, media, type }) {
  const getRatingColor = (rating) => {
    if (rating >= 8) return '#22c55e';
    if (rating >= 6) return '#eab308';
    if (rating >= 4) return '#f97316';
    return '#ef4444';
  };

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {media.map((item) => (
          <Link
            key={item.id}
            to={`/${type}/${item.id}`}
            className="group relative transform transition-all duration-300 hover:scale-105"
          >
            <div className="rounded-lg overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm">
              <div className="relative aspect-[2/3]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 w-12 h-12">
                  <CircularProgressbar
                    value={(item.vote_average * 10)}
                    text={`${item.vote_average?.toFixed(1)}`}
                    styles={buildStyles({
                      pathColor: getRatingColor(item.vote_average),
                      textColor: '#ffffff',
                      trailColor: '#ffffff33',
                      backgroundColor: '#3e98c7',
                    })}
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium line-clamp-2">
                  {item.title || item.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MediaList;