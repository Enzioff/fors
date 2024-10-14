import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnimationConfig} from "./AnimationConfig";
import {Spline} from "../spline/spline";
import {animateType} from "../../types";
import {animateSpline} from "../spline/animate";

export class MvcPage extends AnimationConfig {
    constructor(spline: Spline) {
        super(spline)
        this.initMvcPage()
    }

    initMvcPage() {
        this.cardsSection()
        this.bigCards()
        this.breakCardsSection()
    }

    protected bigCards = () => {
        const offsetGap = 20;
        const offsetTop = 60;

        const section = document.querySelector('.trigger-a-cards')
        const headerOffset = this.headerAnimation.getHeaderSize.height / 2

        if (!section) return

        const servicesHeader = section.querySelector('.services__header')
        const servicesHeaderItems = section.querySelectorAll('.services__item')
        const cards = section.querySelectorAll('.article-service')
        const listCards = section.querySelector('.trigger-list-cards')

        const firstCardheight = cards[0].getBoundingClientRect().height;
        const listCardsHeight = listCards.getBoundingClientRect().height;

        const cardColors = [
            '#032183',
            '#002DBF',
            '#134AFF',
        ]

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
                end: () => `${cards.length * firstCardheight + listCardsHeight}`,
                onToggle: (self) => {
                    if (self.isActive) {
                        this.headerAnimation.animate(animateType.HIDE);
                    } else {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    }
                },
                onLeaveBack: () => {
                    if (isDesktop) {
                        this.application.setZoom(1.4)
                        this.moveCanvas(0)
                    }
                    if (isTabletMax) {
                        this.application.setZoom(0.7)
                    }
                    animateSpline(this.application, 1)
                },
                onLeave: () => {
                    if (isDesktop) {
                        this.application.setZoom(1.4)
                        this.moveCanvas(0)
                    }
                    if (isTabletMax) {
                        this.application.setZoom(0.7)
                        this.moveCanvas(-20)
                    }
                    if (isMobileMax) {
                        this.application.setZoom(0.8)
                        this.moveCanvas(0)
                    }
                    animateSpline(this.application, 8)
                },
                onEnter: () => {
                    if (isDesktop) {
                        this.application.setZoom(0.8)
                    }
                    if (isTabletMax) {
                        this.moveCanvas(10, {yPercent: -15})
                        this.application.setZoom(0.6)
                    }
                    if (isMobileMax) {
                        this.moveCanvas(0, {yPercent: 15})
                    }
                    animateSpline(this.application, 2)
                },
                onEnterBack: () => {
                    if (isDesktop) {
                        this.moveCanvas(0)
                        animateSpline(this.application, 2)
                        this.application.setZoom(0.8)
                    }
                    if (isTabletMax) {
                        this.moveCanvas(10)
                        this.application.setZoom(0.6)
                        animateSpline(this.application, 2)
                    }
                    if (isMobileMax) {
                        this.moveCanvas(0, {yPercent: 15})
                    }
                }
            })

            ScrollTrigger.create({
                trigger: section,
                start: `top-=40 top`,
                end: () => `${cards.length * firstCardheight}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
            })

            const cardsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: listCards,
                    start: 'top top',
                    end: () => `${cards.length * firstCardheight}`,
                    scrub: 1,
                }
            });

            servicesHeaderItems.forEach((headItem, idx) => {
                headItem.addEventListener('click', () => {
                    cardsTimeline.tweenTo(`point${idx}`, {
                        ease: 'none',
                        duration: 0.6,
                    })
                })
            })

            cards.forEach((card: HTMLElement, idx) => {
                const cardHeight = card.offsetHeight;

                cardsTimeline.fromTo(card, {
                    y: (cardHeight + offsetGap) * idx,
                    duration: 1,
                }, {
                    y: idx <= 3 ? offsetTop * idx : offsetTop * 2,
                    duration: 1,
                    onUpdate: () => {
                        const progress = cardsTimeline.progress();
                        if (progress > 0) {
                            if (isMobileMax) {
                                gsap.to(servicesHeader, {
                                    scrollTo: servicesHeaderItems[idx],
                                    ease: 'none',
                                })
                            }
                            servicesHeaderItems.forEach(temp => temp.classList.remove('active'))
                            servicesHeaderItems[idx].classList.add('active')

                            gsap.to(card, {
                                backgroundColor: idx >= 2 ? cardColors[2] : idx >= 1 ? cardColors[1] : cardColors[0],
                                ease: 'none',
                            })
                        }
                    },
                    onStart: () => {
                        animateSpline(this.application, 3 + idx - 1)
                        if (isTabletMax) {
                            this.moveCanvas(10, {yPercent: -15 + (idx + 3)})
                        }
                        if (isMobileMax) {
                            this.moveCanvas(0, {yPercent: 12})
                        }
                    },
                    onReverseComplete: () => {
                        animateSpline(this.application, 7 - idx + 1)
                    }
                }).add(`point${idx}`)

                if (idx >= 3) {
                    cardsTimeline.to(cards[idx - 3], {
                        scale: isTablet ? 0.8 : 1,
                        backgroundColor: cardColors[0],
                        opacity: 0,
                        duration: 1,
                    }, '<')

                    cardsTimeline.to(cards[idx - 2], {
                        y: idx >= 3 ? 0 : null,
                        scale: isTablet ? 0.90 : 1,
                        duration: 1,
                        backgroundColor: cardColors[0],
                    }, '<')

                    cardsTimeline.to(cards[idx - 1], {
                        y: idx >= 3 ? offsetTop : null,
                        scale: isTablet ? 0.95 : 1,
                        duration: 1,
                        backgroundColor: cardColors[1],
                    }, '<')
                }
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
                onToggle: self => {
                    self.refresh()
                    if (self.isActive) {
                        if (isMobileMax) {
                            this.moveCanvas(0, {yPercent: -20})
                        }
                    } else {
                        if (isMobileMax) {
                            this.moveCanvas(0, {yPercent: 0})
                        }
                    }
                },
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
                        animateSpline(this.application, 10 + idx)
                    },
                    onReverseComplete: () => {
                        resizeShadow(!isFirstCard ? idx - 1 : idx)
                    }
                })
            })
        })
    }

    protected breakCardsSection = () => {
        const section = document.querySelector('.trigger-cards-break');

        if (!section) return;

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
                onToggle: self => {
                    self.refresh()
                },
                onLeave: () => {
                    if (isDesktop) {
                        this.moveCanvas(-20)
                    }
                }
            })
        })
    }
}