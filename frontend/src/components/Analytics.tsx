"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Alert } from "@/lib/types"

export default function Analytics() {
    const [alerts, setAlerts] = useState<Alert[]>([])

    useEffect(() => {
        const fetch_alerts = () => {
            fetch("http://127.0.0.1:8000/api/alerts")
                .then(res => res.json())
                .then(data => setAlerts(data))
        }
        fetch_alerts()
        const interval = setInterval(fetch_alerts, 5000)
        return () => clearInterval(interval)
    }, [])

    const grouped = alerts.reduce((acc: Record<string, number>, alert) => {
        const minute = new Date(alert.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
        acc[minute] = (acc[minute] || 0) + 1
        return acc
    }, {})

    const chartData = Object.entries(grouped)
        .slice(-10)
        .map(([time, count]) => ({ time, count }))

    return (
        <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Threat Analytics</h2>
            {chartData.length === 0 ? (
                <p className="text-sm text-gray-400">No data yet</p>
            ) : (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} />
                        <Tooltip
                            contentStyle={{ background: "#1f2937", border: "none", borderRadius: "8px" }}
                            labelStyle={{ color: "#f3f4f6" }}
                            itemStyle={{ color: "#ef4444" }}
                        />
                        <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
            <div className="flex gap-4 mt-4 text-sm">
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                    <p className="text-gray-400 text-xs">Total alerts</p>
                    <p className="text-white font-medium text-lg">{alerts.length}</p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                    <p className="text-gray-400 text-xs">High severity</p>
                    <p className="text-red-400 font-medium text-lg">
                        {alerts.filter(a => a.is_threat).length}
                    </p>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                    <p className="text-gray-400 text-xs">Zone violations</p>
                    <p className="text-orange-400 font-medium text-lg">
                        {alerts.filter(a => a.zone_violation).length}
                    </p>
                </div>
            </div>
        </div>
    )
}