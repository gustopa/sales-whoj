import { proxy } from "valtio";
const state =  proxy({
    theme : localStorage.getItem('theme')
})

export default state