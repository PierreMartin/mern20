import axios from "axios";

export const localClient = axios.create({baseURL: 'http://localhost:3080/api/'});
export const swapiClient = axios.create({baseURL: 'https://swapi.co/api/'});
