import { Video } from "../models/Video"

type fetchOptions ={

    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>
}

export type VideoDataType = Omit<Video, "_id">

class ApiClient {
    private async fetch<T>(
        endpoint: string,
        options: fetchOptions = {}

    ):Promise<T>{
        const {method="GET", body, headers={}} = options

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }
        const response = await fetch(`/api/${endpoint}`, {
            method,
            headers: defaultHeaders,

            body: body ? JSON.stringify(body) : undefined 
        })
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }

    async getVideos(){
        return this.fetch<Video[]>("/videos")
    }

    async  getAVideo(id:string){
        return this.fetch<Video>(`videos/${id}`)
    }

    async createVideo (data:VideoDataType){
        return this.fetch<Video>("/videos",{
            method:"POST",
            body:data
        })
    }
}


export const apiClient = new ApiClient()