import cv2
import numpy as np
from dataclasses import dataclass, field

@dataclass
class Zone:
    id: str
    name: str
    polygon: list[tuple[int,int]]
    active: bool = True

class ZoneEnforcer:
    def __init__(self, zones: list[Zone]):
        self.zones = zones

    def check(self, bbox: tuple[int, int, int, int]) -> list[Zone]:
        x1, y1, x2, y2 = bbox
        point = ((x1 + x2) // 2, y2)
        violations = []
        for zone in self.zones:
            if not zone.active:
                continue
            result = cv2.pointPolygonTest(
                np.array(zone.polygon, dtype=np.int32),
                point,
                False
            )
            if result >= 0:
                violations.append(zone)
        return violations
        


