import { decrypt, encrypt } from "@/utils/cryptography"
import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react"

export type User = {
    principal_id: string,
    taps: number
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const defaultUserState = {
    user: {
        principal_id: "",
        taps: 0
    },
    setUser: (user: User) => {
        console.log(user);
    }
} as UserContextInterface

export const UserContext = createContext(defaultUserState)


type UserProviderProps = {
    children: ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>(defaultUserState.user);

    useEffect(() => {
        if (localStorage.getItem('UserData')) {
            //fetching the encrypted text
            const encryptedText = localStorage.getItem('UserData')

            //decrypt the text
            const decryptedText = decrypt(encryptedText)

            //check if data is valid, if, then save in state
            if (JSON.parse(decryptedText)) {
                const UserData = JSON.parse(decryptedText);
                setUser(UserData);
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('UserData', encrypt(JSON.stringify(user)));
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>

    )
}