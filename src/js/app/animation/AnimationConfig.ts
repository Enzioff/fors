import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MainGsap} from "./MainGsap";
import {animateType} from "../../types";
import {Spline} from "../spline/spline";
import {animateSpline} from "../spline/animate";

export class AnimationConfig extends MainGsap {
    constructor(spline?: Spline) {
        super(spline);
    }

    public initAnimationConfig() {
        this.initIntroSection()
        this.animationInBottom()
        this.animationInBottomPin()
        this.animationInBottomStagger()
        this.animationInRight()
        this.animationInRightStagger()
        this.animationInTop()
        this.animationInTopStagger()
        this.animationBubble()
        this.animationMarqueeScrub()
        this.animationMarqueeInfinite()
        this.animationFooter()
    }

    public initIntroSection = () => {
        const introSection = document.querySelector('.animate-intro');

        if (!introSection) return

        const introWidgets = document.querySelectorAll('.anim-notification');

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
            if (isDesktop) {
                this.headerAnimation.isFixed
                    ? this.headerAnimation.animate(animateType.VISIBLE)
                    : this.headerAnimation.animate(animateType.HIDE)
            }
            if (isTabletMax) {
                this.headerAnimation.animate(animateType.VISIBLE)
            }
            ScrollTrigger.create({
                trigger: introSection,
                start: 'top-=50 top',
                end: 'bottom top',
                onToggle: (self) => {
                    if (self.isActive) {
                        if (isDesktop) {
                            this.moveCanvas(0)
                            this.headerAnimation.isFixed
                                ? this.headerAnimation.animate(animateType.VISIBLE)
                                : this.headerAnimation.animate(animateType.HIDE)
                        }
                        if (isTabletMax) {
                            this.moveCanvas(0, {yPercent: -25})
                            this.headerAnimation.animate(animateType.VISIBLE)
                        }
                        if (isMobileMax) {
                            this.moveCanvas(0, {yPercent: 15})
                        }

                        if (isDesktop) {
                            gsap.to(introWidgets[0], {
                                x: -316,
                                y: -91,
                                opacity: 1,
                                scale: 1,
                                zIndex: 1,
                            })
                            gsap.to(introWidgets[1], {
                                x: 321,
                                y: -235,
                                opacity: 1,
                                scale: 1,
                                zIndex: 0,
                            })
                        }
                        if (isTabletMax) {
                            gsap.to(introWidgets[0], {
                                x: -210,
                                y: -31,
                                opacity: 1,
                                scale: 1,
                                zIndex: 1,
                            })
                            gsap.to(introWidgets[1], {
                                x: 133,
                                y: -197,
                                opacity: 1,
                                scale: 1,
                                zIndex: 0,
                            })
                        }
                        if (isMobileMax) {
                            gsap.to(introWidgets[0], {
                                x: -168,
                                y: 272,
                                opacity: 1,
                                scale: 1,
                                zIndex: 1,
                            })
                            gsap.to(introWidgets[1], {
                                x: 59,
                                y: 30,
                                opacity: 1,
                                scale: 1,
                                zIndex: 0,
                            })
                        }
                    } else {
                        if (!this.headerAnimation.isFixed) {
                            this.headerAnimation.animate(animateType.VISIBLE)
                        }
                        if (isTabletMax) {
                            this.moveCanvas(0, {yPercent: 0})
                        }
                        gsap.to(introWidgets[0], {
                            x: 0,
                            y: 0,
                            scale: 0.3,
                            opacity: 0,
                        })
                        gsap.to(introWidgets[1], {
                            x: 0,
                            y: 0,
                            scale: 0.3,
                            opacity: 0,
                        })
                    }
                },
            })
        })
    }

    public animationInRight() {
        const selectors = document.querySelectorAll('.anim-in-right')
        if (!selectors) return

        selectors.forEach(selector => {
            const delay = selector.getAttribute('data-anim-delay');

            gsap.from(selector, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                delay: delay ? delay : null,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationInRightStagger() {
        const selectors = document.querySelectorAll('.anim-in-right-stagger')
        if (!selectors) return

        selectors.forEach(selector => {
            const children = selector.children

            gsap.from(children, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: children,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationInTop() {
        const selectors = document.querySelectorAll('.anim-in-top')
        if (!selectors) return

        selectors.forEach(selector => {
            const delay = selector.getAttribute('data-anim-delay');

            gsap.from(selector, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                delay: delay ? delay : null,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationInTopStagger() {
        const selectors = document.querySelectorAll('.anim-in-top-stagger')
        if (!selectors) return

        selectors.forEach(selector => {
            gsap.from(selector, {
                y: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationInBottom() {
        console.trace('Функция была вызвана из:');
        const selectors = document.querySelectorAll('.anim-in-bottom')
        if (!selectors) return

        selectors.forEach(selector => {
            const delay = selector.getAttribute('data-anim-delay');

            gsap.from(selector, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: delay ? delay : null,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationInBottomPin() {
        const selectors = document.querySelectorAll('.anim-in-bottom-pin');

        if (!selectors) return

        selectors.forEach(selector => {
            const children = selector.children;

            gsap.from(children, {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top-=50 bottom',
                    end: 'bottom center',
                    scrub: 1,
                    onToggle: self => {
                        self.refresh()
                    }
                }
            })
        })
    }

    public animationInBottomStagger() {
        const selectors = document.querySelectorAll('.anim-in-bottom-stagger')
        if (!selectors) return

        selectors.forEach(selector => {
            const children = selector.children

            gsap.from(children, {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: {
                    trigger: children,
                    start: 'top bottom',
                    toggleActions: "play pause pause reset",
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationBubble() {
        const selectors = document.querySelectorAll('.anim-bubble')
        if (!selectors) return

        selectors.forEach(selector => {
            const delay = selector.getAttribute('data-anim-delay');
            const children = selector.children

            gsap.from(children, {
                scale: 0.3,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                delay: delay ? delay : null,
                scrollTrigger: {
                    trigger: children,
                    start: 'top bottom',
                    onToggle: self => {
                        self.refresh()
                    },
                }
            })
        })
    }

    public animationMarqueeScrub = () => {
        const marquee = document.querySelector('.trigger-marquee');
        if (!marquee) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: marquee,
                start: 'top bottom',
                end: "bottom top",
                scrub: 1,
                onToggle: (self) => {
                    self.isActive
                        ? tl.play()
                        : tl.pause()

                    self.refresh()
                }
            },
        });

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isTabletMax} = context.conditions;

            tl.to('.marquee__track--anim-1', {
                x: isTabletMax ? -200 : -600,
                duration: 1,
                lazy: true,
            }).to('.marquee__track--anim-2', {
                x: isTabletMax ? 200 : 600,
                duration: 1,
                lazy: true,
            }, "<")

            return () => {
                tl.kill();
            }
        })
    }

    public animationMarqueeInfinite = () => {
        const marqueContainer = document.querySelector('.trigger-marquee-infinite')
        if (!marqueContainer) return
        const marqueeContainerTop = marqueContainer.querySelector('.marquee__track--anim-01')
        const marqueeContainerBottom = marqueContainer.querySelector('.marquee__track--anim-02')
        if (!marqueeContainerTop || !marqueeContainerBottom) return

        const totalWidthTop = marqueeContainerTop.scrollWidth;
        const totalWidthBottom = marqueeContainerBottom.scrollWidth;

        const tl = gsap.timeline();
        ScrollTrigger.create({
            trigger: marqueContainer,
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => {
                if (marqueeContainerTop && marqueeContainerBottom) {
                    marqueeContainerTop.innerHTML += marqueeContainerTop.innerHTML;
                    marqueeContainerBottom.innerHTML += marqueeContainerBottom.innerHTML;
                }
                tl.to(marqueeContainerTop, {
                    x: -totalWidthTop / 2,
                    duration: 20,
                    ease: "linear",
                    repeat: -1,
                })

                tl.to(marqueeContainerBottom, {
                    x: totalWidthBottom / 2,
                    duration: 20,
                    ease: "linear",
                    repeat: -1,
                }, "<")

                tl.play();
            },
            onEnterBack: () => tl.play(),
            onLeave: () => tl.pause(),
            onLeaveBack: () => tl.pause(),
            onToggle: self => {
                self.refresh()
            },
        })
    }

    public animationFooter = () => {
        const footer = document.querySelector('.footer')

        if (!footer) return

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: footer,
                start: 'center bottom',
                end: 'center center',
                onEnter: () => {
                    animateSpline(this.application, 28)
                    if (isDesktop) {
                        this.moveCanvas(0, {yPercent: 50, zIndex: 2})
                    }
                    if (isTabletMax) {
                        this.moveCanvas(4, {yPercent: 50, zIndex: 2})
                    }
                    if (isMobileMax) {
                        this.moveCanvas(40, {yPercent: 50, zIndex: 2})
                    }
                },
                onLeaveBack: () => {
                    animateSpline(this.application, 26)
                    if (isTablet) {
                        this.moveCanvas(-20, {yPercent: 0, zIndex: 1})
                    }
                    if (isMobileMax) {
                        this.moveCanvas(0, {yPercent: 0, zIndex: 1})
                    }
                },
                onToggle: self => {
                    self.refresh()
                },
            })
        })
    }

    public animationBigCards = (offsetGap: number = 20, offsetTop: number = 60) => {
        const section = document.querySelector('.trigger-big-cards')
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

            // servicesHeaderItems[0].addEventListener('click', () => {
            //     gsap.to(window, {
            //         scrollTo: cards[0],
            //         duration: 1,
            //     })
            // })
            // servicesHeaderItems[servicesHeaderItems.length - 1].addEventListener('click', () => {
            //     gsap.to(window, {
            //         scrollTo: cards[cards.length - 1],
            //         duration: 1,
            //     })
            // })

            ScrollTrigger.create({
                trigger: section,
                start: `top top+=${headerOffset}`,
                end: () => `+=${cards.length * firstCardheight + listCardsHeight}`,
                onToggle: (self) => {
                    if (self.isActive) {
                        this.headerAnimation.animate(animateType.HIDE);
                    } else {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    }
                },
                onLeave: () => {
                    isTablet && this.moveCanvas(-20)
                    animateSpline(this.application, 8)
                }
            })

            ScrollTrigger.create({
                trigger: section,
                start: `top-=40 top`,
                end: () => `+=${cards.length * firstCardheight}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
            })

            const cardsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: listCards,
                    start: 'top top',
                    end: () => `+=${cards.length * firstCardheight}`,
                    scrub: 1,
                }
            });

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
                                duration: 0,
                            })
                        }
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
}