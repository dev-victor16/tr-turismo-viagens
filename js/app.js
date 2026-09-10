/**
 * TR TURISMO VIAGENS - FRONTEND JAVASCRIPT
 * Lógica do site com layout editorial de revista baseado nas fotografias reais
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.StorageManager ? window.StorageManager.getData() : window.TR_DEFAULT_DATA;

  // 1. Renderização de dados
  renderCompanyDetails(data.company);
  renderHeroContent(data.hero);
  renderEditorialAbout(data.about);
  renderEditorialDestinations(data.destinations);
  renderEditorialReviews(data.company, data.testimonials);
  renderContactSection(data.company);

  // 2. Interações
  setupNavigationDrawer();
  setupDestinationFilters(data.destinations);
  setupQuoteWhatsAppForm(data.company);

  // 3. Atualizar ano corrente
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Renderiza informações da empresa
 */
function renderCompanyDetails(company) {
  if (!company) return;

  document.querySelectorAll('.company-phone-text').forEach(el => el.textContent = company.phone);
  document.querySelectorAll('.company-phone-link').forEach(el => el.href = `tel:${company.phone.replace(/\D/g, '')}`);

  const waUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site da TR Turismo e gostaria de informações sobre viagens e excursões.")}`;
  document.querySelectorAll('.company-whatsapp-link').forEach(el => el.href = waUrl);

  document.querySelectorAll('.company-address-text').forEach(el => {
    el.textContent = `${company.address} – ${company.neighborhood}, ${company.city} - ${company.state}`;
  });

  document.querySelectorAll('.company-cnpj-text').forEach(el => el.textContent = company.cnpj);
}

/**
 * Renderiza o Hero Editorial
 */
function renderHeroContent(hero) {
  if (!hero) return;

  const bgImg = document.getElementById('hero-bg-img');
  if (bgImg && hero.backgroundImage) {
    bgImg.src = hero.backgroundImage;
  }

  const badgeEl = document.getElementById('hero-badge-text');
  if (badgeEl && hero.badge) badgeEl.textContent = hero.badge;

  const titleEl = document.getElementById('hero-title-text');
  if (titleEl && hero.title) {
    titleEl.innerHTML = hero.title.replace('O DESTINO É SEU.', '<span>O DESTINO É SEU.</span>');
  }

  const subtitleEl = document.getElementById('hero-subtitle-text');
  if (subtitleEl && hero.subtitle) subtitleEl.textContent = hero.subtitle;

  const ctaBtn = document.getElementById('hero-cta-primary');
  if (ctaBtn && hero.ctaPrimaryText) {
    ctaBtn.innerHTML = `${hero.ctaPrimaryText} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
    ctaBtn.href = hero.ctaPrimaryLink || '#destinos';
  }
}

/**
 * Renderiza a seção Sobre
 */
function renderEditorialAbout(about) {
  if (!about) return;

  const headlineEl = document.getElementById('about-headline');
  if (headlineEl && about.headline) headlineEl.textContent = about.headline;

  const taglineEl = document.getElementById('about-tagline');
  if (taglineEl && about.tagline) taglineEl.textContent = about.tagline;

  const p1El = document.getElementById('about-p1');
  if (p1El && about.paragraph1) p1El.textContent = about.paragraph1;

  const p2El = document.getElementById('about-p2');
  if (p2El && about.paragraph2) p2El.innerHTML = about.paragraph2;

  const p3El = document.getElementById('about-p3');
  if (p3El && about.paragraph3) p3El.textContent = about.paragraph3;
}

/**
 * Renderiza destinos no formato revista com fotos reais (1 destaque principal grande + lista lateral)
 */
function renderEditorialDestinations(destinations, activeCategory = 'Todos') {
  const container = document.getElementById('destinations-magazine-container');
  if (!container || !destinations) return;

  const filtered = activeCategory === 'Todos'
    ? destinations
    : destinations.filter(d => d.category.toLowerCase().includes(activeCategory.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="color: #64748b; font-size: 1rem; margin-bottom: 1rem;">Nenhum roteiro encontrado para este filtro.</p>
        <button class="btn btn-primary btn-sm" onclick="resetDestinationFilters()">Ver todos os roteiros</button>
      </div>
    `;
    return;
  }

  // O primeiro é o destaque grande da revista
  const featured = filtered[0];
  const secondaries = filtered.slice(1);

  let html = `
    <!-- Destino Principal em Destaque Monumental -->
    <div class="destination-hero-card">
      <img src="${featured.image}" alt="${escapeHTML(featured.name)}" class="destination-hero-bg" loading="lazy" onerror="this.src='images/foto-chile-andes.jpg'">
      <div class="destination-hero-gradient"></div>
      <div class="destination-hero-content">
        ${featured.tag ? `<span class="destination-hero-tag">${escapeHTML(featured.tag)}</span>` : ''}
        <h3 class="destination-hero-title">${escapeHTML(featured.name)}</h3>
        <p class="destination-hero-desc">${escapeHTML(featured.description)}</p>

        <div class="destination-hero-inclusions">
          ${(featured.inclusions || []).map(inc => `
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ${escapeHTML(inc)}
            </span>
          `).join('')}
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div style="font-size: 0.9rem; color: #cbd5e1;">
            <strong style="color: #ffffff; font-size: 1.15rem; display: block;">${escapeHTML(featured.priceDisplay || 'Sob Consulta')}</strong>
            <span>${escapeHTML(featured.departure || 'Saída facilitada de Ibirité e BH')}</span>
          </div>
          <button class="btn btn-primary" onclick="selectDestinationForQuote('${escapeHTML(featured.name)}')">
            Quero Reservar
          </button>
        </div>
      </div>
    </div>
  `;

  // Coluna de Destinos Secundários
  if (secondaries.length > 0) {
    html += `
      <div class="destinations-side-stack">
        ${secondaries.map(item => `
          <div class="destination-side-card">
            <img src="${item.image}" alt="${escapeHTML(item.name)}" class="side-card-image" loading="lazy" onerror="this.src='images/foto-praia-tropical.jpg'">
            <div class="side-card-body">
              <div>
                <span class="side-card-tag">${escapeHTML(item.category)}</span>
                <h4 class="side-card-title">${escapeHTML(item.name)}</h4>
                <p class="side-card-desc">${escapeHTML(item.description)}</p>
              </div>
              <div class="side-card-footer">
                <span class="side-card-price">${escapeHTML(item.priceDisplay || 'Sob Consulta')}</span>
                <button class="pillar-action-link" onclick="selectDestinationForQuote('${escapeHTML(item.name)}')">
                  Pedir Cotação →
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    html = `<div style="grid-column: 1 / -1;">` + html + `</div>`;
  }

  container.innerHTML = html;
}

