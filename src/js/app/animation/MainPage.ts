import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {animateSpline} from "../spline/animate";
import {animateType, PopupsAnimation} from "../../types";
import {getTotalElements} from "../../helpers/getTotalElements";
import {AnimationConfig} from "./AnimationConfig";
import {Spline} from "../spline/spline";

export class MainPage extends AnimationConfig {
  constructor(spline: Spline) {
    super(spline)
    
    this.initAnimationConfig()
    this.initMainPage()
  }
  
  initMainPage() {
    this.intro()
    this.blueSection()
    this.cardsSection()
    this.lightCardsSection()
    this.breakSection()
    this.lightCardsSectionSecond()
    this.fixedCards()
    this.meetingBlock()
  }
  
  protected intro = () => {
    const section = document.querySelector('.trigger-intro');
    if (!section) return
    
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom center',
      onLeave: () => {
        animateSpline(this.application, 1)
      },
      onEnterBack: () => {
        animateSpline(this.application, 0)
        this.moveCanvas(0)
        // ScrollTrigger.refresh()
      },
    })
    
    const direction = document.querySelector('.direction');
    if (direction) {
      ScrollTrigger.create({
        trigger: direction,
        start: 'center center',
        end: 'bottom bottom',
        onEnter: () => {
          animateSpline(this.application, 102)
        },
      })
    }
    
    const infinite = document.querySelectorAll('.trigger-infinite');
    if (infinite) {
      ScrollTrigger.create({
        trigger: infinite,
        start: 'center center',
        end: 'bottom center',
        onEnter: () => {
          animateSpline(this.application, 102)
        },
      })
    }
  }
  
  protected blueSection = () => {
    const section = document.querySelector('.trigger-blue')
    const headerOffset = this.headerAnimation.getHeaderSize.height / 2
    
    if (!section) return
    
    gsap.set(section, {
      '--blue-layout-height': '120%',
    })
    gsap.set(section, {
      '--blue-layout-top': '20%',
    })
    
    // Анимация смены цвета логотипа
    ScrollTrigger.create({
      trigger: section,
      start: `top top+=${headerOffset}`,
      end: `bottom top+=${headerOffset}`,
      onToggle: (self) => {
        self.isActive
          ? this.headerAnimation.animate(animateType.LOGO_WHITE)
          : this.headerAnimation.animate(animateType.LOGO_BLUE)
      }
    })
    
    // Анимация кубика при попадании и выходе из секции
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          animateSpline(this.application, 2)
          if (isDesktop) {
            this.moveCanvas(-20)
          }
          if (isTablet) {
            this.moveCanvas(-20)
          }
          if (isMobileMax) {
            this.moveCanvas(0)
          }
        },
        onEnterBack: () => animateSpline(this.application, 7),
        onLeaveBack: () => {
          animateSpline(this.application, 1)
          this.moveCanvas(0)
        },
        onLeave: () => {
          animateSpline(this.application, 8)
        },
      })
    })
    
    // Анимация появления подложки секции
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom bottom',
      onEnter: () => {
        gsap.to(section, {
          '--blue-layout-top': '0',
          duration: 1,
          delay: 0.2,
        })
      },
      onLeave: () => {
        gsap.to(section, {
          '--blue-layout-height': '100%',
          duration: 1,
        })
      },
      onLeaveBack: () => {
        gsap.set(section, {
          '--blue-layout-height': '120%',
        })
        gsap.set(section, {
          '--blue-layout-top': '20%',
        })
      }
    })
  }
  
  protected cardsSection = () => {
    const section = document.querySelector('.trigger-cards');
    if (!section) return;
    
    const paginationList = document.querySelectorAll('.trigger-cards .pagination__item');
    const paginationCount = document.querySelector('.trigger-cards .widget-slider__numbers');
    const popups = document.querySelectorAll('.trigger-cards .article-notification')
    const listItems = document.querySelectorAll('.trigger-cards .article-info');
    const container = section.querySelector('.layering');
    const shadow = container.querySelector('.layering__shadow');
    const pinnedBlock = section.querySelector('.anim-stay')
    const shadowHeight = shadow.getBoundingClientRect().height;
    
    const cardsTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'center center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
        scrub: 1,
      }
    });
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      
      const calcHeight = (idx: number) => {
        if (isDesktop) {
          return shadowHeight - (idx * 45)
        } else if (isTablet) {
          return shadowHeight - (idx * 25)
        } else if (isMobileMax) {
          return shadowHeight - (idx * 25)
        }
      }
      
      const resizeShadow = (idx: number = 0): void => {
        gsap.to(shadow, {
          height: calcHeight(idx),
          duration: 0.2,
        })
      }
      
      const popupsAnimation: PopupsAnimation = {
        'anim-1': {
          x: -150,
          y: 80,
          scale: 1,
          duration: 0.5,
          opacity: 1,
          zIndex: 2,
        },
        'anim-2': {
          x: isTabletMax ? -120 : -200,
          y: isTabletMax ? -150 : -300,
          scale: 1,
          duration: 0.5,
          opacity: 1,
          zIndex: 2,
        },
        'anim-3': {
          x: isTabletMax ? 70 : 150,
          y: isTabletMax ? -180 : -300,
          scale: 1,
          duration: 0.5,
          opacity: 1,
          zIndex: 2,
        },
        'anim-4': {
          x: isTabletMax ? -160 : -260,
          y: isTabletMax ? -200 : -300,
          scale: 1,
          duration: 0.5,
          opacity: 1,
          zIndex: 2,
        },
        'back': {
          x: 0,
          y: 0,
          scale: 0.3,
          duration: 0.5,
          opacity: 0,
        }
      }
      
      ScrollTrigger.create({
        trigger: pinnedBlock,
        pin: true,
        pinSpacing: true,
        scrub: true,
        start: 'center center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
        onLeaveBack: () => {
          isMobileMax && this.moveCanvas(0);
        },
        onEnter: () => {
          isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
        },
        onLeave: () => {
          isMobileMax && this.moveCanvas(0);
        },
      })
      
      const updatePagination = (isActive: boolean, idx: number) => {
        if (isActive) {
          paginationList[idx].classList.add('active');
        } else {
          paginationList[idx].classList.remove('active');
        }
        paginationCount.textContent = getTotalElements(paginationList, listItems);
      };
      
      listItems.forEach((card, idx) => {
        const isFirstCard = idx === 0;
        const animationIdx = idx + 3;
        
        cardsTimeLine.from(card, {
          y: () => idx === 0 ? 0 : card.getBoundingClientRect().height + (idx === 1 ? 0 : 100),
          duration: 1,
          ease: 'linear',
          onStart: () => {
            !isFirstCard && updatePagination(true, idx)
            resizeShadow(idx)
            animateSpline(this.application, animationIdx)
          },
          onComplete: () => {
            !isFirstCard && gsap.to(popups[idx - 1], {
              ...popupsAnimation[`back`]
            })
          },
          onUpdate: () => {
            popups.forEach(el => {
              gsap.to(el, {
                ...popupsAnimation[`back`]
              })
            })
            !isFirstCard && gsap.to(popups[idx - 1], {
              ...popupsAnimation[`anim-${idx}`]
            })
          },
          onReverseComplete: () => {
            animateSpline(this.application, animationIdx - 1)
            resizeShadow(!isFirstCard ? idx - 1 : idx)
            !isFirstCard && updatePagination(false, idx)
            gsap.to(popups[idx - 1], {
              ...popupsAnimation[`back`]
            })
          }
        })
      })
    })
  }
  
  protected lightCardsSection = () => {
    const section = document.querySelector('.trigger-light-cards');
    if (!section) return;
    
    const paginationList = section.querySelectorAll('.pagination__item');
    const paginationCount = section.querySelector('.widget-slider__numbers');
    const listItems = section.querySelectorAll('.article-info');
    const container = section.querySelector('.layering');
    const shadow = container.querySelector('.layering__shadow');
    const pinnedBlock = section.querySelector('.anim-stay')
    const shadowHeight = shadow.getBoundingClientRect().height;
    
    const cardsTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
        scrub: 1,
        onEnter: () => animateSpline(this.application, 9),
        onEnterBack: () => animateSpline(this.application, 15)
      }
    });
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      
      const calcHeight = (idx: number) => {
        if (isDesktop) {
          return shadowHeight - (idx * 60)
        } else if (isTablet) {
          return shadowHeight - (idx * 30)
        } else if (isMobileMax) {
          return shadowHeight - (idx * 20)
        }
      }
      
      const resizeShadow = (idx: number = 0): void => {
        gsap.to(shadow, {
          height: calcHeight(idx),
          duration: 0.2,
        })
      }
      
      ScrollTrigger.create({
        trigger: pinnedBlock,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: isMobileMax ? 'top center-=40%' : 'center center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
        onLeaveBack: () => {
          animateSpline(this.application, 8)
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
          isMobileMax && this.moveCanvas(0);
        },
        onEnter: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
          isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
        },
        onEnterBack: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
          isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
        },
        onLeave: () => {
          animateSpline(this.application, 15)
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
          isMobileMax && this.moveCanvas(0);
        }
      })
      
      const updatePagination = (isActive: boolean, idx: number) => {
        if (isActive) {
          paginationList[idx].classList.add('active');
        } else {
          paginationList[idx].classList.remove('active');
        }
        paginationCount.textContent = getTotalElements(paginationList, listItems);
      };
      
      listItems.forEach((card, idx) => {
        const isFirstCard = idx === 0;
        const animationIdx = idx + 11;
        
        cardsTimeLine.from(card, {
          y: () => idx === 0
            ? 0
            : card.getBoundingClientRect().height + (idx === 1 ? isTabletMax ? -14 : -50 : 20),
          duration: 1,
          ease: 'linear',
          onStart: () => {
            !isFirstCard && updatePagination(true, idx)
            resizeShadow(idx)
            animateSpline(this.application, animationIdx)
          },
          onReverseComplete: () => {
            animateSpline(this.application, animationIdx)
            resizeShadow(!isFirstCard ? idx - 1 : idx)
            !isFirstCard && updatePagination(false, idx)
          }
        })
      })
    })
  }
  
  protected breakSection = () => {
    const section = document.querySelector('.trigger-break')
    if (!section) return
    
    const triggerBlocks = section.querySelector('.trigger-break-cards')
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      ScrollTrigger.create({
        trigger: section,
        start: `top center-=10%`,
        end: `bottom center`,
        onEnter: () => animateSpline(this.application, 16),
        onToggle: (self) => {
          if (self.isActive) {
            this.moveCanvas(0)
          } else {
            if (isTablet) {
              this.moveCanvas(-20)
            }
            
            if (isMobileMax) {
              this.moveCanvas(0)
            }
          }
        },
        onLeave: () => animateSpline(this.application, 18),
      })
    })
    
    if (!triggerBlocks) return
    
    ScrollTrigger.create({
      trigger: triggerBlocks,
      start: `top center`,
      end: `bottom center`,
      onEnter: () => animateSpline(this.application, 17),
      onEnterBack: () => animateSpline(this.application, 17),
      onLeaveBack: () => animateSpline(this.application, 16),
    })
  }
  
  protected lightCardsSectionSecond = () => {
    const section = document.querySelector('.trigger-light-cards-second');
    if (!section) return;
    
    const paginationList = section.querySelectorAll('.pagination__item');
    const paginationCount = section.querySelector('.widget-slider__numbers');
    const listItems = section.querySelectorAll('.article-info');
    const container = section.querySelector('.layering');
    const shadow = container.querySelector('.layering__shadow');
    const pinnedBlock = section.querySelector('.anim-stay')
    const shadowHeight = shadow.getBoundingClientRect().height;
    
    const titleTrigger = section.querySelector('.trigger-text')
    
    if (titleTrigger) {
      ScrollTrigger.create({
        trigger: titleTrigger,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) animateSpline(this.application, 19)
        }
      })
    }
    
    const cardsTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200)}`,
        scrub: 1,
        onToggle: (self) => {
          if (self.isActive) animateSpline(this.application, 20)
        }
      }
    });
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      
      const calcHeight = (idx: number) => {
        if (isDesktop) {
          return shadowHeight - (idx * 60)
        } else if (isTablet) {
          return shadowHeight - (idx * 30)
        } else if (isMobileMax) {
          return shadowHeight - (idx * 30)
        }
      }
      
      const resizeShadow = (idx: number = 0): void => {
        gsap.to(shadow, {
          height: calcHeight(idx),
          duration: 0.2,
        })
      }
      
      ScrollTrigger.create({
        trigger: pinnedBlock,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        start: isMobileMax ? 'top center-=40%' : 'center center',
        end: () => `+=${listItems?.length * (listItems[0]?.getBoundingClientRect().height + 200) + 300}`,
        onLeaveBack: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
          isMobileMax && this.moveCanvas(0);
        },
        onEnter: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
          isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
        },
        onEnterBack: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: -120})
          isMobileMax && this.moveCanvas(0, {yPercent: -20, zIndex: 1})
        },
        onLeave: () => {
          isDesktop && this.moveCanvas(0, {xPercent: -20, y: 0})
          isMobileMax && this.moveCanvas(0);
        }
      })
      
      const updatePagination = (isActive: boolean, idx: number) => {
        if (isActive) {
          paginationList[idx].classList.add('active');
        } else {
          paginationList[idx].classList.remove('active');
        }
        paginationCount.textContent = getTotalElements(paginationList, listItems);
      };
      
      listItems.forEach((card, idx) => {
        const isFirstCard = idx === 0;
        const animationIdx = idx + 21;
        
        cardsTimeLine.from(card, {
          y: () => idx === 0
            ? 0
            : card.getBoundingClientRect().height + (idx === 1 ? isTabletMax ? -14 : -50 : 20),
          duration: 1,
          ease: 'linear',
          onStart: () => {
            !isFirstCard && updatePagination(true, idx)
            resizeShadow(idx)
            animateSpline(this.application, animationIdx)
          },
          onReverseComplete: () => {
            animateSpline(this.application, animationIdx)
            resizeShadow(!isFirstCard ? idx - 1 : idx)
            !isFirstCard && updatePagination(false, idx)
          }
        })
      })
    })
  }
  
  protected fixedCards = () => {
    const section = document.querySelector('.trigger-fixed-cards');
    
    if (!section) return
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: false,
        start: isTabletMax ? 'top-=150px 30%' : 'top-=200px 20%',
        end: isTabletMax ? 'center+=100 center' : 'center+=420 center',
        onToggle: (self) => {
          if (self.isActive) {
            animateSpline(this.application, 24)
            if (isDesktop) {
              gsap.to('.article-notification--11', {
                x: 120,
                y: -500,
                scale: 1,
                duration: 0.5,
                opacity: 1,
                zIndex: 2,
              })
              gsap.to('.article-notification--12', {
                x: -300,
                y: -100,
                scale: 1,
                duration: 0.5,
                opacity: 1,
                zIndex: 2,
              })
            }
            if (isTabletMax) {
              gsap.to('.article-notification--11', {
                x: 80,
                y: -340,
                scale: 1,
                duration: 0.5,
                opacity: 1,
                zIndex: 2,
              })
              gsap.to('.article-notification--12', {
                x: -180,
                y: -150,
                scale: 1,
                duration: 0.5,
                opacity: 1,
                zIndex: 2,
              })
            }
          } else {
            gsap.to('.article-notification--11', {
              x: 0,
              y: 0,
              scale: 0.3,
              duration: 0.5,
              opacity: 0,
            })
            gsap.to('.article-notification--12', {
              x: 0,
              y: 0,
              scale: 0.3,
              duration: 0.5,
              opacity: 0,
            })
          }
        },
        onLeave: () => animateSpline(this.application, 25)
      })
    })
  }
  
  protected meetingBlock = () => {
    const section = document.querySelector('.trigger-meeting')
    
    if (!section) return
    
    this.mm.add({
      isDesktop: `(min-width: ${this.breakPoints.desktop}px)`,
      isTabletMax: `(max-width: ${this.breakPoints.tabletMax}px)`,
      isTablet: `(min-width: ${this.breakPoints.tablet}px)`,
      isMobileMax: `(max-width: ${this.breakPoints.mobileMax}px)`,
    }, (context) => {
      const {isDesktop, isTabletMax, isTablet, isMobileMax} = context.conditions;
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'center center',
        onEnter: () => animateSpline(this.application, 26),
        onEnterBack: () => {
          isTablet && this.moveCanvas(-20, {yPercent: 0, zIndex: 1})
          isMobileMax && this.moveCanvas(0, {yPercent: 0, zIndex: 1})
        },
        onLeave: () => animateSpline(this.application, 27),
        onLeaveBack: () => animateSpline(this.application, 25),
      })
    })
  }
}
