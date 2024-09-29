import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateSpline} from "../spline/animate";
import {Spline} from "../spline/spline";
import {getTotalElements} from "../../helpers/getTotalElements";
import HeaderAnimation from "./header";
import {animateType, breakPoints, breakPointsValues, PopupsAnimation} from "../../types";

class Animation {
    spline: Spline;
    mm: gsap.MatchMedia;
    headerAnimation: HeaderAnimation;
    breakPoints: breakPoints;

    constructor(spline?: Spline) {
        this.spline = spline;
        this.init()
    }

    init() {
        this.global()
        this.globalAnimations()
        this.menu()
        this.section1()
        this.section2()
        this.section3()
        this.marquee()
        this.section4()
        this.section6()
        this.section7()
        this.section8()
        this.section9()
        this.section10()
        this.section11()
        this.section12()
        this.footer()
    }

    global() {
        gsap.registerPlugin(ScrollTrigger);
        this.mm = gsap.matchMedia();
        this.breakPoints = {
            desktop: breakPointsValues.DESKTOP,
            tabletMax: breakPointsValues.TABLET_MAX,
            tablet: breakPointsValues.TABLET,
            mobileMax: breakPointsValues.MOBILE_MAX,
            mobile: breakPointsValues.MOBILE,
        }

        this.headerAnimation = new HeaderAnimation()
    }

    globalAnimations = () => {
        this.headerAnimation.animate(animateType.FIRST);
    }

    moveCanvas = (value: number, props?: gsap.TweenVars) => {
        gsap.to('.spline-canvas', {
            xPercent: value,
            ...props,
        })
    }

    section1() {
        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax} = context.conditions;

            if (isTabletMax) {
                this.headerAnimation.animate(animateType.VISIBLE)
            }

            ScrollTrigger.create({
                trigger: '.animate-section-1',
                start: 'top top',
                end: "bottom center",
                onEnterBack: () => {
                    isDesktop && this.headerAnimation.animate(animateType.HIDE);
                    animateSpline(this.spline.application, 0)
                },
                onLeave: () => {
                    isDesktop && this.headerAnimation.animate(animateType.VISIBLE)
                    animateSpline(this.spline.application, 1)
                }
            });

