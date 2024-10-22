"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";

interface Game {
  id: number;
  name: string;
  img: string;
  categories: string[];
  gameProvider: string;
}

interface Category {
  id: number;
  name: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: "search",
  },
  {
    id: 2,
    name: "start",
  },
  {
    id: 3,
    name: "live",
  },
  {
    id: 4,
    name: "jackpots",
  },
  {
    id: 5,
    name: "new",
  },
];

const mockGames: Game[] = [
  {
    id: 0,
    name: "Sugar Rush",
    img: "./games/sugar-rush.png",
    categories: ["start", "new"],
    gameProvider: "PragmaticPlay",
  },
  {
    id: 1,
    name: "Shaolin Crew",
    img: "./games/shaolin-crew.png",
    categories: ["start", "live", "new"],
    gameProvider: "Xpans",
  },
  {
    id: 2,
    name: "Big Bad Wolf",
    img: "./games/big-bad-wolf.png",
    categories: ["start", "jackpots"],
    gameProvider: "Playtech",
  },
  {
    id: 3,
    name: "Book of Egypt",
    img: "./games/book-of-egypt.png",
    categories: ["start", "live", "jackpots"],
    gameProvider: "Xpans",
  },
  {
    id: 4,
    name: "Pirates Power",
    img: "./games/pirates-power.png",
    categories: ["start", "new"],
    gameProvider: "Xpans",
  },
  {
    id: 5,
    name: "Crocodile Blitz Xtreme FB",
    img: "./games/crocodile-blitz-xtreme-fb.png",
    categories: ["start", "new", "live"],
    gameProvider: "Playtech",
  },
  {
    id: 6,
    name: "Anaconda Wild 2 Powerplay Jackpot",
    img: "./games/anaconda-wild-2-powerplay-jackpot.png",
    categories: ["start", "live"],
    gameProvider: "Playtech",
  },
  {
    id: 7,
    name: "Maya Jackpot",
    img: "./games/maya-jackpot.png",
    categories: ["start", "jackpots"],
    gameProvider: "Skywind",
  },
  {
    id: 8,
    name: "Beach Life",
    img: "./games/beach-life.png",
    categories: ["start", "jackpots"],
    gameProvider: "Playtech",
  },
  {
    id: 9,
    name: "Inca Jackpot",
    img: "./games/inca-jackpot.png",
    categories: ["start", "jackpots", "new"],
    gameProvider: "Skywind",
  },
  {
    id: 10,
    name: "Pride of Persia Empire Treasures",
    img: "./games/pride-of-persia-empire-treasures.png",
    categories: ["start", "new"],
    gameProvider: "Playtech",
  },
  {
    id: 11,
    name: "Azteca Bonus Lines Powerplay Jackpot",
    img: "./games/azteca-bonus-lines-powerplay-jackpot.png",
    categories: ["start", "live"],
    gameProvider: "Playtech",
  },
];

export default function Games() {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState("start");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFilteredGames = async () => {
    setFilteredGames([]);

    const response = await new Promise<Game[]>((resolve) => {
      setTimeout(() => {
        resolve(mockGames);
      }, 1000);
    });

    if (activeCategory === "search") {
      if (searchQuery === "") {
        setFilteredGames(response);
      } else {
        setFilteredGames(
          response.filter((game) =>
            game.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    } else {
      setFilteredGames(
        response.filter((game) => game.categories.includes(activeCategory))
      );
    }
  };

  useEffect(() => {
    fetchFilteredGames();
  }, [searchQuery, activeCategory]);

  return (
    <Tabs defaultValue="start" onValueChange={setActiveCategory}>
      <GamesCategories />
      <GamesContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredGames={filteredGames}
      />
    </Tabs>
  );
}

function GamesCategories() {
  return (
    <TabsList className="w-full gap-10">
      {mockCategories.map((category) => (
        <TabsTrigger key={category.id} value={category.name}>
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

function GamesContent({
  searchQuery,
  setSearchQuery,
  filteredGames,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredGames: Game[];
}) {
  return (
    <>
      {mockCategories.map((category) => (
        <TabsContent key={category.id} value={category.name}>
          {category.name === "search" && (
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games"
              className="my-2"
            />
          )}
          <GamesList filteredGames={filteredGames} />
        </TabsContent>
      ))}
    </>
  );
}

function GamesList({ filteredGames }: { filteredGames: Game[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {filteredGames.map((game) => (
        <Button
          variant="ghost"
          className="w-full h-full p-0 m-0 transition hover:brightness-110 overflow-hidden rounded-3xl"
          key={game.id}
        >
          <Image
            src={game.img}
            alt={game.name}
            width={200}
            height={200}
            className="object-cover w-full h-full hover:scale-105 transition"
          />
        </Button>
      ))}
    </div>
  );
}
