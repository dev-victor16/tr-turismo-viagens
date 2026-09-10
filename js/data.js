/**
 * TR TURISMO VIAGENS - Data Store & State Management
 * Dados verificados da empresa em Ibirité - MG
 * Suporte completo a sincronização com localStorage e persistência no Painel Admin
 */

const TR_DEFAULT_DATA = {
  company: {
    name: "TR TURISMO VIAGENS",
    legalName: "TR TURSIMO VIAGENS LTDA",
    cnpj: "62.424.112/0001-27",
    phone: "(31) 99572-4285",
    whatsapp: "5531995724285",
    email: "contato@trturismoviagens.com.br",
    address: "Rua Baré, 92",
    neighborhood: "Industrial de Ibirité",
    city: "Ibirité",
    state: "MG",
    zipCode: "32415-166",
    workingHours: "Segunda a Sexta: 08h00 às 18h00 | Sábado: 08h00 às 13h00",
    instagram: "https://instagram.com",
    facebook: "https://www.facebook.com/people/Simone-tr-turismo-viagens/100057476839352/",
    googleRating: 4.9,
    googleReviewCount: 112,
    googleMapsEmbed: "https://maps.google.com/maps?q=Rua%20Bar%C3%A9,%2092%20-%20Industrial%20de%20Ibirit%C3%A9,%20Ibirit%C3%A9%20-%20MG&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Rua+Bar%C3%A9+92+Industrial+Ibirite+MG"
  },
  hero: {
    badge: "Agência Oficial em Ibirité • CNPJ 62.424.112/0001-27",
    title: "Sua próxima viagem inesquecível começa aqui.",
    subtitle: "Excursões rodoviárias, pacotes nacionais e atendimento humanizado para você e sua família viajarem com máximo conforto, segurança e tranquilidade saindo de Ibirité e região.",
    ctaPrimaryText: "QUERO VIAJAR",
    ctaPrimaryLink: "#destinos",
    ctaSecondaryText: "FALAR NO WHATSAPP",
    ctaSecondaryLink: "https://wa.me/5531995724285?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TR%20Turismo%20e%20gostaria%20de%20conhecer%20os%20pr%C3%B3ximos%20destinos.",
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
  },
  about: {
    headline: "Quem é a TR Turismo Viagens",
    tagline: "Compromisso com o seu sonho de viajar com segurança e conforto",
    paragraph1: "A **TR TURISMO VIAGENS** é uma agência sediada em Ibirité, Minas Gerais (Rua Baré, 92 – Industrial), fundada com o propósito de transformar viagens em memórias inesquecíveis para famílias, casais e grupos de amigos.",
    paragraph2: "Com profissionais e guias especializados registrados e credenciados, atuamos com foco em **excursões rodoviárias, pacotes completos de lazer, hospedagens selecionadas e fretamento turístico**. Nosso diferencial está na proximidade do atendimento e no cuidado rigoroso com cada detalhe do roteiro.",
    paragraph3: "Aqui você não é apenas mais um passageiro. Desde o primeiro contato via WhatsApp até o retorno do seu destino, nossa equipe garante suporte dedicado, pontualidade nos embarques e transporte confortável de alto padrão.",
    features: [
      {
        icon: "shield-check",
        title: "Empresa 100% Legalizada",
        desc: "CNPJ 62.424.112/0001-27 ativo e conformidade com as normas do setor turístico."
      },
      {
        icon: "bus",
        title: "Ônibus Confortáveis & Seguros",
        desc: "Frotas executivas modernas com ar-condicionado, poltronas reclináveis e motoristas experientes."
      },
      {
        icon: "users",
        title: "Guias Especializados",
        desc: "Acompanhamento profissional dedicado durante toda a viagem para a tranquilidade do seu grupo."
      },
      {
        icon: "heart-handshake",
        title: "Atendimento Humanizado",
        desc: "Suporte acolhedor antes, durante e após a sua viagem diretamente com nossa equipe em Ibirité."
      }
    ]
  },
  services: [
    {
      id: "srv-1",
      icon: "bus-trip",
      title: "Excursões Rodoviárias",
      desc: "Viagens organizadas para praias e cidades turísticas com embarque facilitado em Ibirité e região metropolitana.",
      highlight: "O queridinho das famílias",
      inclusions: ["Transporte executivo", "Guia acompanhante", "Hospedagem com café", "Seguro viagem opcional"]
    },
    {
      id: "srv-2",
      icon: "luggage",
      title: "Pacotes de Viagem Completos",
      desc: "Roteiros nacionais personalizados com passagens, transfer, passeios e hospedagens selecionadas sob medida para você.",
      highlight: "Tudo incluso e sem preocupações",
      inclusions: ["Roteiro detalhado", "Aéreo ou rodoviário", "Hotéis bem avaliados", "Assessoria completa"]
    },
    {
      id: "srv-3",
      icon: "hotel",
      title: "Reservas de Hotéis & Resorts",
      desc: "Acesso a tarifas especiais e parcerias com as melhores redes hoteleiras, pousadas charmosas e resorts all-inclusive.",
      highlight: "Melhor custo-benefício",
      inclusions: ["Reserva confirmada", "Opções all inclusive", "Localizações privilegiadas", "Suporte pré-checkin"]
    },
    {
      id: "srv-4",
      icon: "plane",
      title: "Passagens Aéreas & Rodoviárias",
      desc: "Cotação e emissão ágil das melhores conexões para você viajar com conveniência e economia para qualquer lugar do país.",
      highlight: "Melhores conexões",
      inclusions: ["Pesquisa multitarifa", "Emissão segura", "Auxílio com bagagens", "Marcação de assentos"]
    },
    {
      id: "srv-5",
      icon: "van",
      title: "Fretamento Turístico",
      desc: "Locação de veículos executivos (vans, micro-ônibus e ônibus) com motoristas qualificados para eventos, confraternizações e grupos.",
      highlight: "Exclusividade para seu grupo",
      inclusions: ["Veículos higienizados", "Motoristas credenciados", "Pontualidade garantida", "Itinerário flexível"]
    },
    {
      id: "srv-6",
      icon: "map-pinned",
      title: "Roteiros Sob Medida",
      desc: "Planejamento exclusivo para viagens românticas, celebrações em família ou turismo religioso, atendendo às suas preferências.",
      highlight: "Viagem do seu jeito",
      inclusions: ["Consultoria individual", "Dicas de passeios", "Flexibilidade de datas", "Suporte no WhatsApp"]
    }
  ],
  destinations: [
    {
      id: "dest-1",
      name: "Cabo Frio & Arraial do Cabo",
      category: "Praias",
      tag: "Mais Procurado",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
      description: "O Caribe Brasileiro com praias de águas cristalinas, areia branca e passeios de barco inesquecíveis.",
      duration: "Excursão de Final de Semana ou Feriado",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Transporte Executivo com ar", "Hospedagem com Café", "Guia TR Turismo", "Passeios sugeridos"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-2",
      name: "Porto Seguro & Arraial d'Ajuda",
      category: "Praias",
      tag: "Bahia Fascinante",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
      description: "Muita história, cultura, praias paradisíacas e o calor acolhedor do litoral sul baiano para recarregar as energias.",
      duration: "Pacote 5 a 7 Dias",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Passagens inclusas", "Hotel com lazer", "Café da manhã farto", "Acompanhamento dedicado"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-3",
      name: "Guarapari & Praias Capixabas",
      category: "Praias",
      tag: "Clássico Mineiro",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      description: "O destino preferido dos mineiros com a famosa Praia do Morro, culinária capixaba e diversão para todas as idades.",
      duration: "Excursão 4 Dias",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Ônibus Leito Turismo", "Pousada próxima à praia", "Café da manhã", "Equipe experiente"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-4",
      name: "Caldas Novas & Rio Quente",
      category: "Viagens em Família",
      tag: "Águas Termais",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      description: "O maior parque hidrotermal do mundo! Piscinas aquecidas, parques aquáticos e muito descanso para a família.",
      duration: "Excursão Rodoviária 4 Dias",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Transporte Confortável", "Hotel com parque aquático", "Meia pensão", "Guia credenciado"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-5",
      name: "Ubatuba & Litoral Norte SP",
      category: "Praias",
      tag: "Natureza Exuberante",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      description: "Mais de 100 praias preservadas entre a Mata Atlântica e o mar, cachoeiras e ilhas paradisíacas.",
      duration: "Excursão Feriado Prolongado",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Ônibus executivo", "Hotel com piscina", "Café da manhã", "Roteiro de praias"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-6",
      name: "Aparecida do Norte & Circuito da Fé",
      category: "Excursões Rodoviárias",
      tag: "Turismo Religioso",
      image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=800&q=80",
      description: "Viagem de fé, devoção e acolhimento ao maior santuário mariano do mundo com total conforto e tranquilidade.",
      duration: "Bate-Volta ou Fim de Semana",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Ônibus Leito/Semi-leito", "Parada para almoço", "Guia acompanhante", "Tempo livre no Santuário"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-7",
      name: "Gramado & Canela (Serra Gaúcha)",
      category: "Viagens Nacionais",
      tag: "Charme & Gastronomia",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      description: "A magia europeia no Brasil com chocolates artesanais, parques temáticos e cenários deslumbrantes.",
      duration: "Pacote Aéreo 5 a 6 Dias",
      departure: "Embarque Confins / BH",
      inclusions: ["Aéreo ida e volta", "Hotel selecionado", "Transfer privativo", "Assessoria de passeios"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-8",
      name: "Foz do Iguaçu & Tríplice Fronteira",
      category: "Viagens em Grupo",
      tag: "Maravilha da Natureza",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Conheça uma das 7 Maravilhas Naturais do Mundo, o Parque das Aves e faça compras na fronteira com conforto.",
      duration: "Pacote 5 Dias",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Passagens e transfer", "Hotel com piscina", "Ingressos assessorados", "Suporte contínuo"],
      priceDisplay: "Sob Consulta",
      featured: false
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Maria de Lourdes S.",
      location: "Ibirité - MG",
      rating: 5,
      date: "Avaliação no Google",
      content: "Tudo maravilhoso, perfeito! Equipe maravilhosa, muito confortável e divertido. Super indico a TR Turismo!",
      verified: true
    },
    {
      id: "test-2",
      author: "Carla Mendes R.",
      location: "Ibirité - MG",
      rating: 5,
      date: "Avaliação no Google",
      content: "Guia simpática e atenciosa, ônibus muito confortável e acomodação de primeira qualidade. Agência incomparável em Ibirité!",
      verified: true
    },
    {
      id: "test-3",
      author: "Rogério Ferreira",
      location: "Região Metropolitana de BH",
      rating: 5,
      date: "Avaliação no Google",
      content: "Passeio super organizado, com pontualidade e segurança do início ao fim. Foi uma experiência incrível para toda a minha família!",
      verified: true
    },
    {
      id: "test-4",
      author: "Fernanda Alves",
      location: "Ibirité - MG",
      rating: 5,
      date: "Avaliação no Google",
      content: "Atendimento nota 10! A equipe cuida de cada detalhe com muito carinho para que a gente só se preocupe em curtir o passeio. Já estamos programando a próxima!",
      verified: true
    }
  ],
  leads: []
};

// Gerenciador de Estado / LocalStorage
const StorageManager = {
  STORAGE_KEY: "TR_TURISMO_DATA_V1",
  ADMIN_AUTH_KEY: "TR_TURISMO_ADMIN_AUTH",

  getData() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge seguro com dados padrão para caso de campos novos
        return {
          ...TR_DEFAULT_DATA,
          ...parsed,
          company: { ...TR_DEFAULT_DATA.company, ...(parsed.company || {}) },
          hero: { ...TR_DEFAULT_DATA.hero, ...(parsed.hero || {}) },
          about: { ...TR_DEFAULT_DATA.about, ...(parsed.about || {}) }
        };
      }
    } catch (e) {
      console.warn("Erro ao ler localStorage, utilizando dados padrão:", e);
    }
    return JSON.parse(JSON.stringify(TR_DEFAULT_DATA));
  },

  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
      return false;
    }
  },

  resetData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  },

  addLead(lead) {
    const data = this.getData();
    if (!data.leads) data.leads = [];
    const newLead = {
      id: "lead-" + Date.now(),
      createdAt: new Date().toISOString(),
      ...lead
    };
    data.leads.unshift(newLead);
    this.saveData(data);
    return newLead;
  },

  isLoggedIn() {
    return sessionStorage.getItem(this.ADMIN_AUTH_KEY) === "true";
  },

  login(password) {
    // Senha padrão administrativa personalizável
    if (password === "tr2026" || password === "ibirite2026") {
      sessionStorage.setItem(this.ADMIN_AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(this.ADMIN_AUTH_KEY);
  }
};

// Exportar para escopo global do navegador
window.TR_DATA = StorageManager.getData();
window.StorageManager = StorageManager;
