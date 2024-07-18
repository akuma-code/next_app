export function reduceArrayToObject<T extends { id: number }>(array: Array<T>) {
    return array.reduce((obj, current) => {
        const { id, ...rest } = current
        obj[id.toString()] = rest
        return obj
    }, {} as Record<string, Omit<T, 'id'>>)
}