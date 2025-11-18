# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 📚 Table of Contents

### Quick Start
- [Development Commands](#development-commands)
- [Project Architecture](#project-architecture)

### Coding Standards
- [HTML Best Practices & Standards](#html-best-practices--standards)
- [HTML & CSS Naming Conventions](#html--css-naming-conventions)
- [JavaScript Conventions](#javascript-conventions)
- [CSS/SCSS Workflow](#cssscss-workflow)

### UI Components & Patterns
- [Common UI Component Guide](#common-ui-component-guide)
- [Self Opening Module Patterns](#self-opening-module-patterns)

### Design Implementation
- [Figma to Code Workflow](#figma-to-code-workflow)

### Git & Deployment
- [Branch & Commit Conventions](#branch--commit-conventions)

### Reference
- [Quick Reference](#quick-reference)
- [File Structure](#file-structure)
- [Key Dependencies](#key-dependencies)
- [Browser Support](#browser-support)

---

## Development Commands

### SCSS/CSS Compilation
- `npm run sass` - One-time SCSS compilation (compiles both customer and admin)
- `npm run sass:watch` - Watch mode for customer SCSS (auto-compiles on changes)
- `npm run sass:watch-bo` - Watch mode for admin SCSS
- `npm run postcss` - Process compiled CSS (autoprefixer, cssnano optimization)
- `npm run build` - Run sass + postcss sequentially

### Node.js Requirements
- Windows: Node.js 20.18.2 (verified)
- macOS: Node.js 23.7.0 via brew (verified)

## Project Architecture

### Dual-Portal Structure
This is a KT MVNO (알뜰폰) service with two main portals:

**Customer Portal** (`dist/customer/`)
- 323 HTML pages across modules: home, product, usim, myThrifty, event, customerSupport, etc.
- Customer-facing KT budget mobile service

**Admin Portal** (`dist/admin/`)
- 301 HTML pages split into:
  - `adminBusiness/` - Business admin (BO) for partner management
  - `adminSuper/` - Super admin for system-wide management

### Coding List System
Root `index.html` serves as a coding list/page inventory system for development tracking:
- Data files in `codingList/data/` maintain page inventories
- `[E]` tag = synchronized pages (highlighted blue)
- `[A]` tag = newly added pages (highlighted orange)

## CSS/SCSS Workflow

### SCSS Structure
- Customer: `dist/customer/assets/scss/style_new.scss` (5111 lines)
  - `_variables.scss` - CSS variables
  - `_mixin.scss` - SCSS mixins
- Admin: `dist/admin/assets/scss/style_new.scss`

### Internal/External Network Sync
**Critical**: This project operates across internal (내부망) and external (외부망) networks with different workflows:

1. **SCSS files are external-only** - Not committed to internal network
2. **CSS synchronization process (Customer & Admin)**:

   **Customer Portal** (`dist/customer/assets/css/`):
   - Develop in `style_new.scss` (external network)
   - Compile to `style_new.css`
   - Run `npm run postcss` to clean/optimize
   - Copy new CSS content to bottom of `style.css`
   - Use CSS-style comments (not SCSS comments)
   - Commit only `style.css` with appended content

   **Admin Portal** (`dist/admin/assets/css/`):
   - Develop in `style_new.scss` (external network)
   - Compile to `style_new.css`
   - Run `npm run postcss` to clean/optimize
   - **Copy new CSS content to bottom of `style.css`**
   - Use CSS-style comments (not SCSS comments)
   - Commit only `style.css` with appended content
   - **IMPORTANT**: Admin follows the SAME sync process as Customer

3. **style.css structure (Both portals)**:
   - Imports `style_new.css` at top
   - New styles manually appended at bottom for internal network sync

### Before Committing CSS
**Always run `npm run postcss` to clean CSS files, then verify comments before committing.**

**Important**: When updating styles in either Customer or Admin portal:
1. Modify `style_new.scss` (external network only)
2. Run `npm run build` to compile and optimize
3. **Manually copy new content from `style_new.css` to bottom of `style.css`**
4. Ensure CSS-style comments are used (not SCSS `//` comments)
5. Commit only the updated `style.css` file

## Branch & Commit Conventions

### Branch Naming
Create feature branches from `develop` using JIRA SR numbering:
```
feature/KMVNO-[number]_[DR-YYYY-#####]
```
Example: `feature/KMVNO-5739_DR-2025-00000`

### Commit Messages
Format: `[KMVNO-####]_[DR-YYYY-#####] [brief description]`

### Comment Format (HTML/CSS/JS)
All code comments follow this structure:
```html
<!-- YYYY-MM-DD KMVNO-#### [DR-YYYY-######] --> start point
<!-- //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] --> end point
```

### Workflow
1. Branch from `develop` with SR ticket number
2. Work on feature
3. After deployment, merge feature to `develop`
4. Designated maintainer syncs `develop` ↔ `main`

## File Structure

```
dist/
├── customer/               # Customer portal (323 pages)
│   ├── assets/
│   │   ├── css/           # Compiled CSS (style.css, style_new.css)
│   │   ├── scss/          # SCSS source (external network only)
│   │   ├── js/            # JavaScript (jQuery, Swiper, Chart.js, etc.)
│   │   ├── images/
│   │   └── fonts/
│   └── html/
│       ├── home/          # Main pages
│       ├── product/       # Product catalog
│       ├── usim/          # USIM management
│       ├── myThrifty/     # User account area
│       ├── event/         # Events & promotions
│       └── [other modules]
│
└── admin/                 # Admin portal (301 pages)
    ├── adminBusiness/     # Business partner admin
    │   ├── home/
    │   ├── account/
    │   ├── admission/
    │   └── [other modules]
    └── adminSuper/        # Super admin
        ├── home/
        ├── serviceManagement/
        ├── superAdmission/
        └── [other modules]

codingList/                # Development page inventory system
├── codingList.js
├── codingList.css
└── data/
    ├── data_customer.js
    ├── data_adminBusiness.js
    └── data_adminSuper.js
```

## Key Dependencies

- **sass** - SCSS compilation
- **postcss** + autoprefixer + cssnano - CSS processing
- **jQuery 3.6.0** - DOM manipulation
- **Swiper** - Carousels/sliders
- **Chart.js 2.9.4** - Data visualization
- **Bootstrap Datepicker** - Date selection

## Browser Support
Configured for last 2 versions + IE > 9 (see browserslist in package.json)

## HTML Best Practices & Standards

### Semantic Markup & Web Standards
All HTML must adhere to web standards and best practices:

**Semantic HTML5 Elements:**
- Use appropriate semantic tags: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Use `<button>` for actions, `<a>` for navigation
- Use `<ul>`/`<ol>` for lists, `<dl>` for definition lists
- Avoid non-semantic `<div>` and `<span>` when semantic alternatives exist

**Web Accessibility (WCAG 2.1 AA):**
- Provide `alt` attributes for all images (use `alt=""` for decorative images)
- Use ARIA labels when necessary: `aria-label`, `aria-labelledby`, `aria-describedby`
- Ensure proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`, no skipping)
- Add `aria-hidden="true"` to decorative elements
- Use `role` attributes when semantic HTML is insufficient
- Ensure keyboard navigation: `tabindex`, focus states
- Provide screen reader text using `.sr_only` class for icon-only buttons

**Cross-Browser Compatibility:**
- Test on IE 11+, Edge, Chrome, Firefox, Safari (last 2 versions)
- Use vendor prefixes where necessary (autoprefixer handles this)
- Avoid modern CSS/JS features not supported in target browsers
- Use polyfills when necessary for older browsers

**Performance Optimization:**
- Lazy load images below the fold: `loading="lazy"`
- Use appropriate image formats (SVG for icons, WebP with fallbacks)
- Minimize DOM depth (avoid excessive nesting)
- Use semantic HTML to reduce markup bloat

**SEO Best Practices:**
- Use proper heading hierarchy for content structure
- Include descriptive `<title>` tags
- Add `<meta name="description">` for page descriptions
- Use semantic markup to improve search engine understanding

### Accessibility Utilities

**Screen Reader Only Text:**
```scss
// In _common_ui.scss
.sr_only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Focus Visible (Keyboard Navigation):**
```scss
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #657DF4;
  outline-offset: 2px;
}
```

### Optimized HTML Structure Example

**✅ CORRECT - Semantic, Accessible, Optimized:**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="KT 마이알뜰폰 요금제 안내 페이지">
  <title>요금제 안내 | 마이알뜰폰 | KT 마이알뜰폰</title>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../../assets/default/font.css">
  <link rel="stylesheet" href="../../assets/default/reset.css">
  <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
  <!-- Skip Navigation for Accessibility -->
  <nav class="skip" aria-label="바로가기 메뉴">
    <a href="#main_content">본문 바로가기</a>
    <a href="#gnb">주메뉴 바로 가기</a>
    <a href="#footer">푸터 바로가기</a>
  </nav>

  <div class="wrap product_page">
    <!-- Header (loaded dynamically) -->
    <header id="header" role="banner"></header>

    <!-- Main Content -->
    <main id="main_content" role="main">
      <!-- Page Title Section -->
      <section class="page_title_section">
        <div data-module="container_inner">
          <div data-module="content_title" class="text_center">
            <h1>요금제 선택</h1>
            <p>고객님께 딱 맞는 요금제를 찾아보세요</p>
          </div>
        </div>
      </section>

      <!-- Product List Section -->
      <section class="product_list_section" aria-labelledby="product_heading">
        <div data-module="container_inner">
          <h2 id="product_heading" data-module="section_title">
            추천 요금제
          </h2>

          <!-- Product Cards -->
          <article class="product_card" data-module="product_card">
            <div class="product_data">
              <!-- Logo Image with alt text -->
              <div class="logo_area">
                <img src="../../assets/images/logo.svg"
                     alt="KT 알뜰폰"
                     width="74"
                     height="30">
              </div>

              <!-- Product Title -->
              <h3 class="product_title">5G 프리미엄 플랜</h3>

              <!-- Product Information (Definition List) -->
              <dl class="product_info">
                <div class="icon_data">
                  <dt>데이터</dt>
                  <dd>100GB + 매일 3GB</dd>
                </div>
                <div class="icon_call">
                  <dt>음성통화</dt>
                  <dd>무제한</dd>
                </div>
                <div class="icon_sms">
                  <dt>문자메시지</dt>
                  <dd>기본 제공</dd>
                </div>
              </dl>
            </div>

            <!-- Product Actions -->
            <div class="product_bottom">
              <div class="price_box">
                <span class="discount_price">
                  월 <strong aria-label="32000원">32,000원</strong>
                </span>
              </div>
              <a href="/product/detail.html"
                 class="btn_view"
                 aria-label="5G 프리미엄 플랜 상세보기">
                자세히 보기
              </a>
            </div>
          </article>

          <!-- Form Section with Proper Labels -->
          <form action="/submit" method="post" class="inquiry_form">
            <fieldset>
              <legend class="sr_only">요금제 문의 양식</legend>

              <!-- Input with proper label association -->
              <div data-module="input_wrap">
                <label for="user_name" class="input_name">
                  이름 <span class="required" aria-label="필수항목">*</span>
                </label>
                <input type="text"
                       id="user_name"
                       name="user_name"
                       placeholder="이름을 입력하세요"
                       required
                       aria-required="true"
                       aria-describedby="name_help">
                <span id="name_help" class="input_help sr_only">
                  실명을 입력해주세요
                </span>
              </div>

              <!-- Dropdown with ARIA -->
              <div data-module="input_wrap">
                <label for="carrier_select" class="input_name">통신사 선택</label>
                <div class="dropdown_area">
                  <button type="button"
                          id="carrier_select"
                          class="dropdown_btn"
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          data-trigger="dropdown_toggle">
                    선택하세요
                  </button>
                  <ul class="dropdown_list"
                      role="listbox"
                      aria-labelledby="carrier_select"
                      data-target="dropdown_options">
                    <li role="option">
                      <button type="button">KT</button>
                    </li>
                    <li role="option">
                      <button type="button">SKT</button>
                    </li>
                    <li role="option">
                      <button type="button">LG U+</button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Checkbox with proper association -->
              <div data-scope="field_form" class="checkbox">
                <div class="input_box">
                  <input type="checkbox"
                         id="agree_terms"
                         name="agree_terms"
                         required
                         aria-required="true">
                  <label for="agree_terms">
                    <span class="icon_check" aria-hidden="true"></span>
                    <span>개인정보 수집 및 이용에 동의합니다</span>
                  </label>
                  <button type="button"
                          class="btn_agree"
                          aria-label="약관 내용 보기"
                          aria-expanded="false"
                          aria-controls="terms_content">
                    <span class="sr_only">약관 보기</span>
                  </button>
                </div>

                <!-- Accordion Content -->
                <div id="terms_content"
                     data-module="agree_txt"
                     role="region"
                     aria-labelledby="agree_terms">
                  <div class="agree_txt_area">
                    <p>개인정보 수집 및 이용 동의 내용...</p>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div data-module="btn_wrap">
                <button type="submit" class="btn_primary">
                  문의하기
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </section>

      <!-- Image with lazy loading -->
      <section class="banner_section">
        <img src="../../assets/images/banner.jpg"
             alt="KT 알뜰폰 프로모션 - 최대 30% 할인"
             loading="lazy"
             width="1024"
             height="400">
      </section>
    </main>

    <!-- Footer (loaded dynamically) -->
    <footer id="footer" role="contentinfo"></footer>
  </div>

  <!-- Scripts at bottom for performance -->
  <script src="../../assets/js/jquery-3.6.0.min.js"></script>
  <script src="../../assets/js/common-ui.js"></script>
  <script>
    $(document).ready(function() {
      // Load header/footer
      $('#header').load('../../common/header.html');
      $('#footer').load('../../common/footer.html');

      // Page-specific code
      initPageComponents();
    });

    function initPageComponents() {
      // Enhance dropdown accessibility
      $('[aria-haspopup="listbox"]').on('click', function() {
        var expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded);
      });
    }
  </script>
</body>
</html>
```

**❌ INCORRECT - Poor semantics, no accessibility:**
```html
<!-- Don't do this -->
<div class="header">
  <div class="title">Title</div>
</div>
<div class="content">
  <div class="card" onclick="location.href='link.html'"> <!-- Bad: div as button -->
    <img src="icon.png"> <!-- Missing alt -->
    <div class="title">Product</div> <!-- Should be heading -->
    <div class="price">10,000원</div>
    <div class="button">보기</div> <!-- Should be <button> or <a> -->
  </div>
  <div class="form">
    <div>이름</div> <!-- No <label> -->
    <input> <!-- No id, aria, or association -->
    <input type="checkbox"> <!-- No label -->
  </div>
</div>
```

### Key Accessibility Checklist

Before completing any HTML page, verify:
- ✅ All images have `alt` attributes
- ✅ Form inputs have associated `<label>` elements
- ✅ Proper heading hierarchy (no skipped levels)
- ✅ Interactive elements are keyboard accessible
- ✅ ARIA attributes used where necessary
- ✅ Color contrast meets WCAG 2.1 AA standards (4.5:1 for text)
- ✅ Focus states visible for keyboard navigation
- ✅ Screen reader text provided for icon-only buttons
- ✅ Semantic HTML used throughout
- ✅ Skip navigation links present

## HTML & CSS Naming Conventions

### Class Naming Rules
**IMPORTANT**: All HTML class names must follow these strict rules:
- ✅ **Use underscores (`_`)** to separate words: `member_info`, `promo_banner`, `icon_wrap`
- ❌ **DO NOT use camelCase**: `memberInfo`, `promoBanner` (FORBIDDEN)
- ❌ **DO NOT use hyphens/kebab-case**: `member-info`, `promo-banner` (FORBIDDEN)

### ID Usage
- **Avoid using IDs whenever possible**
- Use classes for styling and JavaScript selection
- IDs are only acceptable for:
  - Skip navigation targets (accessibility requirement)
  - Unique landmark elements required for accessibility
  - Legacy dynamic loading (header/footer are already handled by existing JS)

### Examples

**✅ CORRECT:**
```html
<div class="wrap my_thrifty_page">
  <div class="member_info_card">
    <div class="badge_group">
      <span class="badge_primary">우수회원</span>
    </div>
    <div class="button_wrap">
      <button class="btn_primary">확인</button>
    </div>
  </div>
  <div class="promo_banner_area">
    <div class="data_usage_chart"></div>
  </div>
</div>
```

**❌ INCORRECT:**
```html
<!-- DO NOT use camelCase -->
<div class="wrap myThriftyPage">
  <div class="memberInfoCard">
    <div class="badgeGroup">
      <span id="badge1" class="badgePrimary">우수회원</span>
    </div>
  </div>
</div>

<!-- DO NOT use kebab-case -->
<div class="member-info-card">
  <div class="badge-group">
    <span class="badge-primary">우수회원</span>
  </div>
</div>
```

### File Naming
- **HTML files**: Use snake_case: `my_thrifty_type3.html`, `member_info.html`
- **SCSS/CSS**: Same naming convention with underscores
- **Images/Icons**: Use kebab-case for backward compatibility: `icon-data-phone.svg`

### SCSS Implementation
When writing SCSS, use the underscore naming convention:

```scss
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
.my_thrifty_page {
  background-color: #fff;

  .member_info_card {
    display: flex;
    padding: 2rem;

    .badge_group {
      display: flex;
      gap: 0.8rem;
    }
  }

  .button_wrap {
    margin-top: 1.6rem;

    .btn_primary {
      width: 100%;
      padding: 1.2rem;
    }
  }
}
/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

## JavaScript Conventions

### Data Attribute System
This project uses **data attributes** for managing common UI components and interactions. This approach ensures:
- Clear separation between styling (classes) and behavior (data attributes)
- Reusable components across the codebase
- Easy initialization and management in JavaScript

**Data Attribute Naming:**
- Use kebab-case: `data-module="button_wrap"` ❌ → `data-module="btn_wrap"` ✅
- Use semantic, descriptive names that match their purpose
- Common prefixes:
  - `data-module`: Reusable UI components (buttons, inputs, popups, etc.)
  - `data-scope`: Container/wrapper elements (sections, layouts)
  - `data-trigger`: Interactive elements that trigger actions
  - `data-target`: Elements that are targets of actions

### Common JavaScript File
All shared/reusable JavaScript functions should be added to `common-ui.js`:
- **Location**: `dist/customer/assets/js/common-ui.js`
- **Purpose**: Central repository for common UI interactions and utilities
- **Pattern**: Use traditional function declarations (not arrow functions or modern ES6 class syntax)
- **Data Attribute Based**: Initialize components using data attributes for easy management

### Function Naming & Structure
Follow the existing `user.js` pattern with traditional function declarations:

```javascript
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */

// Function declaration style
function functionName(param1, param2) {
  // Function body
  var result = param1 + param2;
  return result;
}

// jQuery wrapper for DOM-ready code
jQuery(function($) {
  // DOM manipulation code
  $('.selector').on('click', function() {
    // Event handler
  });
});

/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

### JavaScript Best Practices
1. **Use `var` for variable declarations** (not `let` or `const` for IE compatibility)
2. **Use traditional functions** (`function name() {}` instead of `() => {}`)
3. **jQuery-first approach**: Wrap DOM code in `jQuery(function($) { ... })`
4. **Comment format**: Same as HTML/CSS (with ticket number and date)
5. **File inclusion**: Add to HTML files as needed:
   ```html
   <script src="../../assets/js/common-ui.js"></script>
   ```

### Common UI Components with Data Attributes

Refer to `_common_ui.scss` for the complete list of available data-attribute components. Key examples:

**Layout Components:**
- `[data-module="container_inner"]` - Content container (max-width: 1024px)
- `[data-module="content_title"]` - Page title and description
- `[data-module="content_box"]` - Content boxes with variants

**Form Components:**
- `[data-module="input_wrap"]` - Input fields (text, radio, dropdown)
- `[data-module="input_list"]` - Form field groups
- `[data-scope="field_form"]` - Checkbox groups with accordion

**Button Components:**
- `[data-module="btn_wrap"]` - Button container with variants
- `[data-module="btn_linked"]` - Link-style buttons
- `[data-module="under_line_linked"]` - Underlined link buttons

**Popup Components:**
- `[data-module="popup"]` - Standard popup (max-width: 500px)
- `[data-module="popup_large"]` - Large popup (max-width: 780px)
- `[data-module="popup_container_scroll"]` - Scrollable popup content

**Product Components:**
- `[data-module="product_card"]` - Product card UI
- `[data-scope="product_view_wrap"]` - Product list view

### Example Functions in common-ui.js

```javascript
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */

// Initialize dropdown using data attributes
function initDropdowns() {
  jQuery(function($) {
    $('[data-module="input_wrap"] .dropdown_area').each(function() {
      var $dropdown = $(this);
      var $btn = $dropdown.find('.dropdown_btn');
      var $list = $dropdown.find('.dropdown_list');

      $btn.on('click', function() {
        $dropdown.toggleClass('active');

        // Close other dropdowns
        $('[data-module="input_wrap"] .dropdown_area').not($dropdown).removeClass('active');
      });

      $list.find('button').on('click', function() {
        var selectedText = $(this).text();
        $btn.text(selectedText).css('color', '#000');
        $dropdown.removeClass('active');
      });
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('[data-module="input_wrap"] .dropdown_area').length) {
        $('[data-module="input_wrap"] .dropdown_area').removeClass('active');
      }
    });
  });
}

// Initialize accordion using data attributes
function initAccordions() {
  jQuery(function($) {
    $('[data-module="input_accordion"]').each(function() {
      var $accordion = $(this);
      var $trigger = $accordion.find('.btn_agree');

      $trigger.on('click', function() {
        $accordion.toggleClass('active');
      });
    });
  });
}

// Initialize popup close buttons
function initPopupClose() {
  jQuery(function($) {
    $('[data-module="popup"] .btn_close, [data-module="popup_large"] .btn_close').on('click', function() {
      $(this).closest('[data-module="popup"], [data-module="popup_large"]').fadeOut();
    });
  });
}

// Format phone number utility
function formatPhoneNumber(phoneNumber) {
  var cleaned = phoneNumber.replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return phoneNumber;
}

// Initialize all common UI components
function initCommonUI() {
  initDropdowns();
  initAccordions();
  initPopupClose();
}

// Auto-initialize on page load
jQuery(document).ready(function() {
  initCommonUI();
});

/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

### Page-Specific JavaScript
For page-specific code, add directly to the HTML file's `<script>` tag:

```html
<script>
  $(document).ready(function() {
    $('#header').load('../../common/header.html');
    $('#footer').load('../../common/footer.html');

    // Page-specific code using data attributes
    $('[data-trigger="custom_action"]').on('click', function() {
      var $target = $('[data-target="result_area"]');
      $target.fadeIn();
    });
  });
</script>
```

### HTML Structure with Data Attributes

When creating new components, follow this pattern:

```html
<!-- Container with data-scope -->
<div data-scope="input_set">
  <!-- Component with data-module -->
  <div data-module="input_wrap">
    <label class="input_name">이름</label>
    <input type="text" placeholder="이름을 입력하세요">
  </div>

  <!-- Dropdown component -->
  <div data-module="input_wrap">
    <label class="input_name">통신사 선택</label>
    <div class="dropdown_area">
      <button class="dropdown_btn" data-trigger="dropdown_toggle">선택하세요</button>
      <div class="dropdown_list" data-target="dropdown_options">
        <button>KT</button>
        <button>SKT</button>
        <button>LG U+</button>
      </div>
    </div>
  </div>
</div>

<!-- Button group -->
<div data-module="btn_wrap">
  <button class="btn_grey">취소</button>
  <button class="btn_primary">확인</button>
</div>

<!-- Popup structure -->
<div data-module="popup">
  <div class="popup_container">
    <button class="btn_close"><span>닫기</span></button>

    <div data-module="popup_top">
      <h2 class="popup_title">팝업 제목</h2>
    </div>

    <div data-module="popup_middle">
      <p class="popup_mid_desc">팝업 내용</p>
    </div>

    <div data-module="popup_bottom">
      <div data-module="btn_wrap">
        <button>확인</button>
      </div>
    </div>
  </div>
</div>
```

### Creating New Common Components

When adding new reusable components:

1. **Add SCSS to `_common_ui.scss`:**
```scss
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
[data-module="new_component"] {
  // Component styles
  .component_inner {
    // Nested styles
  }

  &.variant_name {
    // Variant styles
  }
}
/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

2. **Add JavaScript to `common-ui.js`:**
```javascript
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
function initNewComponent() {
  jQuery(function($) {
    $('[data-module="new_component"]').each(function() {
      var $component = $(this);
      // Component initialization logic
    });
  });
}

// Add to initCommonUI function
function initCommonUI() {
  initDropdowns();
  initAccordions();
  initPopupClose();
  initNewComponent(); // Add here
}
/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

3. **Update CLAUDE.md** with new component documentation

## Self Opening Module Patterns

### Overview
The self-opening (셀프개통) module is a multi-step application flow for USIM/eSIM activation. It serves as the base template for progressive enhancement and future development.

### File Structure
```
dist/customer/html/usim/
├── selfOpeningMain.html          # Landing page with visual banner
├── selfOpeningApply01.html        # Step 1: Join type selection
├── selfOpeningApply02.html        # Step 2: Product selection
├── selfOpeningApply03.html        # Step 3: User verification
├── selfOpeningApply04.html        # Step 4: Payment info
├── selfOpeningApply05.html        # Step 5: Agreement
├── selfOpeningApply06.html        # Step 6: Completion
└── selfOpeningApply_popup_filter.html  # Filter popup
```

### Common Patterns from Self Opening Module

#### 1. Page Structure Template
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NZ4CRZ8');
  </script>

  <!-- Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta http-equiv="Expires" content="-1">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Cache-Control" content="no-cache">

  <!-- SEO Meta Tags -->
  <meta name="Keywords" content="kt, 케이티, ktmyr.com, 마이알뜰폰, 알뜰폰, 알뜰폰 가입">
  <meta name="Description" content="[kt] 마이알뜰폰 메인입니다. 알뜰폰 상품 정보 확인부터 가입, 개통, 변경까지 한번에 가능한 KT 알뜰폰 전용 서비스입니다.">

  <!-- Open Graph -->
  <meta property="og:title" content="페이지 제목 | 섹션 | KT 마이알뜰폰">
  <meta property="og:description" content="페이지 설명">
  <meta property="og:type" content="website">
  <meta property="og:image" content="../../assets/images/common/myr_ci.png">
  <meta property="og:image:width" content="400">
  <meta property="og:image:height" content="210">

  <title>페이지 제목 | 섹션 | KT 마이알뜰폰</title>

  <!-- Favicon -->
  <link rel="shortcut icon" href="../../assets/images/favicon.ico">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../../assets/default/font.css">
  <link rel="stylesheet" href="../../assets/default/reset.css">
  <link rel="stylesheet" href="../../assets/default/swiper.min.css">
  <link rel="stylesheet" href="../../assets/css/style.css">

  <!-- Scripts -->
  <script src="../../assets/js/jquery-3.6.0.min.js"></script>
  <script src="../../assets/js/bootstrap-datepicker.js"></script>
  <script src="../../assets/js/locales/bootstrap-datepicker.ko.js"></script>
  <script src="../../assets/js/swiper.min.js"></script>
  <script src="../../assets/js/masonry.pkgd.min.js"></script>
  <script src="../../assets/js/bundle.js"></script>
  <script src="../../assets/js/common-ui.js"></script>
</head>
<body>
  <!-- GTM noscript -->
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZ4CRZ8"
            height="0" width="0"
            style="display:none;visibility:hidden"></iframe>
  </noscript>

  <!-- Skip Navigation -->
  <div class="skip">
    <a href="#contentContainer">본문 바로가기</a>
    <a href="#gnbContainer" class="pcType">주메뉴 바로 가기</a>
    <a href="#footerMenu">푸터 바로가기</a>
  </div>

  <!-- Page Content -->
  <div class="wrap page_specific_class">
    <div id="header"></div>

    <main class="contentContainer" id="contentContainer">
      <!-- Page content here -->
    </main>

    <div id="footer"></div>
  </div>

  <script>
    $(document).ready(function() {
      $('#header').load('../../common/header.html');
      $('#footer').load('../../common/footer.html');
    });
  </script>
</body>
</html>
```

#### 2. Page Title Container (Breadcrumb Navigation)
```html
<div class="pageTitleContainer">
  <div class="pageTitleContent">
    <div class="titleAreaLeft">
      <div class="title">
        <button type="button"
                class="titleArrow"
                title="이전 페이지로 이동"
                aria-label="이전 페이지로 이동"></button>
        <h2>페이지 제목</h2>
      </div>
    </div>

    <div class="titleAreaRight">
      <nav class="breadcrumbContainer" aria-label="현재 위치">
        <span class="breadcrumb iconBgHome">
          <span class="ir">홈</span>
        </span>

        <!-- Level 1 Breadcrumb -->
        <div class="breadcrumb">
          <span class="breadcrumbTitle"><span>유심/eSIM</span></span>
          <div class="breadcrumbDrop">
            <button type="button"
                    class="breadcrumbBtn"
                    aria-expanded="false"
                    aria-label="대메뉴 목록 열기"></button>
            <ul class="breadcrumbDropList" aria-label="대메뉴">
              <li><a href="#">마이알뜰폰</a></li>
              <li><a href="#">상품</a></li>
              <li><a href="#">유심/eSIM</a></li>
              <li><a href="#">이벤트</a></li>
              <li><a href="#">고객지원</a></li>
            </ul>
          </div>
        </div>

        <!-- Level 2 Breadcrumb -->
        <div class="breadcrumb">
          <span class="breadcrumbTitle"><span>셀프개통(USIM/eSIM)</span></span>
        </div>
      </nav>
    </div>
  </div>
</div>
```

#### 3. Multi-Step Progress Indicator
```html
<nav class="apply_steps" aria-label="신청 단계">
  <ol class="steps">
    <li class="unit current" aria-current="step">
      <span class="message">현재 단계</span>
      <span class="step_num">가입 유형 선택</span>
    </li>
    <li class="unit_line" aria-hidden="true" role="presentation"></li>
    <li class="unit"><span class="step_num">2</span></li>
    <li class="unit_line" aria-hidden="true" role="presentation"></li>
    <li class="unit"><span class="step_num">3</span></li>
    <li class="unit_line" aria-hidden="true" role="presentation"></li>
    <li class="unit"><span class="step_num">4</span></li>
    <li class="unit_line" aria-hidden="true" role="presentation"></li>
    <li class="unit"><span class="step_num">5</span></li>
    <li class="unit_line" aria-hidden="true" role="presentation"></li>
    <li class="unit"><span class="step_num">6</span></li>
  </ol>
</nav>
```

#### 4. Content Area with Data Modules
```html
<div class="content_area usim_apply usim_apply_step01">
  <div data-module="container_inner">
    <div class="apply_inner">
      <!-- Content Title -->
      <h3 data-module="content_title">
        <strong>섹션 제목</strong>
        섹션 설명 텍스트
      </h3>

      <!-- Selection Boxes with Toggle -->
      <ul data-module="content_box"
          class="box_lined box_flex"
          data-fn="class_toggle"
          data-mode="radio">
        <li class="box_unit" data-trigger>
          <figure class="content_img">
            <img src="../../assets/images/usim/icon_newJoin.png"
                 alt="신규가입">
          </figure>
          <div class="box_txt">
            <strong data-module="box_name">신규가입</strong>
            <p data-module="box_desc">
              신규번호를 발급받아 가입을 <br>원하시나요?
            </p>
          </div>
        </li>
        <li class="box_unit" data-trigger>
          <figure class="content_img">
            <img src="../../assets/images/usim/icon_nummove.png"
                 alt="번호이동">
          </figure>
          <div class="box_txt">
            <strong data-module="box_name">번호이동</strong>
            <p data-module="box_desc">
              기존 쓰던 번호 그대로 가입을 <br>원하시나요?
            </p>
          </div>
        </li>
      </ul>

      <!-- Action Buttons -->
      <div data-module="btn_wrap">
        <button type="button">다음</button>
      </div>
    </div>
  </div>
</div>
```

#### 5. Fixed Bottom Panel (Product Summary)
```html
<div data-scope="fixed_bottom" data-fn="class_toggle">
  <div class="fixed_container">
    <!-- Toggle Button (Mobile) -->
    <button class="fixed_btn"
            data-trigger
            data-target=".fixed_container"
            aria-label="상품 정보 펼치기/접기">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
        <path d="M1.5 6L6.5 1L11.5 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Product Summary -->
    <div class="desc_area">
      <div class="left">
        <div class="img">
          <img src="../../assets/images/common/brand/brand_logo.png"
               alt="브랜드 로고">
        </div>
        <p class="title">상품명</p>
        <div class="desc">
          <span class="icon">부가서비스 정보</span>
        </div>
      </div>
      <div class="right">
        <p class="total_price">
          월 <span class="price_area">32,000원</span>
        </p>
        <p class="detail_price">
          <span class="main_price">기본요금 45,000원</span> - 할인 13,000원
        </p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div data-module="btn_wrap">
      <button type="button" class="btn_grey_white">이전</button>
      <button type="button">다음</button>
    </div>
  </div>
</div>
```

#### 6. Swiper Banner (Main Page)
```html
<section class="self_info">
  <div class="self_info_visual" data-module="container_inner">
    <div class="swiper top_banner_swiper">
      <ul class="swiper-wrapper" role="list">
        <li class="swiper-slide">
          <img src="../../assets/images/usim/img_mainBanner_01.png"
               alt=""
               aria-hidden="true"
               class="pcType">
          <img src="../../assets/images/usim/img_mainBanner_mo_01.png"
               alt=""
               aria-hidden="true"
               class="moType">
          <div class="slide_text slide_text_white">
            <h3>배너 제목 <br><span>강조 텍스트</span></h3>
            <p>배너 설명 텍스트</p>
          </div>
        </li>
      </ul>
      <div class="swiper-pagination" data-module="swiper_pagination"></div>
    </div>
  </div>
</section>
```

### Self Opening Module Best Practices

1. **Consistent Page Structure:**
   - Always use the same meta tags and GTM setup
   - Include skip navigation for accessibility
   - Use semantic HTML5 elements

2. **Data Attribute Usage:**
   - Use `data-module` for reusable UI components
   - Use `data-scope` for layout containers
   - Use `data-fn` for JavaScript behavior hooks
   - Use `data-trigger` and `data-target` for interactive elements

3. **Multi-Step Flow:**
   - Show progress indicator on all steps
   - Maintain consistent navigation patterns
   - Use fixed bottom panel for persistent product info

4. **Responsive Design:**
   - Provide both PC and mobile images with `.pcType` and `.moType` classes
   - Use data modules that handle responsive breakpoints
   - Test on mobile devices (viewport restrictions applied)

5. **Accessibility:**
   - Proper ARIA labels on all interactive elements
   - Screen reader text with `.ir` class
   - Keyboard navigation support
   - Proper heading hierarchy

6. **Performance:**
   - Load common scripts at the bottom
   - Use image lazy loading for below-the-fold content
   - Minimize DOM depth

## Common UI Component Guide

### Overview
The project maintains a comprehensive UI component guide at `dist/customer/html/pubGuide/common_guide.html`. This guide serves as a living document showing all reusable components with their markup structures and usage patterns.

**Purpose:**
- Reference for existing components before creating new ones
- Copy-paste ready code snippets
- Visual preview of all available components
- Consistent implementation across the project

### Design System Variables

#### Breakpoints
```scss
$breakpoint-1200: 1200px;      // Desktop baseline
$breakpoint-tablet: 1024px;    // Tablet
$breakpoint-max_mobile: 717px; // Mobile max
$breakpoint-fold: 690px;       // Foldable device
$breakpoint-min_mobile: 320px; // Mobile min
```

#### Guide Colors
```scss
// Primary
$guideColor-primary: #6B3BE9;
$guideColor-edge: #FD8553;
$guideColor-gradient: linear-gradient(92deg, #9F38FF 0%, #5C69F0 100%);

// Text Colors
$guideColor-textBasic: #000000;
$guideColor-textBody: #333333;
$guideColor-textLabel: #555555;
$guideColor-textInfo01: #888888;
$guideColor-textInfo02: #AAAAAA;

// Background Colors
$guideColor-boxBasic01: #F2F4F6;
$guideColor-boxBasic02: #E6E9EF;
$guideColor-boxBasic03: #F8F8FA;

// Main Colors
$mainColor-primary01: #07BFE0;
$mainColor-primary02: #6B3BE9;
$mainColor-primaryText01: #4553FF;
$mainColor-primaryText02: #8345FF;
```

### Component Catalog (from common_guide.html)

#### 1. Button Components

**[data-module="btn_wrap"]** - Button Group
```html
<div data-module="btn_wrap" aria-label="버튼 그룹">
  <button type="button" class="btn_grey">기본 버튼</button>
  <button type="button" class="btn_grey_white">회색/화이트</button>
  <button type="button" class="btn_white">화이트</button>
  <button type="button">활성 (Primary)</button>
  <button type="button" class="disabled" aria-disabled="true">비활성</button>
</div>

<!-- Vertical Layout -->
<div data-module="btn_wrap" class="flex_direction_column">
  <button type="button">세로 버튼 A</button>
  <button type="button">세로 버튼 B</button>
</div>
```

**[data-module="btn_linked"]** - Link Button
```html
<a href="#" data-module="btn_linked">전체보기</a>
```

#### 2. Input Components

**[data-module="input_list"]** - Input Group
```html
<div data-module="input_list" class="list_flex" role="group">
  <strong class="input_name" id="inputLabel">입력 항목명</strong>
  <div data-scope="input_set">
    <!-- Radio Buttons -->
    <div data-module="input_wrap">
      <input type="radio" name="option" id="opt1" checked>
      <label for="opt1" class="radioLabel">옵션 1</label>
    </div>
    <div data-module="input_wrap">
      <input type="radio" name="option" id="opt2">
      <label for="opt2" class="radioLabel">옵션 2</label>
    </div>
  </div>
  <p data-module="input_alert">안내 메시지</p>
</div>

<!-- Text Input -->
<div data-module="input_list">
  <div data-module="input_wrap">
    <label class="input_name" for="userName">이름</label>
    <input type="text"
           id="userName"
           name="userName"
           placeholder="이름을 입력하세요"
           aria-label="이름 입력"
           required>
  </div>
</div>

<!-- Dropdown -->
<div data-module="input_wrap">
  <label for="carrier" class="input_name">통신사 선택</label>
  <div class="dropdown_area" data-fn="dropdown">
    <button type="button"
            id="carrier"
            class="dropdown_btn"
            data-trigger
            aria-expanded="false"
            aria-haspopup="listbox">
      통신사 선택
    </button>
    <ul class="dropdown_list" role="listbox" hidden>
      <li><button role="option" data-value="ktm">KT M모바일</button></li>
      <li><button role="option" data-value="kct">KCT</button></li>
      <li><button role="option" data-value="lg">U+</button></li>
    </ul>
  </div>
  <p data-module="input_alert" aria-live="polite"></p>
</div>
```

#### 3. Product Card Components

**[data-module="product_card_inner"]** - Product Card Container
```html
<div data-module="product_card_inner">
  <div class="filter_product_flag">요금제 추천</div>
  <ul class="product_card_list" role="list">
    <li data-module="product_card" class="completed" role="listitem">
      <div class="product_data">
        <div class="img">
          <img src="../../assets/images/common/brand/brand_logo.png"
               alt="브랜드 로고">
        </div>
        <h3 class="product_title">5G 모두다 맘껏 200GB+</h3>
        <div class="product_info" aria-label="제공 내용">
          <dl class="icon_data">
            <dt>데이터</dt>
            <dd>200GB + 일 5GB</dd>
          </dl>
          <dl class="icon_call">
            <dt>통화</dt>
            <dd>무제한</dd>
          </dl>
          <dl class="icon_sms">
            <dt>문자</dt>
            <dd>무제한</dd>
          </dl>
        </div>
      </div>
      <div class="product_bottom">
        <div class="price_box">
          <span class="base_price">월 55,000원</span>
          <span class="discount_price">월 <strong>43,000</strong>원</span>
        </div>
        <a href="#" aria-label="요금제 상세 보기">자세히</a>
      </div>
    </li>
  </ul>
</div>
```

**[data-scope="product_view_wrap"]** - Product List View
```html
<ul data-scope="product_view_wrap" class="view_list">
  <li class="view_box">
    <div class="view_info" data-trigger>
      <div class="img">
        <img src="../../assets/images/common/brand/brand_logo.png" alt="브랜드">
      </div>
      <div class="info_title">
        <strong>5G 모두다 맘껏 200GB+</strong>
      </div>
      <div class="info_box">
        <dl class="data">
          <dt class="icon_data">데이터</dt>
          <dd>15GB + 일 3GB</dd>
        </dl>
        <dl class="call">
          <dt class="icon_call">음성통화</dt>
          <dd>무제한</dd>
        </dl>
        <dl class="sms">
          <dt class="icon_sms">메시지</dt>
          <dd>무제한</dd>
        </dl>
      </div>
      <div class="info_price">
        <p><span class="price">월 <strong>50,400원</strong></span></p>
      </div>
    </div>

    <!-- Benefits Accordion -->
    <div class="info_benefit" data-fn="accordion" data-acc="single">
      <button class="benefit_summary" data-acc-trigger>
        <span class="icon logo_naverpay" role="img" aria-label="네이버페이"></span>
        제휴 혜택 최대 3개
      </button>
      <ul class="benefit_panel" data-acc-panel>
        <li>
          <span class="icon logo_naverpay" aria-hidden="true"></span>
          네이버페이 5000P 제공!
        </li>
      </ul>
    </div>
  </li>
</ul>
```

**[data-module="product_swiper"]** - Product Swiper Carousel
```html
<div data-scope="components">
  <ul data-module="product_swiper" class="swiper-wrapper" role="list">
    <li class="swiper-slide product_card">
      <div class="data_group">
        <div class="img">
          <img src="../../assets/images/logo.svg" alt="브랜드 로고">
        </div>
        <p class="card_title">모두 충분 15GB+</p>
        <div class="card_info">
          <dl class="icon_data">
            <dt>데이터</dt>
            <dd>15GB + 최대 10Mbps</dd>
          </dl>
          <dl class="icon_call">
            <dt>음성통화</dt>
            <dd>무제한</dd>
          </dl>
          <dl class="icon_sms">
            <dt>메시지</dt>
            <dd>무제한</dd>
          </dl>
        </div>
        <ul class="card_event">
          <li class="event_naverpay">
            <span class="icon" role="img" aria-label="네이버페이 로고"></span>
            네이버페이 5000P 제공!
          </li>
        </ul>
        <div class="card_price">
          <del class="base_price">월 44,000원</del>
          <p class="discounte_price">
            월<strong class="price">1,900원</strong>
          </p>
        </div>
      </div>
      <div class="card_btn_box">
        <a class="btn_view" href="#">상세보기</a>
        <a class="btn_join" href="#">가입하기</a>
      </div>
    </li>
  </ul>
  <div data-module="swiper_pagination"
       class="product_swiper_pagination"></div>
</div>
```

#### 4. List Components

**[data-module="list_dotted"]** - Bullet List
```html
<ul data-module="list_dotted">
  <li>셀프개통에 문제가 있는 경우 고객센터를 통해 개통할 수 있습니다.</li>
  <li class="color_red">중요한 안내사항은 빨간색으로 표시됩니다.</li>
  <li>링크가 포함된 항목
    <a href="#">
      <em class="color_primary" data-module="under_line_linked">
        자세히 보기
      </em>
    </a>
  </li>
</ul>

<!-- With Background -->
<ul data-module="list_dotted" class="list_bg">
  <li>배경이 있는 리스트 항목</li>
</ul>
```

#### 5. Data Behavior Functions (data-fn)

**[data-fn="scroll_nav"]** - Scroll Navigation Tabs
```html
<ol class="step_list" data-fn="scroll_nav">
  <li data-trigger="tab"><span class="step">01</span></li>
  <li data-trigger="tab"><span class="step">02</span></li>
  <li data-trigger="tab"><span class="step">03</span></li>
</ol>
```

**[data-fn="accordion"]** - Accordion Component
```html
<ul data-fn="accordion" data-acc="single">
  <li data-acc-item>
    <button type="button" data-acc-trigger>질문 제목</button>
    <div data-acc-panel>
      <p>답변 내용</p>
    </div>
  </li>
</ul>

<!-- Multiple open: data-acc="multiple" -->
```

**[data-fn="dropdown"]** - Dropdown Component
```html
<div data-fn="dropdown"
     data-duration="100"
     data-close-others="true">
  <button type="button" data-trigger>드롭다운 버튼</button>
  <div role="listbox" data-panel>
    <button role="option" data-value="value1">옵션 1</button>
    <button role="option" data-value="value2">옵션 2</button>
  </div>
</div>
```

**[data-fn="class_toggle"]** - Class Toggle
```html
<!-- Single Mode (default) -->
<div data-fn="class_toggle">
  <button type="button" data-trigger>토글 버튼</button>
</div>

<!-- Multiple Mode -->
<ul data-fn="class_toggle" data-mode="multiple">
  <li data-trigger>항목 1</li>
  <li data-trigger>항목 2</li>
</ul>

<!-- With Target Selector -->
<div data-fn="class_toggle">
  <button data-trigger data-target=".target_element">버튼</button>
</div>
<div class="target_element">대상 요소</div>
```

**[data-fn="tab_switch"]** - Tab Switching
```html
<div data-fn="tab_switch">
  <!-- Tab Triggers -->
  <div data-scope="input_set" class="tab_wrap">
    <div data-trigger="tab1">
      <input type="radio" name="tab" id="tab1" checked>
      <label for="tab1">탭 1</label>
    </div>
    <div data-trigger="tab2">
      <input type="radio" name="tab" id="tab2">
      <label for="tab2">탭 2</label>
    </div>
  </div>

  <!-- Tab Panels -->
  <div data-tab-panel="tab1">탭 1 내용</div>
  <div data-tab-panel="tab2">탭 2 내용</div>
</div>
```

**[data-fn="id_masking"]** - ID Number Masking
```html
<input type="text"
       data-fn="id_masking"
       placeholder="주민등록번호 13자리"
       inputmode="numeric"
       data-maxlength="13"
       autocomplete="off">
<!-- Automatically masks last 7 digits after 13 characters -->
```

**[data-fn="numeric_input"]** - Numeric Input with Formatting
```html
<!-- Phone Number with Hyphens -->
<input type="tel"
       data-fn="numeric_input"
       inputmode="numeric"
       placeholder="휴대폰 번호"
       data-maxlength="11"
       data-hyphen="3,4,4">
<!-- Formats as: 010-1234-5678 -->

<!-- Date Input -->
<input type="text"
       data-fn="numeric_input"
       inputmode="numeric"
       data-maxlength="8"
       placeholder="YYYYMMDD">
```

### Using Common Components in Figma Implementation

**Workflow:**
1. **Check common_guide.html first** - Before creating new components
2. **Analyze Figma design** - Identify which existing components match
3. **Reuse existing patterns** - Copy markup from common_guide.html
4. **Extend if needed** - Add page-specific variations using the same structure
5. **Document new patterns** - Update common_guide.html if creating truly new components

**Example Integration:**
```html
<!-- From Figma: Product selection step -->
<div class="content_area step_02">
  <div data-module="container_inner">
    <!-- Use existing component: content_title -->
    <h3 data-module="content_title">
      <strong>요금제 선택</strong>
      원하시는 요금제를 선택해 주세요
    </h3>

    <!-- Use existing component: product_card_inner -->
    <div data-module="product_card_inner">
      <ul class="product_card_list" role="list">
        <li data-module="product_card">
          <!-- Existing product card structure -->
        </li>
      </ul>
    </div>

    <!-- Use existing component: btn_wrap -->
    <div data-module="btn_wrap">
      <button type="button" class="btn_grey_white">이전</button>
      <button type="button">다음</button>
    </div>
  </div>
</div>
```

### Benefits of Using Common Components

1. **Consistency** - Same look and behavior across all pages
2. **Maintenance** - Update once, applies everywhere
3. **Accessibility** - Pre-tested ARIA patterns
4. **Performance** - Shared CSS reduces file size
5. **Development Speed** - Copy-paste ready code
6. **Quality** - Battle-tested components

## Figma to Code Workflow

### Overview
This project uses Figma MCP (Model Context Protocol) for design implementation. The process ensures pixel-perfect accuracy through iterative verification with Playwright.

### Required Tools
- **Figma Dev Mode MCP**: Extract design specifications, code, and screenshots
- **Playwright MCP**: Visual verification and screenshot comparison
- **Context7 MCP**: Web standards and accessibility validation (optional)

### Step-by-Step Process

#### 1. Design Analysis
```bash
# Extract Figma design using MCP
mcp__figma-dev-mode-mcp-server__get_code
  - nodeId: Extract from Figma URL (e.g., 13539:37045 from node-id=13539-37045)
  - clientLanguages: "html,css,javascript"
  - clientFrameworks: "jquery"

mcp__figma-dev-mode-mcp-server__get_screenshot
  - Get reference screenshot for comparison
```

**Important**: Always analyze the Figma design in detail before coding:
- Layout structure (containers, cards, sections)
- Color specifications (hex codes)
- Typography (font sizes, weights, line heights)
- Spacing (margins, paddings, gaps)
- Border radius, shadows, transitions
- Icon specifications

#### 2. File Structure Setup

**HTML Files**:
- Location: `dist/customer/html/[module]/[pageName].html`
- Naming: Use snake_case (e.g., `my_thrifty_type3.html`)
- Page-specific class: Add unique class to wrapper using underscores (e.g., `<div class="wrap my_thrifty_type3">`)

**SCSS Files**:
- Edit: `dist/customer/assets/scss/style_new.scss`
- Add styles at the bottom before the final closing comment
- Use page-specific class as parent selector with underscores (`.my_thrifty_type3 { ... }`)
- Follow existing mixin patterns (`@include max_mobile`, etc.)

**Icons/Images**:
- Location: `dist/customer/assets/images/[module]/`
  - Module-specific: `dist/customer/assets/images/usim/`, `dist/customer/assets/images/product/`
  - Mypage: `dist/customer/assets/images/mypage/`
  - Common/Brand: `dist/customer/assets/images/common/brand/`
  - Main page: `dist/customer/assets/images/main/`
- Format Priority:
  1. **PNG (Default)** - Use for photos, complex graphics, screenshots
  2. **SVG (When appropriate)** - Use for icons, logos, simple graphics
- Naming Convention: Use kebab-case
  - Icons: `icon-[name].png` or `icon-[name].svg`
  - Images: `img-[description].png`
  - Logos: `logo-[brand].png` or `logo-[brand].svg`
  - Brand logos: `brand-[name].png`
- Examples:
  - `icon-data-phone.png` - Data/phone icon
  - `icon-arrow-right.svg` - Arrow icon (simple shape, use SVG)
  - `img-main-banner.png` - Main banner image
  - `logo-kt.svg` - KT logo
  - `brand-ktmmobile.png` - KT M Mobile brand logo

#### 3. Image & Icon Extraction from Figma

**Determine Appropriate Format:**
1. **Analyze the asset in Figma:**
   - Simple shapes, icons, logos → Consider SVG
   - Photos, gradients, complex graphics → Use PNG
   - Transparent backgrounds → PNG or SVG
   - Needs color manipulation via CSS → SVG

2. **Extract with correct format:**
   - PNG: Export at 2x resolution for retina displays
   - SVG: Export and optimize (remove Figma metadata)

**Directory Structure by Module:**
```bash
dist/customer/assets/images/
├── common/
│   ├── brand/
│   │   ├── brand-ktmmobile.png
│   │   ├── brand-skylife.png
│   │   └── logo-kt.svg
│   ├── icon-close.svg
│   └── img-default-profile.png
├── usim/
│   ├── icon-newjoin.png
│   ├── icon-nummove.png
│   ├── img-main-banner-01.png
│   └── img-main-banner-mo-01.png (mobile version)
├── product/
│   ├── icon-data.png
│   ├── icon-call.png
│   └── icon-sms.png
├── mypage/
│   ├── icon-data-phone.png
│   ├── icon-receipt.png
│   ├── icon-user.png
│   └── promo-banner.png
└── main/
    └── bizlogo/
        ├── img-skylife-logo.svg
        └── img-kt-logo.svg
```

**Naming Convention Decision Tree:**
```
Is it an icon?
├─ Yes → icon-[descriptive-name].[png|svg]
│   ├─ Simple shape/line → .svg (icon-arrow-right.svg)
│   └─ Complex/gradient → .png (icon-data-phone.png)
└─ No → img-[context]-[description].[png|svg]
    ├─ Photo/screenshot → .png (img-main-banner.png)
    ├─ Logo → logo-[brand].[png|svg] (logo-kt.svg)
    └─ Brand asset → brand-[name].png (brand-ktmmobile.png)
```

**PNG Export Settings:**
- Resolution: 2x for retina displays
- Format: PNG-24 with transparency
- Naming: Include device suffix if needed
  - Desktop: `img-banner-01.png`
  - Mobile: `img-banner-mo-01.png`

**SVG Best Practices:**
- Remove Figma-specific metadata
- Optimize viewBox and dimensions
- Use semantic naming
- Preserve fill/stroke for CSS manipulation
- Test in browser before committing

**Example Extraction:**
```html
<!-- PNG for complex icon with gradients -->
<img src="../../assets/images/mypage/icon-data-phone.png"
     alt="데이터 사용량"
     width="48"
     height="48">

<!-- SVG for simple logo -->
<img src="../../assets/images/common/brand/logo-kt.svg"
     alt="KT 로고"
     width="74"
     height="30">

<!-- PNG for banner with photos -->
<picture>
  <source media="(max-width: 717px)"
          srcset="../../assets/images/usim/img-main-banner-mo-01.png">
  <img src="../../assets/images/usim/img-main-banner-01.png"
       alt="eSIM 셀프개통 배너"
       loading="lazy">
</picture>
```

#### 4. Layout & CSS Guidelines

**IMPORTANT Layout Rules:**

1. **Header & Footer - DO NOT Implement**
   - Header and Footer are dynamically loaded via jQuery
   - Use existing IDs: `<div id="header"></div>` and `<div id="footer"></div>`
   - Focus ONLY on main content area implementation
   - Example:
   ```html
   <div class="wrap page_name">
     <div id="header"></div> <!-- Auto-loaded, don't touch -->

     <main class="contentContainer" id="contentContainer">
       <!-- YOUR IMPLEMENTATION GOES HERE -->
     </main>

     <div id="footer"></div> <!-- Auto-loaded, don't touch -->
   </div>
   ```

2. **CSS Layout - Avoid Grid**
   - **DO NOT use CSS Grid** (`display: grid`)
   - **USE Flexbox instead** (`display: flex`)
   - Flexbox is well-supported in target browsers (IE 11+)
   - Grid may cause compatibility issues

**Flexbox Patterns:**
```scss
// Horizontal layout
.container {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;
}

// Vertical layout
.vertical_stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// Responsive wrapping
.card_list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  .card {
    flex: 1 1 calc(50% - 1rem); // 2 columns with gap

    @include max_mobile {
      flex: 1 1 100%; // 1 column on mobile
    }
  }
}

// Equal width columns
.equal_columns {
  display: flex;
  gap: 2rem;

  > * {
    flex: 1; // Equal width children
  }
}
```

**Common Flexbox Use Cases:**
```html
<!-- Horizontal alignment with space-between -->
<div style="display: flex; justify-content: space-between; align-items: center;">
  <h2>제목</h2>
  <a href="#">전체보기</a>
</div>

<!-- Centered content -->
<div style="display: flex; align-items: center; justify-content: center;">
  <p>중앙 정렬 컨텐츠</p>
</div>

<!-- Card grid with flexbox -->
<ul style="display: flex; flex-wrap: wrap; gap: 2rem;">
  <li style="flex: 1 1 calc(33.333% - 1.4rem);">카드 1</li>
  <li style="flex: 1 1 calc(33.333% - 1.4rem);">카드 2</li>
  <li style="flex: 1 1 calc(33.333% - 1.4rem);">카드 3</li>
</ul>
```

#### 5. HTML Implementation

Follow existing project patterns:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){ /* GTM code */ })(window,document,'script','dataLayer','GTM-NZ4CRZ8');</script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <!-- Additional meta tags -->

  <title>Page Title | 마이알뜰폰 | KT 마이알뜰폰</title>

  <!-- Stylesheets -->
  <link rel="stylesheet" href="../../assets/default/font.css" />
  <link rel="stylesheet" href="../../assets/default/reset.css" />
  <link rel="stylesheet" href="../../assets/css/style.css" />

  <!-- Scripts -->
  <script src="../../assets/js/jquery-3.6.0.min.js"></script>
  <!-- Additional scripts -->
</head>
<body>
  <!-- GTM noscript -->

  <!-- Skip navigation -->
  <div class="skip">
    <a href="#contentContainer">본문 바로가기</a>
    <a href="#gnbContainer">주메뉴 바로 가기</a>
    <a href="#footerMenu">푸터 바로가기</a>
  </div>

  <!-- Comment with ticket info -->
  <!-- YYYY-MM-DD KMVNO-#### [DR-YYYY-######] -->
  <div class="wrap page_specific_class">
    <div id="header"></div>

    <main class="content_container" id="contentContainer">
      <!-- Page content -->
    </main>

    <div id="footer"></div>
  </div>
  <!-- //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] -->

  <script>
    $(document).ready(function() {
      $('#header').load('../../common/header.html');
      $('#footer').load('../../common/footer.html');
      // Page-specific JS
    });
  </script>
</body>
</html>
```

**Accessibility Requirements**:
- Use semantic HTML (nav, main, section, article)
- Add ARIA labels to interactive elements
- Use `aria-hidden="true"` for decorative images
- Provide screen reader text with `.ir` class
- Ensure keyboard navigation support

#### 5. SCSS Implementation

Add styles to `dist/customer/assets/scss/style_new.scss`:

```scss
/* YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
.page_specific_class {
  // Base styles
  background-color: #fff;

  // Use Flexbox for layout (NOT Grid)
  .content_wrapper {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  // Horizontal flex layout
  .header_section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
    padding: 2rem 0;
  }

  // Card list with flex-wrap
  .card_list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .card_item {
      flex: 1 1 calc(50% - 1rem); // 2 columns

      @include max_mobile {
        flex: 1 1 100%; // 1 column on mobile
      }
    }
  }

  // Nested components with flexbox
  .component_name {
    display: flex;
    align-items: center;
    gap: 1.6rem;

    // Use rem units (1rem = 10px based on project setup)
    padding: 4rem;
    font-size: 1.4rem;
    line-height: 1.7rem;
  }

  // Circular icon backgrounds
  .icon_wrap {
    width: 9.6rem;
    height: 9.6rem;
    border-radius: 50%;  // Perfect circle
    background-color: #f7f8fa;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0; // Prevent shrinking
  }

  // Responsive breakpoints
  @include max_mobile {
    .component_name {
      flex-direction: column;
      padding: 3rem 2rem;
    }

    .header_section {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
/* //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] */
```

**SCSS Best Practices**:
- **Use Flexbox, NOT Grid** - `display: flex` instead of `display: grid`
- Use rem units (10px base: 1.6rem = 16px)
- Follow existing mixin patterns
- Nest selectors for scoping
- Add transitions for interactive elements
- Use exact color codes from Figma
- Include responsive breakpoints
- Use `gap` property for spacing in flex containers
- Add `flex-shrink: 0` to prevent unwanted shrinking

#### 6. Compilation & Initial Test

```bash
# Compile SCSS to CSS
npm run build

# Start local server for testing
cd dist/customer
python3 -m http.server 8080

# Access: http://localhost:8080/html/[module]/[pageName].html
```

#### 7. Visual Verification with Playwright

Use Playwright MCP to verify pixel-perfect accuracy:

```bash
# Navigate to page
mcp__playwright__browser_navigate
  - url: http://localhost:8080/html/myThrifty/myThriftyType3.html

# Take screenshot
mcp__playwright__browser_take_screenshot
  - filename: implementation-screenshot.png
  - fullPage: true

# Get page snapshot for accessibility
mcp__playwright__browser_snapshot

# Check console errors
mcp__playwright__browser_console_messages
  - onlyErrors: true
```

**Compare**:
1. Figma screenshot vs implementation screenshot
2. Check all elements are visible
3. Verify spacing, colors, typography match exactly
4. Confirm responsive behavior

#### 8. Iterative Refinement

**Critical**: The user expects **exact match** with Figma. Iterate until perfect:

1. Compare screenshots side-by-side
2. Identify discrepancies:
   - Layout differences (spacing, alignment)
   - Missing elements
   - Incorrect colors/sizes
   - Icon issues
3. Fix issues in HTML/SCSS
4. Recompile: `npm run build`
5. Reload page in Playwright
6. Take new screenshot
7. Repeat until exact match

**Common Issues**:
- Icons not circular → Check `border-radius: 50%` and equal width/height
- Spacing off → Verify padding/margin/gap values match Figma
- Colors different → Use exact hex codes from Figma
- Fonts wrong → Check font-family, size, weight, line-height

#### 9. Web Standards Validation (Optional)

Use Context7 MCP for accessibility and standards:

```bash
# Resolve library for WCAG guidelines
mcp__context7__resolve-library-id
  - libraryName: "wcag"

# Get documentation
mcp__context7__get-library-docs
  - context7CompatibleLibraryID: "/w3c/wcag"
  - topic: "accessibility"
```

Verify:
- Semantic HTML usage
- ARIA labels on interactive elements
- Keyboard navigation
- Color contrast ratios
- Screen reader compatibility

#### 10. Final Checklist

Before completion:
- ✅ All elements from Figma are present
- ✅ Layout matches Figma exactly (spacing, alignment, sizing)
- ✅ Colors match Figma specifications
- ✅ Typography matches (font family, size, weight, line-height)
- ✅ Icons extracted and placed in correct folders (PNG default, SVG when appropriate)
- ✅ **Header/Footer NOT implemented** (using `<div id="header">` and `<div id="footer">` only)
- ✅ **Flexbox used for layouts** (NO CSS Grid)
- ✅ Responsive design works on mobile breakpoint
- ✅ SCSS compiled to CSS successfully
- ✅ Accessibility features implemented (ARIA labels, semantic HTML)
- ✅ Playwright screenshot confirms exact match
- ✅ Console shows no critical errors
- ✅ Code comments include ticket number and date
- ✅ Common components from `common_guide.html` reused where possible

### Example: my_thrifty_type3 Implementation

**Figma URL**: `https://www.figma.com/design/[fileKey]/[fileName]?node-id=13539-37045`

**Files Created**:
```
dist/customer/html/myThrifty/my_thrifty_type3.html
dist/customer/assets/scss/style_new.scss (lines 5112-5532)
dist/customer/assets/images/mypage/
  ├── promo-banner.svg
  ├── icon-data-phone.svg
  ├── icon-receipt.svg
  ├── icon-user.svg
  ├── icon-gift.svg
  ├── icon-chat.svg
  ├── icon-refresh.svg
  ├── icon-arrow-right.svg
  ├── icon-unlock.svg
  ├── icon-dropdown.svg
  └── icon-setting.svg
```

**Key Features Implemented**:
- Navigation header with back button
- Member info card with badges and buttons
- Line dropdown with logo and phone number
- Detailed promo banner with data usage visualization
- Recommended menu with 6 circular icon items
- Fully responsive design
- Accessibility compliant

**Process**:
1. Extracted Figma design specifications
2. Created HTML structure matching Figma layout exactly
3. Extracted all icons as SVG files
4. Wrote SCSS with exact Figma specifications
5. Compiled and tested with local server
6. Verified with Playwright screenshots
7. Iterated to fix discrepancies
8. Achieved pixel-perfect match

### Common Pitfalls to Avoid

1. **Not reading file before editing**: Always use Read tool before Edit tool
2. **Using relative paths**: Icons must use correct relative paths from HTML location
3. **Forgetting to compile**: Always run `npm run build` after SCSS changes
4. **Skipping visual comparison**: Must compare Figma vs implementation screenshots
5. **Incomplete icon extraction**: Extract ALL icons, not just some
6. **Wrong color codes**: Use exact hex codes from Figma, not approximations
7. **Missing responsive styles**: Include mobile breakpoints with `@include max_mobile`
8. **Poor accessibility**: Add ARIA labels and semantic HTML from the start


---

## Quick Reference

### 🚀 Common Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile SCSS → CSS + PostCSS optimization |
| `npm run sass` | One-time SCSS compilation |
| `npm run sass:watch` | Watch mode for customer SCSS |
| `npm run sass:watch-bo` | Watch mode for admin SCSS |
| `npm run postcss` | Optimize compiled CSS |

### 📏 Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| HTML files | snake_case | `my_thrifty_type3.html` |
| CSS classes | snake_case + underscores | `.member_info_card` |
| JS functions | Traditional function | `function initDropdowns() {}` |
| JS variables | var (not let/const) | `var itemCount = 0;` |
| Images (icons) | kebab-case | `icon-data-phone.png` |
| Images (general) | kebab-case | `img-main-banner.png` |
| Data attributes | kebab-case | `data-module="btn_wrap"` |

### 📐 Breakpoints

| Name | Value | SCSS Mixin | Usage |
|------|-------|------------|-------|
| Desktop | 1200px | `@include desktop` | Large screens |
| Tablet | 1024px | `@include tablet` | Tablet devices |
| Mobile Max | 717px | `@include max_mobile` | Mobile devices |
| Fold | 690px | `@include fold` | Foldable devices |
| Mobile Min | 320px | N/A | Minimum width |

### 🎨 Color Variables

**Guide Colors:**
- Primary: `#6B3BE9`
- Edge: `#FD8553`
- Text Basic: `#000000`
- Text Body: `#333333`
- Box Basic: `#F2F4F6`

**Main Colors:**
- Primary 01: `#07BFE0`
- Primary 02: `#6B3BE9`
- Primary Text 01: `#4553FF`
- Primary Text 02: `#8345FF`

### 🧩 Data Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-module` | Reusable UI component | `data-module="btn_wrap"` |
| `data-scope` | Container/wrapper | `data-scope="input_set"` |
| `data-fn` | JavaScript behavior | `data-fn="accordion"` |
| `data-trigger` | Action trigger element | `<button data-trigger>` |
| `data-target` | Target element selector | `data-target=".modal"` |

### 🔧 Git Conventions

**Branch Naming:**
```
feature/KMVNO-[number]_[DR-YYYY-#####]
```

**Commit Message:**
```
[KMVNO-####]_[DR-YYYY-#####] [brief description]
```

**Code Comments:**
```html
<!-- YYYY-MM-DD KMVNO-#### [DR-YYYY-######] -->
<!-- //YYYY-MM-DD KMVNO-#### [DR-YYYY-######] -->
```

### ⚡ Quick Tips

1. **Always use Flexbox, never Grid** - IE 11 compatibility
2. **PNG first, SVG when simple** - Complex graphics = PNG
3. **Header/Footer = ID only** - Don't implement, use `<div id="header">`
4. **Check common_guide.html first** - Reuse existing components
5. **Compile before commit** - `npm run build` after SCSS changes
6. **Mobile-first responsive** - Use `@include max_mobile` for mobile styles
7. **Accessibility always** - ARIA labels, semantic HTML, alt text
8. **Use rem units** - 1rem = 10px (1.6rem = 16px)

### 🔍 File Locations

```
dist/customer/
├── html/[module]/         # HTML pages
├── assets/
│   ├── scss/             # SCSS source (external only)
│   ├── css/              # Compiled CSS
│   ├── js/               # JavaScript
│   └── images/           # Images by module
│       ├── common/brand/ # Brand logos
│       ├── usim/         # USIM module
│       ├── product/      # Product module
│       └── mypage/       # Mypage module
```

### 📦 Common Components

**Buttons:**
- `[data-module="btn_wrap"]` - Button container
- `[data-module="btn_linked"]` - Link button

**Inputs:**
- `[data-module="input_list"]` - Input group
- `[data-module="input_wrap"]` - Single input
- `[data-fn="dropdown"]` - Dropdown select

**Cards:**
- `[data-module="product_card"]` - Product card
- `[data-scope="product_view_wrap"]` - Product list

**Layouts:**
- `[data-module="container_inner"]` - Content container (max-width: 1024px)
- `[data-scope="fixed_bottom"]` - Fixed bottom panel

**Behaviors:**
- `[data-fn="accordion"]` - Accordion (data-acc="single|multiple")
- `[data-fn="class_toggle"]` - Toggle class (data-mode="radio|multiple")
- `[data-fn="tab_switch"]` - Tab switching
- `[data-fn="scroll_nav"]` - Scroll navigation

---

## 🆘 Troubleshooting

### SCSS Won't Compile
**Symptom:** Error when running `npm run sass`
**Solutions:**
1. Check Node.js version (Windows: 20.18.2, macOS: 23.7.0)
2. Run `npm install` to reinstall dependencies
3. Check for syntax errors in SCSS files
4. Ensure no circular imports

### CSS Changes Not Showing
**Symptom:** CSS updates not reflected in browser
**Solutions:**
1. Run `npm run postcss` after compiling
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Check if `style_new.css` is imported in `style.css`
4. Verify correct file path in HTML

### Layout Broken on Mobile
**Symptom:** Elements misaligned on mobile devices
**Solutions:**
1. Check responsive breakpoints (`@include max_mobile`)
2. Verify Flexbox properties (not Grid)
3. Test viewport meta tag is present
4. Use browser DevTools mobile view

### Icons Not Showing
**Symptom:** Images don't display
**Solutions:**
1. Verify correct relative path from HTML location
2. Check file exists in specified directory
3. Ensure correct file extension (.png or .svg)
4. Check image naming follows kebab-case convention

### JavaScript Not Working
**Symptom:** Interactive elements don't respond
**Solutions:**
1. Check `common-ui.js` is loaded
2. Verify jQuery is loaded before custom scripts
3. Check console for JavaScript errors
4. Ensure data attributes are correctly set
5. Call `initCommonUI()` after DOM ready

### Git Commit Fails
**Symptom:** Cannot commit changes
**Solutions:**
1. Verify branch name follows convention
2. Check commit message format
3. Run `npm run postcss` before committing CSS
4. Ensure code comments include ticket number

---

## ✅ Pre-Commit Checklist

### Code Quality
- [ ] SCSS compiles without errors (`npm run build`)
- [ ] PostCSS optimization completed
- [ ] No console errors in browser
- [ ] Code follows naming conventions (snake_case)
- [ ] Comments include ticket number and date

### Layout & Styling
- [ ] Flexbox used (NO Grid)
- [ ] Responsive on all breakpoints (320px ~ 1920px)
- [ ] Colors match Figma specifications
- [ ] Typography correct (size, weight, line-height)
- [ ] Spacing matches Figma (margins, paddings, gaps)

### Accessibility
- [ ] All images have alt attributes
- [ ] Form inputs have associated labels
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA attributes where needed
- [ ] Keyboard navigation works
- [ ] Color contrast ≥ 4.5:1

### Assets
- [ ] Icons extracted (PNG or SVG as appropriate)
- [ ] Images in correct directories
- [ ] File names follow conventions (kebab-case)
- [ ] Mobile versions created (`-mo-` suffix)
- [ ] Images optimized (2x for retina)

### Components
- [ ] Common components reused (check common_guide.html)
- [ ] Data attributes correctly set
- [ ] Header/Footer not implemented (ID only)
- [ ] Page-specific class added to wrapper

### Testing
- [ ] Visual match with Figma design
- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive tested
- [ ] Interactive elements work
- [ ] No broken links

---

## 📋 Document Changelog

### Version 2.0 (2025-01-10)
**Major Updates:**
- ✅ Added Table of Contents for quick navigation
- ✅ Added Quick Reference section (commands, naming, breakpoints, colors)
- ✅ Added Troubleshooting guide (6 common issues)
- ✅ Added comprehensive Pre-Commit Checklist (26 items)
- ✅ Enhanced Figma to Code workflow with layout guidelines
- ✅ Added data attribute system documentation
- ✅ Integrated common_guide.html component catalog

**Document Stats:**
- Total Lines: 2,457
- Major Sections: 14
- Code Examples: 50+
- Components Documented: 20+

### Version 1.0 (Initial)
- Project architecture and file structure
- HTML/CSS/SCSS coding standards
- JavaScript conventions
- Git workflow and branch naming
- Self Opening module patterns
- Basic Figma to Code workflow

### Future Improvements (Roadmap)

**🔴 High Priority**
- [ ] Consolidate duplicate image guidelines sections
- [ ] Add more common pattern examples
- [ ] Create video tutorials for key workflows

**🟡 Medium Priority**
- [ ] Add Performance Guidelines section
- [ ] Expand troubleshooting with more cases
- [ ] Add testing automation guide
- [ ] Document API integration patterns

**🟢 Low Priority**
- [ ] Consider splitting into multiple markdown files (if exceeds 3000 lines)
- [ ] Add interactive examples
- [ ] Create searchable component library
- [ ] Implement versioning system

### Feedback & Contributions
To suggest improvements to this document:
1. Create a feature branch: `feature/docs-[improvement-name]`
2. Update relevant sections
3. Test examples work correctly
4. Submit for review

---

**Document Version:** 2.0
**Last Updated:** 2025-01-10
**Next Review:** 2025-04-10
**Maintainer:** Development Team
