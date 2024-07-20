export function reduceArrayToObject<T extends { id: number }>(array: Array<T>) {
    return array.reduce((obj, current) => {
        const { id, ...rest } = current
        obj[id.toString()] = rest
        return obj
    }, {} as Record<string, Omit<T, 'id'>>)
}


export function reducePairs<T extends { secondPlayerId: number | null }>(pairs: T[]) {

    return pairs.reduce((obj, { secondPlayerId, ...rest }) => secondPlayerId ? ({ ...obj, [secondPlayerId]: rest }) : obj, {} as Record<string, Omit<T, 'secondPlayerId'>>)
}