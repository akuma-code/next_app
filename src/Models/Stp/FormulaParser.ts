import { _log } from "../../Helpers/helpersFns"

import { StpNameProperties } from "./TableObjects"
import { GlassDescription, StpNamePropertyDescription } from "./TerminsDesc"

console.clear()
// const regGls = /\d\.\d\.\d|\d+|\w+\b/gu
export const StpRegExp = /\d\.\d\.\d|\d+|\(\w{1,3}\)|\p{L}+/gui
const regRam = /\d+|\w+$/g
export const triplexRegExp = /\d\.\d\.\d/g
export type Tformula = RegExpMatchArray | null


export const parseStpName = (str: string, options = { split: false }): RegExpMatchArray[] => {
    const arr = /-/.test(str) ? str.split('-') : str.split(" ")

    const re = arr.map((s, idx) => idx % 2 === 0
        ? s.match(StpRegExp)!
        : s.match(regRam)!
    )
    if (options.split === true && Array.isArray(re)) return re

    const parsed = arr.map(s => s.match(StpRegExp)!)

    return parsed
}

export const getPropsFromRegExp = (parsed_data: RegExpMatchArray[][]) => {
    const glasses = parsed_data.map(p =>
        p.filter((_, idx) => idx % 2 === 0))
    // .map(([w, p]) =>            w))
    console.log('glasses', glasses)
}



export const findTags = (formula: string, tags: StpNameProperties[]) => {

    return tags.filter(tag => formula.includes(tag))
}



export const nameDescriptor = (name_parts: RegExpMatchArray[]) => {
    const splitted = name_parts.map((p, idx) => {
        // if (!p) return ""
        const [width, prop, prop2] = p
        const glstxt = GlassDescription.gls(width)
        const ramtxt = GlassDescription.ramka(width)
        const propTxt1 = prop ? StpNamePropertyDescription[prop.toLowerCase() as StpNameProperties] : ""
        const propTxt2 = prop2 ? StpNamePropertyDescription[prop2.toLowerCase() as StpNameProperties] : ""
        const propTxt = [propTxt1, propTxt2].join(" ")
        if (idx % 2 === 0) {
            return `${glstxt} ${propTxt}`
        }
        else return `${ramtxt}${propTxt === "" ? "" : propTxt1}`
    })

    return splitted

}


