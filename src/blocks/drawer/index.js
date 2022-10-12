import '@/blocks/drawer/drawer.scss';

export class Drawer {
  constructor(options) {
    const defaultOptions = {
      drawerCssSelector: '.drawer',
      openBtnCssSelector: '.js-drawer-open',
      closeBtnCssSelector: '.drawer__close',
      showSubNavBtnCssSelector: '.drawer__btn',
      linkCssSelector: '.drawer__link',
      shoudCloseOnLinkClick: false,
    };
    this.options = { ...defaultOptions, ...options };
    this.drawerEl = document.querySelector(this.options.drawerCssSelector);
    this.openBtnEl = document.querySelector(this.options.openBtnCssSelector);
    this.closeBtnEl = document.querySelector(this.options.closeBtnCssSelector);
    this.linksEl = document.querySelectorAll(this.options.linkCssSelector);
    this.showSubNavBtnEl = this.drawerEl.querySelectorAll(this.options.showSubNavBtnCssSelector);
    this.activeSubNav = [];
    if (this.drawerEl && this.openBtnEl) {
      this._init();
    }
  }
  _init = () => {
    this.openBtnEl &&
      this.openBtnEl.addEventListener('click', () => {
        this.drawerEl.classList.add('_active');
        document.body.style = 'overflow:hidden';
      });
    this.closeBtnEl.addEventListener('click', () => {
      this.drawerEl.classList.remove('_active');
      document.body.style = '';
    });
    Array.prototype.forEach.call(this.showSubNavBtnEl, (item) => {
      item.addEventListener('click', this._showSubNav);
    });
    const btnPrevEl = document.querySelectorAll('.drawer__prev');
    Array.prototype.forEach.call(btnPrevEl, (item) => {
      item.addEventListener('click', this._closeSubNav);
    });
    this._clickAwayListener();
    Array.prototype.forEach.call(this.linksEl, (item) => {
      this.drawerEl.classList.remove('_active');
      document.body.style = '';
    });
  };
  _clickAwayListener = () => {
    document.addEventListener('click', (e) => {
      if (
        !this.drawerEl.isEqualNode(e.target) &&
        !this.drawerEl.contains(e.target) &&
        !this.openBtnEl.contains(e.target) &&
        !this.openBtnEl.isEqualNode(e.target)
      ) {
        this.drawerEl.classList.remove('_active');
        document.body.style = '';
      }
    });
  };
  _showSubNav = (e) => {
    e.currentTarget.nextElementSibling.classList.add('active');
    document.querySelector(
      '.drawer__list'
    ).style.cssText = `height:${e.currentTarget.nextElementSibling.scrollHeight}px`;
  };
  _closeSubNav = (e) => {
    const subnav = e.currentTarget
      .closest('.drawer__subnav')
      .parentElement.closest('.drawer__subnav');
    e.currentTarget.closest('.drawer__subnav').classList.remove('active');
    document.querySelector('.drawer__list').style.cssText = '';
    if (subnav) {
      console.log(subnav.scrollHeight);
      document.querySelector('.drawer__list').style.cssText = `height:${subnav.scrollHeight}px`;
    } else {
    }
  };
  _closeOnLinkClick = () => {
    this.drawerEl.classList.remove('_active');
  };
}
