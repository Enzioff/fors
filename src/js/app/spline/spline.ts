import {Application, SPEObject} from '@splinetool/runtime';
import {animateSpline} from "./animate";

class Spline {
    application: Application;
    cube: SPEObject;
    desktopWidthMediaQuery
    tabletWidthMediaQuery
    mobileWidthMediaQuery

    constructor(el: HTMLCanvasElement, url: string) {
        if (el) {
            this.setApplication(el, url)
            this.desktopWidthMediaQuery = window.matchMedia('(min-width: 1440px)')
            this.tabletWidthMediaQuery = window.matchMedia('(min-width: 768px)')
            this.mobileWidthMediaQuery = window.matchMedia('(min-width: 320px)')
        }
    }

    setApplication = (el: HTMLCanvasElement, url: string) => {
        this.application = new Application(el);
        window.addEventListener('load', () => {
            const delayBeforeLoad = 400;
            let timeout: string | number | NodeJS.Timeout = null;

            timeout = setTimeout(() => {
                this.application.load(url, {
                    credentials: 'include',
                    mode: 'no-cors',
                }).then(() => {
                    this.cube = this.application.findObjectByName('cube');
                    this.handleResize()
                    this.checkWidthMediaQuery();
                    animateSpline(this.application, 0);
                })
                clearTimeout(timeout)
            }, delayBeforeLoad)
        })
    }

    checkWidthMediaQuery = () => {
        if (this.desktopWidthMediaQuery.matches) {
            this.application.setZoom(1.4)
        } else if (this.tabletWidthMediaQuery.matches) {
            this.application.setZoom(0.7)
        } else if (this.mobileWidthMediaQuery.matches) {
            this.application.setZoom(0.8)
        }
    }

    handleResize = () => {
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
