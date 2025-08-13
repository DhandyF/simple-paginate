# Vanilla JavaScript Pagination Plugin

A lightweight, customizable pagination plugin built with plain JavaScript.  
Supports ellipsis for long page lists, First/Last buttons, custom size, icon-based navigation, and dynamic color customization via options.

## 🚀 Features

- Pure JavaScript (no dependencies)
- First, Prev, Next, Last navigation buttons with `« ‹ › »` icons
- Dynamic ellipsis for large page ranges
- Configurable items per page and max visible page numbers
- Adjustable size (`small`, `medium`, `large`)
- Custom active/hover colors via options
- Works with any dataset

## 📦 Installation

Simply include the script and a CSS file in your HTML:

```html
<link rel="stylesheet" href="style.css" />
<script src="pagination.js"></script>
```

## 🧪 Usage Example

```html
<div id="pagination-output"></div>
<div id="pagination-controls"></div>

<script>
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  new Pagination(
    document.getElementById("pagination-output"),
    {
      data: data,
      itemsPerPage: 10,
      maxVisiblePages: 5,
      paginationId: "#pagination-controls",
      size: 'large',
      activeBgColor: '#f97316',     // orange
      activeTextColor: '#ffffff',
      hoverBgColor: '#fed7aa',      // light orange
      hoverTextColor: '#111827',
      onPageChange: (page) => console.log("Page changed to:", page)
    }
  );
</script>
```

## ⚙️ Options

| Option              | Type     | Default     | Description |
|---------------------|----------|-------------|-------------|
| `data`              | array    | `[]`        | Array of data items |
| `itemsPerPage`      | number   | `10`        | Items per page |
| `maxVisiblePages`   | number   | `5`         | Max visible page numbers before using ellipsis |
| `paginationId`      | string   | —           | CSS selector for pagination controls container |
| `size`              | string   | `'medium'`  | `'small'`, `'medium'`, or `'large'` button sizes |
| `activeBgColor`     | string   | `'#007bff'` | Background color for active page |
| `activeTextColor`   | string   | `'#ffffff'` | Text color for active page |
| `hoverBgColor`      | string   | `'#e0e0e0'` | Background color on hover |
| `hoverTextColor`    | string   | `'#000000'` | Text color on hover |
| `onPageChange`      | function | `() => {}`  | Callback executed when page changes |

## 🎨 Styling

The plugin uses CSS variables for active and hover colors:

```css
.pagination-container {
  --pagination-active-bg: #007bff;
  --pagination-active-color: #ffffff;
  --pagination-hover-bg: #e0e0e0;
  --pagination-hover-color: #000000;
}
```

You can override them via JavaScript options or by redefining the CSS variables.

## 📄 License

MIT License
