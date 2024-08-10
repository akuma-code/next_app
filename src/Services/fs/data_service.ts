'use server'

import { writeFile, readFileSync } from "fs"


export async function readFile<T>(path: string) {
    const file = readFileSync(path, { encoding: 'utf8' })
    const parsed = JSON.parse(file) as T
    // console.log('\n', parsed, '\n')
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