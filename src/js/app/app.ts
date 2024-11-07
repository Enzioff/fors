import {Application} from '@splinetool/runtime';

import {Spline} from "./spline/spline";
import Tabs from "./tabs";
import DropZone from "./dropZone";
import {MvcPage} from "./animation/MvcPage";
import {AboutPage} from "./animation/AboutPage";
import {MainPage} from "./animation/MainPage";
import CustomSelect from "./customSelect";
import SearchBlock from "./SearchBlock";
import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import Preloader from "./animation/Preloader";

class App {
    splineURL: string;

    constructor() {
        this.splineURL = 'https://prod.spline.design/T4GcdWa1iY2V7Fpu/scene.splinecode';

        // const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
        // const app = new Application(canvas);
        // app.load('./scene.splinecode');
        this.init();
    }

    init = () => {
        this.createAnimation()
        this.createTabs()
        this.createDropZone()
        this.createInputAreaMaxValue()
        this.createCustomSelect()
        this.createSearchBlock()
        this.createSlider()
        this.createFancybox()
        this.createPreloader()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]');
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
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

    createInputAreaMaxValue = () => {
        const textAreas = document.querySelectorAll('.form__item--area');
        if (!textAreas) return;

        textAreas.forEach((element) => {
            const area = element.querySelector('.input.input--area') as HTMLInputElement;
            const textMax = element.querySelector('.form__max');
            const maxLength = 1000;

            area.addEventListener('input', (evt) => {
                const target = evt.target as HTMLInputElement;

                if (target.value.length >= maxLength) {
                    area.value = target.value.slice(0, maxLength)
                }
                textMax.textContent = `${target.value.length}/${maxLength}`
            })
        })
    }

    createCustomSelect = () => {
        const selects = document.querySelectorAll('.custom-select');
        if (!selects) return
        selects.forEach(select => {
            new CustomSelect(select)
        })
    }

    createSearchBlock = () => {
        const searchBlock = document.querySelector('[data-search-block]')
        if (!searchBlock) return;
        new SearchBlock(searchBlock)
    }

    createPreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return
        new Preloader(preloader)
    }

    createFancybox = () => {
        const customCloseButton =
            `<button data-fancybox-close class="fancybox-btn" title="Закрыть">
                <svg width="24" height="24" viewBox="0 0 24 24" class="fancybox-btn-icon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.63567 7.05101C6.02619 7.44153 6.65936 7.44153 7.04988 7.05101C7.44041 6.66049 7.44041 6.02732 7.04988 5.63679C6.65936 5.24627 6.02619 5.24627 5.63567 5.63679C5.24514 6.02732 5.24514 6.66049 5.63567 7.05101Z"/>
                    <path d="M18.4067 16.9926L9.83656 8.42249C9.46946 8.0554 8.87429 8.0554 8.50719 8.42249L8.42234 8.50735C8.05525 8.87444 8.05525 9.46962 8.42234 9.83671L16.9925 18.4068C17.3596 18.7739 17.9548 18.7739 18.3218 18.4068L18.4067 18.322C18.7738 17.9549 18.7738 17.3597 18.4067 16.9926Z"/>
                    <path d="M16.991 5.59495L5.59242 16.9935C5.22532 17.3606 5.22532 17.9558 5.59242 18.3229L5.67727 18.4077C6.04436 18.7748 6.63954 18.7748 7.00663 18.4077L18.4052 7.00917C18.7723 6.64207 18.7723 6.0469 18.4052 5.6798L18.3203 5.59495C17.9533 5.22786 17.3581 5.22786 16.991 5.59495Z"/>
                </svg>
            </button>`

        // @ts-ignore
        Fancybox.bind('[data-fancybox]', {
            tpl: {
                closeButton: customCloseButton,
            }
        })
    }
}

export {App};

