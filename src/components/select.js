import Cookie from '../utils/cookie.js'
import getFilterItems from "../api/getFilterItems";
import {catalogRenderData} from "../server-front/catalog";

export default class Select {
    constructor({el, onChange, cookieName}) {
        this.el = el
        this.header = this.el.querySelector('[data-select-header]')
        this.headerText = this.el.querySelector('[data-header-text]')
        this.items = this.el.querySelectorAll('[data-select-item]')
        this.onChange = onChange
        this.cookieName = cookieName
        
        this.init()
    }
    
    init() {
        if (this.cookieName) {
            console.log(this.cookieName)
            const value = Cookie.getCookie(this.cookieName)
            
            if (value) {
                const item = this.el.querySelector(`[data-select-item="${value}"]`)
                this.changeValue(item)
            }
        } 
        
        this.header.addEventListener('click', () => this.toggle())

        this.items.forEach(item => {
            item.addEventListener('click', () => this.changeValue(item))
        })
    }
    
    toggle() {
        this.el.classList.toggle('select_open')
    }
    
    open() {
        this.el.classList.add('select_open')
    }
    
    hide() {
        this.el.classList.remove('select_open')
    }

    changeValue(item) {
        const value = item.dataset.selectItem
        const name = item.innerText.trim()
        this.headerText.innerText = name
        this.hide()

        if (this.cookieName === 'catalog-sort') {
            Cookie.setCookie(this.cookieName, value)
        } else if(this.cookieName === 'catalog-limit') {
            Cookie.setCookie(this.cookieName, name)
        }
        
        if (this.onChange) {
            this.onChange({
                name,
                value
            })
        }
    }
}