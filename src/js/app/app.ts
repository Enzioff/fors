import {Spline} from "./spline/spline";
import Tabs from "./tabs";
import DropZone from "./dropZone";
import {MvcPage} from "./animation/MvcPage";
import {AboutPage} from "./animation/AboutPage";
import {MainPage} from "./animation/MainPage";

class App {
    splineURL: string;

    constructor() {
        this.splineURL = 'https://prod.spline.design/T4GcdWa1iY2V7Fpu/scene.splinecode';
        this.init();
    }

    init = () => {
        this.createAnimation()
        this.createTabs()
        this.createDropZone()
    }

    createAnimation = () => {
        const el: HTMLCanvasElement = document.querySelector('.spline-canvas');
        const spline = new Spline(el, this.splineURL)

        new MainPage(spline)
        new MvcPage(spline)
        new AboutPage(spline)
    }

    createTabs = () => {
        const tabs = document.querySelectorAll('.tabs');

        if (!tabs) return

        tabs.forEach(tabsElement => {
            new Tabs(tabsElement)
        })
    }

    createDropZone = () => {
        const dropZone = document.querySelector('.drop-zone');

        if (!dropZone) return

        new DropZone(dropZone)
    }
}

export {App};

