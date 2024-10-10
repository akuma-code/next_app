import { getUser } from "@/Services/userService"
import { verifySession } from "./verifySession"

export const verifyUser = async () => {
    const s = await verifySession()
    if (!s) return null
    try {
        const userId = s.user?.userId
        if (!s.user) {
            console.log("\n user not found! \n")
            return null
        }
        const user = await getUser({ id: s.user?.userId! }, { withPass: false })
        return user
    } catch (error) {
        console.log("Failed to find user with id", s.user)
        return null
    }
}