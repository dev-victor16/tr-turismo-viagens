/**
 * TR TURISMO VIAGENS - FRONTEND APPLICATION JAVASCRIPT
 * Ibirité, Minas Gerais
 * Interações, renderização dinâmica de dados, formulário inteligente e integração WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados atualizados do StorageManager
  const data = window.StorageManager ? window.StorageManager.getData() : window.TR_DEFAULT_DATA;

  // 1. Inicializar Interface e Dados Dinâmicos
  renderCompanyInfo(data.company);
  renderHero(data.hero);
  renderServices(data.services);
  renderDestinations(data.destinations);
  renderSocialProof(data.company, data.testimonials);
  renderContactInfo(data.company);

  // 2. Eventos da Barra de Navegação e Menu Mobile
  setupNavigation();

  // 3. Filtros de Destinos
  setupDestinationFilters(data.destinations);

  // 4. Formulário de Orçamento e Redirecionamento WhatsApp
  setupQuoteForm(data.company);

  // 5. Botão Flutuante e Popup do WhatsApp
  setupWhatsAppWidget(data.company);

  // 6. Atualizar ano no footer
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Renderiza informações globais da empresa
 */
function renderCompanyInfo(company) {
  if (!company) return;

  // Telefones e WhatsApp nos links rápidos
  document.querySelectorAll('.company-phone-text').forEach(el => el.textContent = company.phone);
  document.querySelectorAll('.company-phone-link').forEach(el => el.href = `tel:${company.phone.replace(/\D/g, '')}`);
  
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site da TR Turismo e gostaria de solicitar informações sobre viagens e excursões.")}`;
  document.querySelectorAll('.company-whatsapp-link').forEach(el => el.href = whatsappUrl);

  // Endereço
  document.querySelectorAll('.company-address-text').forEach(el => {
    el.textContent = `${company.address} – ${company.neighborhood}, ${company.city} - ${company.state}`;
  });

  // CNPJ
  document.querySelectorAll('.company-cnpj-text').forEach(el => el.textContent = company.cnpj);
}

/**
 * Renderiza a seção Hero
 */
function renderHero(hero) {
  if (!hero) return;

  const heroSection = document.getElementById('hero-section');
  if (heroSection && hero.backgroundImage) {
    heroSection.style.backgroundImage = `url('${hero.backgroundImage}')`;
  }

  const badgeEl = document.getElementById('hero-badge-text');
  if (badgeEl && hero.badge) badgeEl.textContent = hero.badge;

  const titleEl = document.getElementById('hero-title-text');
  if (titleEl && hero.title) titleEl.textContent = hero.title;

  const subtitleEl = document.getElementById('hero-subtitle-text');
  if (subtitleEl && hero.subtitle) subtitleEl.textContent = hero.subtitle;

  const ctaPrimary = document.getElementById('hero-cta-primary');
  if (ctaPrimary && hero.ctaPrimaryText) {
    ctaPrimary.textContent = hero.ctaPrimaryText;
    ctaPrimary.href = hero.ctaPrimaryLink || '#destinos';
  }
}

/**
 * Renderiza os Serviços Oferecidos
 */
function renderServices(services) {
  const container = document.getElementById('services-grid-container');
  if (!container || !services) return;

  const iconSvgs = {
    'bus-trip': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6v6M16 6v6M2 12h20M6 18h12M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6z"/><circle cx="7" cy="18" r="1"/><circle cx="17" cy="18" r="1"/></svg>`,
    'luggage': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="13" x="4" y="7" rx="2"/><path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"/><circle cx="8" cy="20" r="1"/><circle cx="16" cy="20" r="1"/></svg>`,
    'hotel': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 22v-6.57a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V22M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18M2 22h20"/><path d="M10 6h4M10 10h4"/></svg>`,
    'plane': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>`,
    'van': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    'map-pinned': `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0z"/><circle cx="12" cy="8" r="2"/><path d="M8.7 14.5 3 16v5l6-2 6 2 6-2v-5l-3.3 1.1"/></svg>`
  };

  container.innerHTML = services.map(service => `
    <div class="service-card">
      <div class="service-icon-box">
        ${iconSvgs[service.icon] || iconSvgs['bus-trip']}
      </div>
      <h3 class="service-title">${escapeHTML(service.title)}</h3>
      <p class="service-desc">${escapeHTML(service.desc)}</p>
      <ul class="service-inclusions">
        ${(service.inclusions || []).map(inc => `
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            ${escapeHTML(inc)}
          </li>
        `).join('')}
      </ul>
      <a href="#orcamento" class="btn btn-outline-white btn-sm" onclick="selectServiceForQuote('${escapeHTML(service.title)}')">
        Consultar Serviço
      </a>
    </div>
  `).join('');
}

/**
 * Renderiza o Catálogo de Destinos
 */
