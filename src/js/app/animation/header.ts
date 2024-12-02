import gsap from "gsap";
import {animateType, breakPoints} from "../../types";
import {logoVisibility} from "../../types/types";

class HeaderAnimation {
    header;
    isHeaderFixed;
    logo;
    burger;
    burgerIcons;
    desktopMenu;
    mobileMenu;
    userNavigation;
    mm;
    breakPoints;
    logosMain;
    logosPages;
    pageLogo;

    constructor(matchMedia: gsap.MatchMedia, breakPoints: breakPoints) {
        this.mm = matchMedia;
        this.breakPoints = breakPoints;

        this.header = document.querySelector('.header')
        this.logo = this.header.querySelector('.header__logo')
        this.isHeaderFixed = this.header.classList.contains('header--page')

        this.burger = this.header.querySelector('.burger')
        this.burgerIcons = this.burger.querySelectorAll('img')
        this.desktopMenu = this.header.querySelector('.desktop-menu')
        this.mobileMenu = this.header.querySelector('.menu')
        this.userNavigation = document.querySelector('.header__user-nav')
        this.logosMain = this.header.querySelectorAll('.header__logo .header__icon-logo');
        this.logosPages = this.header.querySelectorAll('.logo img');
        this.pageLogo = this.header.querySelector('.logo');
        
        this.initMenu()
    }

    private initMenu = () => {
        const body = document.querySelector('body');

        this.mm.add({
            isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
            isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
            isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
            isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
        }, (context) => {
            const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;

            const checkBurgerStatus = () => {
                if (this.burger.classList.contains('active')) {
                    if (isDesktop) {
                        this.burgerIcons[0].setAttribute('hidden', '')
                        this.burgerIcons[2].removeAttribute('hidden')
                    } else if (isTabletMax) {
                        this.burgerIcons[0].setAttribute('hidden', '')
                        this.burgerIcons[1].removeAttribute('hidden')
                    }
                } else {
                    if (isDesktop) {
                        this.burgerIcons[0].removeAttribute('hidden')
                        this.burgerIcons[2].setAttribute('hidden', '')
                    } else if (isTabletMax) {
                        this.burgerIcons[0].removeAttribute('hidden')
                        this.burgerIcons[1].setAttribute('hidden', '')
                    }
                }
            }

            const toggleMobileMenu = () => {
                this.mobileMenu.classList.toggle('active')
                this.burger.classList.toggle('active')
                body.classList.toggle('fixed')
                checkBurgerStatus()
            }

            const openDesktopMenu = () => {
                gsap.killTweensOf(this.desktopMenu)
                gsap.killTweensOf('.desktop-menu__link')
                gsap.set('.desktop-menu__link', {clearProps: "all"})
                gsap.to(this.desktopMenu, {
                    width: '100%',
                    padding: '19px 56px',
                    margin: '0 0 0 15px',
                    duration: 1,
                })
                gsap.from('.desktop-menu__link', {
                    yPercent: -100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                })

                this.burger.classList.add('active')
                checkBurgerStatus()
            }

            const closeDesktopMenu = () => {
                gsap.killTweensOf(this.desktopMenu)
                gsap.killTweensOf('.desktop-menu__link')
                gsap.set('.desktop-menu__link', {clearProps: "all"})
                gsap.to(this.desktopMenu, {
                    width: '0%',
                    padding: '19px 0',
                    margin: 0,
                    duration: 1,
                })
                this.burger.classList.remove('active')
                checkBurgerStatus()
            }

            if (isDesktop) {
                this.burger.addEventListener('mouseenter', openDesktopMenu)
                this.userNavigation.addEventListener('mouseleave', closeDesktopMenu)

                return () => {
                    this.burger.removeEventListener('mouseenter', openDesktopMenu)
                    this.userNavigation.removeEventListener('mouseleave', closeDesktopMenu)
                };
            }

            if (isTabletMax) {
                this.burger.addEventListener('click', toggleMobileMenu)

                return () => {
                    this.burger.removeEventListener('click', toggleMobileMenu)
                };
            }
        })
    }

    public animate = (type: animateType) => {
        const events = {
            [animateType.HIDE]: () => {
                gsap.to(this.header, {
                    yPercent: 0,
                    duration: 0.7,
                })
            },
            [animateType.VISIBLE]: () => {
                gsap.to(this.header, {
                    yPercent: 100,
                })
            },
            [animateType.LOGO_BLUE]: () => {
                this.logo.classList.remove('light')
            },
            [animateType.LOGO_WHITE]: () => {
                this.logo.classList.add('light')
            }
        }

        events[type]?.();
    }
    
    public changeLogo = (flag: logoVisibility) => {
        console.log('change')
        if (this.logosMain && this.logosMain.length > 0) {
            if (flag === logoVisibility.HIDE) {
                this.logo.classList.add('short')
            } else {
                this.logo.classList.remove('short')
            }
        }
        
        if (this.logosPages && this.logosPages.length > 0) {
            if (flag === logoVisibility.HIDE) {
                this.pageLogo.classList.add('short')
            } else {
                this.pageLogo.classList.remove('short')
            }
        }
    }

    public get isFixed() {
        return this.isHeaderFixed;
    }

    public get getHeaderSize() {
        return this.header.getBoundingClientRect()
    }
}

export default HeaderAnimation
