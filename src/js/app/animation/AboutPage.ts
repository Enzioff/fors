import {Spline} from "../spline/spline";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MainGsap} from "./MainGsap";
import {animateType} from "../../types";

export class AboutPage extends MainGsap {
    constructor(spline: Spline) {
        super(spline);

        this.initAboutPage()
    }

    initAboutPage() {
        this.cardsSection()
        this.bigCards()
        this.newsSection()
    }

    protected cardsSection = () => {
        const section = document.querySelector('.trigger-a-cards')

        if (!section) return

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => isTablet && this.moveCanvas(-20),
                onLeaveBack: () => this.moveCanvas(0),
                onLeave: () => isTablet && this.moveCanvas(-20),
            })
        })
    }

    protected bigCards = () => {
        const section = document.querySelector('.trigger-big-cards')
        const headerOffset = this.headerAnimation.getHeaderSize.height / 2

        if (!section) return

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: section,
                start: `top top+=${headerOffset}`,
                end: 'bottom top',
                onToggle: (self) => {
                    if (self.isActive) {
                        this.headerAnimation.animate(animateType.HIDE)
                        this.moveCanvas(0)
                    } else {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    }
                }
            })
        })
    }

    protected newsSection = () => {
        const section = document.querySelector('.trigger-grid-news')

        if (!section) return

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onToggle: (self) => {
                    self.isActive
                        ? isTablet && this.moveCanvas(20)
                        : isTablet && this.moveCanvas(-20)
                }
            })
        })
    }
}