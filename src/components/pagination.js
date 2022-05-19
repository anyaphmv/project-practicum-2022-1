export default class Pagination {
	constructor(el, onChange) {
		this.el = el;
		this.onChange = onChange;

		this.initListeners()
	}

	initListeners() {
		this.el.addEventListener( 'click', (event) => {
			const target = event.target

			let page

			if (target.dataset.page) {
				page = +target.dataset.page
			} else if (target.closest('[data-page]')) {
				page = +target.closest('[data-page]').dataset.page
			} else {
				return
			}

			this.onPageChange(page)
		} );
	}

	onPageChange(page) {
		if (!page) {
			return
		}

		this.onChange(page)
	}

	renderPaginationItems(currentPage, pageCount) {
		let html = '<div class="catalog__pagination-pages">';

		const pageNeighbours = 2
		const leftLimit = 4

		if(currentPage === 1) {
			for (let i = 1; i <= pageCount; i++) {
				if (i === leftLimit && leftLimit !== pageCount) {
					html += this.renderPaginationItem(i, +currentPage, true)
				} else if (i < leftLimit || i === pageCount) {
					html += this.renderPaginationItem(i, +currentPage)
				}
			}
		} else if (currentPage === pageCount) {
			for (let i = 1; i <= pageCount; i++) {
				if (i === pageNeighbours && leftLimit !== pageCount) {
					html += this.renderPaginationItem(i, +currentPage, true)
				} else if (i > pageCount - (leftLimit - 1) || i === 1) {
					html += this.renderPaginationItem(i, +currentPage)
				}
			}
		} else {
			for (let i = 1; i <= pageCount; i++) {
				if ((i - 1  <= currentPage && i + 1 >= currentPage) || (i === 1 || i === pageCount)) {
					html += this.renderPaginationItem(i, +currentPage);
				} else if (i - pageNeighbours === currentPage) {
					html += this.renderPaginationItem(i, +currentPage, true)
				}
				else if (i + pageNeighbours === currentPage) {
					html += this.renderPaginationItem(i, +currentPage, true)
				}
			}
		}

		html += '</div>'

		html += this.renderButtons(currentPage, pageCount)

		this.el.innerHTML = html;
	}

	renderPaginationItem(page, currentPage, hasSpill) {
		if(hasSpill) {
			return `<button class="catalog__pagination-page" data-page="...">
						...
					</button>`
		}

		if (page === currentPage) {
			return `<button class="catalog__pagination-page catalog__pagination-page_select" data-page="${page}">
						${page}
					</button>`;
		} else {
			return `<button class="catalog__pagination-page" data-page="${page}">
						${page}
					</button>`;
		}
	}

	renderButtons(currentPage, pageCount) {
		return `
			<div class="catalog__pagination-by-one">
        	    <button class="catalog__pagination-arrow" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
        	        <svg class="" width="10" height="16">
        	            <use href="#arrow-pagination"></use>
        	        </svg>
        	    </button>
	
        	    <button class="catalog__pagination-arrow" data-page="${currentPage + 1}" ${currentPage === pageCount ? 'disabled' : ''}>
        	        <svg class="" width="10" height="16">
        	            <use href="#arrow-pagination"></use>
        	        </svg>
        	    </button>
        	</div>
		`
	}
}
