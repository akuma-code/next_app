'use client'
import React, { useCallback } from 'react';

import { _log } from "@/Helpers/helpersFns"
import { useMemo, useState } from "react"

export const useItemStore = <T>(init_state?: T) => {
    const init = init_state ? [init_state] : []
    const [store, setStore] = useState<T[]>(init)

    const add = useCallback((item: T, log?: boolean) => {
        setStore(prev => [...prev, item])
        log && _log("store", store)
    }, [])


    const remove = useCallback((item: T) => {
        const idx = store.findIndex(item => item)
        const removed = [...store].splice(idx, 1)
        _log("removed,[]) id: ", removed)
        setStore(prev => prev.filter(p => p !== item))
    }, [])

    _log(store)
    const clear = useCallback(() => setStore([]), [])

    const _store = useMemo(() => store, [store])

    return [_store, { add, remove, clear }] as const
}