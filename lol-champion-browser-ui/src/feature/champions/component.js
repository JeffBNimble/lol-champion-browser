import './style.css'
import { ChampionsList } from "./list"

export function ChampionsPage() {
  const champions = [
    {
      name: "Champion 1",
    },
    {
      name: "Champion 2",
    },
    {
      name: "Champion 3",
    },
    {
      name: "Champion 4",
    },
    {
      name: "Champion 5",
    },
    {
      name: "Champion 6",
    },
    {
      name: "Champion 7",
    },
    {
      name: "Champion 8",
    },
    {
      name: "Champion 9",
    },
    {
      name: "Champion 10",
    },
    {
      name: "Champion 11",
    },
    {
      name: "Champion 12",
    },
    {
      name: "Champion 13",
    },
    {
      name: "Champion 14",
    },
    {
      name: "Champion 15",
    },
    {
      name: "Champion 16",
    },
    {
      name: "Champion 17",
    }
  ]
  return (
      <div className="ChampionsPage">
        <ChampionsList champions={champions}/>
      </div>
  )
}