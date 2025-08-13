// pagination.js - Vanilla JavaScript Pagination Plugin with Ellipsis and First/Last Buttons
class Pagination {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            pageSize: options.pageSize || 10,
            size: options.size || 'medium', // 'small', 'medium', 'large'
        };
        this.currentPage = 1;

        this.data = options.data;
        this.itemsPerPage = options.itemsPerPage || 10;
        this.maxVisiblePages = options.maxVisiblePages || 5;
        this.onPageChange = options.onPageChange || function () {};
        this.controlsContainer = document.querySelector(options.paginationId);
        this.controlsContainer.classList.add(`pagination-${this.options.size}`);

        // Custom color options
        this.textColor = options.textColor || 'inherit';
        this.bgColor = options.bgColor || 'transparent';
        this.activeBgColor = options.activeBgColor || '#007bff';
        this.activeTextColor = options.activeTextColor || '#ffffff';
        this.hoverBgColor = options.hoverBgColor || '#e0e0e0';
        this.hoverTextColor = options.hoverTextColor || '#000000';

        this.initStyles();
        this.render();
    }

    initStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .pagination-container {
                --pagination-active-bg: ${this.activeBgColor};
                --pagination-active-color: ${this.activeTextColor};
                --pagination-hover-bg: ${this.hoverBgColor};
                --pagination-hover-color: ${this.hoverTextColor};
            }
        `;
        this.controlsContainer.classList.add('pagination-container');
        document.head.appendChild(style);
    }
    

    get totalPages() {
        return Math.ceil(this.data.length / this.itemsPerPage);
    }

    paginate() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.data.slice(start, end);
    }

    renderItems() {
        const items = this.paginate();
        this.container.innerHTML = items.map(item => `<div class="pagination-item">${item}</div>`).join('');
    }

    renderPaginationControls() {
        if (!this.controlsContainer) return;

        this.controlsContainer.innerHTML = '';

        const createButton = (label, page, disabled = false, isActive = false) => {
            const btn = document.createElement('button');
            btn.textContent = label;
            btn.className = 'pagination-btn';

            // inline styles from your variables
            if (isActive) {
                btn.classList.add('active');
                btn.style.backgroundColor = this.activeBgColor;
                btn.style.color = this.activeTextColor;
            } else {
                btn.style.backgroundColor = this.bgColor;
                btn.style.color = this.textColor;
                btn.addEventListener('mouseenter', () => {
                    if (!btn.disabled) {
                        btn.style.backgroundColor = this.hoverBgColor;
                        btn.style.color = this.hoverTextColor;
                    }
                });
                btn.addEventListener('mouseleave', () => {
                    if (!btn.disabled) {
                        btn.style.backgroundColor = 'transparent';
                        btn.style.color = 'inherit';
                    }
                });
            }

            if (disabled) btn.disabled = true;
            btn.addEventListener('click', () => this.goToPage(page));
            return btn;
        };

        const total = this.totalPages;

        // First
        this.controlsContainer.appendChild(
            createButton('«', 1, this.currentPage === 1)
        );

        // Prev
        this.controlsContainer.appendChild(
            createButton('‹', this.currentPage - 1, this.currentPage === 1)
        );

        if (total <= this.maxVisiblePages) {
            for (let i = 1; i <= total; i++) {
                this.controlsContainer.appendChild(createButton(String(i), i, false, i === this.currentPage));
            }
        } else {
            // Numbered buttons with ellipsis
            const pages = this.getVisiblePages();

            // Always consider showing 1 on the left
            if (pages.length === 0 || pages[0] > 1) {
                this.controlsContainer.appendChild(createButton('1', 1, false, this.currentPage === 1));
                if (pages.length && pages[0] > 2) {
                    this.controlsContainer.appendChild(this.createEllipsis());
                }
            }

            // Middle window
            pages.forEach(p => {
                this.controlsContainer.appendChild(createButton(String(p), p, false, p === this.currentPage));
            });

            // Always consider showing last page on the right
            const lastMid = pages.length ? pages[pages.length - 1] : 1;
            if (lastMid < total) {
                if (lastMid < total - 1) {
                    this.controlsContainer.appendChild(this.createEllipsis());
                }
                this.controlsContainer.appendChild(createButton(String(total), total, false, this.currentPage === total));
            }
        }

        // Next
        this.controlsContainer.appendChild(
            createButton('›', this.currentPage + 1, this.currentPage === this.totalPages)
        );

        // Last
        this.controlsContainer.appendChild(
            createButton('»', this.totalPages, this.currentPage === this.totalPages)
        );
    }

    createEllipsis() {
        const span = document.createElement('span');
        span.textContent = '...';
        span.className = 'pagination-ellipsis';
        return span;
    }

    getVisiblePages() {
        const total = this.totalPages;

        if (total <= this.maxVisiblePages) return [];

        const middleSlots = Math.max(1, this.maxVisiblePages - 2);
        const half = Math.floor(middleSlots / 2);

        let start = Math.max(2, this.currentPage - half);
        let end = Math.min(total - 1, start + middleSlots - 1);

        const actualWindow = end - start + 1;
        if (actualWindow < middleSlots) {
            start = Math.max(2, end - middleSlots + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) pages.push(i);

        return pages;
    }

    render() {
        this.renderItems();
        this.renderPaginationControls();
        this.onPageChange(this.currentPage);
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.render();
    }
}
