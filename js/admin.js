/**
 * TR TURISMO VIAGENS - PAINEL ADMINISTRATIVO
 * Lógica do Dashboard para gestão de conteúdos comerciais, destinos, serviços, depoimentos e leads.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Verificação de Autenticação
  checkAuthentication();

  // 2. Inicializar Abas
  setupTabs();

  // 3. Carregar Dados nos Formulários
  loadAllAdminData();

  // 4. Configurar Listeners dos Formulários de Salvamento
  setupSaveHandlers();

  // 5. Configurar Modais e CRUD de Destinos e Depoimentos
  setupDestinationsCRUD();
  setupTestimonialsCRUD();
  setupLeadsManager();
  setupBackupManager();
});

let currentEditingDestinationId = null;
let currentEditingTestimonialId = null;

/**
 * Autenticação do Administrador
 */
function checkAuthentication() {
  const loginOverlay = document.getElementById('admin-login-overlay');
  const loginForm = document.getElementById('admin-login-form');
  const loginPassInput = document.getElementById('admin-password-input');
  const loginError = document.getElementById('admin-login-error');
  const logoutBtn = document.getElementById('admin-logout-btn');

  if (!StorageManager.isLoggedIn()) {
    if (loginOverlay) loginOverlay.style.display = 'flex';
  } else {
    if (loginOverlay) loginOverlay.style.display = 'none';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = loginPassInput.value.trim();
      if (StorageManager.login(pass)) {
        loginOverlay.style.display = 'none';
        showToast("Login realizado com sucesso!");
        loadAllAdminData();
      } else {
        if (loginError) loginError.textContent = "Senha incorreta. (Dica padrão: tr2026)";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      StorageManager.logout();
      window.location.reload();
    });
  }
}

/**
 * Configuração de Troca de Abas
 */
function setupTabs() {
  const navItems = document.querySelectorAll('.admin-nav-item[data-tab]');
  const panes = document.querySelectorAll('.admin-tab-pane');
  const topbarTitle = document.getElementById('admin-current-tab-title');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      panes.forEach(pane => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      if (topbarTitle) {
        topbarTitle.textContent = item.querySelector('span')?.textContent || 'Painel';
      }
    });
  });
}

/**
 * Carrega todos os dados existentes nos formulários
 */
function loadAllAdminData() {
  const data = StorageManager.getData();

  // Dados da Empresa
  setVal('adm-company-name', data.company.name);
  setVal('adm-legal-name', data.company.legalName);
  setVal('adm-cnpj', data.company.cnpj);
  setVal('adm-phone', data.company.phone);
  setVal('adm-whatsapp', data.company.whatsapp);
  setVal('adm-email', data.company.email);
  setVal('adm-address', data.company.address);
  setVal('adm-neighborhood', data.company.neighborhood);
  setVal('adm-city', data.company.city);
  setVal('adm-state', data.company.state);
  setVal('adm-zip', data.company.zipCode);
  setVal('adm-hours', data.company.workingHours);
  setVal('adm-facebook', data.company.facebook);
  setVal('adm-instagram', data.company.instagram);
  setVal('adm-google-rating', data.company.googleRating);
  setVal('adm-google-reviews', data.company.googleReviewCount);

  // Hero / Banner
  setVal('adm-hero-badge', data.hero.badge);
  setVal('adm-hero-title', data.hero.title);
  setVal('adm-hero-subtitle', data.hero.subtitle);
  setVal('adm-hero-bg', data.hero.backgroundImage);
  setVal('adm-hero-cta1-text', data.hero.ctaPrimaryText);
  setVal('adm-hero-cta1-link', data.hero.ctaPrimaryLink);

  // Sobre a Empresa
  if (data.about) {
    setVal('adm-about-headline', data.about.headline);
    setVal('adm-about-tagline', data.about.tagline);
    setVal('adm-about-p1', data.about.paragraph1);
    setVal('adm-about-p2', data.about.paragraph2);
    setVal('adm-about-p3', data.about.paragraph3);
  }

  // Renderizar tabelas
  renderDestinationsTable(data.destinations || []);
  renderServicesAdminList(data.services || []);
  renderTestimonialsTable(data.testimonials || []);
  renderLeadsTable(data.leads || []);
}

/**
 * Handlers de Salvamento dos Formulários Gerais
 */
