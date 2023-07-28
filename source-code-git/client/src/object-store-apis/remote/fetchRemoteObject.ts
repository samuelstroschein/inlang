import { fetchObjectPack, demuxPackfile, extractPackedObject } from "./index.js"

/*
 * Helper function for the most common usecase. Fetches a multiplexed packfile
 * containing a single object, demultiplexes, then extracts the single object
 * in raw object format.
 */
const fetchRemoteObject = (oid: string, url: string, headers?: Record<string, string>) =>
	fetchObjectPack(oid, url, headers).then(demuxPackfile).then(extractPackedObject)

export default fetchRemoteObject
