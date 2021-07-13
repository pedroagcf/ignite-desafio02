import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from '../services/api';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface SideBarProps {
  handleClickButton: any
  selectedGenreId: number
  genres: GenreResponseProps[]
  setGenres: any
}

export function SideBar(props: SideBarProps) {

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      props.setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {props.genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.handleClickButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}