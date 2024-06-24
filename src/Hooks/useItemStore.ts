'use client'
import React, { useCallback } from 'react';

import { _log } from "@/Helpers/helpersFns"
import { useMemo, useState } from "react"

export const useItemStore = <T>(init_state?: T[] | undefined, log?: boolean) => {
    const init = init_state ? init_state : []
    const [store, setStore] = useState<T[]>(init)

    const add = useCallback((item: T, log?: boolean) => {
        setStore(prev => [...prev, item])
        log && _log("store", store)
    }, [store])


    const remove = useCallback((item: T) => {

        setStore(prev => prev.filter(p => p !== item))
    }, [])

    log && _log(store)
    const clear = useCallback(() => setStore(prev => []), [])

    const _store = useMemo(() => store, [store])

    return [_store, { add, remove, clear }] as const
}