function setupSaveHandlers() {
  // Salvar Empresa
  const companyForm = document.getElementById('admin-company-form');
  if (companyForm) {
    companyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = StorageManager.getData();
      data.company = {
        ...data.company,
        name: getVal('adm-company-name'),
        legalName: getVal('adm-legal-name'),
        cnpj: getVal('adm-cnpj'),
        phone: getVal('adm-phone'),
        whatsapp: getVal('adm-whatsapp').replace(/\D/g, ''),
        email: getVal('adm-email'),
        address: getVal('adm-address'),
        neighborhood: getVal('adm-neighborhood'),
        city: getVal('adm-city'),
        state: getVal('adm-state'),
        zipCode: getVal('adm-zip'),
        workingHours: getVal('adm-hours'),
        facebook: getVal('adm-facebook'),
        instagram: getVal('adm-instagram'),
        googleRating: parseFloat(getVal('adm-google-rating')) || 4.9,
        googleReviewCount: parseInt(getVal('adm-google-reviews')) || 100
      };
      StorageManager.saveData(data);
      showToast("Dados da empresa atualizados com sucesso!");
    });
  }

  // Salvar Banner / Hero
  const heroForm = document.getElementById('admin-hero-form');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = StorageManager.getData();
      data.hero = {
        ...data.hero,
        badge: getVal('adm-hero-badge'),
        title: getVal('adm-hero-title'),
        subtitle: getVal('adm-hero-subtitle'),
        backgroundImage: getVal('adm-hero-bg'),
        ctaPrimaryText: getVal('adm-hero-cta1-text'),
        ctaPrimaryLink: getVal('adm-hero-cta1-link')
      };
      StorageManager.saveData(data);
      showToast("Banner e Hero atualizados com sucesso!");
    });
  }

  // Salvar Textos Institucionais
  const aboutForm = document.getElementById('admin-about-form');
  if (aboutForm) {
    aboutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = StorageManager.getData();
      data.about = {
        ...data.about,
        headline: getVal('adm-about-headline'),
        tagline: getVal('adm-about-tagline'),
        paragraph1: getVal('adm-about-p1'),
        paragraph2: getVal('adm-about-p2'),
        paragraph3: getVal('adm-about-p3')
      };
      StorageManager.saveData(data);
      showToast("Textos institucionais atualizados com sucesso!");
    });
  }
}

/**
 * CRUD de Destinos
 */
function setupDestinationsCRUD() {
  const modal = document.getElementById('destination-modal');
  const addBtn = document.getElementById('admin-add-destination-btn');
  const closeBtn = document.getElementById('destination-modal-close');
  const cancelBtn = document.getElementById('destination-modal-cancel');
  const form = document.getElementById('destination-edit-form');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      currentEditingDestinationId = null;
      form.reset();
      document.getElementById('dest-modal-title').textContent = "Adicionar Novo Destino";
      modal.classList.add('open');
    });
  }

  const closeModal = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = StorageManager.getData();
      const name = getVal('dest-form-name');
      const category = getVal('dest-form-category');
      const tag = getVal('dest-form-tag');
      const image = getVal('dest-form-image');
      const description = getVal('dest-form-description');
      const priceDisplay = getVal('dest-form-price') || 'Sob Consulta';
      const inclusionsStr = getVal('dest-form-inclusions');
      const inclusions = inclusionsStr ? inclusionsStr.split('\n').map(s => s.trim()).filter(Boolean) : [];

      if (currentEditingDestinationId) {
        // Atualizar existente
        const index = data.destinations.findIndex(d => d.id === currentEditingDestinationId);
        if (index !== -1) {
          data.destinations[index] = {
            ...data.destinations[index],
            name,
            category,
            tag,
            image,
            description,
            priceDisplay,
            inclusions
          };
        }
      } else {
        // Criar novo
        const newDest = {
          id: "dest-" + Date.now(),
          name,
          category,
          tag,
          image: image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
          description,
          duration: "A combinar",
          departure: "Saída de Ibirité / BH",
          inclusions,
          priceDisplay,
          featured: true
        };
        data.destinations.unshift(newDest);
      }

      StorageManager.saveData(data);
      renderDestinationsTable(data.destinations);
      closeModal();
      showToast("Destino salvo com sucesso!");
    });
  }
}

