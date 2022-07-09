import './style.css'
import { useState, useEffect } from 'react'
import { getChampions } from '../../../services/champions'

export function ChampionsList() {
  // Here I use the React "useState" to manage the list of champions fetched from the backend.
  // It's initialized to an empty array and set inside the "useEffect" below. useState returns
  // two things; the current value of the state (empty array initially) and a setter function
  // to change the state.
  const [champions, setChampions] = useState([])

  // Here, I'm using another hook called useEffect. This hook accepts a function as a parameter,
  // which is known as the effect. In React, data is typically fetched via a "useEffect". Because the call
  // to the imported getChampions() function is async, I have to create an inline fetchChampions()
  // function, which is also async. That function uses the getChampions() function imported from the
  // champions service and sets the state to the fetched champions array. This inherently causes
  // the component to re-render itself using the data from the fetch.
  useEffect( () => {
    async function fetchChampions() {
      // Here I fetch the champions using the imported service function
      const fetchedChampions = await getChampions()
      // Here I use the state setter from the useState call to set the state to the fetched champions
      setChampions(fetchedChampions)
    }

    // Here I call the async function above. This technique is suggested in the React docs
    // when using a "useEffect" to invoke an async function, which we are here.
    fetchChampions()
  }, [])

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
          generating a ChampionPanel for each champion returned from the backend service.
          Note that the "key" attribute was added because the compilation process resulted
          in a warning suggesting that I add a unique "key" attribute to each ChampionPanel. */ }
          { champions.map(champion => (<ChampionPanel key={champion.id} champion={champion} />))}
        </div>
      </div>
  )
}

function ChampionPanel(props) {
  const { champion } = props
  // This is a component that declares a generic div rectangle
  // with two children; an image and a caption.
  return (
      // Notice that I am specifying handlers for onMouseOver and onMouseOut. These
      // are existing HTML element attributes. These are called event handlers. The browser
      // dispatches an event when your mouse moves over an element or moves out of an element.
      // If you want to do something when that happens, you provide an event handler function
      // and the browser will invoke your function when that event happens.
      // The function is always invoked passing an event object that contains a bunch of
      // properties about the event, including the target (which is the element that
      // actually received the event.
      <div className="ChampionPanel"
           onMouseOver={event => setHighlighted(event.target)}
           onMouseOut={event => unsetHighlighted(event.target)}>
        { /* This is an actual HTML <img> element. The "src" attribute is set from the
         champion's loadingImageURL property */ }
        <img src={champion.loadingImageURL} className="image" alt={champion.name}/>
        { /* The caption is also populated with real data. I created a wrapping div element
         around a <span> which contains the champion's name. */ }
        <div className="caption">
          <span>{champion.name}</span>
        </div>
      </div>
  )
}

function Header() {
  return (
      // This is just an empty div for now. We'll put something here later.
      <div className="Header"/>
  )
}

// This is the event handler function that is invoked when the mouse moves
// over the ChampionPanel. Since the panel itself is never visible because the
// two children (image and caption) consume its entire area, the event target
// is either the image or the caption, so I have to get its parent node, the
// ChampionPanel. Then, I iterate through its children (the image and the caption)
// and first remove a CSS class from it, then add a different one. This is all
// for animating the panel when you hover over it. See the style.css for
// .unhighlight and .highlight
function setHighlighted(element) {
  const panel = element.parentNode
  panel.childNodes.forEach(child => {
    child.classList.remove('unhighlight')
    child.classList.add('highlight')
  })
}

// This is the event handler function that is invoked when the mouse moves
// out of the ChampionPanel. Since the panel itself is never visible because the
// two children (image and caption) consume its entire area, the event target
// is either the image or the caption, so I have to get its parent node, the
// ChampionPanel. Then, I iterate through its children (the image and the caption)
// and first add a CSS class to it, then remove a different one. This is all
// for animating the panel when your mouse moves out of it. See the style.css for
// .unhighlight and .highlight
function unsetHighlighted(element) {
  const panel = element.parentNode
  panel.childNodes.forEach(child => {
    child.classList.add('unhighlight')
    child.classList.remove('highlight')
  })
}