import './App.css'
import { ChampionsPage } from './feature/champions'

function App() {
  // I replaced the body of the App() function to return components relevant to our app, not the sample
  return (
    <div className="App">
      { /* The ChampionsPage is an imported component. I chose the name. See the import
      statement above on line 2 to see where it is imported from. Recall that when
      importing modules, it will implicitly import from an index.js file if one exists
      at the import path and you can omit index.js from the import line. This means
      it will import the file at './feature/champions/index.js' */ }
      <ChampionsPage />
    </div>
  )
}

export default App
