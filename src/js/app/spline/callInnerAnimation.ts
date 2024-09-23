import { Application } from "@splinetool/runtime";

enum AnimationKey {
    JOIN_MODEL = 'join_model',
    BREAK_MODEL = 'break_model',
    ROTATE_SIDE_1 = 'rotate_side_1',
    ROTATE_REVERSE_SIDE_1 = 'rotate_reverse_side_1',
    ROTATE_SIDE_2 = 'rotate_side_2',
    ROTATE_REVERSE_SIDE_2 = 'rotate_reverse_side_2',
    MAKE_BLUE_COLOR = 'make_blue_color',
    MAKE_NORMAL_COLOR = 'make_normal_color',
    // MAKE_BLUE_BG = 'make_blue_bg',
    // MAKE_NORMAL_BG = 'make_normal_bg',
}

function callInnerAnimation(app: Application, key: AnimationKey) {
    const objects = {
        // bg: app.findObjectByName('bg'),
        cube: app.findObjectByName('cube'),
        side_1: app.findObjectByName('side_1'),
        side_2: app.findObjectByName('side_2')
    };

    const events = {
        [AnimationKey.JOIN_MODEL]: () => app.emitEvent('keyUp', objects.cube.uuid),
        [AnimationKey.BREAK_MODEL]: () => app.emitEvent('mouseDown', objects.cube.uuid),
        [AnimationKey.ROTATE_SIDE_1]: () => app.emitEvent('keyDown', objects.side_1.uuid),
        [AnimationKey.ROTATE_REVERSE_SIDE_1]: () => app.emitEvent('keyUp', objects.side_1.uuid),
        [AnimationKey.ROTATE_SIDE_2]: () => app.emitEvent('keyDown', objects.side_2.uuid),
        [AnimationKey.ROTATE_REVERSE_SIDE_2]: () => app.emitEvent('keyUp', objects.side_2.uuid),
        [AnimationKey.MAKE_BLUE_COLOR]: () => app.emitEvent('keyDown', objects.cube.uuid),
        [AnimationKey.MAKE_NORMAL_COLOR]: () => app.emitEvent('keyUp', objects.cube.uuid),
        // // [AnimationKey.MAKE_BLUE_BG]: () => app.emitEventReverse('keyDown', objects.side_1.uuid),
        // [AnimationKey.MAKE_BLUE_BG]: () => app.emitEventReverse('keyDown', objects.bg.uuid),
        // [AnimationKey.MAKE_NORMAL_BG]: () => app.emitEventReverse('keyUp', objects.bg.uuid),
    };

    events[key]?.();
}

export {
    callInnerAnimation,
    AnimationKey,
};
