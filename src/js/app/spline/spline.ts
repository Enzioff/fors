import {Application, SPEObject} from '@splinetool/runtime';
import {callInnerAnimation, AnimationKey} from "./callInnerAnimation";
import {animateSpline} from "./animate";

class Spline {
    application: Application;
    cube: SPEObject;

    constructor(el: HTMLCanvasElement, url: string) {
        this.setApplication(el, url);
    }

    setApplication = (el: HTMLCanvasElement, url: string) => {
        this.application = new Application(el);
        this.application.load(url).then(() => {
            this.cube = this.application.findObjectByName('cube');
            animateSpline(this.application, 0);
            this.application.setZoom(1.4)
        })
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

    handleResize = () => {
        console.log('Теперь ресайз');

        const resizeHandler = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if (this.application) {
                this.application.setSize(width, height);
            }
        };

        resizeHandler();
        window.addEventListener('resize', resizeHandler);
    }
}

export {
    Spline,
}
