import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateSpline} from "../spline/animate";
import {AnimationConfig} from "./AnimationConfig";
import {Spline} from "../spline/spline";

export class AboutPage extends AnimationConfig {
    constructor(spline: Spline) {
        super(spline)

        this.initAboutPage()
    }

    initAboutPage() {
        this.cardsSection()
        this.newsSection()
        this.timelineSection()
        this.sectionForm()
        this.animationBigCards()
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
                onEnter: () => animateSpline(this.application, 1),
                onLeaveBack: () => this.moveCanvas(0),
                onToggle: self => {
                    self.refresh()
                },
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
                    self.refresh()
                    if (self.isActive) {
                        if (isTablet) {
                            this.moveCanvas(20)
                        }
                        if (isMobileMax) {
                            this.moveCanvas(0)
                        }
                    } else {
                        if (isTablet) {
                            this.moveCanvas(-20)
                        }
                        if (isMobileMax) {
                            this.moveCanvas(0)
                        }
                    }
                },
                onEnter: () => animateSpline(this.application, 19),
                onLeave: () => animateSpline(this.application, 20),
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
        const switcher = timeline.querySelector('.timeline__switcher') as HTMLElement;
        let isReversed = false;

        if (switcher) {
            switcher.addEventListener('click', () => {
                if (timelineWrapper.classList.contains('reverse')) {
                    timelineWrapper.classList.remove('reverse')
                    timelineItems[0].classList.add('active')
                    isReversed = false
                } else {
                    timelineWrapper.classList.add('reverse')
                    timelineItems[timelineItems.length - 1].classList.add('active')
                    isReversed = true
                }
            })
        }

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

                const maxY = containerHeight - (totalHeight + 72);
                const limitY = maxY < 0 ? maxY : 0;

                const sectionTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: timelinePinnedBlock,
                        start: 'center center',
                        end: () => `+=${Math.abs(totalHeight * 1.5)}`,
                        pin: true,
                        scrub: 1,
                        onToggle: self => {
                            ScrollTrigger.getAll().forEach(el => {
                                if (el.trigger.classList.contains('footer')) {
                                    el.refresh()
                                }
                            })
                            if (self.isActive) {
                                self.refresh()
                                timeline.classList.add('active')
                                if (switcher) {
                                    switcher.style.opacity = '0';
                                }
                            } else {
                                timeline.classList.remove('active')
                                if (switcher) {
                                    switcher.style.opacity = '1';
                                }
                            }
                        },
                        onLeave: () => animateSpline(this.application, 18),
                    }
                })

                let offsetY = 0;
                let animCounter = 0;
                const animCounterMax = 5;

                timelineItems.forEach((element, idx) => {
                    const elementHeight = element.getBoundingClientRect().height
                    sectionTimeline.to(timelineWrapper, {
                        y: offsetY >= limitY ? offsetY : limitY,
                        ease: 'none',
                        onUpdate: () => {
                            timelineItems.forEach(temp => temp.classList.remove('active'))
                            if (isReversed) {
                                timelineItems[timelineItems.length - (idx + 1)].classList.add('active')
                            } else {
                                element.classList.add('active')
                            }
                        },
                        onStart: () => {
                            if (idx % 2 === 0 && animCounter < animCounterMax) {
                                animCounter += 1;
                                animateSpline(this.application, 9 + animCounter)
                            }
                        },
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

                let offsetX = -timelineItems[0].getBoundingClientRect().width / 2;
                let animCounter = 0;
                const animCounterMax = 5;
                timelineItems.forEach((element, idx) => {
                    const elementWidth = element.getBoundingClientRect().width
                    sectionTimeline.to(timelineWrapper, {
                        x: offsetX >= limitY ? offsetX : limitY,
                        ease: 'none',
                        onUpdate: () => {
                            timelineItems.forEach(temp => temp.classList.remove('active'))
                            element.classList.add('active')
                        },
                        onStart: () => {
                            if (idx % 2 === 0 && animCounter < animCounterMax) {
                                animCounter += 1;
                                animateSpline(this.application, 9 + animCounter)
                            }
                        }
                    })
                    offsetX -= elementWidth
                })
            }
        })
    }

    protected sectionForm = () => {
        const section = document.querySelector('.trigger-form');

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
                end: 'bottom top',
                onToggle: self => {
                    self.refresh()
                    if (self.isActive) {
                        isDesktop && this.moveCanvas(-20, {yPercent: 20})
                    }
                },
                onEnter: () => animateSpline(this.application, 21),
                onLeaveBack: () => isDesktop && this.moveCanvas(-20, {yPercent: 0})
            })
        })
    }

}