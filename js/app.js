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
 * Renderiza destinos no formato revista editorial autoral com fotos reais
 * Sem repetição monótona de cards:
 * 1. Matéria de Capa monumental (Chile 2027 / Destaque)
 * 2. Spread Assimétrico de Revista (Balneário, Caldas Novas, etc.)
 * 3. Banner Panorâmico de Tela Cheia (Cataratas do Iguaçu)
 */
function renderEditorialDestinations(destinations, activeCategory = 'Todos') {
  const container = document.getElementById('destinations-magazine-container');
  if (!container || !destinations) return;

  const filtered = activeCategory === 'Todos'
    ? destinations
    : destinations.filter(d => d.category.toLowerCase().includes(activeCategory.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem; background: var(--bg-primary); border: 1px dashed var(--border-light-subtle); border-radius: 2px;">
        <p style="color: var(--text-light-mid); font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 1.5rem;">
          Nenhum roteiro encontrado nesta categoria no momento.
        </p>
        <button class="btn-editorial-gold" onclick="resetDestinationFilters()">
          VER TODA A COLEÇÃO DE ROTEIROS
        </button>
      </div>
    `;
    return;
  }

  let html = '';

  // Se filtrado e houver apenas 1 item
  if (filtered.length === 1) {
    html = renderCoverStoryItem(filtered[0]);
  } else {
    // 1. Destaque / Matéria de Capa (Chile 2027 ou 1º item)
    const featuredItem = filtered.find(d => d.featured) || filtered[0];
    const otherItems = filtered.filter(d => d.id !== featuredItem.id);

    html += renderCoverStoryItem(featuredItem);

    // 2. Se houver outros itens, distribuímos nos layouts autorais
    if (otherItems.length > 0) {
      // Destacamos se tiver Cataratas como banner panorâmico
      const panoramicItem = otherItems.find(d => d.category === 'Natureza' || d.id === 'dest-cataratas');
      const spreadItems = otherItems.filter(d => d !== panoramicItem);

      if (spreadItems.length > 0) {
        html += `<div class="destinations-asymmetric-spread">`;
        spreadItems.forEach((item, idx) => {
          const number = idx + 2;
          if (idx % 2 === 0) {
            // Spread Vertical (Foto portrait à esquerda + conteúdo)
            html += renderSpreadVertical(item, number);
          } else {
            // Spread Horizontal (Conteúdo à esquerda + foto landscape à direita)
            html += renderSpreadHorizontal(item, number);
          }
        });
        html += `</div>`;
      }

      // 3. Banner Panorâmico no encerramento da coleção
      if (panoramicItem) {
        html += renderPanoramicBreak(panoramicItem);
      }
    }
  }

  container.innerHTML = html;
  if (window.refreshScrollObserver) window.refreshScrollObserver();
}

/**
 * Matéria de Capa Monumental (Chile 2027)
 */
function renderCoverStoryItem(item) {
  return `
    <article class="destination-cover-story" data-reveal="fade-up">
      <div class="cover-story-media">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="this.src='images/foto-chile-andes.jpg'">
        <div class="cover-story-overlay"></div>
        <span class="cover-story-badge">${escapeHTML(item.tag || item.category)}</span>
      </div>
      <div class="cover-story-content">
        <div class="cover-story-meta">
          <span>${escapeHTML(item.category)}</span>
          <span class="meta-dot">•</span>
          <span>${escapeHTML(item.duration || 'Temporada Especial')}</span>
        </div>
        <h3 class="cover-story-headline">${escapeHTML(item.name)}</h3>
        <p class="cover-story-lead">${escapeHTML(item.description)}</p>

        <div class="cover-story-footer">
          <div class="cover-story-specs">
            <div class="spec-col">
              <strong>Embarque</strong>
              <span>${escapeHTML(item.departure || 'Ibirité e Grande BH')}</span>
            </div>
            <div class="spec-col">
              <strong>Inclusões</strong>
              <span>${escapeHTML((item.inclusions || []).slice(0, 3).join(' • '))}</span>
            </div>
            <div class="spec-col">
              <strong>Tarifa</strong>
              <span style="color: var(--accent-gold);">${escapeHTML(item.priceDisplay || 'Sob Consulta')}</span>
            </div>
          </div>
          <div class="cover-story-action">
            <button class="btn-editorial-gold" onclick="selectDestinationForQuote('${escapeHTML(item.name)}')">
              CONSULTAR DETALHES DO ROTEIRO
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Spread Vertical (Foto portrait à esquerda + conteúdo à direita)
 */
function renderSpreadVertical(item, number) {
  return `
    <article class="destination-spread-item spread-vertical-split" data-reveal="fade-up">
      <div class="spread-photo-frame portrait-ratio">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="this.src='images/foto-balneario-camboriu.jpg'">
        <span class="spread-location-tag">${escapeHTML(item.tag || item.category)}</span>
      </div>
      <div class="spread-content-panel">
        <span class="destination-number-serif">${String(number).padStart(2, '0')}</span>
        <h3 class="spread-item-title">${escapeHTML(item.name)}</h3>
        <p class="spread-item-desc">${escapeHTML(item.description)}</p>
        <ul class="spread-item-bullets">
          ${(item.inclusions || []).map(inc => `<li>${escapeHTML(inc)}</li>`).join('')}
          <li>${escapeHTML(item.departure || 'Embarque em Ibirité e pontos estratégicos')}</li>
        </ul>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div>
            <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-light-dim);">Tarifa</span>
            <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent-gold); font-family: var(--font-display);">${escapeHTML(item.priceDisplay || 'Sob Consulta')}</span>
          </div>
          <button class="btn-editorial-gold" onclick="selectDestinationForQuote('${escapeHTML(item.name)}')">
            CONSULTAR VAGAS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Spread Horizontal (Conteúdo à esquerda + foto landscape à direita)
 */
function renderSpreadHorizontal(item, number) {
  return `
    <article class="destination-spread-item spread-horizontal-flow" data-reveal="fade-up">
      <div class="spread-content-panel">
        <span class="destination-number-serif">${String(number).padStart(2, '0')}</span>
        <h3 class="spread-item-title">${escapeHTML(item.name)}</h3>
        <p class="spread-item-desc">${escapeHTML(item.description)}</p>
        <ul class="spread-item-bullets">
          ${(item.inclusions || []).map(inc => `<li>${escapeHTML(inc)}</li>`).join('')}
          <li>${escapeHTML(item.departure || 'Saídas confortáveis da Grande BH')}</li>
        </ul>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div>
            <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-light-dim);">Tarifa</span>
            <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent-gold); font-family: var(--font-display);">${escapeHTML(item.priceDisplay || 'Sob Consulta')}</span>
          </div>
          <button class="btn-editorial-gold" onclick="selectDestinationForQuote('${escapeHTML(item.name)}')">
            CONSULTAR VAGAS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div class="spread-photo-frame landscape-ratio">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="this.src='images/foto-caldas-novas-parque.jpg'">
        <span class="spread-location-tag">${escapeHTML(item.tag || item.category)}</span>
      </div>
    </article>
  `;
}

/**
 * Banner Panorâmico de Tela Cheia (Cataratas do Iguaçu)
 */
function renderPanoramicBreak(item) {
  return `
    <article class="destination-panoramic-break" data-reveal="fade-up">
      <div class="panoramic-media">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" onerror="this.src='images/foto-cataratas-iguacu.jpg'">
      </div>
      <div class="panoramic-overlay"></div>
      <div class="panoramic-floating-caption">
        <span class="panoramic-meta">${escapeHTML(item.tag || item.category)} • ${escapeHTML(item.duration || 'Roteiro Especial')}</span>
        <h3 class="panoramic-title">${escapeHTML(item.name)}</h3>
        <p class="panoramic-text">${escapeHTML(item.description)}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div>
            <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-light-dim);">Tarifa</span>
            <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent-gold); font-family: var(--font-display);">${escapeHTML(item.priceDisplay || 'Sob Consulta')}</span>
          </div>
          <button class="btn-editorial-primary" onclick="selectDestinationForQuote('${escapeHTML(item.name)}')">
            RESERVAR NESTE ROTEIRO
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Filtros de Destinos
 */
