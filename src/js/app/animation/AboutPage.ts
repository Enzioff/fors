import gsap from "gsap";
import {Spline} from "../spline/spline";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MainGsap} from "./MainGsap";
import {animateType} from "../../types";
import {animateSpline} from "../spline/animate";

export class AboutPage extends MainGsap {
    constructor(spline: Spline) {
        super(spline);

        this.initAboutPage()
    }

    initAboutPage() {
        this.cardsSection()
        this.bigCards()
        this.newsSection()
        this.timelineSection()
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
                onEnter: () => {
                    animateSpline(this.application, 1)
                },
                onLeaveBack: () => this.moveCanvas(0),
                onLeave: () => {
                },
                onToggle: self => {
                    self.refresh()
                }
            })
        })
    }

    protected bigCards = () => {
        const section = document.querySelector('.trigger-big-cards')
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
                    if (self.isActive) {
                        this.headerAnimation.animate(animateType.HIDE)
                        this.moveCanvas(0)
                    } else {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    }
                    self.refresh()
                },
            })

            ScrollTrigger.create({
                trigger: section,
                start: `top-=40 top`,
                end: () => `${cards.length * firstCardheight + listCardsHeight}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                onToggle: self => {
                    self.refresh()
                }
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
                    return 8
                } else if (isTablet) {
                    return 12
                } else {
                    return 6
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
                    self.refresh()
                }
            })
        })
    }

    protected timelineSection = () => {
        const timelinePinnedBlock = document.querySelector('.trigger-timeline');
        if (!timelinePinnedBlock) return;

        const timelineTablet = document.querySelector('.trigger-timeline-tab');
        const timeline = timelinePinnedBlock.querySelector('.timeline');
        const timelineItems = timeline.querySelectorAll('.timeline__item');
        const timelineWrapper = timeline.querySelector('.timeline__wrapper');
        const shadow = timeline.querySelector('.timeline__shadow')

        ScrollTrigger.refresh()

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
            if (isDesktop) {
                const totalHeight = Array.from(timelineItems).reduce((height, item) => {
                    return height + item.getBoundingClientRect().height;
                }, 0);

                const containerHeight = timeline.getBoundingClientRect().height;

                const maxY = containerHeight - totalHeight;
                const limitY = maxY < 0 ? maxY : 0;

                const sectionTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: timelinePinnedBlock,
                        start: 'center center',
                        end: () => `+=${Math.abs(totalHeight * 1.5)}`,
                        pin: true,
                        scrub: 1,
                        onToggle: self => {
                            self.refresh()
                            ScrollTrigger.getAll().forEach(el => {
                                if (el.trigger.classList.contains('footer')) {
                                    el.refresh()
                                }
                            })
                            self.isActive
                                ? timeline.classList.add('active')
                                : timeline.classList.remove('active')
                        }
                    }
                })

                let offsetY = 0;
                let shadowSize = shadow.getBoundingClientRect().height
                timelineItems.forEach((element, idx) => {
                    const elementHeight = element.getBoundingClientRect().height
                    sectionTimeline.to(timelineWrapper, {
                        y: offsetY >= limitY ? offsetY : limitY,
                        ease: 'none',
                        onUpdate: () => {
                            timelineItems.forEach(temp => temp.classList.remove('active'))
                            element.classList.add('active')
                        }
                    })
                    offsetY -= elementHeight
                })
            }

            if (isTabletMax) {
                const totalWidth = Array.from(timelineItems).reduce((width, item) => {
                    return width + item.getBoundingClientRect().width;
                }, 0);

                const containerWidth = timeline.getBoundingClientRect().width;

                const maxX = containerWidth - totalWidth;
                const limitY = maxX < 0 ? maxX : 0;

                const sectionTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: timelineTablet,
                        start: 'center center',
                        end: () => `+=${Math.abs(totalWidth * 1.5)}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                        onToggle: self => {
                            self.refresh()
                            ScrollTrigger.getAll().forEach(el => {
                                if (el.trigger.classList.contains('footer')) {
                                    el.refresh()
                                }
                            })
                            if (self.isActive) {
                                timeline.classList.add('active')
                                isTabletMax && this.moveCanvas(-20, {yPercent: -20})
                                isMobileMax && this.moveCanvas(0, {yPercent: 0})
                            } else {
                                timeline.classList.remove('active')
                                isTabletMax && this.moveCanvas(-20, {yPercent: 0})
                                isMobileMax && this.moveCanvas(0, {yPercent: 0})
                            }
                        }
                    }
                })

                let offsetX = 0;
                timelineItems.forEach((element) => {
                    const elementWidth = element.getBoundingClientRect().width
                    sectionTimeline.to(timelineWrapper, {
                        x: offsetX >= limitY ? offsetX : limitY,
                        ease: 'none',
                        onUpdate: () => {
                            timelineItems.forEach(temp => temp.classList.remove('active'))
                            element.classList.add('active')
                        }
                    })
                    offsetX -= elementWidth
                })
            }
        })
    }
}