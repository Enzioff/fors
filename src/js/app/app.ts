import Slider from "./slider";
import Animation from "./animation/animation";
import {Spline} from "./spline/spline";

class App {
    splineURL: string;

    constructor() {
        // this.splineURL = 'https://prod.spline.design/T4GcdWa1iY2V7Fpu/scene.splinecode';
        this.init();
    }

    init = () => {
        // this.createSlider()
        this.createAnimation()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }

    createAnimation = () => {
        const el: HTMLCanvasElement = document.querySelector('.spline-canvas');
        const spline = new Spline(el, this.splineURL)

        new Animation(spline)
    }
}

export {App};

