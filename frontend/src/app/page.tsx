import FeedGrid from "@/components/FeedGrid"
import AlertFeed from "@/components/AlertFeed"
import ZoneEditor from "@/components/ZoneEditor"
import Analytics from "@/components/Analytics"

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 tracking-tight">
                    SentinelVision
                </h1>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 flex flex-col gap-6">
                        <FeedGrid />
                        <Analytics />
                    </div>
                    <div className="col-span-1 flex flex-col gap-4">
                        <AlertFeed />
                        <ZoneEditor />
                    </div>
                </div>
            </div>
        </main>
    )
}