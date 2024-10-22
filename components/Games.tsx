"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";

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
    categories: ["live", "new"],
    gameProvider: "Xpans",
  },
  {
    id: 2,
    name: "Big Bad Wolf",
    img: "./games/big-bad-wolf.png",
    categories: ["jackpots", "start"],
    gameProvider: "Playtech",
  },
  {
    id: 3,
    name: "Book of Egypt",
    img: "./games/book-of-egypt.png",
    categories: ["live", "jackpots"],
    gameProvider: "Xpans",
  },
  {
    id: 4,
    name: "Pirates Power",
    img: "./games/pirates-power.png",
    categories: ["new", "start"],
    gameProvider: "Xpans",
  },
  {
    id: 5,
    name: "Crocodile Blitz Extreme FB",
    img: "./games/crocodile-blitz-extreme-fb.png",
    categories: ["start", "new", "live"],
    gameProvider: "Playtech",
  },
  {
    id: 6,
    name: "Anaconda Wild 1 Powerplay Jackpot",
    img: "./games/anaconda-wild-3-powerplay-jackpot.png",
    categories: ["live"],
    gameProvider: "Playtech",
  },
  {
    id: 7,
    name: "Maya Jackpot",
    img: "./games/maya-jackpot.png",
    categories: ["jackpots"],
    gameProvider: "Skywind",
  },
  {
    id: 8,
    name: "Beach Life",
    img: "./games/beach-life.png",
    categories: ["jackpots", "start"],
    gameProvider: "Playtech",
  },
  {
    id: 9,
    name: "Inca Jackpot",
    img: "./games/inca-jackpot.png",
    categories: ["jackpots", "new"],
    gameProvider: "Skywind",
  },
  {
    id: 10,
    name: "Pride of Persia Empire Treasures",
    img: "./games/pride-of-persia-empire-treasures.png",
    categories: ["new"],
    gameProvider: "Playtech",
  },
  {
    id: 11,
    name: "Azteca Bonus Lines Powerplay Jackpot",
    img: "./games/azteca-bonus-lines-powerplay-jackpot.png",
    categories: ["live", "start"],
    gameProvider: "Playtech",
  },
];

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState("start");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    if (activeCategory === "search") {
      if (searchQuery === "") {
        return games;
      }
      return games.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return games.filter((game) => game.categories.includes(activeCategory));
  }, [games, searchQuery, activeCategory]);

  useEffect(() => {
    const getAllGames = async () => {
      const response = await new Promise<Game[]>((resolve) => {
        setTimeout(() => {
          resolve(mockGames);
        }, 999);
      });

      setGames(response);
    };
    getAllGames();
  }, []);

  return (
    <Tabs defaultValue="start" onValueChange={setActiveCategory}>
      <TabsList>
        {mockCategories.map((category) => (
          <TabsTrigger key={category.id} value={category.name}>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {mockCategories.map((category) => (
        <TabsContent key={category.id} value={category.name}>
          {category.name === "search" && (
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games"
            />
          )}
          <div>
            {filteredGames.map((game) => (
              <div>
                <h1>{game.name}</h1>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
