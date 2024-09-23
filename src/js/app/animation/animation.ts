import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateSpline} from "../spline/animate";
import {Spline} from "../spline/spline";
import {getTotalElements} from "../../helpers/getTotalElements";

class Animation {
    spline;

    constructor(spline: Spline) {
        this.spline = spline;
        this.init()
    }

    init() {
        gsap.registerPlugin(ScrollTrigger)

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

    section1() {
        const tl = gsap.timeline();

        gsap.to('.header', {
            yPercent: -100,
            duration: 1,
        })

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1440px)", () => {
            this.spline.application.setZoom(1.2)

            ScrollTrigger.create({
                trigger: '.section--bg',
                start: 'top top',
                end: "bottom top",
                onEnterBack: () => {
                    gsap.to('.header', {
                        yPercent: -100,
                        duration: 1,
                    })
                },
                onLeave: () => {
                    gsap.to('.header', {
                        yPercent: 0,
                        duration: 1,
                    })
                }
            })
            return () => ScrollTrigger.refresh();
        });

        mm.add("(max-width: 1439px)", () => {
            this.spline.application.setZoom(0.2)
            this.spline.handleResize()

            gsap.to('.header', {
                yPercent: 0,
                duration: 1,
            })

            ScrollTrigger.create({
                trigger: '.section--bg',
                start: 'top top',
                end: "bottom top"
            })
            return () => ScrollTrigger.refresh();
        })

        tl
            .from('.logo', {
                y: -50,
                opacity: 0,
                duration: 0.8,
            })
            .from('.anim-in-right', {
                x: 50,
                opacity: 0,
                duration: 0.8,
            }, "-=0.6")
            .from('.anim-in-bottom', {
                y: 50,
                opacity: 0,
                duration: 0.8,
            }, "-=0.6")
            .from('.anim-in-bottom-stagger', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            }, "-=0.8")
            .from('.title--main span', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "expo.out",
            }, "-=1")
            .from('.widget-info', {
                y: -50,
                opacity: 0,
                duration: 0.8,
            }, "-=1")
            .from('.widget-stats', {
                y: -50,
                opacity: 0,
                duration: 0.8,
            }, "-=0.9")
    }

    section2() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-second',
                pin: false,
                start: "center bottom",
                end: "bottom top",
                onEnter: () => {
                    animateSpline(this.spline.application, 1)
                }
            }
        });

        tl
            .from('.section-second .direction__item', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            })
            .from('.section-second .news-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
            }, "-=0.9")
            .from('.section-second .info-block', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            }, "-=0.9")

        gsap.from('.section-second .tags .tag', {
            scale: 0.3,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.section-second .tags'
            }
        })
    }

    section3() {
        const mm = gsap.matchMedia();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--blue',
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => {
                    animateSpline(this.spline.application, 2)
                    mm.add("(min-width: 768px)", () => {
                        gsap.to('.spline-canvas', {
                            xPercent: -20,
                        })
                    })
                    mm.add("(max-width: 767px)", () => {
                        gsap.to('.spline-canvas', {
                            xPercent: 0,
                        })
                    })
                },
                onLeaveBack: () => {
                    animateSpline(this.spline.application, 1)
                    gsap.to('.spline-canvas', {
                        xPercent: 0,
                    })
                }
            },
            onComplete: () => {
                gsap.set(".section--anim-top", {clearProps: "all"});
                gsap.set(".section--blue", {clearProps: "all"});
                ScrollTrigger.refresh()
            }
        });

        tl.from('.section--blue', {
            y: 400,
            duration: 1,
        }).from('.section--blue .title', {
            y: -400,
            duration: 1,
        }, '-=1')
    }

    marquee() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.marquee--anim',
                start: 'top bottom',
                end: "bottom top",
                scrub: 1,
            },
        });

        ScrollTrigger.matchMedia({
            "(min-width: 768px)": function () {
                tl.to('.marquee__track--anim-1', {
                    x: -600,
                    duration: 1,
                }).to('.marquee__track--anim-2', {
                    x: 600,
                    duration: 1,
                }, "<")
                return function () {
                    tl.kill();
                };
            },
            "(max-width: 767px)": function () {
                tl.to('.marquee__track--anim-1', {
                    x: -200,
                    duration: 1,
                }).to('.marquee__track--anim-2', {
                    x: 200,
                    duration: 1,
                }, "<")
                return function () {
                    tl.kill();
                };
            },
        });
    }

    section4() {
        const mm = gsap.matchMedia();
        const paginationList = document.querySelectorAll('.section--blue .pagination__item');
        const paginationCount = document.querySelector('.section--blue .widget-slider__numbers');
        const listItems = document.querySelectorAll('.section--blue .article-info');
        const container = document.querySelector('.section--blue .layering');
        let blockTimeline = null;
        mm.add("(min-width: 768px)", () => {
            blockTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.anim-stay',
                    pin: true,
                    pinSpacing: true,
                    start: 'center center',
                    end: "bottom top",
                    scrub: 1,
                    onLeaveBack: () => animateSpline(this.spline.application, 2)
                },
            });
        })
        mm.add("(max-width: 767px)", () => {
            blockTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.anim-stay',
                    pin: true,
                    pinSpacing: true,
                    start: 'center center+=100',
                    end: "bottom top",
                    scrub: 1,
                    onLeaveBack: () => {
                        animateSpline(this.spline.application, 2)
                        gsap.to('.spline-canvas', {
                            yPercent: 0
                        })
                    },
                    onEnter: () => {
                        gsap.to('.spline-canvas', {
                            yPercent: -20
                        })
                    },
                    onLeave: () => {
                        animateSpline(this.spline.application, 8)
                        gsap.to('.spline-canvas', {
                            yPercent: 0
                        })
                    }
                },
            });
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--blue .layering',
                start: 'center center',
                end: "bottom top",
                scrub: 1
            },
            onComplete: () => animateSpline(this.spline.application, 8),
        });
        tl.to('.article-info--1', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => animateSpline(this.spline.application, 3),
            onUpdate: () => container.classList.add('layering--shadow')
        })
        tl.to('.article-info--2', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 4)
                paginationList[1].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            },
            onComplete: () => {
                container.classList.remove('layering--shadow')
            },
        })
        tl.to('.article-info--3', {
            yPercent: -200,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 5)
                paginationList[2].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            },
        })
        tl.to('.article-info--4', {
            yPercent: -300,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 6)
                paginationList[3].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            }
        })
        tl.to('.article-info--5', {
            yPercent: -400,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 7)
                paginationList[4].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            }
        })
    }

    section6() {
        const paginationList = document.querySelectorAll('.section--anim-top .pagination__item');
        const paginationCount = document.querySelector('.section--anim-top .widget-slider__numbers');
        const listItems = document.querySelectorAll('.section--anim-top .article-info');
        const container = document.querySelector('.section--anim-top .layering')
        let blockTimeline: gsap.core.Timeline = null;

        ScrollTrigger.create({
            trigger: '.section--anim-top .title',
            start: 'top center',
            onEnter: () => animateSpline(this.spline.application, 9),
        });

        ScrollTrigger.matchMedia({
            "(min-width: 768px)": () => {
                blockTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.section--anim-top .grid--anim',
                        pin: true,

                        pinSpacing: true,
                        start: 'center center',
                        end: 'bottom top-=200px',
                        scrub: true,
                        onLeave: () => animateSpline(this.spline.application, 15),
                        onUpdate: () => {
                            gsap.set(".section--anim-top", {clearProps: "all"});
                            gsap.set(".section--blue", {clearProps: "all"});
                        }
                    },
                });
                return function () {
                    blockTimeline.kill();
                };
            },
            "(max-width: 767px)": () => {
                blockTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.section--anim-top .grid--anim',
                        pin: true,

                        pinSpacing: true,
                        start: 'center center+=200',
                        end: 'bottom top-=200px',
                        scrub: true,
                        onUpdate: () => {
                            gsap.set(".section--anim-top", {clearProps: "all"});
                            gsap.set(".section--blue", {clearProps: "all"});
                        },
                        onLeaveBack: () => {
                            gsap.to('.spline-canvas', {
                                yPercent: 0
                            })
                        },
                        onEnter: () => {
                            gsap.to('.spline-canvas', {
                                yPercent: -20
                            })
                        },
                        onLeave: () => {
                            animateSpline(this.spline.application, 15)
                            gsap.to('.spline-canvas', {
                                yPercent: 0
                            })
                        }
                    },
                });
                return function () {
                    blockTimeline.kill();
                };
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top .layering',
                start: 'center center',
                end: "bottom top",
                scrub: 1,
            },
            onComplete: () => animateSpline(this.spline.application, 14)
        });
        tl.to('.section--anim-top .article-info--01', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onUpdate: () => container.classList.add('layering--shadow'),
            onStart: () => {
                animateSpline(this.spline.application, 10)
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            }
        })
        tl.to('.section--anim-top .article-info--02', {
            yPercent: -88,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 11)
                paginationList[1].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
            },
            onComplete: () => container.classList.remove('layering--shadow')
        })
        tl.to('.section--anim-top .article-info--03', {
            yPercent: -176,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                paginationList[2].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
                animateSpline(this.spline.application, 12)
            },
        })
        tl.to('.section--anim-top .article-info--04', {
            yPercent: -264,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                paginationList[3].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
                animateSpline(this.spline.application, 13)
            },
        })
    }

    section7() {
        let tl: gsap.core.Timeline = null;

        ScrollTrigger.create({
            trigger: '.section--cards .title',
            start: 'top bottom',
            end: "bottom top",
            onEnter: () => animateSpline(this.spline.application, 16),
        });

        ScrollTrigger.matchMedia({
            "(min-width: 768px)": () => {
                tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.section--cards',
                        start: 'top center-=100',
                        end: 'bottom center+=100',
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
                                xPercent: -20,
                            })
                        },
                        onLeaveBack: () => {
                            animateSpline(this.spline.application, 16)
                            gsap.to('.spline-canvas', {
                                xPercent: -20,
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
                return function () {
                    tl.kill();
                };
            },
            "(max-width: 767px)": () => {
                tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.section--cards',
                        start: 'top bottom',
                        end: 'bottom bottom',
                        scrub: 1,
                        onEnter: () => {
                            animateSpline(this.spline.application, 17)
                            gsap.to('.spline-canvas', {
                                xPercent: 0,
                            })
                        },
                        onLeave: () => {
                            animateSpline(this.spline.application, 18)
                            gsap.to('.spline-canvas', {
                                xPercent: 0,
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
                return function () {
                    tl.kill();
                };
            },
        });
    }

    section8() {
        const mm = gsap.matchMedia()
        const paginationList = document.querySelectorAll('.section--anim-top-2 .pagination__item');
        const paginationCount = document.querySelector('.section--anim-top-2 .widget-slider__numbers');
        const listItems = document.querySelectorAll('.section--anim-top-2 .article-info');
        const container = document.querySelector('.section--anim-top-2 .layering')
        let blockTimeline = null;

        mm.add('(min-width: 768px)', () => {
            blockTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section--anim-top-2 .grid--anim',
                    pin: true,
                    pinSpacing: true,
                    start: 'center center',
                    end: 'bottom top-=200px',
                    onEnter: () => {
                        animateSpline(this.spline.application, 19)
                    }
                }
            });
        })
        mm.add('(max-width: 767px)', () => {
            blockTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section--anim-top-2 .grid--anim',
                    pin: true,
                    pinSpacing: true,
                    start: 'center center+=200',
                    end: 'bottom top-=200px',
                    onLeaveBack: () => {
                        gsap.to('.spline-canvas', {
                            yPercent: 0
                        })
                    },
                    onEnter: () => {
                        animateSpline(this.spline.application, 19)
                        gsap.to('.spline-canvas', {
                            yPercent: -20
                        })
                    },
                    onLeave: () => {
                        animateSpline(this.spline.application, 15)
                        gsap.to('.spline-canvas', {
                            yPercent: 0
                        })
                    }
                }
            });
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top-2 .layering',
                start: 'center center',
                end: '+=900',
                scrub: 1,
            }
        });
        tl.to('.section--anim-top-2 .article-info--01', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onUpdate: () => container.classList.add('layering--shadow'),
            onStart: () => {
                paginationCount.textContent = getTotalElements(paginationList, listItems);
                animateSpline(this.spline.application, 20)
            },
        })
        tl.to('.section--anim-top-2 .article-info--02', {
            yPercent: -88,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onComplete: () => container.classList.remove('layering--shadow'),
            onStart: () => {
                paginationList[1].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
                animateSpline(this.spline.application, 21)
            },
        })
        tl.to('.section--anim-top-2 .article-info--03', {
            yPercent: -176,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                paginationList[2].classList.add('active')
                paginationCount.textContent = getTotalElements(paginationList, listItems);
                animateSpline(this.spline.application, 22)
            },
        })
    }

    section9() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.grid--anim-in .tags',
                pin: false,
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => animateSpline(this.spline.application, 23),
                onLeave: () => animateSpline(this.spline.application, 24),
            }
        });

        tl.from('.grid--anim-in .tags .tag', {
            scale: 0.3,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
        })
    }

    section10() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.grid--anim-cards',
                pin: false,
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => animateSpline(this.spline.application, 25),
                onLeave: () => animateSpline(this.spline.application, 26),
            }
        });

        tl.from('.grid--anim-cards .info-block', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
        })
    }

    section11() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.marquee--anim-2',
                start: 'top bottom',
                end: "bottom top",
            }
        });

        ScrollTrigger.matchMedia({
            // desktop
            "(min-width: 1440px)": function () {
                tl.to('.marquee__track--anim-01', {
                    x: -243,
                    duration: 1,
                }).to('.marquee__track--anim-02', {
                    x: 160,
                    duration: 1,
                }, "<")
                return function () {
                    tl.kill();
                };
            },
            "(max-width: 1439px)": function () {
                tl.to('.marquee__track--anim-01', {
                    x: -143,
                    duration: 1,
                }).to('.marquee__track--anim-02', {
                    x: 73,
                    duration: 1,
                }, "<")
                return function () {
                    tl.kill();
                };
            },
        });
    }

    section12() {
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
                    gsap.to('.spline-canvas', {
                        zIndex: 2,
                        xPercent: 0,
                        yPercent: 50,
                    })
                },
                onEnterBack: () => {
                    animateSpline(this.spline.application, 26)
                    gsap.to('.spline-canvas', {
                        zIndex: 1,
                        xPercent: -20,
                        yPercent: 0,
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
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                end: "bottom top",
                onEnter: () => {
                    animateSpline(this.spline.application, 28)
                    gsap.to('.spline-canvas', {
                        zIndex: 2,
                        xPercent: 0,
                        yPercent: 50,
                    })
                },
                onLeaveBack: () => {
                    gsap.to('.spline-canvas', {
                        zIndex: 1,
                        xPercent: -20,
                        yPercent: 0,
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

        function toggleDesktopMenu() {
            burger.classList.toggle('active')
            if (burger.classList.contains('active')) {
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
            } else {
                gsap.to(desktopMenu, {
                    width: '0%',
                    padding: '19px 0',
                    margin: 0,
                })
            }
            checkBurgerStatus(true)
        }

        mm.add('(min-width: 1440px)', () => {
            burger.addEventListener('mouseover', toggleDesktopMenu)
            burger.addEventListener('mouseout', toggleDesktopMenu)

            return function () {
                burger.removeEventListener('mouseover', toggleDesktopMenu)
                burger.removeEventListener('mouseout', toggleDesktopMenu)
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