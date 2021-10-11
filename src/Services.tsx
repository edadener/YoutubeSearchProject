import axios from "axios";

const key = 'AIzaSyBQBnDr1X6OpeZL_oGr35a5eIJA1fUOZt4';

const service = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    timeout: 10000
})

export function getResult( data: string) {
    const params = {
        part: 'snippet',
        q: data,
        maxResults: 5,
        key: key
    }

    return service.get('search', {params: params})
}

export function getPopular() {
    const params = {
        key: key,
        part: "snippet",
        chart: "mostPopular",
        regionCode: "tr",
        maxResults: 4,
      };
    return service.get('videos', {params: params})
}