import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Params {
  id: number;
  [key: number]: string | undefined;
}

interface IActor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export const TvCastCarousel = () => {
  const { id } = useParams();
  const [cast, setCast] = useState<IActor[]>([]);

  useEffect(() => {
    const fetchCredits = async () => {
      const isTv = window.location.pathname.includes("/movies/"); // Adjust the path as needed

      const creditsApiUrl = isTv
        ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`
        : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;

      try {
        const [creditsResponse] = await Promise.all([fetch(creditsApiUrl)]);

        if (!creditsResponse.ok) {
          throw new Error("An error occurred while fetching data.");
        }

        const castData = await creditsResponse.json();

        setCast(castData.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCredits();
  }, [id]);

  const API_IMG = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <Carousel draggable slidesToShow={4} slidesToScroll={4} style={{ width: 700, height: 300, color: 'white' }}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <div className="actor_container" style={{ width: 120 }}>
              <img
                src={actor.profile_path ? API_IMG + actor.profile_path : "path/to/default/image"}
                alt="pic is not found"
                className="actor-image"
              />
              <div>
                <p>
                  <b>Name:</b> {actor.name}
                </p>
                <p>
                  <b>Character:</b> {actor.character}
                </p>
              </div>
            </div>
          </li>
        ))}
      </Carousel>
    </div>
  );
};
