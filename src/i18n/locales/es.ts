export const es = {
  common: {
    loading: 'Cargando...',
    back: 'Volver',
    cancel: 'Cancelar',
    close: 'Cerrar',
    save: 'Guardar',
    noData: 'Sin datos',
  },
  header: {
    games: 'Partidas',
    factions: 'Facciones',
    communityLink: 'Comunidad',
    login: 'Iniciar sesion',
    profileFallback: 'Mi perfil',
    languageLabel: 'Idioma',
    langEn: 'EN',
    langEs: 'ES',
  },
  home: {
    heroTitle: 'Domina el Cosmos',
    heroSubtitle: 'Un universo de conquista estrategica en nuestra plataforma.',
    playDemo: 'Jugar Demo',
    learnMore: 'Ver Mas',
    featuresTitle: 'Caracteristicas',
    feature1Title: 'Campanas Epicas',
    feature1Desc: 'Lidera tu faccion en batallas tacticas y control de nodos.',
    feature2Title: 'Herramientas Tacticas',
    feature2Desc: 'Toma decisiones en tiempo real y gestiona recursos para superar rivales.',
    feature3Title: 'Integracion Fluida',
    feature3Desc: 'Juega en navegador con una experiencia Unity WebGL conectada.',
  },
  footer: {
    privacy: 'Privacidad',
    legalNotice: 'Aviso Legal',
    community: 'Comunidad',
    faq: 'FAQ',
    closeAria: 'Cerrar',
    refreshAria: 'Actualizar',
    settingsAria: 'Configuracion',
  },
  loginPage: {
    title: 'Iniciar sesion',
    subtitle: 'Accede a tu cuenta de BitTheBoss',
    emailLabel: 'Correo',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contrasena',
    forgotPassword: 'Olvidaste tu contrasena?',
    submitBtn: 'Entrar',
    noAccount: 'No tienes cuenta?',
    registerBtn: 'Crear cuenta nueva',
    errors: {
      invalidCredentials: 'Credenciales incorrectas. Intentalo de nuevo.',
    },
  },
  registerPage: {
    title: 'Crear cuenta',
    subtitle: 'Unete a la batalla por el circuito',
    userLabel: 'Nombre de usuario',
    userPlaceholder: 'CircuitMaster',
    userHint: 'Minimo 3 caracteres',
    emailLabel: 'Correo',
    emailPlaceholder: 'tu@email.com',
    passwordLabel: 'Contrasena',
    passwordHint: 'Minimo 6 caracteres',
    termsPrefix: 'Acepto los',
    terms: 'terminos y condiciones',
    termsMid: 'y la',
    privacy: 'politica de privacidad',
    submitBtn: 'Crear cuenta',
    hasAccount: 'Ya tienes cuenta?',
    loginBtn: 'Iniciar sesion',
    errors: {
      termsRequired: 'Debes aceptar los terminos y condiciones.',
      createError: 'Error al crear la cuenta. Intentalo de nuevo.',
    },
  },
  createGame: {
    title: 'Nueva partida',
    subtitle: 'Configura los parametros y lanza una nueva partida.',
    matchName: 'Nombre de partida',
    matchNamePlaceholder: 'Mi partida contra IA',
    opponentMode: 'Modo de oponente',
    aiDifficulty: 'Dificultad IA',
    rivalUserId: 'ID del rival',
    opponent: {
      ai: 'Contra IA',
      player: 'Contra jugador',
    },
    difficulty: {
      easy: 'Facil',
      normal: 'Normal',
      hard: 'Dificil',
    },
    actions: {
      back: 'Volver',
      play: 'Jugar nueva partida',
      opening: 'Abriendo...',
    },
    errors: {
      required: 'Completa todos los campos obligatorios.',
      create: 'No se pudo crear la partida',
    },
    opponentLabel: {
      ai: 'Contra IA - {difficulty}',
      player: 'Contra jugador #{id}',
    },
  },
  createPartida: {
    title: 'Crear partida',
    subtitle: 'Esta pantalla crea la partida en el backend y prepara la sesion para Unity.',
    labels: {
      matchId: 'ID de partida',
      owner: 'Tu usuario (desde token)',
      rival: 'Usuario rival (opcional)',
      nodes: 'IDs de nodos (opcional, separados por coma)',
    },
    nodePlaceholder: '1,2,3',
    actions: {
      create: 'Crear partida',
      creating: 'Creando...',
      goToGame: 'Ir al juego',
    },
    errors: {
      required: 'Completa todos los campos obligatorios para crear la partida.',
      create: 'No se pudo crear la partida',
    },
    success: 'Partida creada correctamente: {id}',
  },
  gameHistory: {
    title: 'Historial de partidas',
    newMatch: 'Jugar nueva partida',
    stats: {
      win: 'Victoria',
      loss: 'Derrota',
      cancelled: 'Cancelada',
    },
    searchPlaceholder: 'Buscar por nombre, ID u oponente',
    filters: {
      all: 'Todas',
      win: 'Victoria',
      loss: 'Derrota',
      cancelled: 'Cancelada',
    },
    status: {
      win: 'Victoria',
      loss: 'Derrota',
      cancelled: 'Cancelada',
    },
    loading: 'Cargando historial...',
    empty: 'No hay partidas en el historial.',
    labels: {
      id: 'ID',
      finished: 'Finalizada',
    },
    noDate: 'Sin fecha',
  },
  unity: {
    subtitle: 'Unity WebGL',
    actions: {
      endMatch: 'Terminar partida',
      cancel: 'Cancelar',
      win: 'Victoria',
      loss: 'Derrota',
      cancelled: 'Cancelada',
    },
    loading: 'Cargando Unity...',
    errorLoading: 'Error al cargar Unity: {error}',
    modal: {
      title: 'Terminar partida',
      subtitle: 'Selecciona el estado para registrar esta partida en el historial.',
    },
    defaults: {
      opponentLabel: 'Contra IA - Normal',
    },
    errors: {
      endMatch: 'No se pudo terminar la partida',
      createUnityUnavailable: 'createUnityInstance no esta disponible tras cargar el loader',
      canvasReference: 'No se pudo obtener la referencia del canvas',
      loaderScript: 'Error al cargar el script loader de Unity',
      unexpected: 'Error inesperado: {error}',
    },
  },
  factions: {
    hero: {
      label: 'Intel de facciones',
      title: 'Facciones',
      subtitle:
        'Resumen de las tres grandes potencias en BitTheBoss. Usalo como referencia de fortalezas, debilidades y doctrina.',
    },
    strengthsTitle: 'Fortalezas',
    items: {
      circuit: {
        name: 'Circuit Breakers',
        tag: 'Velocidad / Disrupcion',
        origin: 'Nacidos en los sectores de red colapsados del Distrito Neon 7.',
        lore:
          'Cuando el Gran Apagon de 2147 arraso las redes del este, ingenieros rebeldes reconectaron las ruinas bajo sus propias reglas. Circuit Breakers golpea primero, rapido y forzando errores.',
        traits: ['Inicio agresivo', 'Alta movilidad', 'Tacticas de sobrecarga de nodos'],
        weakness: 'Vulnerable a asedios prolongados',
        motto: '"Primero en entrar. Ultimo en caer."',
      },
      iron: {
        name: 'Iron Bastion',
        tag: 'Defensa / Control',
        origin: 'Forjados en los bunkers bajo el Nucleo de la Ciudadela.',
        lore:
          'Iron Bastion fue creado para mantener territorio bajo presion. Su doctrina se centra en expansion disciplinada, eficiencia de recursos y convertir cada nodo capturado en un ancla defensiva.',
        traits: ['Dominio en late-game', 'Eficiencia de recursos', 'Defensa fortificada de nodos'],
        weakness: 'Expansion inicial lenta',
        motto: '"Lo que se construye para durar, no se toma."',
      },
      ember: {
        name: 'Ember Syndicate',
        tag: 'Caos / Alto riesgo',
        origin: 'Surgidos de los mercados negros de Scorch Warrens.',
        lore:
          'Ember Syndicate combate con sabotaje, presion e imprevisibilidad. Su estrategia consiste en desestabilizar planes enemigos, forzar intercambios malos y ganar desde la disrupcion.',
        traits: ['Estilo impredecible', 'Mecanicas de sabotaje', 'Picos explosivos en mid-game'],
        weakness: 'Planificacion irregular a largo plazo',
        motto: '"Que arda todo. Prosperamos entre cenizas."',
      },
    },
  },
  community: {
    title: 'Comunidad',
    subtitle: 'Conecta con jugadores, comparte estrategias y sube juntos',
    cards: {
      players: {
        title: 'Jugadores en linea',
        value: '1,284',
        desc: 'Jugadores activos ahora mismo',
      },
      forum: {
        title: 'Foro',
        value: '3,540',
        desc: 'Publicaciones esta semana',
      },
      top: {
        title: 'Top jugadores',
        value: 'Salon de la fama',
        desc: 'Mejor clasificados de la temporada',
      },
    },
    feed: {
      title: 'Actividad reciente',
      alpha: {
        text: 'gano una partida ranked contra IronWall',
        time: 'hace 2m',
      },
      synth: {
        text: 'alcanzo Tier 5 - Leyenda del circuito',
        time: 'hace 11m',
      },
      neon: {
        text: 'publico una nueva guia de estrategia en el foro',
        time: 'hace 34m',
      },
      void: {
        text: 'desafio a 3 jugadores seguidos',
        time: 'hace 1h',
      },
    },
  },
  profile: {
    backHome: 'Volver al inicio',
    logout: 'Cerrar sesion',
    title: 'Perfil de usuario',
    subtitle: 'Gestiona tu informacion y estadisticas',
    noData: 'Sin datos',
    errors: {
      noUserData: 'No se encontraron datos de usuario para esta sesion.',
      loadError: 'No se pudo cargar el perfil',
      backendError:
        'No se pudo conectar con el backend para cargar el perfil completo. Mostrando datos disponibles.',
    },
    sections: {
      personalInfo: 'Informacion personal',
      rank: 'Rango competitivo',
      history: 'Historial de partidas',
    },
    labels: {
      username: 'Nombre de usuario',
      email: 'Correo',
      userId: 'ID de usuario',
      role: 'Rol',
      memberSince: 'Miembro desde',
      currentTier: 'Tier actual',
      level: 'Nivel',
    },
    roles: {
      premium: 'PREMIUM',
      admin: 'ADMIN',
      user: 'USER',
    },
    buttons: {
      edit: 'Editar',
      viewDetails: 'Ver detalles',
    },
    matches: {
      noRegistered: 'No hay partidas registradas',
    },
    playersCount: '{count} jugador(es)',
  },
  editProfile: {
    title: 'Editar perfil',
    subtitle: 'Actualiza tu informacion personal. Los cambios se guardaran en tu cuenta.',
    username: 'Nombre de usuario',
    email: 'Correo',
    usernamePlaceholder: 'Tu nombre de usuario',
    emailPlaceholder: 'tu@email.com',
    noteLabel: 'Nota:',
    noteText: 'Tu ID de usuario{userId} y la fecha de registro no se pueden modificar.',
    actions: {
      cancel: 'Cancelar',
      save: 'Guardar cambios',
    },
    success: {
      saved: 'Cambios guardados!',
    },
    errors: {
      required: 'Nombre y correo son obligatorios.',
      noSession: 'No hay una sesion activa.',
      save: 'Error al guardar cambios',
      unknown: 'Error desconocido',
    },
  },
  logoutModal: {
    title: 'Cerrar sesion?',
    body: 'Seguro que quieres cerrar sesion? Tendras que iniciar sesion otra vez para acceder a tu perfil.',
    cancel: 'Cancelar',
    confirm: 'Cerrar sesion',
  },
  legalCommon: {
    label: 'Legal',
    back: 'Volver',
    lastUpdated: 'Ultima actualizacion: marzo 2025',
  },
  legalNotice: {
    title: 'Aviso legal',
    footerLink: 'Politica de privacidad ->',
    sections: [
      {
        title: '1. Informacion del titular',
        paragraphs: [
          'Esta plataforma (BitTheBoss) se opera como un proyecto academico desarrollado con fines educativos. La plataforma no es un producto comercial y no esta destinada a uso comercial, distribucion o monetizacion.',
        ],
        bullets: [
          'Nombre del proyecto: BitTheBoss',
          'Naturaleza: Proyecto academico / educativo',
          'Contacto: bittheboss@example.com',
        ],
      },
      {
        title: '2. Finalidad de la plataforma',
        paragraphs: [
          'BitTheBoss es una plataforma de juego de estrategia competitiva construida como proyecto academico de fin de grado. Su objetivo es demostrar la integracion de un frontend Vue.js, un backend .NET y un cliente Unity WebGL en una sola aplicacion full-stack.',
          'Todos los datos de juego, rankings y perfiles de usuario se generan dentro de esta demostracion academica y no tienen valor comercial.',
        ],
      },
      {
        title: '3. Propiedad intelectual',
        paragraphs: [
          'Todo el contenido original de esta plataforma, incluyendo diseno, codigo fuente, assets del juego, lore de facciones y elementos de interfaz, es propiedad intelectual de sus autores y esta protegido por la normativa aplicable.',
          'La reproduccion, distribucion o comunicacion publica de cualquier contenido sin autorizacion previa por escrito de los autores queda estrictamente prohibida, salvo en los casos permitidos por ley.',
        ],
      },
      {
        title: '4. Exclusion de responsabilidad',
        paragraphs: [
          'La plataforma se ofrece \"tal cual\" para fines de demostracion academica. Los autores no ofrecen garantias, expresas o implicitas, sobre la exactitud, fiabilidad o disponibilidad del servicio. Los autores no seran responsables de danos directos o indirectos derivados del uso de la plataforma.',
          'La plataforma puede incluir enlaces a servicios de terceros. Los autores no se responsabilizan del contenido ni de las practicas de privacidad de esos servicios.',
        ],
      },
      {
        title: '5. Legislacion aplicable',
        paragraphs: [
          'Este aviso legal se rige por la legislacion espanola. Cualquier disputa derivada del uso de esta plataforma se sometera a la jurisdiccion de los tribunales competentes de Espana.',
        ],
      },
      {
        title: '6. Modificaciones',
        paragraphs: [
          'Los autores se reservan el derecho a modificar este aviso legal en cualquier momento. El uso continuado de la plataforma tras cualquier cambio implicara la aceptacion de las condiciones actualizadas.',
        ],
      },
    ],
  },
  privacyPolicy: {
    title: 'Politica de privacidad',
    highlight:
      'BitTheBoss es un proyecto academico. Recogemos solo los datos minimos necesarios para que la plataforma funcione y no los compartimos con terceros.',
    footerLink: '<- Aviso legal',
    sections: [
      {
        title: '1. Responsable del tratamiento',
        paragraphs: [
          'El responsable del tratamiento de esta plataforma es el equipo academico de BitTheBoss. Para consultas relacionadas con privacidad, contacta en: bittheboss@example.com',
        ],
      },
      {
        title: '2. Datos que recogemos',
        paragraphs: [
          'Cuando te registras y usas la plataforma, recogemos los siguientes datos personales:',
          'No recogemos datos de pago, ubicacion ni informacion personal sensible.',
        ],
        bullets: [
          'Nombre de usuario - para identificarte en la plataforma',
          'Correo electronico - para autenticacion de la cuenta',
          'Contrasena - almacenada con hash, nunca en texto plano',
          'Historial de partidas - resultados asociados a tu cuenta',
          'Rango competitivo - tier y nivel derivados de tus resultados',
        ],
      },
      {
        title: '3. Base legal del tratamiento',
        paragraphs: [
          'La base legal para tratar tus datos personales es la ejecucion del contrato de servicio al crear una cuenta (Art. 6.1.b RGPD) y, cuando aplique, tu consentimiento explicito (Art. 6.1.a RGPD).',
        ],
      },
      {
        title: '4. Como usamos tus datos',
        paragraphs: [
          'Tus datos personales se usan exclusivamente para los siguientes fines:',
          'Tus datos nunca se usan para marketing, publicidad ni se venden a terceros en ningun caso.',
        ],
        bullets: [
          'Autenticar tu identidad y gestionar tu sesion',
          'Mostrar tu perfil, historial de partidas y rango competitivo',
          'Permitir el juego y registrar resultados de partida',
          'Mantener la integridad y seguridad de la plataforma',
        ],
      },
      {
        title: '5. Conservacion de datos',
        paragraphs: [
          'Tus datos personales se conservan mientras tu cuenta este activa. Al eliminar la cuenta, los datos asociados se eliminaran de forma permanente en un maximo de 30 dias, salvo cuando la ley exija su conservacion.',
        ],
      },
      {
        title: '6. Cookies y almacenamiento local',
        paragraphs: [
          'Esta plataforma usa almacenamiento local del navegador para guardar tu token de autenticacion (JWT) y preferencias de sesion. No se usan cookies de seguimiento de terceros. El token se usa solo para mantener tu sesion autenticada y se elimina al cerrar sesion.',
        ],
      },
      {
        title: '7. Tus derechos',
        paragraphs: [
          'Segun el RGPD y la normativa espanola aplicable, tienes derecho a:',
          'Para ejercer cualquiera de estos derechos, contacta en bittheboss@example.com. Tambien tienes derecho a presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos (AEPD) en www.aepd.es.',
        ],
        bullets: [
          'Acceso - solicitar copia de los datos personales que tratamos',
          'Rectificacion - corregir datos inexactos o incompletos',
          'Supresion - solicitar borrado de tus datos personales',
          'Portabilidad - recibir tus datos en formato estructurado y legible por maquina',
          'Limitacion - solicitar limitacion del tratamiento en determinados casos',
          'Oposicion - oponerte al tratamiento basado en interes legitimo',
        ],
      },
      {
        title: '8. Seguridad de los datos',
        paragraphs: [
          'Aplicamos medidas tecnicas y organizativas adecuadas para proteger tus datos personales frente a accesos no autorizados, alteracion, divulgacion o destruccion. Estas medidas incluyen hash de contrasenas, autenticacion JWT y comunicaciones HTTPS cifradas entre cliente y servidor.',
        ],
      },
      {
        title: '9. Cambios en esta politica',
        paragraphs: [
          'Podemos actualizar esta politica de privacidad periodicamente. Cuando lo hagamos, actualizaremos la fecha en la parte superior de esta pagina. El uso continuado de la plataforma tras los cambios implicara la aceptacion de la politica actualizada.',
        ],
      },
    ],
  },
} as const
