export class ClassicTabs {
  constructor(options) {
    const defaultOptions = {
      blockSelector: '.tabs',
      controlSelector: '.js-tab-control',
      viewSelector: '.js-tab-view',
      scrollIntoView: false,
      onAfterTabChange: null,
      setupOpenFirstTab: true,
      toogle: false,
    };
    this.options = { ...defaultOptions, ...options };
    this.tabItems = new Map();
    this.wrapperEl =
      typeof this.options.blockSelector === 'string'
        ? document.querySelector(this.options.blockSelector)
        : this.options.blockSelector;
    this.viewEl = this.wrapperEl && this.wrapperEl.querySelectorAll(this.options.viewSelector);
    this.controlEl =
      this.wrapperEl && this.wrapperEl.querySelectorAll(this.options.controlSelector);
    this.activeKey = null;
    if (this.wrapperEl && this.controlEl.length > 0 && this.viewEl.length > 0) {
      this.init();
    }
  }
  init = () => {
    for (const element of this.controlEl) {
      element.addEventListener('click', () => {
        this.changeTab(element);
      });
    }
    this.createHashTable();
    this.options.setupOpenFirstTab && this.setupInitialActiveTab();
  };
  createHashTable = () => {
    for (const item of this.controlEl) {
      const key = item.getAttribute('data-tab');
      if (this.tabItems.has(key)) {
        this.tabItems.get(key).get('control').push(item);
      } else {
        const innerMap = new Map();
        innerMap.set('control', [item]);
        innerMap.set('view', []);
        innerMap.set('status', 'close');
        this.tabItems.set(key, innerMap);
      }
    }
    for (const item of this.viewEl) {
      const key = item.getAttribute('data-tab');
      this.tabItems.get(key).get('view').push(item);
    }
  };
  setupInitialActiveTab = () => {
    const key = this.controlEl[0].getAttribute('data-tab');
    for (const item of this.tabItems.get(key).get('control')) {
      item.classList.add('active');
    }
    for (const item of this.tabItems.get(key).get('view')) {
      item.classList.add('active');
    }
    this.activeKey = key;
    this.options.onAfterTabChange && this.options.onAfterTabChange(key, this.tabItems);
  };
  changeTab = (btn) => {
    const prevKey = this.activeKey;
    const key = btn.getAttribute('data-tab');
    if (!this.options.toggle) {
      if (prevKey) {
        this.closeTab(prevKey);
      }
      this.openTab(key);
    } else {
      if (prevKey === key && this.tabItems.get(key).get('status') === 'open') {
        this.closeTab(key);
        this.tabItems.get(key).get('view')[0].parentNode.classList.remove('active');
      } else {
        this.closeTab(prevKey);
        this.openTab(key);
        this.tabItems.get(key).get('view')[0].parentNode.classList.add('active');
      }
    }

    this.options.onAfterTabChange && this.options.onAfterTabChange(key, this.tabItems);
  };
  closeTab = (key) => {
    if (key) {
      for (const item of this.tabItems.get(key).get('control')) {
        item.classList.remove('active');
      }
      for (const item of this.tabItems.get(key).get('view')) {
        item.classList.remove('active');
      }
      this.tabItems.get(key).set('status', 'close');
    }
  };
  openTab = (key) => {
    for (const item of this.tabItems.get(key).get('control')) {
      item.classList.add('active');
    }
    for (const item of this.tabItems.get(key).get('view')) {
      item.classList.add('active');
      this.options.scrollIntoView && item.scrollIntoView();
    }
    this.activeKey = key;
    this.tabItems.get(key).set('status', 'open');
  };
}
