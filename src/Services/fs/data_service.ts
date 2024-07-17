'use server'

import { writeFileSync, readFileSync } from "fs"


export async function readFile<T>(path: string) {
    const file = readFileSync(path, { encoding: 'utf8' })
    const parsed = JSON.parse(file) as T
    // console.log('\n', parsed, '\n')
    return parsed
}

export async function writeFile<T>(path: string, data: T) {
    if (typeof data === 'string') {
        return writeFileSync(path, data)
    } else {
        const jsoned = JSON.stringify(data)
        return writeFileSync(path, jsoned)
    }
}