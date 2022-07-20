import view from './view.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    // Page 1 and other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    // Page 1 and NO other pages
    if (currentPage === 1 && currentPage === numPages) {
      return '';
    }

    // last page
    if (currentPage === numPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`;
    }

    // Middle pages
    if (currentPage > 1 && currentPage < numPages) {
      return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
  }
}
export default new paginationView();
