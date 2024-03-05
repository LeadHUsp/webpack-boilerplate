import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import debounce from 'lodash-es/debounce';

export class CreateMobileSlider {
  constructor(options) {
    const defaultOptions = {
      containerCssSelector: '.js-mobile-slider',
      slideCssSelector: '.js-mobile-slide',
      paginationClass: 'fn-pager fn-pager_space_top',
      //ширина при которой появится слайдер
      mobileBreakPoint: '1200',
      sliderOptions: {
        modules: [Navigation],

        navigation: {
          prevEl: '.js-prev',
          nextEl: '.js-next',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        },
      },
    };
    //создаем объект настроект с учетом переданных опций
    this.options = Object.assign(defaultOptions, options);
    this.gridEl =
      typeof this.options.containerCssSelector === 'string'
        ? document.querySelector(this.options.containerCssSelector)
        : this.options.containerCssSelector;
    this.createdSliderEl = null;
    this.gridEl && this._init();
  }
  _init = () => {
    this._renderSliderContainer();
    this._toggleVisibilityOfSliderAndGrid();
    window.addEventListener(
      'resize',
      debounce(() => {
        this._toggleVisibilityOfSliderAndGrid();
      }, 500)
    );
  };
  _insertSlides = (containerNode, childItem, keyForsearch) => {
    const slideEl = document.createElement('div');
    slideEl.classList.add('swiper-slide');
    //Клонирование со всеми дочерними эл.
    const clone = childItem.cloneNode(true);
    //фикс для корректной работы с fsgallery
    if (clone.tagName === 'A' && clone.getAttribute('data-fslightbox')) {
      clone.setAttribute('data-fslightbox', keyForsearch);
    }
    slideEl.appendChild(clone);
    containerNode.appendChild(slideEl);
  };
  _createRandomString = (length) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  _renderSliderContainer = () => {
    const keyForsearch = this._createRandomString(5);
    const slidesEl =
      typeof this.options.slideCssSelector === 'string'
        ? this.gridEl.querySelectorAll(this.options.slideCssSelector)
        : this.options.slideCssSelector;
    this.gridEl.insertAdjacentHTML(
      'beforebegin',
      `   <div class="fn-mobile-slider">
            <div class="swiper" id="${keyForsearch}">
              <div class="swiper-wrapper"></div>
              <div class="slider-control">
                <button class="slider-control__arrow sl-arrow sl-arrow_primary js-prev">
                  <svg class="svg" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.39411 9.24223L0.575735 5.42386C0.341421 5.18954 0.341421 4.80964 0.575735 4.57533L4.39411 0.756953C4.62843 0.522638 5.00832 0.522638 5.24264 0.756953C5.47695 0.991268 5.47695 1.37117 5.24264 1.60548L2.44853 4.39959L22 4.39959L22 5.59959L2.44853 5.59959L5.24264 8.39371C5.47696 8.62802 5.47696 9.00792 5.24264 9.24223C5.00833 9.47655 4.62843 9.47655 4.39411 9.24223Z"/>
                  </svg>
                </button>
                <button class="slider-control__arrow  sl-arrow sl-arrow_primary js-next">
                  <svg class="svg" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6059 9.24223L21.4243 5.42386C21.6586 5.18954 21.6586 4.80964 21.4243 4.57533L17.6059 0.756953C17.3716 0.522638 16.9917 0.522638 16.7574 0.756953C16.523 0.991268 16.523 1.37117 16.7574 1.60548L19.5515 4.39959L4.38721e-07 4.39959L3.33813e-07 5.59959L19.5515 5.59959L16.7574 8.39371C16.523 8.62802 16.523 9.00792 16.7574 9.24223C16.9917 9.47655 17.3716 9.47655 17.6059 9.24223Z"/>
                  </svg>
                </button>
              </div>
             </div>
          </div>				 
			  `
    );
    this.createdSliderEl = document.getElementById(keyForsearch);
    const sliderContainerNode = this.createdSliderEl.querySelector('.swiper-wrapper');
    Array.prototype.forEach.call(slidesEl, (item) => {
      this._insertSlides(sliderContainerNode, item, keyForsearch);
    });
    //Инциализация слайдера
    new Swiper(this.createdSliderEl, this.options.sliderOptions, keyForsearch);
  };
  _toggleVisibilityOfSliderAndGrid = () => {
    if (window.matchMedia(`(max-width: ${this.options.mobileBreakPoint}px)`).matches) {
      this.gridEl.style.cssText = 'display:none';
      this.createdSliderEl.style.cssText = 'display:block';
    } else {
      this.gridEl.style.cssText = '';
      this.createdSliderEl.style.cssText = 'display:none';
    }
  };
}

export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
