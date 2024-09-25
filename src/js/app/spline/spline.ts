import {Application, SPEObject} from '@splinetool/runtime';
import {callInnerAnimation, AnimationKey} from "./callInnerAnimation";
import {animateSpline} from "./animate";

class Spline {
    application: Application;
    cube: SPEObject;
    desktopWidthMediaQuery
    tabletWidthMediaQuery
    mobileWidthMediaQuery

    constructor(el: HTMLCanvasElement, url: string) {
        this.setApplication(el, url);
        this.desktopWidthMediaQuery = window.matchMedia('(min-width: 1440px)')
        this.tabletWidthMediaQuery = window.matchMedia('(min-width: 768px)')
        this.mobileWidthMediaQuery = window.matchMedia('(min-width: 320px)')
    }

    setApplication = (el: HTMLCanvasElement, url: string) => {
        this.application = new Application(el);
        this.application.load(url).then(() => {
            this.cube = this.application.findObjectByName('cube');
            animateSpline(this.application, 0);
            this.checkWidthMediaQuery();
        })
    }

    checkWidthMediaQuery = () => {
        if (this.desktopWidthMediaQuery.matches) {
            this.application.setZoom(1.4)
        } else if (this.tabletWidthMediaQuery.matches) {
            this.application.setZoom(0.8)
        } else if (this.mobileWidthMediaQuery.matches) {
            this.application.setZoom(0.8)
        }
    }

    initAnimateButton = () => {
        const elementsDemo = document.querySelectorAll('.button');
        const elementsActive = document.querySelectorAll('.button-active');

        elementsDemo.forEach((item) => {
            item.addEventListener('click', () => {
                this.triggerButtonEvent(item.id as AnimationKey);
            })
        });

        elementsActive.forEach((item) => {
            item.addEventListener('click', () => {
                this.triggerButtonActiveEvent(Number(item.id));
            })
        });
    }

    triggerButtonEvent = (buttonID: AnimationKey) => {
        callInnerAnimation(this.application, buttonID);
    }

    triggerButtonActiveEvent = (buttonID: number) => {
        animateSpline(this.application, buttonID);
    }

    // handleResize = () => {
    //     console.log('Теперь ресайз');
    //
    //     const resizeHandler = () => {
    //         const width = window.innerWidth;
    //         const height = window.innerHeight;
    //
    //         if (this.application) {
    //             this.application.setSize(width, height);
    //         }
    //     };
    //
    //     resizeHandler();
    //     window.addEventListener('resize', resizeHandler);
    // }
}

export {
    Spline,
}
