const config = window.DIGITAL_GUIDE_CONFIG;
const guides = window.DIGITAL_GUIDES;
const grid = document.querySelector('#guide-grid');
const filters = document.querySelector('#category-filters');
const search = document.querySelector('#guide-search');
const priceFilter = document.querySelector('#price-filter');
const sortSelect = document.querySelector('#sort-guides');
const status = document.querySelector('#results-status');
const emptyState = document.querySelector('#empty-state');
const modal = document.querySelector('#guide-modal');
let activeCategory = 'All';
let lastFocusedElement = null;

const categories = ['All', ...new Set(guides.flatMap(guide => guide.categories))];

function money(value) {
  return `${config.currency}${Number(value).toFixed(2)}`;
}

function renderFilters() {
  filters.innerHTML = categories.map(category => {
    const count = category === 'All' ? guides.length : guides.filter(g => g.categories.includes(category)).length;
    return `<button type="button" class="filter-pill ${category === activeCategory ? 'active' : ''}" data-category="${category}">${category} (${count})</button>`;
  }).join('');
}

function filteredGuides() {
  const query = search.value.trim().toLowerCase();
  const price = priceFilter.value;
  const result = guides.filter(guide => {
    const categoryMatch = activeCategory === 'All' || guide.categories.includes(activeCategory);
    const haystack = [guide.title, guide.summary, ...guide.categories, ...guide.includes].join(' ').toLowerCase();
    const searchMatch = !query || haystack.includes(query);
    const priceMatch = price === 'all' ||
      (price === 'under10' && guide.price < 10) ||
      (price === '10to20' && guide.price >= 10 && guide.price <= 20) ||
      (price === 'over20' && guide.price > 20);
    return categoryMatch && searchMatch && priceMatch;
  });
  const sorters = {
    featured: (a,b) => a.featured - b.featured,
    newest: (a,b) => new Date(b.published) - new Date(a.published),
    'price-low': (a,b) => a.price - b.price,
    'price-high': (a,b) => b.price - a.price,
    title: (a,b) => a.title.localeCompare(b.title)
  };
  return result.sort(sorters[sortSelect.value] || sorters.featured);
}

function renderGuides() {
  const visible = filteredGuides();
  grid.innerHTML = visible.map(guide => `
    <button class="guide-card" type="button" data-guide-id="${guide.id}" aria-label="View ${guide.title}">
      <span class="card-image"><img src="${guide.image}" alt="${guide.imageAlt}" loading="lazy"></span>
      <span class="card-content">
        <span class="card-category">${guide.categories.join(' · ')}</span>
        <strong>${guide.title}</strong>
        <span class="card-summary">${guide.summary}</span>
        <span class="card-bottom"><b>${money(guide.price)}</b><i>View guide →</i></span>
      </span>
    </button>`).join('');
  status.textContent = `${visible.length} ${visible.length === 1 ? 'guide' : 'guides'} shown`;
  emptyState.hidden = visible.length !== 0;
}

function contactMessage(guide) {
  return `Hello! I am interested in the digital guide “${guide.title}” (${money(guide.price)}). Could you tell me how to purchase it?`;
}

function openModal(guide) {
  lastFocusedElement = document.activeElement;
  document.querySelector('#modal-image').src = guide.image;
  document.querySelector('#modal-image').alt = guide.imageAlt;
  document.querySelector('#modal-category').textContent = guide.categories.join(' · ');
  document.querySelector('#modal-title').textContent = guide.title;
  document.querySelector('#modal-format').textContent = guide.format;
  document.querySelector('#modal-price').textContent = money(guide.price);
  document.querySelector('#modal-description').textContent = guide.description;
  document.querySelector('#modal-includes').innerHTML = guide.includes.map(item => `<li>${item}</li>`).join('');
  document.querySelector('#modal-value').textContent = guide.value;
  const message = encodeURIComponent(contactMessage(guide));
  document.querySelector('#whatsapp-link').href = `https://wa.me/${config.whatsappNumber}?text=${message}`;
  document.querySelector('#telegram-link').href = `https://t.me/${config.telegramUsername}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocusedElement?.focus();
}

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderGuides();
});
grid.addEventListener('click', event => {
  const card = event.target.closest('[data-guide-id]');
  if (card) openModal(guides.find(guide => guide.id === card.dataset.guideId));
});
[search, priceFilter, sortSelect].forEach(control => control.addEventListener(control === search ? 'input' : 'change', renderGuides));
modal.addEventListener('click', event => { if (event.target.closest('[data-close-modal]')) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelector('#year').textContent = new Date().getFullYear();
renderFilters();
renderGuides();
