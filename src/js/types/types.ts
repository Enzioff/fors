export enum animateType {
    HIDE = 'HIDE',
    FIRST = 'FIRST',
    VISIBLE = 'VISIBLE',
}

export enum breakPointsValues {
    DESKTOP = 1440,
    TABLET_MAX = 1439,
    TABLET = 768,
    MOBILE_MAX = 767,
    MOBILE = 360
}

export interface breakPoints {
    desktop: breakPointsValues.DESKTOP,
    tabletMax: breakPointsValues.TABLET_MAX,
    tablet: breakPointsValues.TABLET,
    mobileMax: breakPointsValues.MOBILE_MAX,
    mobile: breakPointsValues.MOBILE,
}

export interface AnimationProperties {
    x: number;
    y: number;
    scale: number;
    duration: number;
    opacity: number;
    zIndex?: number;
}

export interface PopupsAnimation {
    [key: string]: AnimationProperties;
}