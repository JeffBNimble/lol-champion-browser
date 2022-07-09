import './style.css'
import { ChampionsList } from "./list"

export function ChampionsPage() {
  return (
      /* This is an unnamed rectangle. "div" is an official HTML element. It's
      an unnamed block element. The className attribute is used for styling. The
      styling for this element can be found in the style.css file and uses a class name
      selector. */
      <div className="ChampionsPage">
        <ChampionsList />
      </div>
  )
}