import Slider from "./slider";
import Animation from "./animation/animation";
import {Spline} from "./spline/spline";

class App {
    splineURL: string;

    constructor() {
        // this.splineURL = 'https://prod.spline.design/IwWm8hiQykF5RxzD/scene.splinecode';
        // this.splineURL = 'https://prod.spline.design/uWwyQiapZp43a7z6/scene.splinecode';
        this.init();
    }

    init = () => {
        this.createSlider()
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

