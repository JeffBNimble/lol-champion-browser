
const basePath = '/api/v1/champions'

export async function getChampions() {
  const response = await fetch(basePath)
  if (!response.ok) {
    throw new Error(`An error occurred fetching champions from ${basePath}:(${response.status}-${response.statusText}`)
  }

  return await response.json()
}