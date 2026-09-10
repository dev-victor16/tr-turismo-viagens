/**
 * TR TURISMO VIAGENS - DATA STORE & STATE MANAGEMENT
 * Dados verificados da empresa em Ibirité - MG
 * Identidade conectada ao Instagram oficial @trturismoviagens
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
    instagram: "https://www.instagram.com/trturismoviagens/",
    facebook: "https://www.facebook.com/people/Simone-tr-turismo-viagens/100057476839352/",
    googleRating: 4.9,
    googleReviewCount: 112,
    googleMapsEmbed: "https://maps.google.com/maps?q=Rua%20Bar%C3%A9,%2092%20-%20Industrial%20de%20Ibirit%C3%A9,%20Ibirit%C3%A9%20-%20MG&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Rua+Bar%C3%A9+92+Industrial+Ibirite+MG"
  },
  hero: {
    badge: "Agência Oficial em Ibirité • CNPJ 62.424.112/0001-27",
    title: "VIAJE COM A TR TURISMO",
    subtitle: "Excursões rodoviárias e viagens completas saindo de Ibirité e região. A gente cuida do ônibus, da hospedagem e de cada detalhe do roteiro para você só aproveitar.",
    ctaPrimaryText: "VER PRÓXIMAS VIAGENS",
    ctaPrimaryLink: "#destinos",
    ctaSecondaryText: "FALAR NO WHATSAPP",
    ctaSecondaryLink: "https://wa.me/5531995724285?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TR%20Turismo%20e%20gostaria%20de%20saber%20das%20pr%C3%B3ximas%20viagens.",
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85"
  },
  about: {
    headline: "Quem é a TR Turismo Viagens",
    tagline: "Uma agência real, sediada em Ibirité, para você viajar sem complicação.",
    paragraph1: "A gente sabe que planejar viagem para a família ou para um grupo dá trabalho: encontrar hospedagem boa, acertar horários de trânsito e organizar quem vai e quem fica. É aí que a TR Turismo entra.",
    paragraph2: "Nossa sede fica na Rua Baré, 92, no Industrial de Ibirité. Atuamos com CNPJ ativo (62.424.112/0001-27) e profissionais registrados no Cadastur como guia de turismo e excursão. Aqui você fala com gente de verdade, tira dúvidas direto no WhatsApp e embarca com quem conhece o roteiro.",
    paragraph3: "Seja para um fim de semana em Cabo Frio ou Guarapari, um banho de piscina em Caldas Novas ou o fretamento de transporte para um passeio exclusivo do seu grupo, nosso foco é pontualidade no embarque e cuidado na estrada.",
    features: [
      {
        icon: "map-pin",
        title: "Embarques em Ibirité e BH",
        desc: "Pontos de encontro práticos e organizados na nossa região para você não perder tempo."
      },
      {
        icon: "users",
        title: "Acompanhamento no Grupo",
        desc: "Guias presentes durante todo o passeio para dar apoio com horários, hotel e dicas locais."
      },
      {
        icon: "hotel",
        title: "Hospedagens Bem Cuidadas",
        desc: "Hotéis e pousadas parceiras com café da manhã e boa estrutura para você e sua família descansarem."
      },
      {
        icon: "shield",
        title: "Agência 100% Regularizada",
        desc: "Empresa registrada, sede física no Industrial de Ibirité e atendimento direto pelo canal oficial."
      }
    ]
  },
  services: [
    {
      id: "srv-1",
      icon: "bus-trip",
      title: "Excursões Rodoviárias",
      desc: "Nossas tradicionais viagens em grupo para praias e cidades turísticas, com transporte confortável e hotel garantido.",
      highlight: "O favorito dos viajantes de Ibirité",
      inclusions: ["Transporte executivo com ar", "Hospedagem com café", "Guia acompanhante no grupo"]
    },
    {
      id: "srv-2",
      icon: "luggage",
      title: "Pacotes de Viagem Sob Medida",
      desc: "Roteiros completos nacionais para você e sua família viajarem no próprio ritmo, com tudo reservado com antecedência.",
      highlight: "Viagem do seu jeito",
      inclusions: ["Passagens aéreas ou rodoviárias", "Hotéis selecionados", "Suporte antes e durante o passeio"]
    },
    {
      id: "srv-3",
      icon: "van",
      title: "Fretamento de Vans e Ônibus",
      desc: "Locação de veículos com motoristas experientes para viagens de igrejas, encontros de família, eventos ou confraternizações.",
      highlight: "Exclusivo para o seu grupo",
      inclusions: ["Veículos revisados e confortáveis", "Motoristas qualificados", "Itinerário flexível"]
    },
    {
      id: "srv-4",
      icon: "hotel",
      title: "Reservas de Hotéis & Pousadas",
      desc: "Pesquisa e emissão de hospedagens com tarifas negociadas para você não cair em furadas pela internet.",
      highlight: "Segurança na hospedagem",
      inclusions: ["Reserva confirmada", "Opções com café ou pensão", "Apoio no check-in"]
    }
  ],
  destinations: [
    {
      id: "dest-1",
      name: "Cabo Frio & Arraial do Cabo",
      category: "Praias",
      tag: "O Queridinho da TR Turismo",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1000&q=85",
      description: "Praias de água transparente na Região dos Lagos. Roteiro clássico da agência com tempo livre para passeios de barco e descanso.",
      duration: "Excursão de Final de Semana ou Feriado",
      departure: "Embarques em Ibirité e BH",
      inclusions: ["Ônibus executivo com ar-condicionado", "Pousada com café da manhã farto", "Guia da TR Turismo"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-2",
      name: "Guarapari & Praias Capixabas",
      category: "Praias",
      tag: "Tradição das Férias",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      description: "Praia do Morro, culinária à beira-mar e dias de muito sol para recarregar as energias com a família.",
      duration: "Excursão 4 a 5 Dias",
      departure: "Embarques em Ibirité e BH",
      inclusions: ["Transporte rodoviário confortável", "Hospedagem próxima à praia", "Acompanhamento no grupo"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-3",
      name: "Caldas Novas & Rio Quente",
      category: "Família",
      tag: "Águas Quentes & Parques",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      description: "Piscinas quentinhas dia e noite, toboáguas e muito lazer para crianças e adultos descansarem juntos.",
      duration: "Excursão 4 Dias",
      departure: "Embarques em Ibirité e BH",
      inclusions: ["Transporte com ar", "Hotel com parque aquático", "Guia dedicado"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-4",
      name: "Porto Seguro & Arraial d'Ajuda",
      category: "Praias",
      tag: "Litoral Sul Baiano",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
      description: "Barracas de praia estruturadas, centro histórico e a hospitalidade baiana com conforto planejado do início ao fim.",
      duration: "Pacote 5 a 7 Dias",
      departure: "Saída de Ibirité / BH",
      inclusions: ["Transporte e transfers", "Hotel com piscina e café", "Suporte no WhatsApp"],
      priceDisplay: "Sob Consulta",
      featured: false
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Maria de Lourdes",
      location: "Ibirité - MG",
      rating: 5,
      date: "Avaliação no Google",
      content: "Tudo maravilhoso, perfeito! Equipe maravilhosa, muito confortável e divertido. Super indico a TR Turismo!",
      verified: true
    },
    {
      id: "test-2",
      author: "Carla Mendes",
      location: "Ibirité - MG",
      rating: 5,
      date: "Avaliação no Google",
      content: "Guia simpática e atenciosa, ônibus confortável e acomodação muito boa. Agência incomparável em Ibirité!",
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
    }
  ],
  leads: []
};

// Gerenciador de Estado / LocalStorage
const StorageManager = {
  STORAGE_KEY: "TR_TURISMO_DATA_V3",
  ADMIN_AUTH_KEY: "TR_TURISMO_ADMIN_AUTH",

  getData() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
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

window.TR_DATA = StorageManager.getData();
window.StorageManager = StorageManager;
