import {animateSpline} from "./src/js/app/spline/animate";
import {getTotalElements} from "./src/js/helpers/getTotalElements";
import gsap from "gsap";

tl.to('.article-info--1', {
    yPercent: 0,
    ease: "linear",
    lazy: true,
    onStart: () => animateSpline(this.spline.application, 3),
})
tl.to('.article-info--2', {
    yPercent: -100,
    ease: "linear",
    lazy: true,
    onStart: () => {
        animateSpline(this.spline.application, 4)
        paginationList[1].classList.add('active')
        paginationCount.textContent = getTotalElements(paginationList, listItems);
    },
    onUpdate: () => {
        gsap.to('.article-notification--1', {
            x: -150,
            y: 80,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })
    },
    onReverseComplete: () => {
        gsap.to('.article-notification--1', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
    }
})
tl.to('.article-info--3', {
    yPercent: -200,
    ease: "linear",
    lazy: true,
    onStart: () => {
        animateSpline(this.spline.application, 5)
        paginationList[2].classList.add('active')
        paginationCount.textContent = getTotalElements(paginationList, listItems);
    },
    onUpdate: () => {
        gsap.to('.article-notification--1', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })

        isDesktop && gsap.to('.article-notification--2', {
            x: -200,
            y: -300,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })

        isTabletMax && gsap.to('.article-notification--2', {
            x: -120,
            y: -150,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })
    },
    onReverseComplete: () => {
        gsap.to('.article-notification--2', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
    }
})
tl.to('.article-info--4', {
    yPercent: -300,
    ease: "linear",
    lazy: true,
    onStart: () => {
        animateSpline(this.spline.application, 6)
        paginationList[3].classList.add('active')
        paginationCount.textContent = getTotalElements(paginationList, listItems);
    },
    onUpdate: () => {
        gsap.to('.article-notification--2', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })

        isDesktop && gsap.to('.article-notification--3', {
            x: 150,
            y: -300,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })

        isTabletMax && gsap.to('.article-notification--3', {
            x: 70,
            y: -180,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })
    },
    onReverseComplete: () => {
        gsap.to('.article-notification--3', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
    }
})
tl.to('.article-info--5', {
    yPercent: -400,
    ease: "linear",
    lazy: true,
    onStart: () => {
        animateSpline(this.spline.application, 7)
        paginationList[4].classList.add('active')
        paginationCount.textContent = getTotalElements(paginationList, listItems);
    },
    onUpdate: () => {
        gsap.to('.article-notification--3', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
        isDesktop && gsap.to('.article-notification--4', {
            x: -260,
            y: -300,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })

        isTabletMax && gsap.to('.article-notification--4', {
            x: -160,
            y: -200,
            scale: 1,
            duration: 0.5,
            opacity: 1,
            zIndex: 2,
        })
    },
    onComplete: () => {
        gsap.to('.article-notification--4', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
    },
    onReverseComplete: () => {
        gsap.to('.article-notification--4', {
            x: 0,
            y: 0,
            scale: 0.3,
            duration: 0.5,
            opacity: 0,
        })
    }
})