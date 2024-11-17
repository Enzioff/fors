import gsap from "gsap";
import { SPEObject } from "@splinetool/runtime";

enum RotateKey {
    SET_DEFAULT = 'setDefaultPosition',
    SCENE_1 = 'scene-1',
    SCENE_3 = 'scene-3',
    SCENE_4 = 'scene-4',
    SCENE_5 = 'scene-5',
    SCENE_6 = 'scene-6',
    SCENE_7 = 'scene-7',
    SCENE_8 = 'scene-8',
    SCENE_9 = 'scene-9',
    SCENE_10 = 'scene-10',
    SCENE_11 = 'scene-11',
    SCENE_13 = 'scene-13',
    SCENE_15 = 'scene-15',
    SCENE_16 = 'scene-16',
    SCENE_17 = 'scene-17',
    SCENE_18 = 'scene-18',
    SCENE_19 = 'scene-19',
    SCENE_20 = 'scene-20',
    SCENE_21 = 'scene-21',
    SCENE_22 = 'scene-22',
    SCENE_23 = 'scene-23',
    SCENE_24 = 'scene-24',
    SCENE_25 = 'scene-25',
    SCENE_26 = 'scene-26',
    SCENE_28 = 'scene-28',
    SCENE_1_1 = 'scene-1-1',
    SCENE_1_2 = 'scene-1-2',
}

const rotationParams: { [key in RotateKey]: gsap.TweenVars } = {
    [RotateKey.SET_DEFAULT]: { y: -0.55, x: 0.2, z: -0.75, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_1]: { y: -1, x: 0.25, z: 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_3]: { y: -1, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_4]: { y: 1, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_5]: { y: 2.9, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_6]: { y: Math.PI + 2.3, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_7]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_8]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI / 2 + 3.8, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_9]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI + 3.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_10]: { y: Math.PI * 3 + 0.3, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine",  },
    [RotateKey.SCENE_11]: { y: Math.PI * 3.75, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine",  },
    [RotateKey.SCENE_13]: { y: Math.PI * 4 + 0.6, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine",  },
    [RotateKey.SCENE_15]: { y: Math.PI * 4.75 + 0.1, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine",  },
    [RotateKey.SCENE_16]: { y: Math.PI * 4.75 + 0.1, x: 0.2, z: 6.9 + (Math.PI / 2), duration: 2, ease: "sine",  },
    [RotateKey.SCENE_17]: { y: Math.PI * 5, x: 0, z: Math.PI * 3, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_18]: { y: Math.PI * 5 + 0.5, x: -0.05, z: Math.PI * 3 + 0.6, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_19]: { y: Math.PI * 5 + 0.5, x: -0.05, z: Math.PI * 3.5 + 0.5, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_20]: { y: Math.PI * 5.5 + 0.9, x: -0.05, z: Math.PI * 3.5 + 0.5, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_21]: { y: Math.PI * 6 + 0.8, x: -0.1, z: Math.PI * 3.5 + 0.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_22]: { y: Math.PI * 6 + 0.8, x: -0.1, z: Math.PI * 2.5 + 0.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_23]: { y: Math.PI * 6.5 + 0.5, x: -0.1, z: Math.PI * 2 + 0.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_24]: { y: Math.PI * 6.5 + 0.6, x: -0.1, z: Math.PI * 3 - 0.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_25]: { y: Math.PI * 6.5 + 0.6, x: -0.1, z: Math.PI * 3.5 - 0.7, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_26]: { y: Math.PI * 7.5 - 0.1, x: 0, z: Math.PI * 4, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_28]: { y: Math.PI * 7.5 - 0.9, x: 0.2, z: Math.PI * 4 - 0.8, duration: 2, ease: "sine",  },
    [RotateKey.SCENE_1_1]: { y: (Math.PI * 2) + (-0.55), x: 0.2, z: -0.75, duration: 8, ease: "none", repeat: -1},
    [RotateKey.SCENE_1_2]: { y: Math.PI * 2, x: 0.2, z: -Math.PI * 2, duration: 5, ease: "none", repeat: -1},
};

function normalizeAngle(angle: number | gsap.TweenValue): number {
    // @ts-ignore
    return angle - Math.floor(angle / (Math.PI * 2)) * (Math.PI * 2);
}

function getShortestRotation(current: number, target: number | gsap.TweenValue): number {
    // @ts-ignore
    const delta = normalizeAngle(target - current);
    if (delta > Math.PI) {
        return delta - (Math.PI * 2);
    }
    return delta;
}

function rotateObject(el: SPEObject, key: RotateKey) {
    const params = rotationParams[key];
    if (params && el?.rotation) {
        gsap.killTweensOf(el.rotation);

        const currentY = normalizeAngle(el.rotation.y);
        const currentX = normalizeAngle(el.rotation.x);
        const currentZ = normalizeAngle(el.rotation.z);

        const targetY = normalizeAngle(params.y);
        const targetX = normalizeAngle(params.x);
        const targetZ = normalizeAngle(params.z);

        let shortestY = getShortestRotation(currentY, targetY);
        let shortestX = getShortestRotation(currentX, targetX);
        let shortestZ = getShortestRotation(currentZ, targetZ);

        if (Math.abs(shortestY) > Math.PI) {
            shortestY = (shortestY > 0) ? shortestY - (Math.PI * 2) : shortestY + (Math.PI * 2);
        }

        if (Math.abs(shortestX) > Math.PI) {
            shortestX = (shortestX > 0) ? shortestX - (Math.PI * 2) : shortestX + (Math.PI * 2);
        }

        if (Math.abs(shortestZ) > Math.PI) {
            shortestZ = (shortestZ > 0) ? shortestZ - (Math.PI * 2) : shortestZ + (Math.PI * 2);
        }

        gsap.to(el.rotation, {
            y: currentY + shortestY,
            x: currentX + shortestX,
            z: currentZ + shortestZ,
            duration: params.duration,
            ease: params.ease,
            repeat: params.repeat ? params.repeat : null,
        });
    }
}

export {
    RotateKey,
    rotateObject,
};
