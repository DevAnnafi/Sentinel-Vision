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