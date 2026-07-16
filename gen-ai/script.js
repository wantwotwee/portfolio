const projectList = document.querySelector('#project-list');
const projects = window.AI_PROJECTS || [];
const total = String(projects.length).padStart(2, '0');

projectList.innerHTML = projects.map((project, index) => {
  const number = String(index + 1).padStart(2, '0');
  return `
    <article class="project" data-project="${number}">
      <div class="project-sticky section-shell">
        <div class="project-copy reveal">
          <p class="section-index">Project · ${number}</p>
          <p class="project-type">${project.type}</p>
          <h3>${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <ul class="tags">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
          <a class="text-link ${project.link === '#' ? 'disabled' : ''}" href="${project.link}" ${project.link !== '#' ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>${project.linkLabel} <span>↗</span></a>
        </div>
        <figure class="project-visual reveal" style="--delay:.12s">
          <span class="corner corner-a"></span><span class="corner corner-b"></span>
          <img src="${project.image}" alt="${project.alt}" loading="${index ? 'lazy' : 'eager'}">
          <figcaption>${number} / ${total}</figcaption>
        </figure>
      </div>
    </article>`;
}).join('');

const heroCount = document.querySelector('#hero-count');
if (heroCount) heroCount.textContent = projects.length ? `01—${total}` : '00';
document.querySelector('#year').textContent = new Date().getFullYear();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const progress = document.querySelector('.progress span');
const parallaxItems = document.querySelectorAll('[data-depth]');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleY(${max > 0 ? scrollY / max : 0})`;
  if (!reduceMotion) parallaxItems.forEach(el => {
    el.style.setProperty('--parallax', `${scrollY * Number(el.dataset.depth || .1)}px`);
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
