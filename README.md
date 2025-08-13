# Vanilla JavaScript Pagination Plugin

A lightweight, dependency-free pagination plugin with smart ellipsis, icon navigation (« ‹ › »), 
custom colors, and size presets. Built in plain JavaScript for easy drop-in use.

## ✨ Features
- **No dependencies** (vanilla JS)
- **Icon controls**: First/Prev/Next/Last (« ‹ › »)
- **Ellipsis** for long page ranges
- **Small datasets friendly** (1–2 pages still render numbers)
- **Custom colors**: text, background, hover, active via options
- **Size presets**: `small`, `medium`, `large`
- Simple API with `onPageChange` callback

---

## 📦 Install

Include your CSS and JS files:

```html
<link rel="stylesheet" href="style.css" />
<script src="pagination.js"></script>
```

---

## 🚀 Quick Start

### HTML
```html
<div id="list"></div>
<div id="pagination-controls"></div>
```

### JavaScript
```js
const data = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`);

const paginator = new Pagination(document.getElementById('list'), {
  data,                         // Array of items to paginate
  itemsPerPage: 10,             // Items per page
  maxVisiblePages: 5,           // Window size before ellipsis
  paginationId: "#pagination-controls",

  // Size preset for buttons: 'small' | 'medium' | 'large'
  size: 'medium',

  // Colors (hex, rgb(a), named, etc.)
  textColor: 'inherit',
  bgColor: 'transparent',
  activeBgColor: '#2563eb',
  activeTextColor: '#ffffff',
  hoverBgColor: '#1f2937',
  hoverTextColor: '#e5e7eb',

  onPageChange(page) {
    console.log('Changed to page', page);
  }
});
```

By default `renderItems()` outputs simple `<div class="pagination-item">Item</div>` blocks into the container.
In your app you can **override** `renderItems()` to output any markup (e.g., table rows).

```js
paginator.renderItems = function () {
  const items = this.paginate();
  this.container.innerHTML = items.map(item => `<div class="row">${item}</div>`).join('');
};
paginator.render(); // re-render after overriding if needed
```

---

## ⚙️ Options

| Name               | Type     | Default       | Description |
|--------------------|----------|---------------|-------------|
| `data`             | Array    | `[]`          | Items to paginate. |
| `itemsPerPage`     | Number   | `10`          | How many items per page. |
| `maxVisiblePages`  | Number   | `5`           | How many page **buttons** to show before/after ellipsis (excludes « and »). |
| `paginationId`     | String   | —             | CSS selector for the controls container (e.g. `#pagination-controls`). |
| `size`             | String   | `'medium'`    | Preset button size: `'small'`, `'medium'`, `'large'` (applied as class on controls container). |
| `textColor`        | String   | `'inherit'`   | Text color for **inactive** buttons. |
| `bgColor`          | String   | `'transparent'` | Background for **inactive** buttons. |
| `activeBgColor`    | String   | `'#007bff'`   | Background for the **active** page button. |
| `activeTextColor`  | String   | `'#ffffff'`   | Text color for the **active** page button. |
| `hoverBgColor`     | String   | `'#e0e0e0'`   | Background on **hover** for inactive buttons. |
| `hoverTextColor`   | String   | `'#000000'`   | Text color on **hover** for inactive buttons. |
| `onPageChange`     | Function | `() => {}`    | Fires after render when the page changes (receives current page). |

---

## 🧩 Methods

- `paginate()` → returns current page slice of `data`
- `goToPage(pageNumber)` → navigates programmatically
- `render()` → re-renders items and controls (called internally)

---

## 🎨 Styling

Base classes emitted by the plugin:

```css
/* Buttons created by the plugin */
.pagination-btn {
  border: none;
  padding: 6px 12px;
  margin: 0 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color .2s, color .2s;
}

/* Ellipsis between page groups */
.pagination-ellipsis {
  display: inline-block;
  padding: 6px 8px;
  opacity: .75;
}

/* Optional size helpers applied to the controls container */
.pagination-small .pagination-btn { font-size: 12px; padding: 4px 8px; }
.pagination-medium .pagination-btn { font-size: 14px; padding: 6px 12px; }
.pagination-large .pagination-btn { font-size: 16px; padding: 8px 14px; }
```

> The plugin also injects a CSS rule block defining the variables:
> `--pagination-active-bg`, `--pagination-active-color`, `--pagination-hover-bg`, `--pagination-hover-color`  
> based on your options. Inline styles are applied per-button for active/hover states so it works even without extra CSS.

---

## 🧪 Table Demo (Optional)

If you want a table demo, override `renderItems()` to output `<tr>` rows into a `<tbody>`:

```js
const tbody = document.querySelector('#contacts-body');
const pager = new Pagination(tbody, {
  data: contacts,
  itemsPerPage: 10,
  paginationId: '#pagination-controls',
  size: 'large'
});

pager.renderItems = function () {
  const items = this.paginate();
  tbody.innerHTML = items.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.company}</td>
    </tr>
  `).join('');
};
pager.render();
```

---

## ✅ Notes
- The plugin shows **1–2 page totals correctly** (buttons still render).
- Ellipsis only appears when `totalPages > maxVisiblePages`.
- `onPageChange` is called during `render()`; if you reference the Pagination instance, prefer a regular function:  
  `onPageChange: function (page) { /* 'this' is the instance */ }`

---

## 📝 License
MIT — include your `LICENSE` in distribution.