function renderDestinationsTable(destinations) {
  const tbody = document.getElementById('destinations-table-body');
  if (!tbody) return;

  if (destinations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b;">Nenhum destino cadastrado. Clique no botão acima para adicionar.</td></tr>`;
    return;
  }

  tbody.innerHTML = destinations.map(dest => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${dest.image}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100&q=80'">
          <div>
            <strong>${escapeHTML(dest.name)}</strong>
            <span style="display: block; font-size: 0.75rem; color: #64748b;">${escapeHTML(dest.tag || 'Sem tag')}</span>
          </div>
        </div>
      </td>
      <td><span class="badge-status active">${escapeHTML(dest.category)}</span></td>
      <td><strong>${escapeHTML(dest.priceDisplay || 'Sob Consulta')}</strong></td>
      <td>
        <span style="font-size: 0.8rem; color: #475569;">${(dest.inclusions || []).length} itens inclusos</span>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-icon" title="Editar" onclick="openEditDestination('${dest.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button class="btn-icon delete" title="Excluir" onclick="deleteDestination('${dest.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.openEditDestination = function(id) {
  const data = StorageManager.getData();
  const dest = data.destinations.find(d => d.id === id);
  if (!dest) return;

  currentEditingDestinationId = id;
  setVal('dest-form-name', dest.name);
  setVal('dest-form-category', dest.category);
  setVal('dest-form-tag', dest.tag || '');
  setVal('dest-form-image', dest.image || '');
  setVal('dest-form-price', dest.priceDisplay || '');
  setVal('dest-form-description', dest.description || '');
  setVal('dest-form-inclusions', (dest.inclusions || []).join('\n'));

  document.getElementById('dest-modal-title').textContent = "Editar Destino";
  document.getElementById('destination-modal').classList.add('open');
};

window.deleteDestination = function(id) {
  if (confirm("Tem certeza de que deseja remover este destino?")) {
    const data = StorageManager.getData();
    data.destinations = data.destinations.filter(d => d.id !== id);
    StorageManager.saveData(data);
    renderDestinationsTable(data.destinations);
    showToast("Destino removido!");
  }
};

/**
 * Gestão de Serviços
 */
function renderServicesAdminList(services) {
  const container = document.getElementById('services-admin-container');
  if (!container) return;

  container.innerHTML = services.map((srv, index) => `
    <div class="admin-card" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h4 style="margin: 0; color: var(--admin-navy); font-size: 1.1rem;">#${index + 1} - ${escapeHTML(srv.title)}</h4>
        <span style="font-size: 0.8rem; color: #64748b;">ID: ${srv.id}</span>
      </div>
      <div class="admin-grid-2">
        <div class="admin-form-group">
          <label>Título do Serviço</label>
          <input type="text" class="admin-input" id="srv-title-${srv.id}" value="${escapeHTML(srv.title)}">
        </div>
        <div class="admin-form-group">
          <label>Destaque / Chamada Curta</label>
          <input type="text" class="admin-input" id="srv-highlight-${srv.id}" value="${escapeHTML(srv.highlight || '')}">
        </div>
        <div class="admin-form-group full-width">
          <label>Descrição Completa</label>
          <textarea class="admin-textarea" id="srv-desc-${srv.id}">${escapeHTML(srv.desc)}</textarea>
        </div>
        <div class="admin-form-group full-width">
          <label>Inclusões (1 por linha)</label>
          <textarea class="admin-textarea" id="srv-inclusions-${srv.id}">${(srv.inclusions || []).join('\n')}</textarea>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="saveSingleService('${srv.id}')">Salvar Este Serviço</button>
    </div>
  `).join('');
}

window.saveSingleService = function(id) {
  const data = StorageManager.getData();
  const index = data.services.findIndex(s => s.id === id);
  if (index === -1) return;

  const title = document.getElementById(`srv-title-${id}`).value.trim();
  const highlight = document.getElementById(`srv-highlight-${id}`).value.trim();
  const desc = document.getElementById(`srv-desc-${id}`).value.trim();
  const inclusionsStr = document.getElementById(`srv-inclusions-${id}`).value;
  const inclusions = inclusionsStr.split('\n').map(s => s.trim()).filter(Boolean);

  data.services[index] = {
    ...data.services[index],
    title,
    highlight,
    desc,
    inclusions
  };

  StorageManager.saveData(data);
  showToast("Serviço atualizado!");
};

/**
 * CRUD de Depoimentos
 */
function setupTestimonialsCRUD() {
  const modal = document.getElementById('testimonial-modal');
  const addBtn = document.getElementById('admin-add-testimonial-btn');
  const closeBtn = document.getElementById('testimonial-modal-close');
  const cancelBtn = document.getElementById('testimonial-modal-cancel');
  const form = document.getElementById('testimonial-edit-form');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      currentEditingTestimonialId = null;
      form.reset();
      document.getElementById('test-modal-title').textContent = "Adicionar Depoimento Real";
      modal.classList.add('open');
    });
  }

  const closeModal = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = StorageManager.getData();
      const author = getVal('test-form-author');
      const location = getVal('test-form-location');
      const content = getVal('test-form-content');

      if (currentEditingTestimonialId) {
        const index = data.testimonials.findIndex(t => t.id === currentEditingTestimonialId);
        if (index !== -1) {
          data.testimonials[index] = {
            ...data.testimonials[index],
            author,
            location,
            content
          };
        }
      } else {
        const newTest = {
          id: "test-" + Date.now(),
          author,
          location: location || "Ibirité - MG",
          rating: 5,
          date: "Avaliação no Google",
          content,
          verified: true
        };
        data.testimonials.unshift(newTest);
      }

      StorageManager.saveData(data);
      renderTestimonialsTable(data.testimonials);
      closeModal();
      showToast("Depoimento salvo!");
    });
  }
}

