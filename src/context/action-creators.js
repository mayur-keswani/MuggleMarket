import { LOGIN } from "./action-types";

export const onLogin=({token,username})=>{
    return { type: LOGIN, payload: {token,username} };
}