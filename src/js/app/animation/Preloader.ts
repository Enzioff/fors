import gsap from "gsap";
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import TextPlugin from 'gsap/TextPlugin'
import {animateSpline} from "../spline/animate";
import {Application} from "@splinetool/runtime";

class Preloader {
    preloader;
    wrapper;
    dotsLine;
    title;
    text;
    titles;
    texts;
    facts;
    decorative;
    body;
    application;
    initial;

    constructor(preloader: Element, application: Application, initial: () => void) {
        this.preloader = preloader;
        this.application = application;
        this.initial = initial;
        this.body = document.querySelector('body');
        this.wrapper = this.preloader.querySelector('.preloader__wrapper');
        this.dotsLine = this.preloader.querySelectorAll('.dots__line');
        this.title = this.preloader.querySelector('.preloader__title');
        this.text = this.preloader.querySelector('.preloader__text');
        this.facts = this.preloader.querySelector('.preloader__facts')
        this.decorative = this.preloader.querySelector('.preloader__decorative') as HTMLElement
        this.titles = ['> 900', '> 410', '> 2 000']
        this.texts = [
            'СЕРТИФИКАЦИЙ У ПРЕПОДАВАТЕЛЕЙ...',
            'СПЕЦИАЛИСТОВ УЖЕ С НАМИ...',
            'ВЫПОЛНЕННЫХ РАБОТ...',
        ]

        this.init()
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.body.classList.remove('fixed')
                this.preloader.remove()
                this.initial()
            }, 1000)
        })
    }

    init() {
        gsap.registerPlugin(ScrambleTextPlugin, TextPlugin)
        this.body.classList.add('fixed')

        this.textAnimation()
    }

    animateLine = () => {
        this.decorative.style.opacity = '1';
        const tl = gsap.timeline();
        this.dotsLine.forEach(line => {
            const dots = line.querySelectorAll('.dot');
            const blindedDots = Array.from(dots).filter(dot => !dot.classList.contains('dot--color'))

            blindedDots.forEach(dot => {
                tl.to(dot, {
                    duration: 0.3,
                    stagger: 0.2,
                    onUpdate: () => {
                        dot.classList.add('dot--color')
                    }
                })
            })
        })
    }

    textAnimation = () => {
        const tl = gsap.timeline({
            onStart: () => {
                this.animateLine()
            },
            onComplete: () => {
                gsap.to(this.facts, {
                    yPercent: 100,
                    opacity: 0,
                    duration: 1,
                })
                gsap.to(this.decorative, {
                    yPercent: 100,
                    opacity: 0,
                    duration: 1,
                })
                this.mainAnimation()
            }
        });
        this.texts.forEach((text, idx) => {
            tl.to(this.text, {
                duration: 1,
                delay: idx > 0 && 1,
                text: this.texts[idx],
            });
            tl.to(this.title, {
                duration: 1,
                text: this.titles[idx],
            }, '<');
        })
    }

    mainAnimation = () => {
        gsap.to(this.wrapper, {
            yPercent: -100,
            duration: 1,
        })

        gsap.to(this.preloader, {
            opacity: 0,
            duration: 1,
            delay: 0.2,
        })
    }
}

export default Preloader