function renderTestimonialsTable(testimonials) {
  const tbody = document.getElementById('testimonials-table-body');
  if (!tbody) return;

  if (testimonials.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #64748b;">Nenhum depoimento registrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = testimonials.map(test => `
    <tr>
      <td><strong>${escapeHTML(test.author)}</strong></td>
      <td>${escapeHTML(test.location || 'Ibirité')}</td>
      <td><span style="font-size: 0.85rem; color: #334155;">“${escapeHTML(test.content)}”</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-icon" title="Editar" onclick="openEditTestimonial('${test.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button class="btn-icon delete" title="Excluir" onclick="deleteTestimonial('${test.id}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.openEditTestimonial = function(id) {
  const data = StorageManager.getData();
  const test = data.testimonials.find(t => t.id === id);
  if (!test) return;

  currentEditingTestimonialId = id;
  setVal('test-form-author', test.author);
  setVal('test-form-location', test.location);
  setVal('test-form-content', test.content);

  document.getElementById('test-modal-title').textContent = "Editar Depoimento";
  document.getElementById('testimonial-modal').classList.add('open');
};

window.deleteTestimonial = function(id) {
  if (confirm("Remover este depoimento?")) {
    const data = StorageManager.getData();
    data.testimonials = data.testimonials.filter(t => t.id !== id);
    StorageManager.saveData(data);
    renderTestimonialsTable(data.testimonials);
    showToast("Depoimento excluído!");
  }
};

/**
 * Gestor de Leads / Orçamentos Recebidos
 */
function setupLeadsManager() {
  const clearBtn = document.getElementById('admin-clear-leads-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm("Deseja apagar todo o histórico de cotações recebidas?")) {
        const data = StorageManager.getData();
        data.leads = [];
        StorageManager.saveData(data);
        renderLeadsTable([]);
        showToast("Histórico de cotações esvaziado.");
      }
    });
  }
}

function renderLeadsTable(leads) {
  const tbody = document.getElementById('leads-table-body');
  const badgeCount = document.getElementById('admin-leads-badge');
  if (badgeCount) {
    badgeCount.textContent = leads.length;
    badgeCount.style.display = leads.length > 0 ? 'inline-block' : 'none';
  }

  if (!tbody) return;

  if (leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #64748b; padding: 2rem;">Nenhum pedido de orçamento registrado ainda. Os formulários enviados no site aparecerão aqui.</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(lead => {
    const dateStr = new Date(lead.createdAt).toLocaleString('pt-BR');
    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
    const waChatUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${lead.name}! Recebemos sua solicitação de orçamento para ${lead.destination} pelo site da TR Turismo Viagens.`)}`;

    return `
      <tr>
        <td><small style="color: #64748b;">${dateStr}</small></td>
        <td><strong>${escapeHTML(lead.name)}</strong></td>
        <td>
          <a href="${waChatUrl}" target="_blank" style="color: #059669; font-weight: 600; display: inline-flex; align-items: center; gap: 0.3rem;">
            ${escapeHTML(lead.phone)}
          </a>
        </td>
        <td><span class="badge-status new">${escapeHTML(lead.destination)}</span></td>
        <td>${escapeHTML(lead.passengers || '1')} pax • ${escapeHTML(lead.type || 'Padrão')}</td>
        <td>
          <a href="${waChatUrl}" target="_blank" class="btn btn-whatsapp btn-sm" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
            Responder no WhatsApp
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Backup e Restauração de Dados
 */
function setupBackupManager() {
  const exportBtn = document.getElementById('admin-export-json-btn');
  const importInput = document.getElementById('admin-import-json-input');
  const resetBtn = document.getElementById('admin-reset-default-btn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = StorageManager.getData();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup_tr_turismo_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Backup JSON gerado com sucesso!");
    });
  }

  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.company && parsed.destinations) {
            StorageManager.saveData(parsed);
            loadAllAdminData();
            showToast("Dados restaurados com sucesso!");
          } else {
            alert("Arquivo JSON inválido.");
          }
        } catch (err) {
          alert("Erro ao ler arquivo JSON: " + err.message);
        }
      };
      reader.readAsText(file);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("ATENÇÃO: Deseja redefinir todos os dados para os valores originais verificados de Ibirité? As alterações não salvas em backup serão perdidas.")) {
        StorageManager.resetData();
        loadAllAdminData();
        showToast("Dados redefinidos para o padrão original!");
      }
    });
  }
}

// Utilitários de Formulário
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined && val !== null) {
    el.value = val;
  }
}

function showToast(message) {
  const toast = document.getElementById('admin-toast');
  if (!toast) return;
  toast.querySelector('.toast-text').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
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