/**
 * Filtros de Destinos
 */
function setupDestinationFilters(destinations) {
  const pills = document.querySelectorAll('.filter-pill-real, .filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-filter');
      renderEditorialDestinations(destinations, cat);
    });
  });
}

window.resetDestinationFilters = function() {
  const allBtn = document.querySelector('.filter-pill-real[data-filter="Todos"], .filter-pill[data-filter="Todos"]');
  if (allBtn) allBtn.click();
};

/**
 * Preenche o destino e rola suavemente até o formulário
 */
window.selectDestinationForQuote = function(destName) {
  const formSection = document.getElementById('orcamento');
  const destInput = document.getElementById('quote-destination');
  if (destInput) {
    destInput.value = destName;
    destInput.focus();
  }
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Avaliações Reais do Google
 */
function renderEditorialReviews(company, testimonials) {
  const scoreEl = document.getElementById('google-reviews-score');
  if (scoreEl && company.googleRating) {
    scoreEl.textContent = company.googleRating.toFixed(1);
  }

  const countEl = document.getElementById('google-reviews-count');
  if (countEl && company.googleReviewCount) {
    countEl.textContent = `• Mais de ${company.googleReviewCount} avaliações reais`;
  }

  const container = document.getElementById('editorial-reviews-container');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(item => `
    <div class="review-card-editorial">
      <p class="review-quote-editorial">“${escapeHTML(item.content)}”</p>
      <div class="review-footer-editorial">
        <div class="review-author-info">
          <strong>${escapeHTML(item.author)}</strong>
          <span>${escapeHTML(item.location || 'Ibirité - MG')}</span>
        </div>
        <div class="hero-stars-gold">★★★★★</div>
      </div>
    </div>
  `).join('');
}

/**
 * Contato & Mapa
 */
function renderContactSection(company) {
  if (!company) return;

  const hoursEl = document.getElementById('contact-hours');
  if (hoursEl) hoursEl.textContent = company.workingHours;

  const mapIframe = document.getElementById('google-maps-iframe');
  if (mapIframe && company.googleMapsEmbed) {
    mapIframe.src = company.googleMapsEmbed;
  }
}

/**
 * Formulário de Cotação e Envio Formatado para o WhatsApp
 */
function setupQuoteWhatsAppForm(company) {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('quote-name').value.trim();
    const phone = document.getElementById('quote-phone').value.trim();
    const destination = document.getElementById('quote-destination').value.trim();
    const dates = document.getElementById('quote-dates').value.trim();
    const passengers = document.getElementById('quote-passengers').value.trim();
    const type = document.getElementById('quote-type').value;
    const notes = document.getElementById('quote-notes').value.trim();

    if (!name || !phone || !destination) {
      alert("Por favor, preencha pelo menos o seu Nome, WhatsApp e Destino de interesse.");
      return;
    }

    // Salvar Lead no StorageManager para o Painel Admin
    if (window.StorageManager) {
      window.StorageManager.addLead({
        name,
        phone,
        destination,
        dates,
        passengers,
        type,
        notes
      });
    }

    // Mensagem formatada e direta para o WhatsApp oficial
    const message = 
`Olá! Vim pelo site da TR Turismo e gostaria de solicitar um orçamento.

Destino: ${destination}
Período desejado: ${dates || 'A definir'}
Passageiros: ${passengers || '1'}
Tipo de viagem: ${type}
Observações: ${notes || 'Sem observações adicionais'}

Meu nome: ${name}
Meu WhatsApp: ${phone}`;

    const waNumber = company.whatsapp || '5531995724285';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Abrindo WhatsApp Oficial...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 450);
  });
}

/**
 * Navegação e Menu Mobile
 */
function setupNavigationDrawer() {
  const header = document.querySelector('.main-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('main-nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
