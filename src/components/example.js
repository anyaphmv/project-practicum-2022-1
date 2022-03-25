export default class Filter {
    constructor(el) {
        this.el = el
    }
    renderFilters(items) {
        let itemsDom = ''

        items.forEach(item => {
            if(item.type === 'checkbox')
            {
                itemsDom += `<div class="accordion filters__item" data-accordion>
                            <div class="accordion__header" data-accordion-header>
                                <span class="accordion__title body-1">${item.title}</span>
                                
                                <svg class="accordion__icon" width="10" height="5">
                                    <use href="#arrow"></use>
                                </svg>
                            </div>
                            <div class="accordion__inner filters__checkboxes"
                                data-accordion-inner>`

                item.items.forEach(title => {
                    itemsDom += this.renderCheckbox(title)
                })
                itemsDom += `
                        </div>
                    </div>`
            }
        })
        this.el.innerHTML = itemsDom
    }
    renderCheckbox(item) {
        return `
            <label class="checkbox">
                <input class="checkbox__native" type="checkbox">
                <span class="checkbox__box"></span>
                <span class="checkbox__text">${item.title}</span>
            </label>
        `
    }
}