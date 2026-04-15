export interface Detection {
    class: string,
    confidence: number,
    bbox: [number, number, number, number],
    frame_id: number
}

export interface StreamPayload {
    frame: string,
    detections: number,
    threats: Detection[]
}

export interface Alert {
    id: string
    timestamp: string
    class_name: string
    confidence: number
    bbox: [number, number, number, number]
    is_threat: boolean
    zone_violation: boolean
    camera_id: string
    frame_id: number
}

export interface Zone {
    id: string
    name: string
    polygon: [number, number][]
    active: boolean
}