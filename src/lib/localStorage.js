

export const getAuthDetails=()=>{
    const auth =  localStorage?.getItem('auth') ?? {}
    return JSON.parse(auth)
}
export const clearLocalStorage=async ()=>{
    await localStorage.clear()
}