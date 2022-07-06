import './style.css'

export function ChampionsList(props) {
  const { champions } = props
  return (
      <div className="container">
        <Header className="Header"/>
        <div className="ChampionsList">
          { champions.map(champion => (<ChampionPanel champion={champion}/>))}
        </div>
      </div>
  )
}

function ChampionPanel() {
  return (
      <div className="ChampionPanel">
        <div className="image"/>
        <div className="caption"/>
      </div>
  )
}

function Header() {
  return (
      <div className="Header"/>
  )
}