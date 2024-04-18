import { StpData } from "../StpTableView/StpDataTable"
import { parseStpName } from "./FormulaParser"
import { StpItem, StpTag } from "./TableObjects"

type TagType = {
    tag: StpTag
    g_prop: string[]
}

const TEnergy: TagType = {
    tag: 'energy',
    g_prop: ['TopN']
}
const TSolarProof: TagType = {
    tag: 'solarproof',
    g_prop: ['FhCl', 'FhBr', 'FhGr', 'Эл', 'Сбр',]
}
const THitProof: TagType = {
    tag: 'hitproof',
    g_prop: ['3.3.1', '4.4.1', "зак"]
}
const TSoundProof: TagType = {
    tag: 'soundproof',
    g_prop: ['3.3.1', '4.4.1']
}
const TMulti: TagType = {
    tag: 'multi',
    g_prop: ['Эл', "Сбр"]
}
const TSimple: TagType = {
    tag: 'simple',
    g_prop: []
}
export const TStandartNames = [
    "4-16-4",
    "4TopN-16Ar-4",
    "4-20-4",
    "4TopN-20Ar-4",
    "4-14-4-14-4",
    "4TopN-14Ar-4-14-4",
    "4TopN-12Ar-4-14-4",
    "4TopN-12TgiAr-4-14Tgi-4",
]


export const TagsTypeList = [
    TSolarProof, TEnergy, THitProof, TMulti, TSimple, TSoundProof,
]


const tagRecognizer = (reg_glasses: string[], taglist = TagsTypeList) => {
    const resultTags: StpTag[] = []
    taglist.forEach(tt => {
        const _glslowerCase = tt.g_prop.map(g => g.toLowerCase())
        if (reg_glasses.some(g => _glslowerCase.includes(g.toLowerCase()))) resultTags.push(tt.tag)
    })

    return resultTags
}

export const setupTags = (stp_name: string, options = { showConsole: false }) => {

    const parsedArr = parseStpName(stp_name)
    const isStandart = TStandartNames.includes(stp_name)

    const glasses = parsedArr.map((res) => {
        const [g,] = res
        return g
    }).filter((s, i) => i % 2 === 0)

    const props = parsedArr.map((res) => {
        const [, ...rest] = res
        return rest

    }).filter((s, i) => i % 2 === 0 && s.length > 0).flat(1)
    const isDiffGlass = glasses.includes('4') && glasses.includes('6') && glasses.length > 1

    const tags = [...tagRecognizer(props), ...tagRecognizer(glasses)]



    //__soundproof    
    if (isDiffGlass === true && !tags.includes('soundproof')) tags.push("soundproof")
    //__standart  
    if (isStandart) tags.push('standart')


    if (options.showConsole === true) {
        console.log('props', props)
        console.log('glasses', glasses)
        console.log('tags', tags)
    }



    return tags
}

export const updateTags = (item: StpItem) => {

    const { name } = item

    const tags = setupTags(name)
    if (tags.length === 0) tags.push('simple')
    return { ...item, tags }

}
function setupStpIdAndTags(item: StpItem) {
    const { name } = item
    const stp_tags = setupTags(name)
    if (stp_tags.length === 0) stp_tags.push('simple')
    return { ...item, tags: stp_tags }
}
export function setupStpArray(...args: StpItem[][]) {

    const withTags = args.flat(1).map(setupStpIdAndTags)

    const withIds = withTags.map((item, idx) => ({ ...item, id: idx + 1 }))

    return withIds satisfies StpData[]
}
export const _evenComparator = (item: any, idx: number) => idx % 2 === 0 ? true : false
export const _oddComparator = (item: any, idx: number) => idx % 2 === 0 ? false : true
export function getStpNameContent(stp_name: string): [glass: RegExpMatchArray[], ramki: RegExpMatchArray[]] {
    const reArray = parseStpName(stp_name)
    const g = reArray.filter(_evenComparator)
    const r = reArray.filter(_oddComparator)
    return [g, r] as const

}

