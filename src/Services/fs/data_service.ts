'use server'

import { writeFile, readFileSync } from "fs"
import { readFile } from "fs/promises"


export async function readFileFn<T>(path: string) {
    const file = readFileSync(path, { encoding: 'utf8' })
    if (!file) return null
    // console.log('\n', file, '\n')
    const parsed = typeof file === 'string' ? JSON.parse(file) : null as T
    return parsed
}

export async function writeFileFn<T>(filename: string, data: T) {
    const data_to_save = typeof data === 'string' ? data : JSON.stringify(data)

    try {
        writeFile(`./public/json/${filename}.json`, data_to_save, { encoding: "utf-8" }, (err) => { console.log(err) })
        console.log(filename + " saved to /public/json", data_to_save)
    } catch (error) {
        console.error(error)
    }

}
export async function writeFilePath<T>(path: string, data: T) {
    const data_to_save = typeof data === 'string' ? data : JSON.stringify(data)

    try {
        writeFile(path, data_to_save, { encoding: "utf-8" }, (err) => { console.log(err) })
    } catch (error) {
        console.error(error)
    }

}