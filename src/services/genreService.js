import http from "./httpService";


export function getGenres() {
   return http.get('http://10.106.1.4:5000/api/genre/allgenres')
  }
  