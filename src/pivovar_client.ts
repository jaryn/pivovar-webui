import { pivovar_state } from '@/pivovar_state'

export interface WashMachine {
    name: string
}

export interface TempLog {
    datetime: string[]
    temps: number[]
}


export async function httpget(url: string) {
  try {
      var response = await fetch(url)
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      pivovar_state.removeDanger("connection")
      return response.json()
  } catch (err) {
      pivovar_state.addDanger("connection", `Error getting ${url}, ${err}`)
  }
}
