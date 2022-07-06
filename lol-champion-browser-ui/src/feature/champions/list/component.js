import './style.css'

// Notice here that I declare props as an argument to the function. This is because
// I passed something to the ChampionsList when it was rendered.
export function ChampionsList(props) {
  // I use object destructuring to extract the champions property from props
  const { champions } = props
  return (
      // Check out style.css to see how this component is styled. Again, I rely
      // on className and class selectors in the css file to style.
      // I have a div "container" which is just an HTML block element. It contains
      // two children; a Header (declared below in its own function) and another
      // div containing a bunch of ChampionPanels
      <div className="container">
        { /* The Header component is declared below in the Header() function */ }
        <Header className="Header"/>
        <div className="ChampionsList">
          { /* Here I use the map function on an array to iterate over the champions
          and map each one to something else. In this case, I'm mapping each champion
          object to a ChampionPanel UI component that gets passed the champion
          as an attribute of its props. The ChampionPanel is also a functional UI
          component declared below in the ChampionPanel function. So I end up
          generating 18 ChampionPanel elements and adding them as children to the
          parent div */ }
          { champions.map(champion => (<ChampionPanel champion={champion}/>))}
        </div>
      </div>
  )
}

function ChampionPanel() {
  // This is a component that declares a generic div rectangle
  // with two children; an image and a caption.
  return (
      <div className="ChampionPanel">
        { /* This isn't a real image yet. It's just a div to represent the rectangle
        where the real champion image will eventually go */ }
        <div className="image"/>
        { /* This will eventually contain the champion name. It's just another empty
        div for now */ }
        <div className="caption"/>
      </div>
  )
}

function Header() {
  return (
      // This is just an empty div for now. We'll put something here later.
      <div className="Header"/>
  )
}