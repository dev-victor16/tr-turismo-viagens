/**
 * TR TURISMO VIAGENS - DATA STORE & STATE MANAGEMENT
 * Dados verificados da empresa em Ibirité - MG
 * Identidade conectada às Fotografias Reais e ao Instagram @trturismoviagens
 */

const TR_DEFAULT_DATA = {
  company: {
    name: "TR TURISMO VIAGENS",
    legalName: "TR TURSIMO VIAGENS LTDA",
    cnpj: "62.424.112/0001-27",
    phone: "(31) 99572-4285",
    phone2: "(31) 99746-8553",
    whatsapp: "5531995724285",
    whatsapp2: "5531997468553",
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
    logo: "images/tr-logo-transparente.png",
    googleMapsEmbed: "https://maps.google.com/maps?q=Rua%20Bar%C3%A9,%2092%20-%20Industrial%20de%20Ibirit%C3%A9,%20Ibirit%C3%A9%20-%20MG&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Rua+Bar%C3%A9+92+Industrial+Ibirite+MG"
  },
  hero: {
    badge: "Agência Oficial em Ibirité • CNPJ 62.424.112/0001-27",
    title: "A ESTRADA É NOSSA PAIXÃO. O DESTINO É SEU.",
    subtitle: "Roteiros planejados com carinho, segurança e experiências que ficam para sempre na memória. Do embarque em Ibirité aos destinos mais sonhados do Brasil e do mundo.",
    ctaPrimaryText: "CONHECER VIAGENS",
    ctaPrimaryLink: "#destinos",
    ctaSecondaryText: "RESERVAR NO WHATSAPP",
    ctaSecondaryLink: "https://wa.me/5531995724285?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20TR%20Turismo%20e%20gostaria%20de%20fazer%20uma%20reserva.",
    backgroundImage: "images/foto-praia-tropical.jpg"
  },
  about: {
    headline: "Quem é a TR Turismo Viagens",
    tagline: "Uma agência real, de Ibirité, feita de pessoas apaixonadas por viajar.",
    paragraph1: "A gente sabe que planejar viagem dá trabalho: encontrar hotel bom, organizar transporte, acertar horários e garantir a segurança de quem vai. É exatamente para isso que a TR Turismo existe.",
    paragraph2: "Nossa sede fica na Rua Baré, 92, no Industrial de Ibirité/MG. Trabalhamos com CNPJ regularizado (62.424.112/0001-27) e profissionais credenciados no Cadastur como guia de turismo e excursão. Aqui você conversa direto com a equipe no WhatsApp e viaja com quem conhece a estrada.",
    paragraph3: "Seja para relaxar na praia, curtir os parques de Caldas Novas, se encantar com as Cataratas do Iguaçu ou embarcar para a neve na Cordilheira dos Andes no Chile, nosso compromisso é cuidar de tudo para você só aproveitar.",
    features: [
      {
        icon: "map-pin",
        title: "Embarques Organizados em Ibirité e BH",
        desc: "Pontos de encontro práticos e conhecidos na nossa cidade para você começar a viajar sem estresse."
      },
      {
        icon: "users",
        title: "Acompanhamento Durante Todo o Roteiro",
        desc: "Guias presentes no grupo cuidando de horários, hotéis e dando apoio em cada momento."
      },
      {
        icon: "hotel",
        title: "Hospedagens Cuidadosamente Selecionadas",
        desc: "Pousadas e hotéis parceiros aprovados pelos nossos próprios passageiros com café da manhã."
      },
      {
        icon: "shield",
        title: "Segurança, Confiança e CNPJ Ativo",
        desc: "Empresa registrada e atendimento com dois canais diretos de WhatsApp oficial."
      }
    ]
  },
  pillars: [
    {
      number: "1",
      title: "Roteiros planejados com cuidado",
      subtitle: "Cada detalhe pensado para que sua viagem seja perfeita, sem estresse.",
      image: "images/foto-chile-andes.jpg",
      cardImage: "images/tr-card-1-roteiros-chile.jpg",
      location: "Cordilheira dos Andes • Chile"
    },
    {
      number: "2",
      title: "Atendimento personalizado",
      subtitle: "Equipe pronta para tirar dúvidas e ajudar em tudo que você precisar.",
      image: "images/foto-balneario-camboriu.jpg",
      cardImage: "images/tr-card-2-atendimento-balneario.jpg",
      location: "Balneário Camboriú • SC"
    },
    {
      number: "3",
      title: "Facilidade no pagamento",
      subtitle: "Parcelamento e condições especiais que cabem no seu bolso.",
      image: "images/foto-caldas-novas-parque.jpg",
      cardImage: "images/tr-card-3-pagamento-parque.jpg",
      location: "Caldas Novas & Hot Park • GO"
    },
    {
      number: "4",
      title: "Segurança e confiança",
      subtitle: "Viaje tranquilo(a) sabendo que cuidamos de cada detalhe para sua segurança do início ao fim.",
      image: "images/foto-praia-tropical.jpg",
      cardImage: "images/tr-card-4-seguranca-praia.jpg",
      location: "Praias Paradisíacas • Litoral"
    },
    {
      number: "5",
      title: "Experiências inesquecíveis",
      subtitle: "Não é só viajar, é viver momentos que ficam para sempre na memória.",
      image: "images/foto-cataratas-iguacu.jpg",
      cardImage: "images/tr-card-5-experiencias-cataratas.jpg",
      location: "Cataratas do Iguaçu • PR"
    }
  ],
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
      icon: "plane",
      title: "Roteiros Aéreos & Internacionais",
      desc: "Grandes viagens nacionais e internacionais, como o Chile 2027, com passagens, hospedagem e passeios planejados.",
      highlight: "Experiências pelo mundo",
      inclusions: ["Passagens aéreas", "Hotéis selecionados", "Roteiro guiado"]
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
      id: "dest-chile",
      name: "Chile 2027: Neve & Cordilheira dos Andes",
      category: "Internacional",
      tag: "Grande Viagem Internacional",
      image: "images/foto-chile-andes.jpg",
      description: "Santiago, Cordilheira dos Andes, neve e a famosa Laguna del Inca. Uma viagem dos sonhos com passagens aéreas e planejamento completo da TR Turismo.",
      duration: "Roteiro Aéreo Especial 2027",
      departure: "Saída facilitada de Ibirité / BH",
      inclusions: ["Aéreo ida e volta", "Hospedagem selecionada", "Passeios na neve", "Suporte completo TR"],
      priceDisplay: "Sob Consulta",
      featured: true
    },
    {
      id: "dest-praia",
      name: "Praias Paradisíacas & Litoral Tropical",
      category: "Praias",
      tag: "O Queridinho dos Passageiros",
      image: "images/foto-praia-tropical.jpg",
      description: "Areia dourada, coqueirais e mar cristalino em roteiros tradicionais como Cabo Frio, Arraial do Cabo, Guarapari e Litoral Baiano.",
      duration: "Excursão de Feriado ou Final de Semana",
      departure: "Embarques em Ibirité e BH",
      inclusions: ["Ônibus executivo com ar", "Pousada com café farto", "Guia acompanhante"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-caldas",
      name: "Caldas Novas & Parques Termais",
      category: "Família",
      tag: "Águas Quentes & Tobogãs",
      image: "images/foto-caldas-novas-parque.jpg",
      description: "Piscinas aquecidas dia e noite, toboáguas e complexos aquáticos com diversão garantida para todas as idades.",
      duration: "Excursão 4 a 5 Dias",
      departure: "Embarques em Ibirité e BH",
      inclusions: ["Transporte rodoviário confortável", "Hotel com parque aquático", "Guia da agência"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-cataratas",
      name: "Cataratas do Iguaçu & Maravilhas Naturais",
      category: "Natureza",
      tag: "Experiência Inesquecível",
      image: "images/foto-cataratas-iguacu.jpg",
      description: "A força espetacular das maiores quedas d'água do planeta, Parque das Aves e compras na Tríplice Fronteira com todo conforto.",
      duration: "Roteiro 4 a 5 Dias",
      departure: "Saídas de Ibirité e BH",
      inclusions: ["Transporte com ar", "Hotel com piscina e café", "Acompanhamento nos passeios"],
      priceDisplay: "Sob Consulta",
      featured: false
    },
    {
      id: "dest-balneario",
      name: "Balneário Camboriú & Litoral Sul",
      category: "Praias",
      tag: "Encanto de Santa Catarina",
      image: "images/foto-balneario-camboriu.jpg",
      description: "Orla cosmopolita, teleférico do Parque Unipraias, gastronomia à beira-mar e praias vizinhas espetaculares.",
      duration: "Excursão 5 a 6 Dias",
      departure: "Embarque em Ibirité",
      inclusions: ["Ônibus leito/executivo", "Hospedagem bem localizada", "Roteiro de passeios"],
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
  STORAGE_KEY: "TR_TURISMO_DATA_V6",
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
          about: { ...TR_DEFAULT_DATA.about, ...(parsed.about || {}) },
          pillars: parsed.pillars || TR_DEFAULT_DATA.pillars
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
