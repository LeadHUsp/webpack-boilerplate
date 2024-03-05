import { CreateMobileSlider } from '@/js/helpers';
import { Navigation } from 'swiper/modules';
export class SmartMobileSlider {
  constructor() {
    this.blocks = document.querySelectorAll('.js-smart-mobile-slider');
    this.config = {
      conf_1: {
        screenSize: '1200',
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 1.2,
          },
          575: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        },
      },
      conf_2: {
        screenSize: '1200',
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          370: {
            slidesPerView: 1.5,
          },
          470: {
            slidesPerView: 2,
          },
          610: {
            slidesPerView: 2.5,
          },
          800: {
            slidesPerView: 3,
          },

          900: {
            slidesPerView: 4,
          },
        },
      },
      conf_3: {
        screenSize: '1200',
        breakpoints: {
          320: {
            slidesPerView: 2,
          },
          450: {
            slidesPerView: 3,
          },
          993: {
            slidesPerView: 4,
          },
        },
      },
    };
    this.blocks.length > 0 && this.init();
  }
  init = () => {
    for (const item of this.blocks) {
      const cardsInRow = item.getAttribute('data-row') || 'conf_1';
      new CreateMobileSlider({
        containerCssSelector: item,
        mobileBreakPoint: this.config[cardsInRow].screenSize || 1200,
        sliderOptions: {
          modules: [Navigation],

          navigation: {
            prevEl: '.js-prev',
            nextEl: '.js-next',
          },
          spaceBetween: 15,
          breakpoints: this.config[cardsInRow].breakpoints,
        },
      });
    }
  };
}
