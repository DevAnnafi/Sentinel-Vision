import { useStream } from "@/hooks/useStream"

export default function FeedGrid() {
    const { payload, connected, error } = useStream("ws://localhost:8000/ws/stream")

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm font-medium">
                    {connected ? "Connected" : "Disconnected"}
                </span>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="relative rounded-lg overflow-hidden bg-black">
                {payload?.frame ? (
                    <img
                        src={`data:image/jpeg;base64,${payload.frame}`}
                        alt="Live feed"
                        className="w-full h-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                        Waiting for stream...
                    </div>
                )}

                {payload && (
                    <div className="absolute bottom-2 left-2 flex gap-2">
                        <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                            Detections: {payload.detections}
                        </span>
                        <span className="bg-red-600/90 text-white text-xs px-2 py-1 rounded">
                            Threats: {payload.threats.length}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}