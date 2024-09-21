import {Application} from "@splinetool/runtime";
import {RotateKey, rotateObject} from "./rotateObject";
import {AnimationKey, callInnerAnimation} from "./callInnerAnimation";

const animationActions: { [key: number]: (app: Application, el?: any) => void } = {
    0: (app, el) => rotateObject(el, RotateKey.SET_DEFAULT),
    1: (app, el) => {
        rotateObject(el, RotateKey.SCENE_1);
        callInnerAnimation(app, AnimationKey.MAKE_NORMAL_COLOR);
        callInnerAnimation(app, AnimationKey.MAKE_NORMAL_BG);
    },
    2: (app) => {
        callInnerAnimation(app, AnimationKey.MAKE_BLUE_COLOR);
        callInnerAnimation(app, AnimationKey.MAKE_BLUE_BG);
    },
    3: (app, el) => rotateObject(el, RotateKey.SCENE_3),
    4: (app, el) => rotateObject(el, RotateKey.SCENE_4),
    5: (app, el) => rotateObject(el, RotateKey.SCENE_5),
    6: (app, el) => rotateObject(el, RotateKey.SCENE_6),
    7: (app, el) => rotateObject(el, RotateKey.SCENE_7),
    8: (app, el) => {
        callInnerAnimation(app, AnimationKey.MAKE_NORMAL_COLOR);
        callInnerAnimation(app, AnimationKey.MAKE_NORMAL_BG);
        rotateObject(el, RotateKey.SCENE_8);
    },
    9: (app, el) => rotateObject(el, RotateKey.SCENE_9),
    10: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_SIDE_2);
        rotateObject(el, RotateKey.SCENE_10);
    },
    11: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_REVERSE_SIDE_2);
        rotateObject(el, RotateKey.SCENE_11);
    },
    12: (app) => callInnerAnimation(app, AnimationKey.ROTATE_SIDE_1),
    13: (app, el) => rotateObject(el, RotateKey.SCENE_13),
    14: (app) => callInnerAnimation(app, AnimationKey.ROTATE_REVERSE_SIDE_1),
    15: (app, el) => rotateObject(el, RotateKey.SCENE_15),
    16: (app, el) => {
        callInnerAnimation(app, AnimationKey.JOIN_MODEL);
        rotateObject(el, RotateKey.SCENE_16);
    },
    17: (app, el) => {
        callInnerAnimation(app, AnimationKey.BREAK_MODEL);
        rotateObject(el, RotateKey.SCENE_17);
    },
    18: (app, el) => {
        callInnerAnimation(app, AnimationKey.JOIN_MODEL);
        rotateObject(el, RotateKey.SCENE_18);
    },
    19: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_SIDE_1);
        rotateObject(el, RotateKey.SCENE_19);
    },
    20: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_REVERSE_SIDE_1);
        rotateObject(el, RotateKey.SCENE_20);
    },
    21: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_SIDE_2);
        rotateObject(el, RotateKey.SCENE_21);
    },
    22: (app, el) => {
        callInnerAnimation(app, AnimationKey.ROTATE_REVERSE_SIDE_2);
        rotateObject(el, RotateKey.SCENE_22);
    },
    23: (app, el) => rotateObject(el, RotateKey.SCENE_23),
    24: (app, el) => rotateObject(el, RotateKey.SCENE_24),
    25: (app, el) => rotateObject(el, RotateKey.SCENE_25),
    26: (app, el) => rotateObject(el, RotateKey.SCENE_26),
    27: (app) => callInnerAnimation(app, AnimationKey.BREAK_MODEL),
    28: (app, el) => {
        rotateObject(el, RotateKey.SCENE_28);
        callInnerAnimation(app, AnimationKey.JOIN_MODEL);
    }
};

function animateSpline(app: Application, key: number): void {
    const el = app.findObjectByName('cube');
    const action = animationActions[key];
    if (action) {
        action(app, el);
    }
}

export {
    animateSpline,
};
