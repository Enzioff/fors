import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {MainGsap} from "./MainGsap";
import {animateType} from "../../types";
import {Spline} from "../spline/spline";
import {animateSpline} from "../spline/animate";

export class AnimationConfig extends MainGsap {
    constructor(spline: Spline) {
        super(spline);

        this.initAnimationConfig()
    }

    private initAnimationConfig() {
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

    private initIntroSection = () => {
        const introSection = document.querySelector('.animate-intro');

        if (!introSection) return

        this.headerAnimation.isFixed
            ? this.headerAnimation.animate(animateType.VISIBLE)
            : this.headerAnimation.animate(animateType.HIDE)

        ScrollTrigger.create({
            trigger: introSection,
            start: 'top-=50 top',
            end: 'bottom top',
            onToggle: (self) => {
                if (self.isActive) {
                    this.moveCanvas(0)
                    if (this.headerAnimation.isFixed) {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    } else {
                        this.headerAnimation.animate(animateType.HIDE)
                    }
                } else {
                    if (!this.headerAnimation.isFixed) {
                        this.headerAnimation.animate(animateType.VISIBLE)
                    }
                }
                self.refresh()
            }
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
                    end: 'bottom top',
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
}