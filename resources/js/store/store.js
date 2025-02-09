import { proxy } from "valtio";
const state =  proxy({
    base_url : 'http://localhost:8000',
    theme : localStorage.getItem('theme')
})

export default state