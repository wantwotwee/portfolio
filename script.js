const projectList = document.querySelector('#project-list');

function renderProjects() {
  projectList.innerHTML = window.PORTFOLIO_PROJECTS.map((project, index) => `
    <article class="project" data-project="${project.number}">
      <div class="project-sticky section-shell">
        <div class="project-copy reveal">
          <p class="section-index">Archive entry · ${project.number}</p>
          <p class="project-type">${project.type}</p>
          <h3>${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <ul class="tags">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
          <a class="text-link ${project.link === '#' ? 'disabled' : ''}" href="${project.link}" ${project.link !== '#' ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>${project.linkLabel} <span>↗</span></a>
        </div>
        <figure class="project-visual reveal" style="--delay: .12s">
          <span class="corner corner-a"></span><span class="corner corner-b"></span>
          <img src="${project.image}" alt="${project.alt}" loading="${index ? 'lazy' : 'eager'}">
          <figcaption>${project.number} / ${String(window.PORTFOLIO_PROJECTS.length).padStart(2,'0')}</figcaption>
        </figure>
      </div>
    </article>`).join('');
}

renderProjects();
document.querySelector('#year').textContent = new Date().getFullYear();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .13 });
reveals.forEach(el => observer.observe(el));

const progress = document.querySelector('.progress span');
const parallaxItems = document.querySelectorAll('[data-depth]');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleY(${max > 0 ? scrollY / max : 0})`;
  if (!reduceMotion) parallaxItems.forEach(el => {
    const depth = Number(el.dataset.depth || .1);
    el.style.setProperty('--parallax', `${scrollY * depth}px`);
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
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
