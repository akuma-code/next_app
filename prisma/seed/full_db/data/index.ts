import data from './file.json'
import players from './last_players.json'
import server_data from './server_data.json'
export type DataType = typeof data
export type ServerDataResponse = typeof server_data
export { data, players, server_data }