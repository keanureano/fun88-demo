"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import Image from "next/image";
import { Star } from "lucide-react";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";

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
    name: "new",
  },
  {
    id: 4,
    name: "slots",
  },
  {
    id: 5,
    name: "live",
  },
  {
    id: 6,
    name: "jackpots",
  },
  {
    id: 7,
    name: "favorites",
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
  const [games, setGames] = useState<Game[]>(mockGames);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState("start");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFilteredGames = async () => {
    const response = await new Promise<Game[]>((resolve) => {
      setTimeout(() => {
        resolve(games);
      }, 500);
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
  }, [searchQuery, activeCategory, games]);

  return (
    <Tabs defaultValue="start" onValueChange={setActiveCategory}>
      <GamesCategories />
      <GamesContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredGames={filteredGames}
        games={games}
        setGames={setGames}
      />
    </Tabs>
  );
}

function GamesCategories() {
  return (
    <TabsList className="w-full">
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
  games,
  setGames,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredGames: Game[];
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[]>>;
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
          <GamesList
            filteredGames={filteredGames}
            games={games}
            setGames={setGames}
          />
        </TabsContent>
      ))}
    </>
  );
}

function GamesList({
  filteredGames,
  games,
  setGames,
}: {
  filteredGames: Game[];
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[]>>;
}) {
  const handleFavoriteClick = (currentGame: Game) => {
    setGames(
      games.map((game) => {
        if (currentGame.id === game.id) {
          const isFavorited = game.categories.includes("favorites");
          toast({
            variant: isFavorited ? "destructive" : "primary",
            title: `${isFavorited ? "Removed" : "Added"} ${currentGame.name} ${
              isFavorited ? "from" : "to"
            } favorites`,
          });
          return {
            ...game,
            categories: isFavorited
              ? game.categories.filter((category) => category !== "favorites")
              : [...game.categories, "favorites"],
          };
        }
        return game;
      })
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {filteredGames.map((game) => (
        <div
          className="relative w-full h-full p-0 m-0 overflow-hidden transition cursor-pointer hover:brightness-110 rounded-3xl"
          key={game.id}
        >
          <Image
            src={game.img}
            alt={game.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          <Star
            className={clsx(
              "absolute top-[1.5%] right-[2.5%] size-[16%] hover:scale-110 transition",
              {
                "fill-yellow-400 stroke-yellow-400":
                  game.categories.includes("favorites"),
                "fill-neutral-500 stroke-neutral-50":
                  !game.categories.includes("favorites"),
              }
            )}
            onClick={() => handleFavoriteClick(game)}
          />
        </div>
      ))}
    </div>
  );
}
