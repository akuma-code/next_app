'use client'

import { CredentialsSignin } from "next-auth";

class CustomError extends CredentialsSignin {
    code = "custom_error"
}

export default CustomError