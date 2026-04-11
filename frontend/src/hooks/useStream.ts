import { useState, useEffect } from "react"
import { StreamPayload } from "@/lib/types"

export function useStream(url: string) {
    const [payload, setPayload] = useState<StreamPayload | null>(null)
    const [connected, setConnected] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const ws = new WebSocket(url)

        ws.onopen = () => setConnected(true)

        ws.onmessage = (event) => {
            const data: StreamPayload = JSON.parse(event.data)
            setPayload(data)
        }

        ws.onclose = () => setConnected(false)

        ws.onerror = () => setError("Connection failed")

        return () => ws.close()
    }, [url])

    return { payload, connected, error }
}