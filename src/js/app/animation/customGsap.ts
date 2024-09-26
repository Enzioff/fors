import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

class customGsap {
    el;

    constructor(el: Element) {
        this.el = el;

        this.init()
    }

    init() {
        gsap.registerPlugin(ScrollTrigger)
    }
}

export default customGsap