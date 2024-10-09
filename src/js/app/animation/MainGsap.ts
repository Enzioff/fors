import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {Spline} from "../spline/spline";
import {breakPoints, breakPointsValues} from "../../types";
import HeaderAnimation from "./header";

export class MainGsap {
    private readonly spline: Spline;
    mm: gsap.MatchMedia;
    breakPoints: breakPoints;
    headerAnimation: HeaderAnimation;

    constructor(spline: Spline) {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

        this.spline = spline
        this.mm = gsap.matchMedia()
        this.breakPoints = {
            desktop: breakPointsValues.DESKTOP,
            tabletMax: breakPointsValues.TABLET_MAX,
            tablet: breakPointsValues.TABLET,
            mobileMax: breakPointsValues.MOBILE_MAX,
            mobile: breakPointsValues.MOBILE,
        }

        this.headerAnimation = new HeaderAnimation(this.mm, this.breakPoints)
    }

    public moveCanvas = (xPercent: number, props?: gsap.TweenVars) => {
        gsap.to('.spline-canvas', {
            xPercent: xPercent,
            ...props,
        })

        gsap.to('.spline-container', {
            zIndex: props?.zIndex ? props?.zIndex : null,
        })
    }

    public get application() {
        return this.spline.application
    }
}