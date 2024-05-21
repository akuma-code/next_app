'use client'
import { BaseEvent, IPlayer } from '@/Components/EventView/EventBlank'
import React, { Dispatch, SetStateAction, useContext } from 'react'



type dateState = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>]
type IEventBlank = <S>(initialState?: S | (() => S)) => [S, Dispatch<SetStateAction<S | null>>]
export interface IEventContext {
    players: IPlayer[]
    activeEvent?: {
        players?: { id: number, name: string }[],
        date_formated: string,
        id: number

    } | null
    date?: string, setDate?: React.Dispatch<SetStateAction<string>>
    new_event: BaseEvent | null
    create_newEvent: Dispatch<SetStateAction<BaseEvent | null>>
}

export const EventContext = React.createContext<IEventContext | null>(null)

export function useEventContext() {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error("Хук используется вне провайдера контекста!")
    }

    return context
}

