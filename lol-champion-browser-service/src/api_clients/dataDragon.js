import fetch from 'node-fetch'

const DD_REGION = 'na'
let fetchedVersion = undefined
let realmData = undefined
let championData = undefined

export async function getChampionData() {
  // If we've already fetched the champion data, just return it
  if (championData) {
    return championData
  }
  
  // If we get here, we haven't yet fetched the champion data, so go through
  // that process. The process is to first fetch the realm data for the na region,
  // then parse that and finally, use the data from that to build a URL to fetch/parse/cache the champion data.
  realmData = await getRealmData()
  fetchedVersion = realmData.v

  // Now, use the realm data we fetched for na to assemble a URL to fetch the champion data
  const championURL = `${realmData.cdn}/${realmData.n.champion}/data/${realmData.l}/champion.json`
  const championResponse = await fetch(championURL)
  championData = await championResponse.json()

  // Now, that we have the champion data from Data Dragon, we need to derive the
  // champion square image and loading image URL's for each champion and add new properties so that
  // each champion now has the full URL to their square image and loading image. Notice that I pass
  // everything this function needs to it. When possible, pass everything
  // to a function that the function needs so that it doesn't need to know anything
  // about anything other than what it's given. I'm also passing just an array
  // of champions, which is what Object.values(championData.data) does. I don't
  // want the function I'm calling to have to know the structure of the champion data.
  deriveImageURLs(Object.values(championData.data), realmData.cdn, fetchedVersion)

  return championData
}

// This function is not exported because there is no reason to call this function
// from outside this module. It's used exclusively inside this module, so I'm not
// exporting it. It's invisible outside the module.
async function getRealmData() {
  const realmResponse = await fetch(`https://ddragon.leagueoflegends.com/realms/${DD_REGION}.json`)
  return await realmResponse.json()
}

// This function is responsible for iterating through the array of champions,
// deriving square image and loading image URL's and attaching a new properties to the champion
// with the value of the derived URL's.
function deriveImageURLs(champions, baseURL, version) {
  // This line of code might be confusing to you. It uses forEach, which is a function available to
  // arrays. You can read about it here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  // Basically forEach takes a function and this syntax creates an anonymous function (a function with no name).
  // The part before the => are the function argument(s). Since there is only 1, I don't have to surround them with parens.
  // If there were more than one, I would. The part after the => is the function body. It's the code that gets executed.
  // champions is an array of champions and all arrays have a forEach function associated with them. So I can ask the array
  // to iterate over each element in the array (an array of champions) and execute this function (anonymous function). Each
  // element is given the variable name champion and I calculate and set a new squareImageURL and loadingImageURL properties on the champion
  // using String interpolation. You can read about String interpolation here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  champions.forEach(champion => {
    champion.squareImageURL = `${baseURL}/${version}/img/champion/${champion.id}.png`
    champion.loadingImageURL = `${baseURL}/img/champion/loading/${champion.id}_0.jpg`
  })

  // Here is the traditional way of doing the same thing. The result is the same, the version
  // above is slightly more concise and maybe a bit more confusing, until you understand anonymous functions
  //for (let i = 0; i < champions.length; i++) {
  //  champions[i].squareImageURL = `${baseURL}/${version}/img/champion/${champion.id}.png`
  //  champions[i].loadingImageURL = `${baseURL}/img/champion/loading/${champion.id}_0.jpg`
  //}
}