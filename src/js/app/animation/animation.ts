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
    logos: NodeListOf<Element>;

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
        this.about()
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
        this.logos = document.querySelectorAll('.logo img');

        this.headerAnimation = new HeaderAnimation()
    }

    globalAnimations = () => {
        const header = document.querySelector('.header');

        this.headerAnimation.animate(animateType.FIRST);
        if (header.classList.contains('header--page')) {
            this.headerAnimation.animate(animateType.VISIBLE);
        }
    }

    changeLogos = (flag: boolean) => {
        if (flag) {
            this.logos[0].setAttribute('hidden', '')
            this.logos[1].removeAttribute('hidden')
        } else {
            this.logos[1].setAttribute('hidden', '')
            this.logos[0].removeAttribute('hidden')
        }
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
                    animateSpline(this.spline.application, 0)
                    ScrollTrigger.refresh()
                },
                onLeave: () => {
                    animateSpline(this.spline.application, 1)
                }
            });

            ScrollTrigger.create({
                trigger: '.animate-section-2',
                start: 'top top+=100',
                onEnter: () => {
                    isDesktop && this.headerAnimation.animate(animateType.VISIBLE)
                },
                onLeaveBack: () => {
                    animateSpline(this.spline.application, 0)
                    isDesktop && this.headerAnimation.animate(animateType.HIDE);
                }
            })

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
            },
        })

        gsap.from('.animate-section-3', {
            y: 400,
            duration: 1,
            scrollTrigger: {
                trigger: '.animate-section-3',
                start: 'top bottom',
                once: true,
            },
            onComplete: () => {
                gsap.set('.animate-section-3', {clearProps: "all"})
                gsap.killTweensOf('.animate-section-3')
                ScrollTrigger.refresh()
                ScrollTrigger.update()
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
                ScrollTrigger.refresh()
                ScrollTrigger.update()
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
        const section = document.querySelector('.animate-section-3') as HTMLElement
        const paginationList = document.querySelectorAll('.animate-section-3 .pagination__item');
        const paginationCount = document.querySelector('.animate-section-3 .widget-slider__numbers');
        const popups = document.querySelectorAll('.animate-section-3 .article-notification')
        const listItems = document.querySelectorAll('.animate-section-3 .article-info');
        const container = document.querySelector('.animate-section-3 .layering');
        const shadow = container?.querySelector('.layering__shadow');
        const shadowHeight = shadow?.getBoundingClientRect().height;

        ScrollTrigger.create({
            trigger: '.animate-section-3',
            start: 'top top+=100',
            end: `bottom+=${(listItems?.length * (listItems[0]?.getBoundingClientRect().height)) + (section.getBoundingClientRect().height / 1.6)} top+=100`,
            onEnter: () => this.changeLogos(true),
            onEnterBack: () => this.changeLogos(true),
            onLeave: () => this.changeLogos(false),
            onLeaveBack: () => this.changeLogos(false)
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.animate-section-3 .layering',
                start: 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
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

            const calcHeight = (idx: number) => {
                if (isDesktop) {
                    return shadowHeight - (idx * 45)
                } else if (isTablet) {
                    return shadowHeight - (idx * 25)
                } else if (isMobileMax) {
                    return shadowHeight - (idx * 25)
                }
            }

            const resizeShadow = (idx: number = 0): void => {
                gsap.to(shadow, {
                    height: calcHeight(idx),
                    duration: 0.2,
                })
            }

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
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
                onLeaveBack: () => {
                    animateSpline(this.spline.application, 2)
                    isMobileMax && this.moveCanvas(0);
                },
                onEnter: () => {
                    isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
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
        const container = document.querySelector('.animate-section-4 .layering');
        const stayElement = document.querySelector('.animate-section-4 .grid--anim')
        const shadow = container?.querySelector('.layering__shadow');
        const shadowHeight = shadow?.getBoundingClientRect().height;

        ScrollTrigger.create({
            trigger: '.animate-section-4 .title',
            start: 'top center',
            onEnter: () => animateSpline(this.spline.application, 9),
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
                scrub: 1,
                onLeave: () => animateSpline(this.spline.application, 14),
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
                    return shadowHeight - (idx * 60)
                } else if (isTablet) {
                    return shadowHeight - (idx * 30)
                } else if (isMobileMax) {
                    return shadowHeight - (idx * 20)
                }
            }

            const resizeShadow = (idx: number = 0): void => {
                gsap.to(shadow, {
                    height: calcHeight(idx),
                    duration: 0.2,
                })
            }

            ScrollTrigger.create({
                trigger: stayElement,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: isMobileMax ? 'top center-=40%' : 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
                onLeave: () => {
                    animateSpline(this.spline.application, 15)
                    isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
                    isMobileMax && this.moveCanvas(0, {yPercent: 0})
                },
                onLeaveBack: () => {
                    isMobileMax && this.moveCanvas(0, {yPercent: 0})
                },
                onEnter: () => {
                    isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
                    isMobileMax && this.moveCanvas(0, {yPercent: -20})
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
                const animationIdx = idx + 10;

                tl.from(card, {
                    y: () => idx === 0 ? 0 : card.getBoundingClientRect().height + (idx === 1 ? isTabletMax ? -14 : -50 : 20),
                    duration: 1,
                    ease: 'linear',
                    onStart: () => {
                        !isFirstCard && updatePagination(true, idx)
                        resizeShadow(idx)
                        animateSpline(this.spline.application, animationIdx)
                    },
                    onReverseComplete: () => {
                        animateSpline(this.spline.application, animationIdx - 1)
                        resizeShadow(!isFirstCard ? idx - 1 : idx)
                        !isFirstCard && updatePagination(false, idx)
                    }
                })
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
        const container = document.querySelector('.animate-section-5 .layering');
        const shadow = container?.querySelector('.layering__shadow');
        const shadowHeight = shadow?.getBoundingClientRect().height;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
                scrub: 1,
                onLeave: () => animateSpline(this.spline.application, 14),
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
                    return shadowHeight - (idx * 60)
                } else if (isTablet) {
                    return shadowHeight - (idx * 30)
                } else if (isMobileMax) {
                    return shadowHeight - (idx * 30)
                }
            }

            const resizeShadow = (idx: number = 0): void => {
                gsap.to(shadow, {
                    height: calcHeight(idx),
                    duration: 0.2,
                })
            }

            ScrollTrigger.create({
                trigger: '.animate-section-5 .grid--anim',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: isMobileMax ? 'top center-=40%' : 'center center',
                end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
                onLeave: () => {
                    isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
                    isMobileMax && this.moveCanvas(0, {yPercent: 0})
                },
                onLeaveBack: () => {
                    isMobileMax && this.moveCanvas(0, {yPercent: 0})
                },
                onEnter: () => {
                    isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
                    isMobileMax && this.moveCanvas(0, {yPercent: -20})
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
                const animationIdx = idx + 20;

                tl.from(card, {
                    y: () => idx === 0 ? 0 : card.getBoundingClientRect().height + (idx === 1 ? isTabletMax ? -14 : -50 : 20),
                    duration: 1,
                    ease: 'linear',
                    onStart: () => {
                        !isFirstCard && updatePagination(true, idx)
                        resizeShadow(idx)
                        animateSpline(this.spline.application, animationIdx)
                    },
                    onReverseComplete: () => {
                        animateSpline(this.spline.application, animationIdx - 1)
                        resizeShadow(idx - 1)
                        !isFirstCard && updatePagination(false, idx)
                    }
                })
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
                start: isTabletMax ? 'top-=150px 30%' : 'top-=200px 20%',
                end: isTabletMax ? 'center+=100 center' : 'center+=420 center',
                onToggle: (self) => {
                    if (self.isActive) {
                        if (isDesktop) {
                            gsap.to('.article-notification--11', {
                                x: 120,
                                y: -500,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                            gsap.to('.article-notification--12', {
                                x: -300,
                                y: -100,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                        }
                        if (isTabletMax) {
                            gsap.to('.article-notification--11', {
                                x: 80,
                                y: -340,
                                scale: 1,
                                duration: 0.5,
                                opacity: 1,
                                zIndex: 2,
                            })
                            gsap.to('.article-notification--12', {
                                x: -180,
                                y: -150,
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
                onLeaveBack: () => animateSpline(this.spline.application, 22),
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
            onLeaveBack: () => animateSpline(this.spline.application, 24),
        })
    }

    section11() {
        const marqueeContainerTop = document.querySelector('.marquee__track--anim-01')
        const marqueeContainerBottom = document.querySelector('.marquee__track--anim-02')
        const totalWidthTop = marqueeContainerTop?.scrollWidth;
        const totalWidthBottom = marqueeContainerBottom?.scrollWidth;
        const tl = gsap.timeline();

        ScrollTrigger.create({
            trigger: '.marquee--anim-2',
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => {
                if (marqueeContainerTop && marqueeContainerBottom) {
                    marqueeContainerTop.innerHTML += marqueeContainerTop.innerHTML;
                    marqueeContainerBottom.innerHTML += marqueeContainerBottom.innerHTML;
                }
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
                onLeaveBack: () => animateSpline(this.spline.application, 26),
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
                btn?.classList.remove('button-circle--stay')
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
                            yPercent: 50,
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
            burger.classList.add('active')
            checkBurgerStatus(true)
        }

        function closeDesktopMenu() {
            gsap.killTweensOf(desktopMenu);
            gsap.killTweensOf('.desktop-menu__link');
            gsap.set(desktopMenu, {clearProps: "all"});
            gsap.set('.desktop-menu__link', {clearProps: "all"});
            gsap.to(desktopMenu, {
                width: '0%',
                padding: '19px 0',
                margin: 0,
            })
            burger.classList.remove('active')
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

    about = () => {
        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {

        })
    }
}

export default Animation