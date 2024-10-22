"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import Image from "next/image";
import {
  CircleDollarSign,
  Flame,
  Gamepad2,
  Joystick,
  Search,
  Star,
  VenetianMask,
} from "lucide-react";
import clsx from "clsx";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

interface Game {
  name: string;
  img: string;
  categories: string[];
  gameProvider: string;
  gameProviderImg: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
}

const mockCategories: Category[] = [
  {
    name: "search",
    icon: <Search />,
  },
  {
    name: "start",
    icon: <Flame />,
  },
  {
    name: "new",
    icon: <Gamepad2 />,
  },
  {
    name: "slots",
    icon: <Joystick />,
  },
  {
    name: "live",
    icon: <VenetianMask />,
  },
  {
    name: "jackpots",
    icon: <CircleDollarSign />,
  },
  {
    name: "favorites",
    icon: <Star />,
  },
];

const mockGames: Game[] = [
  {
    name: "Sugar Rush",
    img: "./games/sugar-rush.png",
    categories: ["start", "new"],
    gameProvider: "PragmaticPlay",
    gameProviderImg: "./providers/pragmaticplay.png",
  },
  {
    name: "Shaolin Crew",
    img: "./games/shaolin-crew.png",
    categories: ["start", "live", "new"],
    gameProvider: "Xpans",
    gameProviderImg: "./providers/xpans.png",
  },
  {
    name: "Big Bad Wolf",
    img: "./games/big-bad-wolf.png",
    categories: ["start", "jackpots"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
  {
    name: "Book of Egypt",
    img: "./games/book-of-egypt.png",
    categories: ["start", "live", "jackpots"],
    gameProvider: "Xpans",
    gameProviderImg: "./providers/xpans.png",
  },
  {
    name: "Pirates Power",
    img: "./games/pirates-power.png",
    categories: ["start", "new"],
    gameProvider: "Xpans",
    gameProviderImg: "./providers/xpans.png",
  },
  {
    name: "Crocodile Blitz Xtreme FB",
    img: "./games/crocodile-blitz-xtreme-fb.png",
    categories: ["start", "new", "live"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
  {
    name: "Anaconda Wild 2 Powerplay Jackpot",
    img: "./games/anaconda-wild-2-powerplay-jackpot.png",
    categories: ["start", "live"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
  {
    name: "Maya Jackpot",
    img: "./games/maya-jackpot.png",
    categories: ["start", "jackpots"],
    gameProvider: "Skywind",
    gameProviderImg: "./providers/skywind.png",
  },
  {
    name: "Beach Life",
    img: "./games/beach-life.png",
    categories: ["start", "jackpots"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
  {
    name: "Inca Jackpot",
    img: "./games/inca-jackpot.png",
    categories: ["start", "jackpots", "new"],
    gameProvider: "Skywind",
    gameProviderImg: "./providers/skywind.png",
  },
  {
    name: "Pride of Persia Empire Treasures",
    img: "./games/pride-of-persia-empire-treasures.png",
    categories: ["start", "new"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
  {
    name: "Azteca Bonus Lines Powerplay Jackpot",
    img: "./games/azteca-bonus-lines-powerplay-jackpot.png",
    categories: ["start", "live"],
    gameProvider: "Playtech",
    gameProviderImg: "./providers/playtech.png",
  },
];

export default function Games() {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [activeCategory, setActiveCategory] = useState("start");
  const [activeGameProvider, setActiveGameProvider] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFilteredGames = async () => {
    const response = await new Promise<Game[]>((resolve) => {
      setTimeout(() => {
        if (activeGameProvider === "all") {
          resolve(games);
          return;
        }
        resolve(
          games.filter((game) => game.gameProvider === activeGameProvider)
        );
        return;
      }, 500);
    });

    if (activeCategory === "search") {
      if (searchQuery === "") {
        setFilteredGames(response);
        return;
      }
      setFilteredGames(
        response.filter((game) =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      return;
    }

    setFilteredGames(
      response.filter((game) => game.categories.includes(activeCategory))
    );
  };

  useEffect(() => {
    fetchFilteredGames();
  }, [searchQuery, activeCategory, games, activeGameProvider]);

  return (
    <Tabs defaultValue="start" onValueChange={setActiveCategory}>
      <GamesCategories />
      <GamesContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredGames={filteredGames}
        games={games}
        setGames={setGames}
        activeGameProvider={activeGameProvider}
        setActiveGameProvider={setActiveGameProvider}
      />
    </Tabs>
  );
}

function GamesCategories() {
  return (
    <TabsList className="flex w-full h-full justify-evenly">
      {mockCategories.map((category) => (
        <TabsTrigger
          key={category.name}
          value={category.name}
          className="flex flex-col flex-1 px-0"
        >
          {category.icon}
          <span className="text-xs">
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </span>
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
  activeGameProvider,
  setActiveGameProvider,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filteredGames: Game[];
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[]>>;
  activeGameProvider: string;
  setActiveGameProvider: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      {mockCategories.map((category) => (
        <TabsContent key={category.name} value={category.name}>
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
      <GamesProviders
        games={games}
        activeGameProvider={activeGameProvider}
        setActiveGameProvider={setActiveGameProvider}
      />
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
        if (currentGame.name === game.name) {
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
          key={game.name}
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

function GamesProviders({
  games,
  activeGameProvider,
  setActiveGameProvider,
}: {
  games: Game[];
  activeGameProvider: string;
  setActiveGameProvider: Dispatch<SetStateAction<string>>;
}) {
  const providers: { name: string; img: string }[] = Array.from(
    new Set(
      games.map((game) =>
        JSON.stringify({
          name: game.gameProvider,
          img: game.gameProviderImg,
        })
      )
    )
  ).map((provider) => JSON.parse(provider));

  const handleProviderClick = (providerName: string) => {
    setActiveGameProvider(providerName);
  };

  return (
    <div className="pt-4 pb-16">
      <h2 className="pb-2 text-sm text-card-foreground">
        Game Providers
        {activeGameProvider !== "all" && (
          <Button
            variant="link"
            className="px-2"
            onClick={() => setActiveGameProvider("all")}
          >
            Clear Filter
          </Button>
        )}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {providers.map((provider) => (
          <Card
            key={provider.name}
            className={clsx(
              "flex flex-col items-center transition bg-neutral-200 cursor-pointer hover:brightness-105",
              {
                "border-primary border-2": provider.name === activeGameProvider,
              }
            )}
            onClick={() => handleProviderClick(provider.name)}
          >
            <CardHeader className="flex items-center justify-center flex-1">
              <Image
                src={provider.img}
                alt={provider.name}
                width={100}
                height={100}
              />
            </CardHeader>
            <CardContent className="w-full py-4 text-center bg-neutral-100/75 rounded-b-lg">
              <CardDescription>{provider.name}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
