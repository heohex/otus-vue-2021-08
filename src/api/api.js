import axios from "axios";

function createURL(endpoint, params) {
  const api = "https://rickandmortyapi.com/api";
  const uri = new URL(`${api}${endpoint}`);
  Object.entries(params)
    .filter((arr) => arr.every(Boolean))
    .forEach((item) => {
      uri.searchParams.append(item[0], item[1]);
    });
  return uri.href;
}

export function getEpisodesAPI(params) {
  return axios.get(createURL("/episode", params));
}

export function getCharactersAPI(params) {
  return axios.get(createURL("/character", params));
}

export function getLocationsAPI(params) {
  return axios.get(createURL("/location", params));
}
