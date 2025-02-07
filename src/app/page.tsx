"use client";
import Image from "next/image";
import { use, useState,useEffect } from "react";
import { Video } from "../../models/Video";
import { apiClient } from "../../lib/api-client";
export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
    try {
      const data = await apiClient.getVideos(); 
      setVideos(data);
    } catch (error) {
      console.log(error)
    }
  }
    fetchVideos();
}
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-xs">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-green-500">Next.js!</span>
        </h1>

        
      </div>
    </div>
  );
}
