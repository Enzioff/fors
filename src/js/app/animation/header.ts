import gsap from "gsap";
import {animateType} from "../../types";

class HeaderAnimation {
    header;

    constructor() {
        this.header = document.querySelector('.header');
    }

    animate = (type: animateType) => {
        const events = {
            [animateType.HIDE]: () => {
                gsap.to(this.header, {
                    yPercent: -100,
                    duration: 1,
                })
            },
            [animateType.FIRST]: () => {
                gsap.to(this.header, {
                    yPercent: -100,
                    opacity: 1,
                    zIndex: 3,
                })
            },
            [animateType.VISIBLE]: () => {
                gsap.to(this.header, {
                    yPercent: 0,
                })
            }
        }

        events[type]?.();
    }

    updateStyles = () => {
        gsap.killTweensOf(this.header)
    }
}

export default HeaderAnimation