import cv2

class RTSPStreamReader:
    def __init__(self, source, target_fps=10):
        self.source = source
        self.target_fps = target_fps
        self.cap = None

    def connect(self):
        self.cap = cv2.VideoCapture(self.source)
        self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        return self.cap.isOpened()
    
    def read_frame(self):
        if not self.cap:
            return False, None
        ret, frame = self.cap.read()
        return ret, frame if ret else None
    
    def release(self):
        if self.cap:
            self.cap.release()