import gsap from "gsap";
import {Spline} from "../spline/spline";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MainGsap} from "./MainGsap";
import {animateType} from "../../types";
import {animateSpline} from "../spline/animate";

export class MvcPage extends MainGsap {
    constructor(spline: Spline) {
        super(spline);

        this.initMvcPage()
    }

    initMvcPage() {
        this.cardsSection()
        this.bigCards()
    }

    protected bigCards = () => {
        const section = document.querySelector('.trigger-big-cards-slim')
        const headerOffset = this.headerAnimation.getHeaderSize.height / 2

        if (!section) return

        const servicesHeaderItems = section.querySelectorAll('.services__item')
        const cards = section.querySelectorAll('.article-service')
        const listCards = section.querySelector('.trigger-list-cards')

        const firstCardheight = cards[0].getBoundingClientRect().height;
        const listCardsHeight = listCards.getBoundingClientRect().height

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
                end: `${cards.length * firstCardheight} top`,
                onToggle: (self) => {
                    self.refresh()

                    if (self.isActive) {
                        this.headerAnimation.animate(animateType.HIDE)
                        this.moveCanvas(0, {zIndex: 2})
                        animateSpline(this.application, 2)
                        if (isDesktop) {
                            this.application.setZoom(0.8)
                        }
                        if (isTabletMax) {
                            this.application.setZoom(0.7)
                        }
                        if (isMobileMax) {
                            this.application.setZoom(0.6)
                        }
                    } else {
                        this.headerAnimation.animate(animateType.VISIBLE)
                        animateSpline(this.application, 8)
                        if (isDesktop) {
                            this.application.setZoom(1.4)
                            this.moveCanvas(-20, {yPercent: 0, zIndex: 0})
                        }
                        if (isTabletMax) {
                            this.application.setZoom(0.7)
                            this.moveCanvas(-20, {yPercent: 0, zIndex: 0})
                        }
                        if (isMobileMax) {
                            this.application.setZoom(0.8)
                            this.moveCanvas(0, {yPercent: 0, zIndex: 0})
                        }
                    }
                },
            })

            ScrollTrigger.create({
                trigger: section,
                start: `top-=40 top`,
                end: () => `${cards.length * firstCardheight + listCardsHeight}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                onToggle: self => self.refresh()
            })

            const cardsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: listCards,
                    start: 'top top',
                    end: () => `${cards.length * firstCardheight + listCardsHeight}`,
                    scrub: 1,
                }
            });

            const mediaOffset = () => {
                if (isDesktop) {
                    return 12
                } else if (isTablet) {
                    return 16
                } else {
                    return 8
                }
            }

            const calcYOffset = (idx: number) => {
                if (idx === 0) {
                    return 0
                } else if (idx === 1) {
                    return mediaOffset()
                } else if (idx === 2) {
                    return mediaOffset() * idx
                } else {
                    return mediaOffset() * 2
                }
            }

            cards.forEach((card, idx) => {
                cardsTimeline.fromTo(card, {
                    yPercent: (100 * idx),
                    duration: 1,
                }, {
                    yPercent: calcYOffset(idx),
                    transformOrigin: '50% 0',
                    duration: 1,
                    onUpdate: () => {
                        const progress = cardsTimeline.progress();
                        if (progress > 0) {
                            servicesHeaderItems.forEach(temp => temp.classList.remove('active'))
                            servicesHeaderItems[idx].classList.add('active')
                            if (isDesktop) {
                                this.moveCanvas(0, {yPercent: 5, zIndex: 2})
                            } else if (isTablet) {
                                this.moveCanvas(0, {yPercent: 2, zIndex: 2})
                            } else if (isMobileMax) {
                                this.moveCanvas(0, {yPercent: 20, zIndex: 2})
                            }
                        }
                    }
                }).to(cards[idx - 1], {
                    yPercent: idx >= 2 && mediaOffset(),
                    transformOrigin: '50% 0',
                    scale: isTablet ? 0.95 : 1,
                    duration: 1,
                }, '<').to(cards[idx - 2], {
                    yPercent: idx >= 4 && 0,
                    transformOrigin: '50% 0',
                    scale: isTablet ? 0.90 : 1,
                    duration: 1,
                }, '<').to(cards[idx - 3], {
                    scale: isTablet ? 0.8 : 1,
                    transformOrigin: '50% 0',
                    opacity: 0,
                    duration: 1,
                }, '<')
            })
        })
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