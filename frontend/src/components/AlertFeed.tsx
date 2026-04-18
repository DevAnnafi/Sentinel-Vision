"use client"

import { useState, useEffect } from "react"
import { Alert } from "@/lib/types"
import { API_URL, apiHeaders } from "@/lib/config"

export default function AlertFeed() {
    const [alerts, setAlerts] = useState<Alert[]>([])

    useEffect(() => {
        const fetchAlerts = () => {
            fetch(`${API_URL}/api/alerts`, { headers: apiHeaders })
                .then(res => res.json())
                .then(data => setAlerts(Array.isArray(data) ? data.slice(-50).reverse() : []))
        }
        fetchAlerts()
        const interval = setInterval(fetchAlerts, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-2 p-4">
            <h2 className="text-lg font-medium">Alert History</h2>
            {alerts.length === 0 ? (
                <p className="text-sm text-gray-400">No alerts yet</p>
            ) : (
                alerts.map(alert => (
                    <div key={alert.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm">
                        <span className="font-medium text-red-500">{alert.class_name}</span>
                        <span className="text-gray-500">{Math.round(alert.confidence * 100)}% confidence</span>
                        <span className="text-gray-400 text-xs">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))
            )}
        </div>
    )
}