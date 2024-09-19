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
}

const rotationParams: { [key in RotateKey]: gsap.TweenVars } = {
    [RotateKey.SET_DEFAULT]: { y: -0.55, x: 0.2, z: -0.75, duration: 0, ease: "sine" },
    [RotateKey.SCENE_1]: { y: -1, x: 0.25, z: 1.1, duration: 3, ease: "sine" },
    [RotateKey.SCENE_3]: { y: -1, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine" },
    [RotateKey.SCENE_4]: { y: 1, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine" },
    [RotateKey.SCENE_5]: { y: 2.9, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine" },
    [RotateKey.SCENE_6]: { y: Math.PI + 2.3, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine" },
    [RotateKey.SCENE_7]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI / 2 + 1.1, duration: 2, ease: "sine" },
    [RotateKey.SCENE_8]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI / 2 + 3.8, duration: 2, ease: "sine" },
    [RotateKey.SCENE_9]: { y: Math.PI * 2 + 2.3, x: 0.2, z: Math.PI + 3.7, duration: 2, ease: "sine" },
    [RotateKey.SCENE_10]: { y: Math.PI * 3 + 0.3, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, delay: 1, ease: "sine" },
    [RotateKey.SCENE_11]: { y: Math.PI * 3.75, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine" },
    [RotateKey.SCENE_13]: { y: Math.PI * 4 + 0.6, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine" },
    [RotateKey.SCENE_15]: { y: Math.PI * 4.75 + 0.1, x: 0.2, z: 5.2 + (Math.PI / 2), duration: 2, ease: "sine" },
    [RotateKey.SCENE_16]: { y: Math.PI * 4.75 + 0.1, x: 0.2, z: 6.9 + (Math.PI / 2), duration: 2, ease: "sine" },
    [RotateKey.SCENE_17]: { y: Math.PI * 5, x: 0, z: Math.PI * 3, duration: 2, ease: "sine" },
    [RotateKey.SCENE_18]: { y: Math.PI * 5 + 0.5, x: -0.05, z: Math.PI * 3 + 0.6, duration: 2, ease: "sine" },
    [RotateKey.SCENE_19]: { y: Math.PI * 5 + 0.5, x: -0.05, z: Math.PI * 3.5 + 0.5, duration: 2, ease: "sine" },
    [RotateKey.SCENE_20]: { y: Math.PI * 5.5 + 0.9, x: -0.05, z: Math.PI * 3.5 + 0.5, duration: 2, ease: "sine" },
    [RotateKey.SCENE_21]: { y: Math.PI * 6 + 0.8, x: -0.1, z: Math.PI * 3.5 + 0.7, duration: 2, ease: "sine" },
    [RotateKey.SCENE_22]: { y: Math.PI * 6 + 0.8, x: -0.1, z: Math.PI * 2.5 + 0.7, duration: 3, ease: "sine" },
    [RotateKey.SCENE_23]: { y: Math.PI * 6.5 + 0.5, x: -0.1, z: Math.PI * 2 + 0.7, duration: 2, ease: "sine" },
    [RotateKey.SCENE_24]: { y: Math.PI * 6.5 + 0.6, x: -0.1, z: Math.PI * 3 - 0.7, duration: 2, ease: "sine" },
    [RotateKey.SCENE_25]: { y: Math.PI * 6.5 + 0.6, x: -0.1, z: Math.PI * 3.5 - 0.7, duration: 2, ease: "sine" },
    [RotateKey.SCENE_26]: { y: Math.PI * 7.5 - 0.1, x: 0, z: Math.PI * 4, duration: 2, ease: "sine" },
    [RotateKey.SCENE_28]: { y: Math.PI * 7.5 - 0.9, x: 0.2, z: Math.PI * 4 - 0.8, duration: 2, ease: "sine" },
};

function rotateObject(el: SPEObject, key: RotateKey) {
    gsap.killTweensOf(el.rotation);

    const params = rotationParams[key];
    if (params) {
        gsap.to(el.rotation, params);
    }
}

export {
    RotateKey,
    rotateObject,
};