function renderDestinations(destinations, activeCategory = 'Todos') {
  const container = document.getElementById('destinations-grid-container');
  if (!container || !destinations) return;

  const filtered = activeCategory === 'Todos' 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 1rem;">Nenhum destino encontrado para a categoria <strong>${escapeHTML(activeCategory)}</strong> no momento.</p>
        <button class="btn btn-primary" onclick="resetDestinationFilter()">Ver todos os destinos</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dest => `
    <div class="destination-card" data-category="${escapeHTML(dest.category)}">
      <div class="card-image-wrap">
        <img src="${dest.image}" alt="${escapeHTML(dest.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'">
        ${dest.tag ? `<span class="card-tag">${escapeHTML(dest.tag)}</span>` : ''}
        <span class="card-category">${escapeHTML(dest.category)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHTML(dest.name)}</h3>
        <p class="card-desc">${escapeHTML(dest.description)}</p>
        
        <ul class="card-inclusions">
          ${(dest.inclusions || []).slice(0, 3).map(inc => `
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${escapeHTML(inc)}
            </li>
          `).join('')}
        </ul>

        <div class="card-footer">
          <div class="card-price-block">
            <span class="card-price-label">Valores</span>
            <span class="card-price-value">${escapeHTML(dest.priceDisplay || 'Sob Consulta')}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="selectDestinationForQuote('${escapeHTML(dest.name)}')">
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Configura os Filtros de Categoria de Destinos
 */
function setupDestinationFilters(destinations) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderDestinations(destinations, category);
    });
  });
}

function resetDestinationFilter() {
  const allBtn = document.querySelector('.filter-btn[data-category="Todos"]');
  if (allBtn) allBtn.click();
}

/**
 * Preenche o destino selecionado e rola suavemente até o formulário de cotação
 */
window.selectDestinationForQuote = function(destinationName) {
  const quoteSection = document.getElementById('orcamento');
  const destinationInput = document.getElementById('quote-destination');
  
  if (destinationInput) {
    destinationInput.value = destinationName;
    destinationInput.classList.add('highlight-field');
    setTimeout(() => destinationInput.classList.remove('highlight-field'), 1500);
  }

  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Preenche o serviço selecionado no campo de observações do formulário
 */
window.selectServiceForQuote = function(serviceTitle) {
  const quoteSection = document.getElementById('orcamento');
  const notesInput = document.getElementById('quote-notes');
  const travelType = document.getElementById('quote-type');

  if (travelType) {
    travelType.value = serviceTitle.includes('Excursão') ? 'Excursão em Grupo' : 'Pacote Completo';
  }

  if (notesInput) {
    notesInput.value = `Interesse no serviço: ${serviceTitle}. Gostaria de mais detalhes sobre valores e disponibilidade.`;
  }

  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Prova Social (Nota Google 4.9 e Depoimentos Verificados)
 */
function renderSocialProof(company, testimonials) {
  const ratingEl = document.getElementById('google-rating-score');
  if (ratingEl && company.googleRating) {
    ratingEl.textContent = company.googleRating.toFixed(1);
  }

  const countEl = document.getElementById('google-reviews-count');
  if (countEl && company.googleReviewCount) {
    countEl.textContent = `Mais de ${company.googleReviewCount} avaliações reais`;
  }

  const container = document.getElementById('testimonials-grid-container');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(test => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-quote">“${escapeHTML(test.content)}”</p>
      <div class="testimonial-author">
        <div class="author-avatar">${test.author.charAt(0)}</div>
        <div class="author-meta">
          <strong>${escapeHTML(test.author)}</strong>
          <span>${escapeHTML(test.location || 'Ibirité - MG')} • ${escapeHTML(test.date || 'Google')}</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Renderiza informações de Contato & Mapa
 */
function renderContactInfo(company) {
  if (!company) return;

  const hoursEl = document.getElementById('contact-working-hours');
  if (hoursEl) hoursEl.textContent = company.workingHours;

  const mapIframe = document.getElementById('google-maps-iframe');
  if (mapIframe && company.googleMapsEmbed) {
    mapIframe.src = company.googleMapsEmbed;
  }
}

/**
 * Configuração do Formulário de Cotação e Redirecionamento WhatsApp
 */
function setupQuoteForm(company) {
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
      alert("Por favor, preencha pelo menos seu Nome, WhatsApp e Destino de interesse.");
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

    // Montar mensagem limpa e estruturada exatamente conforme orientado
    const message = 
`Olá! Vim pelo site da TR Turismo e gostaria de solicitar um orçamento.

Destino: ${destination}
Período: ${dates || 'A definir'}
Passageiros: ${passengers || '1'}
Tipo de viagem: ${type}
Observações: ${notes || 'Sem observações'}

Meu nome: ${name}
Meu WhatsApp: ${phone}`;

    // Construir URL do WhatsApp oficial (31) 99572-4285
    const waNumber = company.whatsapp || '5531995724285';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    // Feedback visual
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Abrindo WhatsApp...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 600);
  });
}

/**
 * Configuração do Botão e Widget Flutuante do WhatsApp
 */
function setupWhatsAppWidget(company) {
  const triggerBtn = document.getElementById('whatsapp-floating-trigger');
  const popup = document.getElementById('whatsapp-chat-popup');
  const closeBtn = document.getElementById('whatsapp-popup-close');

  if (!triggerBtn || !popup) return;

  triggerBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !triggerBtn.contains(e.target)) {
      popup.classList.remove('active');
    }
  });

  // Ação rápida: Falar com atendente
  const directChatBtn = document.getElementById('quick-action-direct');
  if (directChatBtn) {
    directChatBtn.addEventListener('click', () => {
      const msg = "Olá! Vim pelo site da TR Turismo e gostaria de falar com um atendente.";
      window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
      popup.classList.remove('active');
    });
  }

  // Ação rápida: Roteiros do mês
  const monthlyTripsBtn = document.getElementById('quick-action-trips');
  if (monthlyTripsBtn) {
    monthlyTripsBtn.addEventListener('click', () => {
      const msg = "Olá! Gostaria de saber quais são as próximas excursões e roteiros programados da TR Turismo saindo de Ibirité.";
      window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
      popup.classList.remove('active');
    });
  }
}

/**
 * Configuração da Navegação e Menu Mobile
 */
function setupNavigation() {
  const header = document.querySelector('.main-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('main-nav-menu');

  // Efeito sticky e sombra ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Toggle mobile drawer
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Fechar ao clicar em um link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
}

// Utilitário de escape de texto contra XSS
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
