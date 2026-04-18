export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000"
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "sentinel-api-key-2024"

export const apiHeaders = {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY
}