function setupDestinationFilters(destinations) {
  const pills = document.querySelectorAll('.filter-pill-editorial, .filter-pill-real, .filter-pill');
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
  const allBtn = document.querySelector('.filter-pill-editorial[data-filter="Todos"], .filter-pill-real[data-filter="Todos"], .filter-pill[data-filter="Todos"]');
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
 * Avaliações Reais do Google no formato editorial
 */
function renderEditorialReviews(company, testimonials) {
  const scoreEl = document.getElementById('google-reviews-score');
  if (scoreEl && company.googleRating) {
    scoreEl.textContent = company.googleRating.toFixed(1);
    scoreEl.setAttribute('data-counter', company.googleRating.toString());
  }

  const container = document.getElementById('editorial-reviews-container');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(item => `
    <article class="review-card-editorial" data-reveal="fade-up">
      <p class="review-quote-editorial">“${escapeHTML(item.content)}”</p>
      <div class="review-footer-editorial">
        <div class="review-author-info">
          <strong>${escapeHTML(item.author)}</strong>
          <span>${escapeHTML(item.location || 'Ibirité - MG')}</span>
        </div>
        <div class="stars-gold" aria-label="5 estrelas">★★★★★</div>
      </div>
    </article>
  `).join('');

  if (window.refreshScrollObserver) window.refreshScrollObserver();
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
  const navDesktop = document.querySelector('.nav-desktop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggle && navDesktop) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navDesktop.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    navDesktop.querySelectorAll('.nav-item, .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navDesktop.classList.remove('open');
        toggle.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navDesktop.contains(e.target) && !toggle.contains(e.target)) {
        navDesktop.classList.remove('open');
        toggle.classList.remove('active');
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
