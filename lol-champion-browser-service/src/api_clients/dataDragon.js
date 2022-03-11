import fetch from 'node-fetch'

const DD_REGION = 'na'
let version = undefined
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
  version = realmData.v

  // Now, use the realm data we fetched for na to assemble a URL to fetch the champion data
  const championURL = `${realmData.cdn}/${realmData.n.champion}/data/${realmData.l}/champion.json`
  const championResponse = await fetch(championURL)
  championData = await championResponse.json()

  return championData
}

// This function is not exported because there is no reason to call this function
// from outside this module. It's used exclusively inside this module, so I'm not
// exporting it. It's invisible outside the module.
async function getRealmData() {
  const realmResponse = await fetch(`https://ddragon.leagueoflegends.com/realms/${DD_REGION}.json`)
  return await realmResponse.json()
}