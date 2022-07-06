import './style.css'
import { ChampionsList } from "./list"

export function ChampionsPage() {
  // Here I just create an array of objects, each with a name property.
  // There are 18 of them in the array.
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
    },
    {
      name: "Champion 18",
    }
  ]
  return (
      /* This is an unnamed rectangle. "div" is an official HTML element. It's
      an unnamed block element. The className attribute is used for styling. The
      styling for this element can be found in the style.css file and uses a class name
      selector. */
      <div className="ChampionsPage">
        { /* Here I render the ChampionsList component imported from above. I'm also
        specifying a champions attribute which contains the array of 18 objects
        I created above. The champions are passed along to the ChampionsList
        component as a property on the props. */ }
        <ChampionsList champions={champions}/>
      </div>
  )
}