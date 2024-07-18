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
        modules: [Pagination, Navigation],
        pagination: {
          el: '.fn-pager',
          dynamicBullets: true,
          bulletClass: 'fn-pager__bullet',
          bulletActiveClass: 'fn-pager__bullet_active_red',
        },
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
    const insideZoomLink = clone.querySelector('[data-fslightbox]');
    if (insideZoomLink) {
      insideZoomLink.setAttribute('data-fslightbox', keyForsearch);
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
                <div class="fn-mobile-slider__arrow fn-mobile-slider__arrow_prev sl-arrow sl-arrow_blue js-prev">
                  <svg class="svg" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.398205 9.36567L10.4065 0.245066C10.7349 -0.0816885 11.2675 -0.0816885 11.596 0.245066C11.9244 0.571794 11.9244 1.10195 11.596 1.4287L2.19114 10L11.5951 18.5713C11.9236 18.8981 11.9236 19.4282 11.5951 19.7549C11.2667 20.0817 10.7341 20.0817 10.4057 19.7549L0.397371 10.6343C0.222328 10.4601 0.147281 10.2292 0.158973 10.0008C0.148089 9.77161 0.223111 9.54071 0.398205 9.36567Z" />
                  </svg>                
                </div>
                <div class="fn-mobile-slider__arrow fn-mobile-slider__arrow_next sl-arrow sl-arrow_blue js-next">
                  <svg class="svg" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6018 9.36567L1.5935 0.245066C1.26508 -0.0816885 0.732451 -0.0816885 0.40403 0.245066C0.0756097 0.571794 0.0756097 1.10195 0.40403 1.4287L9.80886 10L0.404863 18.5713C0.0764427 18.8981 0.0764427 19.4282 0.404863 19.7549C0.733284 20.0817 1.26591 20.0817 1.59431 19.7549L11.6026 10.6343C11.7777 10.4601 11.8527 10.2292 11.841 10.0008C11.8519 9.77161 11.7769 9.54071 11.6018 9.36567Z" />
                  </svg>                
                </div>
              <div class="fn-pager">                
                <div class="fn-pager__pager"></div>
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
