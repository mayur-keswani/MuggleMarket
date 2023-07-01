

export const checkIsAuthenticated=async()=>{
    const auth =  await localStorage?.getItem('auth') ?? {}
    return JSON.parse(auth)
}
export const clearLocalStorage=()=>{
     localStorage.clear()
}