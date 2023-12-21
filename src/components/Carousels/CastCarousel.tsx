import { Carousel, Button } from "antd";
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

export const CastCarousel = () => {
  const { id } = useParams();
  const [cast, setCast] = useState<IActor[]>([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const creditsApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bcc17120a385c08820f57a74b97eef53`;
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

    fetchMovieDetails();
  });

  const API_IMG = "https://image.tmdb.org/t/p/w500";


  return (
    <div>
      <Carousel draggable slidesToShow={5} style={{width:700, height: 200}}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? API_IMG + actor.profile_path
                  : "path/to/default/image"
              }
              alt=""
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
          </li>
        ))}
      </Carousel>
    </div>
  );
}
