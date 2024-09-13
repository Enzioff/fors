import Slider from "./slider";
import Animation from "./animation/animation";

class App {
    constructor() {
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
        new Animation()
    }
}

export {App};