            return () => {
                ScrollTrigger.refresh()
                ScrollTrigger.update()
                this.headerAnimation.updateStyles();
            };
        })

        gsap.from('.logo', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            onComplete: () => gsap.killTweensOf('.logo')
        })

        gsap.from('.anim-in-right', {
            x: 100,
            opacity: 0,
            duration: 0.8,
            onComplete: () => gsap.killTweensOf('.anim-in-right')
        })

        gsap.from('.anim-in-bottom', {
            y: 100,
            opacity: 0,
            duration: 1,
            onComplete: () => gsap.killTweensOf('.anim-in-bottom')
        })

        gsap.from('.anim-in-bottom-stagger', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            onComplete: () => gsap.killTweensOf('.anim-in-bottom-stagger')
        })

        gsap.from('.title--main span', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "expo.out",
            onComplete: () => gsap.killTweensOf('.title--main span')
        })

        gsap.from(['.widget-info', '.widget-stats'], {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            onComplete: () => gsap.killTweensOf(['.widget-info', '.widget-stats'])
        })
    }

    section2() {
        gsap.from('.direction .direction__item', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.direction',
                start: 'center bottom',
            }
        })

        gsap.from('.info-blocks .info-block', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.info-blocks',
                start: 'center bottom',
            }
        })

        gsap.from('.news-item', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.news-item',
                start: 'center bottom',
            }
        })

        gsap.from('.tags .tag', {
            scale: 0.3,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.tags',
                start: 'center bottom',
            }
        })

        gsap.from('.title-in', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.title-in',
                start: 'center bottom',
            }
        })
    }

    section3() {
        ScrollTrigger.create({
            trigger: '.animate-section-3',
            start: 'top bottom',
            onEnter: () => {
                animateSpline(this.spline.application, 2)

                this.mm.add({
                    isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
                    isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
                }, (context) => {
                    const {isTablet, isMobileMax} = context.conditions;

                    if (isTablet) {
                        this.moveCanvas(-20);
                    }
                })
            },
            onLeaveBack: () => {
                animateSpline(this.spline.application, 1)
                this.moveCanvas(0);
            }
        })

        gsap.from('.animate-section-3', {
            y: 400,
            duration: 1,
            lazy: true,
            scrollTrigger: {
                trigger: '.animate-section-3',
                start: 'top bottom',
                once: true,
            },
            onComplete: () => {
                gsap.set('.animate-section-3', {clearProps: "all"})
                gsap.killTweensOf('.animate-section-3')
                ScrollTrigger.refresh(true)
            },
        })

        gsap.from('.animate-section-3 .animate-title', {
            y: -400,
            duration: 1,
            scrollTrigger: {
                trigger: '.animate-section-3',
                start: 'top bottom',
                once: true,
            },
            onComplete: () => {
                gsap.set('.animate-section-3 .animate-title', {clearProps: "all"})
                gsap.killTweensOf('.animate-section-3 .animate-title')
                ScrollTrigger.refresh(true)
            }
        })
    }

    marquee() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.marquee--anim',
                start: 'top bottom',
                end: "bottom top",
                scrub: 1,
                onEnter: () => tl.play(),
                onEnterBack: () => tl.play(),
                onLeave: () => tl.pause(),
                onLeaveBack: () => tl.pause(),
            },
        });

        this.mm.add({
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
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

    section4() {
        const paginationList = document.querySelectorAll('.animate-section-3 .pagination__item');
        const paginationCount = document.querySelector('.animate-section-3 .widget-slider__numbers');
        const popups = document.querySelectorAll('.animate-section-3 .article-notification')
        const listItems = document.querySelectorAll('.animate-section-3 .article-info');
        const container = document.querySelector('.animate-section-3 .layering');
        const shadow = container.querySelector('.layering__shadow');
        const shadowHeight = shadow.getBoundingClientRect().height;

        const resizeShadow = (idx: number = 0): void => {
            gsap.to(shadow, {
                height: shadowHeight - (idx * 25),
                duration: 0.2,
            })
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.animate-section-3 .layering',
                start: 'center center',
                end: () => `+=${listItems.length * (listItems[0].getBoundingClientRect().height + 200)}`,
                scrub: 1,
                onEnterBack: () => animateSpline(this.spline.application, 7),
                onLeave: () => animateSpline(this.spline.application, 8)
            }
        });

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            const popupsAnimation: PopupsAnimation = {
                'anim-1': {
                    x: -150,
                    y: 80,
                    scale: 1,
                    duration: 0.5,
                    opacity: 1,
                    zIndex: 2,
                },
                'anim-2': {
                    x: isTabletMax ? -120 : -200,
                    y: isTabletMax ? -150 : -300,
                    scale: 1,
                    duration: 0.5,
                    opacity: 1,
                    zIndex: 2,
                },
                'anim-3': {
                    x: isTabletMax ? 70 : 150,
                    y: isTabletMax ? -180 : -300,
                    scale: 1,
                    duration: 0.5,
                    opacity: 1,
                    zIndex: 2,
                },
                'anim-4': {
                    x: isTabletMax ? -160 : -260,
                    y: isTabletMax ? -200 : -300,
                    scale: 1,
                    duration: 0.5,
                    opacity: 1,
                    zIndex: 2,
                },
                'back': {
                    x: 0,
                    y: 0,
                    scale: 0.3,
                    duration: 0.5,
                    opacity: 0,
                }
            }

            ScrollTrigger.create({
                trigger: '.animate-section-3 .anim-stay',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: 'center center',
                end: () => `+=${listItems.length * (listItems[0].getBoundingClientRect().height + 200) + 300}`,
                markers: true,
                onLeaveBack: () => {
                    animateSpline(this.spline.application, 2)
                    isMobileMax && this.moveCanvas(0);
                },
                onEnter: () => {
                    isMobileMax && this.moveCanvas(-20, {zIndex: 1})
                },
                onLeave: () => {
                    isMobileMax && this.moveCanvas(0);
                }
            })

            const updatePagination = (isActive: boolean, idx: number) => {
                if (isActive) {
                    paginationList[idx].classList.add('active');
                } else {
                    paginationList[idx].classList.remove('active');
                }
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            };

            listItems.forEach((card, idx) => {
                const isFirstCard = idx === 0;
                const animationIdx = idx + 3;

                tl.from(card, {
                    y: () => idx === 0 ? 0 : card.getBoundingClientRect().height + (idx === 1 ? 0 : 100),
                    duration: 1,
                    ease: 'linear',
                    onStart: () => {
                        !isFirstCard && updatePagination(true, idx)
                        resizeShadow(idx)
                        animateSpline(this.spline.application, animationIdx)
                    },
                    onComplete: () => {
                        !isFirstCard && gsap.to(popups[idx - 1], {
                            ...popupsAnimation[`back`]
                        })
                    },
                    onUpdate: () => {
                        popups.forEach(el => {
                            gsap.to(el, {
                                ...popupsAnimation[`back`]
                            })
                        })
                        !isFirstCard && gsap.to(popups[idx - 1], {
                            ...popupsAnimation[`anim-${idx}`]
                        })
                    },
                    onReverseComplete: () => {
                        animateSpline(this.spline.application, animationIdx - 1)
                        resizeShadow(!isFirstCard ? idx - 1 : idx)
                        !isFirstCard && updatePagination(false, idx)
                        gsap.to(popups[idx - 1], {
                            ...popupsAnimation[`back`]
                        })
                    }
                })
            })
        })
    }

    section6() {
        const paginationList = document.querySelectorAll('.animate-section-4 .pagination__item');
        const paginationCount = document.querySelector('.animate-section-4 .widget-slider__numbers');
        const listItems = document.querySelectorAll('.animate-section-4 .article-info');
        const container = document.querySelector('.animate-section-4 .layering')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.animate-section-4 .layering',
                start: 'center center',
                end: "bottom top",
                scrub: 1,
            },
            onComplete: () => animateSpline(this.spline.application, 14)
        });

        ScrollTrigger.create({
            trigger: '.animate-section-4 .title',
            start: 'top center',
            onEnter: () => animateSpline(this.spline.application, 9),
        });

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: '.animate-section-4 .grid--anim',
                pin: true,
                pinSpacing: true,
                start: isTablet ? 'center center' : 'center center+=200',
                end: 'bottom top-=200px',
                scrub: true,
                onLeave: () => {
                    animateSpline(this.spline.application, 15)
                    isMobileMax && gsap.to('.spline-canvas', {
                        yPercent: 0
                    })
                },
                onLeaveBack: () => {
                    isMobileMax && gsap.to('.spline-canvas', {
                        yPercent: 0
                    })
                },
                onEnter: () => {
                    isMobileMax && gsap.to('.spline-canvas', {
                        yPercent: -20
                    })
                },
            })

            tl.to('.animate-section-4 .article-info--1', {
                yPercent: 0,
                duration: 12,
                delay: 1,
                ease: "linear",
                onStart: () => {
                    animateSpline(this.spline.application, 10)
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                }
            })
            tl.to('.animate-section-4 .article-info--2', {
                yPercent: -90,
                duration: 12,
                delay: 1,
                ease: "linear",
                onStart: () => {
                    animateSpline(this.spline.application, 11)
                    paginationList[1].classList.add('active')
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                },
                onComplete: () => {
                    isTabletMax && container.classList.add('visible')
                }
            })
            tl.to('.animate-section-4 .article-info--3', {
                yPercent: -118,
                duration: 12,
                delay: 1,
                ease: "linear",
                onStart: () => {
                    paginationList[2].classList.add('active')
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                    animateSpline(this.spline.application, 12)
                },
            })
            tl.to('.animate-section-4 .article-info--4', {
                yPercent: -100,
                duration: 12,
                delay: 1,
                ease: "linear",
                onStart: () => {
                    paginationList[3].classList.add('active')
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                    animateSpline(this.spline.application, 13)
                },
            })
        })
    }

    section7() {
        ScrollTrigger.create({
            trigger: '.section--cards .title',
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => animateSpline(this.spline.application, 16),
        });

        this.mm.add({
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isTablet, isMobileMax} = context.conditions;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section--cards',
                    start: isMobileMax ? 'top bottom' : 'top center-=100',
                    end: isMobileMax ? 'bottom bottom' : 'bottom center+=100',
                    scrub: 1,
                    onEnter: () => {
                        animateSpline(this.spline.application, 17)
                        gsap.to('.spline-canvas', {
                            xPercent: 0,
                        })
                    },
                    onEnterBack: () => {
                        animateSpline(this.spline.application, 17)
                        gsap.to('.spline-canvas', {
                            xPercent: 0,
                        })
                    },
                    onLeave: () => {
                        animateSpline(this.spline.application, 18)
                        gsap.to('.spline-canvas', {
                            xPercent: isTablet ? -20 : 0,
                        })
                    },
                    onLeaveBack: () => {
                        animateSpline(this.spline.application, 16)
                        gsap.to('.spline-canvas', {
                            xPercent: isTablet ? -20 : 0,
                        })
                    }
                },
            });

            tl.from('.article-card', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
            })
        })
    }

    section8() {
        const paginationList = document.querySelectorAll('.animate-section-5 .pagination__item');
        const paginationCount = document.querySelector('.animate-section-5 .widget-slider__numbers');
        const listItems = document.querySelectorAll('.animate-section-5 .article-info');
        const container = document.querySelector('.animate-section-5 .layering')

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.animate-section-5 .layering',
                start: 'center center',
                end: '+=900',
                scrub: 1,
            }
        });

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: '.animate-section-5 .grid--anim',
                pin: true,
                pinSpacing: true,
                start: isMobileMax ? 'center center+=200' : 'center center',
                end: 'bottom top-=200px',
                onEnter: () => {
                    animateSpline(this.spline.application, 19)
                    isMobileMax && gsap.to('.spline-canvas', {
                        yPercent: -20
                    })
                },
                onLeaveBack: () => {
                    isMobileMax && gsap.to('.spline-canvas', {
                        yPercent: 0
                    })
                },
                onLeave: () => {
                    if (isMobileMax) {
                        animateSpline(this.spline.application, 15)
                        gsap.to('.spline-canvas', {
                            yPercent: 0
                        })
                    }
                }
            })

            tl.to('.animate-section-5 .article-info--1', {
                yPercent: 0,
                duration: 100,
                delay: 1,
                ease: "linear",
                onUpdate: () => {
                    isTabletMax && container.classList.remove('visible')
                },
                onStart: () => {
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                    animateSpline(this.spline.application, 20)
                },
            })
            tl.to('.animate-section-5 .article-info--2', {
                yPercent: -90,
                duration: 100,
                delay: 1,
                ease: "linear",
                onComplete: () => {
                    isMobileMax && container.classList.add('visible')
                },
                onStart: () => {
                    paginationList[1].classList.add('active')
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                    animateSpline(this.spline.application, 21)
                },
            })
            tl.to('.animate-section-5 .article-info--3', {
                yPercent: -118,
                duration: 100,
                delay: 1,
                ease: "linear",
                onStart: () => {
                    paginationList[2].classList.add('active')
                    paginationCount.textContent = getTotalElements(paginationList, listItems);
                    animateSpline(this.spline.application, 22)
                },
            })
        })
    }

    section9() {
        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            ScrollTrigger.create({
                trigger: '.anim-cube',
                pin: true,
                pinSpacing: false,
                start: 'center center',
                end: 'center+=300 center',
                onToggle: (self) => {
                    if (self.isActive) {
                        if (isDesktop) {
                            gsap.to('.article-notification--11', {
                                x: 120,
                                y: -300,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                            gsap.to('.article-notification--12', {
                                x: -300,
                                y: 200,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                        }
                        if (isTabletMax) {
                            gsap.to('.article-notification--11', {
                                x: 80,
                                y: -200,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                            gsap.to('.article-notification--12', {
                                x: -180,
                                y: 100,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                        }
                    } else {
                        gsap.to('.article-notification--11', {
                            x: 0,
                            y: 0,
                            scale: 0.3,
                            duration: 0.5,
                            opacity: 0,
                        })
                        gsap.to('.article-notification--12', {
                            x: 0,
                            y: 0,
                            scale: 0.3,
                            duration: 0.5,
                            opacity: 0,
                        })
                    }
                },
            })

            ScrollTrigger.create({
                trigger: '.grid--anim-in .tags',
                pin: false,
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => animateSpline(this.spline.application, 23),
                onLeave: () => animateSpline(this.spline.application, 24),
            })
        })
    }

    section10() {
        ScrollTrigger.create({
            trigger: '.grid--anim-cards',
            pin: false,
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => {
                animateSpline(this.spline.application, 25);
                gsap.from('.grid--anim-cards .info-block', {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                })
            },
            onLeave: () => animateSpline(this.spline.application, 26),
        })
    }

    section11() {
        const marqueeContainerTop = document.querySelector('.marquee__track--anim-01')
        const marqueeContainerBottom = document.querySelector('.marquee__track--anim-02')
        const totalWidthTop = marqueeContainerTop.scrollWidth;
        const totalWidthBottom = marqueeContainerBottom.scrollWidth;
        const tl = gsap.timeline();

        ScrollTrigger.create({
            trigger: '.marquee--anim-2',
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => {
                marqueeContainerTop.innerHTML += marqueeContainerTop.innerHTML;
                marqueeContainerBottom.innerHTML += marqueeContainerBottom.innerHTML;
                tl.to('.marquee__track--anim-01', {
                    x: -totalWidthTop / 2,
                    duration: 20,
                    ease: "linear",
                    repeat: -1,
                })

                tl.to('.marquee__track--anim-02', {
                    x: totalWidthBottom / 2,
                    duration: 20,
                    ease: "linear",
                    repeat: -1,
                }, "<")

                tl.play();
            },
            onEnterBack: () => tl.play(),
            onLeave: () => tl.pause(),
            onLeaveBack: () => tl.pause()
        })
    }

    section12() {
        const mm = gsap.matchMedia()
        ScrollTrigger.create({
            trigger: '.grid--last',
            start: 'top bottom',
            end: "bottom top",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.grid--widgets--anim',
                start: 'top bottom-=100',
                end: "bottom top",
                onEnter: () => animateSpline(this.spline.application, 27),
                onLeave: () => {
                    animateSpline(this.spline.application, 28)
                    mm.add('(min-width: 768px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 2,
                            xPercent: 0,
                            yPercent: 50,
                        })
                    })
                },
                onEnterBack: () => {
                    animateSpline(this.spline.application, 26)
                    mm.add('(min-width: 768px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 1,
                            xPercent: -20,
                            yPercent: 0,
                        })
                    })
                    mm.add('(max-width: 767px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 1,
                            xPercent: 0,
                            yPercent: 0,
                        })
                    })
                },
            },
            onComplete: () => {
                const btn = document.querySelector('.button-circle.anim-el-in');
                btn.classList.remove('button-circle--stay')
            }
        });

        tl.from('.anim-el-in', {
            y: 50,
            duration: 1,
            opacity: 0,
            stagger: 0.3,
        })
    }

    footer() {
        const mm = gsap.matchMedia();
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => {
                    animateSpline(this.spline.application, 28)
                    mm.add('(min-width: 1440px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 2,
                            xPercent: 0,
                            yPercent: 50,
                        })
                    })
                    mm.add('(max-width: 1439px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 2,
                            xPercent: 4,
                            yPercent: 50,
                        })
                    })
                    mm.add('(max-width: 767px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 2,
                            xPercent: 40,
                            yPercent: 45,
                        })
                    })
                },
                onLeaveBack: () => {
                    mm.add('(min-width: 768px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 1,
                            xPercent: -20,
                            yPercent: 0,
                        })
                    })
                    mm.add('(max-width: 767px)', () => {
                        gsap.to('.spline-canvas', {
                            zIndex: 1,
                            xPercent: 0,
                            yPercent: 0,
                        })
                    })
                }
            },
        });

        tl.from('.site-nav__item', {
            y: 100,
            duration: 1,
            opacity: 0,
            stagger: 0.5,
        })
    }

    menu() {
        const mm = gsap.matchMedia();
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('.menu');
        const desktopMenu = document.querySelector('.desktop-menu');
        const body = document.querySelector('body');
        const burgerIcons = burger.querySelectorAll('img');
        const userNav = document.querySelector('.header__user-nav');

        gsap.to(desktopMenu, {
            width: 0,
            padding: '19px 0',
            margin: 0,
        })

        const checkBurgerStatus = (desktop?: boolean) => {
            if (burger.classList.contains('active')) {
                burgerIcons[0].setAttribute('hidden', '')
                if (desktop) {
                    burgerIcons[2].removeAttribute('hidden')
                } else {
                    burgerIcons[1].removeAttribute('hidden')
                }
            } else {
                if (desktop) {
                    burgerIcons[2].setAttribute('hidden', '')
                } else {
                    burgerIcons[1].setAttribute('hidden', '')
                }
                burgerIcons[0].removeAttribute('hidden')
            }
        }

        function toggleMobileMenu() {
            menu.classList.toggle('active')
            burger.classList.toggle('active')
            body.classList.toggle('fixed')
            checkBurgerStatus()
        }

        function openDesktopMenu() {
            console.log('enter')
            gsap.killTweensOf(desktopMenu);
            gsap.to(desktopMenu, {
                width: '100%',
                padding: '19px 56px',
                margin: '0 0 0 15px',
                duration: 1,
            })
            gsap.from('.desktop-menu__link', {
                yPercent: -100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "back.out(1.7)",
            })
            checkBurgerStatus(true)
        }

        function closeDesktopMenu() {
            console.log('leave')
            gsap.killTweensOf(desktopMenu);
            gsap.killTweensOf('.desktop-menu__link');
            gsap.set(desktopMenu, {clearProps: "all"});
            gsap.set('.desktop-menu__link', {clearProps: "all"});
            gsap.to(desktopMenu, {
                width: '0%',
                padding: '19px 0',
                margin: 0,
            })
            checkBurgerStatus(true)
        }

        mm.add('(min-width: 1440px)', () => {
            burger.addEventListener('mouseenter', openDesktopMenu)
            userNav.addEventListener('mouseleave', closeDesktopMenu)

            return function () {
                burger.removeEventListener('mouseenter', openDesktopMenu)
                userNav.removeEventListener('mouseleave', closeDesktopMenu)
            };
        })

        mm.add('(max-width: 1439px)', () => {
            burger.addEventListener('click', toggleMobileMenu)
            return function () {
                burger.removeEventListener('click', toggleMobileMenu)
            };
        })
    }
}

export default Animation