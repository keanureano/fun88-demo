"use client";

import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
}

const mockGames: Game[] = [
  { id: 1, name: "Game 1" },
  { id: 2, name: "Game 2" },
  { id: 3, name: "Game 3" },
];

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await new Promise<Game[]>((resolve) => {
        setTimeout(() => {
          resolve(mockGames);
        }, 1000);
      });

      setGames(response);
    };
    fetchGames();
  }, []);
  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
}
