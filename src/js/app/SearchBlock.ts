class SearchBlock {
    searchBlock;
    searchForm;
    input;
    reset;
    resetBtn;

    constructor(searchBlock: Element) {
        this.searchBlock = searchBlock;
        this.searchForm = this.searchBlock.querySelector('.search')
        this.input = this.searchBlock.querySelector('input');
        this.reset = this.searchBlock.querySelector('.search__button--reset')
        this.resetBtn = this.searchBlock.querySelector('button');
        
        this.init()
    }

    init() {
        this.input.addEventListener('input', (evt) => {
            const target = evt.target as HTMLInputElement;

            if (target.value.length > 0) {
                this.reset.classList.add('visible')
            } else {
                this.reset.classList.remove('visible')
            }
        })

        this.reset.addEventListener('click', () => {
            this.reset.classList.remove('visible')
        })

        this.resetBtn.addEventListener('click', () => {
            this.input.value = ''
            this.reset.classList.remove('visible')
        })
    }
}

export default SearchBlock
