import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateSpline} from "../spline/animate";
import {Spline} from "../spline/spline";

class Animation {
    spline;
    constructor(spline: Spline) {
        this.spline = spline;
        this.init()
    }

    init() {
        gsap.registerPlugin(ScrollTrigger)

        this.section1()
        this.section2()
        this.section3()
        this.marquee()
        this.section4()
        this.section5()
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
                start: 'top bottom',
                end: '+=500',
            },
            onStart: () => {
                animateSpline(this.spline.application, 1)
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
            .from('.section-second .tags .tag', {
                scale: 0.3,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                reversed: true,
                ease: "power3.out",
            }, "-=2")
    }

    section3() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--blue',
                start: 'top bottom',
            },
            onStart: () => {
                animateSpline(this.spline.application, 2)
                gsap.to('.spline-canvas', {
                    xPercent: -20,
                })
            },
            onComplete: () => {
                tl.revert();
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
                scrub: 1,
            },
        });

        tl.to('.marquee__track--anim-1', {
            x: -600,
            duration: 1,
        }).to('.marquee__track--anim-2', {
            x: 600,
            duration: 1,
        }, "<")
    }

    section4() {
        const blockTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.anim-stay',
                pin: true,
                pinSpacing: true,
                start: 'center center',
                end: '+=1500',
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--blue .layering',
                start: 'center center',
                end: '+=900',
                scrub: 1,
            }
        });
        tl.to('.article-info--1', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 3)
            }
        })
        tl.to('.article-info--2', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 4)
            }
        })
        tl.to('.article-info--3', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 5)
            }
        })
        tl.to('.article-info--4', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 6)
            }
        })
        tl.to('.article-info--5', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 7)
            }
        })
    }

    section5() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top',
                pin: false,
                start: 'top bottom',
            },
            onStart: () => {
                animateSpline(this.spline.application, 8)
            },
            onComplete: () => {
                tl.revert();
                ScrollTrigger.refresh();
            }
        });

        tl.from('.section--blue', {
            paddingBottom: 400,
            duration: 2,
            onComplete: () => {
                animateSpline(this.spline.application, 9)
            }
        }).from('.section--anim-top', {
            y: -400,
            duration: 2,
        }, '-=2')
    }

    section6() {
        const blockTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top .grid--anim',
                pin: true,
                pinSpacing: true,
                start: 'center center',
                end: '+=1500',
                
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top .layering--light',
                start: 'center center',
                end: '+=900',
                scrub: 1,
            },
            onComplete: () => {
                animateSpline(this.spline.application, 15)
            }
        });
        tl.to('.section--anim-top .article-info--01', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 10)
            },
        })
        tl.to('.section--anim-top .article-info--02', {
            yPercent: -88,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 11)
            },
        })
        tl.to('.section--anim-top .article-info--03', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 12)
            },
        })
        tl.to('.section--anim-top .article-info--04', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 13)
            },
        })
        tl.to('.section--anim-top .article-info--05', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
            onStart: () => {
                animateSpline(this.spline.application, 14)
            },
        })
    }

    section7() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--cards',
                start: 'top top',
                end: '+=800',
                
                scrub: 1,
            },
            onStart: () => {
                animateSpline(this.spline.application, 17)
                gsap.to('.spline-canvas', {
                    xPercent: 0,
                })
            },
        });

        tl.from('.article-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
        })
    }

    section8() {
        const blockTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top-2 .grid--anim',
                pin: true,
                pinSpacing: true,
                start: 'center center',
                end: '+=1500',
                
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--anim-top-2 .layering--light',
                start: 'center center',
                end: '+=900',
                scrub: 1,
                
            },
        });
        tl.to('.section--anim-top-2 .article-info--01', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.section--anim-top-2 .article-info--02', {
            yPercent: -88,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.section--anim-top-2 .article-info--03', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.section--anim-top-2 .article-info--04', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.section--anim-top-2 .article-info--05', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
    }

    section9() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.grid--anim-in',
                pin: false,
                start: 'top bottom',
                
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
                
            }
        });

        tl.to('.marquee__track--anim-01', {
            x: -243,
            duration: 1,
        }).to('.marquee__track--anim-02', {
            x: 160,
            duration: 1,
        }, "<")
    }

    section12() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.grid--widgets--anim',
                start: 'top bottom',
                
            }
        });

        tl.from('.anim-el-in', {
            y: 50,
            duration: 1,
            opacity: 0.4,
            stagger: 0.3,
        }, '-=0.9')
    }

    footer() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                
            }
        });

        tl.from('.site-nav__item', {
            y: 100,
            duration: 1,
            opacity: 0,
            stagger: 0.5,
        }, '-=0.9')
    }
}

export default Animation