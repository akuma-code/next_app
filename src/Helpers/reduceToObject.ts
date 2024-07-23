export function reduceArrayToObject<T extends { id: number }>(array: Array<T>) {
    const res = array.reduce((obj, current) => {
        const { id, ...rest } = current
        obj[id.toString()] = current
        return obj
    }, {} as Record<string, T>)
    // console.log(res)
    return res
}


export function reducePairs<T extends { secondPlayerId: number, firstPlayerId: number, masterId: number | null }>(pairs: T[]) {

    const reduced = pairs.reduce(
        (obj, { secondPlayerId, ...rest }) =>
            secondPlayerId
                ? ({ ...obj, [secondPlayerId]: { ...rest, masterId: rest.firstPlayerId } })
                : { ...obj, masterId: rest.firstPlayerId }, {} as Record<string, T>)
    // console.log({ reduced })
    return reduced
}


export function handlePairsUpdate<T extends {}>() {

}