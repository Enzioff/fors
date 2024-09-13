import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

class Animation {
    constructor() {
        this.init()
    }

    init() {
        gsap.registerPlugin(ScrollTrigger)

        this.intro()
        this.newsSection()
        this.blueSection()
        this.cards()
    }

    intro() {
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

    newsSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section-second',
                pin: false,
                start: 'top bottom',
                end: '+=500',
                markers: true,
            }
        });

        tl
            .from('.direction__item', {
                x: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            })
            .from('.news-item', {
                y: 100,
                opacity: 0,
                duration: 0.8,
            }, "-=0.9")
            .from('.info-block', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            }, "-=0.9")
            .from('.tags .tag', {
                scale: 0.3,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                reversed: true,
                ease: "power3.out",
            }, "-=2")
    }

    blueSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--blue',
                start: 'top bottom',
                end: '+=500',
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

    cards() {
        const blockTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.anim-stay',
                pin: true,
                pinSpacing: true,
                start: 'center center',
                end: '+=1200',
                markers: true,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.layering',
                start: 'center center',
                end: '+=900',
                scrub: 1,
                markers: true,
            }
        });
        tl.to('.article-info--1', {
            yPercent: 0,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.article-info--2', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.article-info--3', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.article-info--4', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
        tl.to('.article-info--5', {
            yPercent: -100,
            duration: 12,
            delay: 1,
            ease: "power1.out",
        })
    }
}

export default Animation