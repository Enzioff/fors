import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimationConfig} from "./AnimationConfig";
import {Spline} from "../spline/spline";

export class MvcPage extends AnimationConfig {
    constructor(spline: Spline) {
        super(spline)
        this.initMvcPage()
    }

    initMvcPage() {
        this.cardsSection()
        this.bigCards()
    }

    protected bigCards = () => {
        this.animationBigCards()
    }

    protected cardsSection = () => {
        const section = document.querySelector('.trigger-slim-cards');
        if (!section) return;

        const listItems = document.querySelectorAll('.trigger-slim-cards .article-info');
        const container = section.querySelector('.layering');
        const shadow = container.querySelector('.layering__shadow');
        const pinnedBlock = section.querySelector('.anim-stay')
        const shadowHeight = shadow.getBoundingClientRect().height;

        const cardsTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
                scrub: 1,
                onEnter: self => self.refresh()
            }
        });

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            const calcHeight = (idx: number) => {
                if (isDesktop) {
                    return shadowHeight - (idx * 25)
                } else if (isTablet) {
                    return shadowHeight - (idx * 11)
                } else if (isMobileMax) {
                    return shadowHeight - (idx * 11)
                }
            }

            const resizeShadow = (idx: number = 0): void => {
                gsap.to(shadow, {
                    height: calcHeight(idx),
                    duration: 0.2,
                })
            }

            ScrollTrigger.create({
                trigger: pinnedBlock,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
                onToggle: self => self.refresh()
            })

            listItems.forEach((card, idx) => {
                const isFirstCard = idx === 0;
                const animationIdx = idx + 3;

                cardsTimeLine.from(card, {
                    y: () => idx === 0 ? 0 : card.getBoundingClientRect().height + (idx === 1 ? 0 : 100),
                    duration: 1,
                    ease: 'linear',
                    onStart: () => {
                        resizeShadow(idx)
                        // animateSpline(this.application, animationIdx)
                    },
                    onReverseComplete: () => {
                        // animateSpline(this.application, animationIdx - 1)
                        resizeShadow(!isFirstCard ? idx - 1 : idx)
                    }
                })
            })
        })
    }
}