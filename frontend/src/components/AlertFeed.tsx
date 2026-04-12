'use client';

import {useState, useEffect} from 'react';
import { Alert } from '@/lib/types';


export default function AlertFeed(){
    const [alerts, setAlerts] = useState<Alert[]>([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/alerts")
        .then(res => res.json())
        .then(data => setAlerts(data))
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
