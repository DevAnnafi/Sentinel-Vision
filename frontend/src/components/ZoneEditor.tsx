"use client"

import { useState, useRef, useEffect } from "react"
import { Zone } from "@/lib/types"
import { API_URL, apiHeaders } from "@/lib/config"

export default function ZoneEditor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [points, setPoints] = useState<[number, number][]>([])
    const [zoneName, setZoneName] = useState<string>("Zone 1")
    const [saved, setSaved] = useState<boolean>(false)

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPoints(prev => [...prev, [x, y]])
        setSaved(false)
    }

    const handleClear = () => {
        setPoints([])
        setSaved(false)
    }

    const handleSave = async () => {
        if (points.length < 3) return
        const zone: Zone = {
            id: crypto.randomUUID(),
            name: zoneName,
            polygon: points,
            active: true
        }
        await fetch(`${API_URL}/api/zones`, {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify(zone)
        })
        setSaved(true)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (points.length === 0) return

        // Draw polygon
        ctx.beginPath()
        ctx.moveTo(points[0][0], points[0][1])
        points.forEach(([x, y]) => ctx.lineTo(x, y))
        if (points.length > 2) ctx.closePath()

        ctx.strokeStyle = "rgba(255, 50, 50, 0.9)"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = "rgba(255, 50, 50, 0.15)"
        ctx.fill()

        // Draw points
        points.forEach(([x, y]) => {
            ctx.beginPath()
            ctx.arc(x, y, 5, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(255, 50, 50, 0.9)"
            ctx.fill()
        })
    }, [points])

    return (
        <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-medium">Zone Editor</h2>
            <p className="text-sm text-gray-400">
                Click on the feed to place polygon points. Need at least 3 points to save.
            </p>

            {/* Zone name input */}
            <input
                type="text"
                value={zoneName}
                onChange={e => setZoneName(e.target.value)}
                className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
                placeholder="Zone name"
            />

            {/* Canvas overlay */}
            <div className="relative rounded-lg overflow-hidden bg-black">
                <p className="text-xs text-gray-500 absolute top-2 left-2 z-10">
                    Click to place points — {points.length} placed
                </p>
                <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    onClick={handleCanvasClick}
                    className="w-full cursor-crosshair"
                    style={{ background: "rgba(0,0,0,0.5)" }}
                />
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                <button
                    onClick={handleSave}
                    disabled={points.length < 3}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-sm px-4 py-2 rounded-lg"
                >
                    Save Zone
                </button>
                <button
                    onClick={handleClear}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg"
                >
                    Clear
                </button>
            </div>

            {saved && (
                <p className="text-green-400 text-sm">
                    Zone saved successfully
                </p>
            )}

            {points.length > 0 && (
                <div className="text-xs text-gray-500">
                    Points: {points.map(([x, y]) => `(${Math.round(x)}, ${Math.round(y)})`).join(" → ")}
                </div>
            )}
        </div>
    )
}