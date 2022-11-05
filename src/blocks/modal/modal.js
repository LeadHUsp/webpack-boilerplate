export class Modal {
  constructor(options) {
    const defaultOptions = {
      modalTriggerCssSelector: '.js-popup',
      modalWindowCssSelector: '.tf-modal',
      modalLayerCssSelector: '.tf-modal__layer',
      modalCloseBtnCssSelector: '.js-close-modal',
      modalContainerCssSelector: '.js-modal-content',
      activeCssClass: '_active',
      afterOpenCallback: () => {},
      afterClose: () => {},
    };
    this.activeModals = {};
    this.options = Object.assign(defaultOptions, options);
    this.triggerBtn = document.querySelectorAll(this.options.modalTriggerCssSelector);
    this.modalWindow = document.querySelectorAll(this.options.modalWindowCssSelector);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.init();
  }
  init() {
    for (let index = 0; index < this.triggerBtn.length; index++) {
      const element = this.triggerBtn[index];
      element.addEventListener('click', (e) => {
        this.openModal(element, e);
      });
    }
    for (let index = 0; index < this.modalWindow.length; index++) {
      const modalWindowElement = this.modalWindow[index];
      const modalContainerEl = modalWindowElement.querySelector(
        this.options.modalContainerCssSelector
      );
      modalWindowElement.addEventListener('click', (e) => {
        if (modalContainerEl) {
          this.clickOutsideContent(e, modalContainerEl) && this.closeModal(modalWindowElement, e);
        }
      });
      const currentModalLayer = modalWindowElement.querySelector(
        this.options.modalLayerCssSelector
      );
      const currentCloseBtn = modalWindowElement.querySelectorAll(
        this.options.modalCloseBtnCssSelector
      );
      for (let index = 0; index < currentCloseBtn.length; index++) {
        const element = currentCloseBtn[index];
        element.addEventListener('click', (e) => {
          this.closeModal(modalWindowElement, e);
        });
      }
      if (currentModalLayer) {
        currentModalLayer.addEventListener('click', (e) => {
          this.closeModal(modalWindowElement, e);
        });
      }
    }
  }
  openModal(element, event) {
    event.preventDefault();
    const modalLink = element.getAttribute('data-trigger-modal');
    const modalToOpen = document.querySelector(
      `${this.options.modalWindowCssSelector}[data-modal=${modalLink}]`
    );

    if (modalToOpen) {
      this.activeModals[modalLink] = modalToOpen;
      document.body.style.cssText = 'overflow:hidden';
      modalToOpen.classList.add('_active');
    }
    this.options.afterOpenCallback();
  }
  closeModal(modalWindowElement, event) {
    event && event.preventDefault();
    delete this.activeModals[modalWindowElement.getAttribute('data-modal')];
    modalWindowElement.classList.remove(this.options.activeCssClass);
    document.body.style.cssText = '';
    this.options.afterClose && this.options.afterClose(modalWindowElement);
  }
  clickOutsideContent = (e, container) => {
    const target = e.target;
    return !target.isEqualNode(container) && !container.contains(target);
  };
  closeCurrentModal(modalWindowElementUnicSelector) {
    const modal = document.querySelector(modalWindowElementUnicSelector);
    delete this.activeModals[modal.getAttribute('data-modal')];
    modal.classList.remove(this.options.activeCssClass);
    document.body.style.cssText = '';
  }
  closeAllActiveModal = () => {
    for (const key in this.activeModals) {
      const element = this.activeModals[key];
      element.classList.remove(this.options.activeCssClass);
    }
    document.body.style.cssText = '';
  };
  openCurrentModal(modalWindowElementUnicSelector) {
    const modal = document.querySelector(modalWindowElementUnicSelector);
    modal.classList.add(this.options.activeCssClass);
    document.body.style.cssText = 'overflow:hidden;';
  }
}
