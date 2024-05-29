'use client'

import { _log } from "@/Helpers/helpersFns"

export function checkAuth() {
    const isAuth = global.localStorage.getItem("isAuth")
    if (isAuth === null) {
        console.log("Авторизация не пройдена")
        return false
    } else {
        const checked = JSON.parse(isAuth)
        _log({ checked })
        if (checked) return true
        else return false
    }
}

export function loginAuth(password: string) {
    const pass = 'root'
    _log(pass)
    if (password === pass) {
        global.localStorage.setItem('isAuth', 'true')
        console.log("Авторизация пройдена")
        return true
    }
    else {
        console.log("Неверный пароль")
        return false
    }
}

export function logout() {
    global.localStorage.removeItem("isAuth")
}