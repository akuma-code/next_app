"use server"
export async function NotAllowedInProd() {
    const isProd = process.env.NODE_ENV === 'production'
    if (isProd) throw new Error("This function not aloowed in production")
    return true

}