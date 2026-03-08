export const en = {
  common: {
    loading: 'Loading...',
    back: 'Back',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    noData: 'No data',
  },
  header: {
    games: 'Games',
    factions: 'Factions',
    communityLink: 'Community',
    login: 'Log In',
    profileFallback: 'My Profile',
    languageLabel: 'Language',
    langEn: 'EN',
    langEs: 'ES',
  },
  home: {
    heroTitle: 'Master the Cosmos',
    heroSubtitle: 'A universe of strategic conquest across our platform.',
    playDemo: 'Play Demo',
    learnMore: 'Learn More',
    featuresTitle: 'Features',
    feature1Title: 'Epic Campaigns',
    feature1Desc: 'Lead your faction through tactical battles and map control.',
    feature2Title: 'Tactical Tools',
    feature2Desc: 'Use real-time decisions and resource management to outplay rivals.',
    feature3Title: 'Seamless Integration',
    feature3Desc: 'Play in browser with a connected Unity WebGL experience.',
  },
  footer: {
    privacy: 'Privacy',
    legalNotice: 'Legal Notice',
    community: 'Community',
    faq: 'FAQ',
    closeAria: 'Close',
    refreshAria: 'Refresh',
    settingsAria: 'Settings',
  },
  loginPage: {
    title: 'Log In',
    subtitle: 'Access your BitTheBoss account',
    emailLabel: 'Email',
    emailPlaceholder: 'you{\'@\'}email.com',
    passwordLabel: 'Password',
    forgotPassword: 'Forgot your password?',
    submitBtn: 'Log In',
    noAccount: "Don't have an account?",
    registerBtn: 'Create New Account',
    errors: {
      invalidCredentials: 'Incorrect credentials. Please try again.',
    },
  },
  registerPage: {
    title: 'Create Account',
    subtitle: 'Join the battle for the circuit',
    userLabel: 'Username',
    userPlaceholder: 'CircuitMaster',
    userHint: 'Minimum 3 characters',
    emailLabel: 'Email',
    emailPlaceholder: 'you{\'@\'}email.com',
    passwordLabel: 'Password',
    passwordHint: 'Minimum 6 characters',
    termsPrefix: 'I accept the',
    terms: 'terms and conditions',
    termsMid: 'and the',
    privacy: 'privacy policy',
    submitBtn: 'Create Account',
    hasAccount: 'Already have an account?',
    loginBtn: 'Log In',
    errors: {
      termsRequired: 'You must accept the terms and conditions.',
      createError: 'Error creating account. Please try again.',
    },
  },
  createGame: {
    title: 'New Match',
    subtitle: 'Configure the parameters and launch a new match.',
    matchName: 'Match Name',
    matchNamePlaceholder: 'My match against AI',
    opponentMode: 'Opponent Mode',
    aiDifficulty: 'AI Difficulty',
    rivalUserId: 'Rival User ID',
    opponent: {
      ai: 'VS AI',
      player: 'VS Player',
    },
    difficulty: {
      easy: 'Easy',
      normal: 'Normal',
      hard: 'Hard',
    },
    actions: {
      back: 'Back',
      play: 'Play New Match',
      opening: 'Opening...',
    },
    errors: {
      required: 'Please fill in all required fields.',
      session: 'Invalid session. Please log in again.',
      create: 'Could not create the match',
    },
    opponentLabel: {
      ai: 'VS AI - {difficulty}',
      player: 'VS Player #{id}',
    },
  },
  createPartida: {
    title: 'Create Match',
    subtitle: 'This screen creates the match in the backend and prepares the session for Unity.',
    labels: {
      matchId: 'Match ID',
      owner: 'Your user (from token)',
      rival: 'Rival user (optional)',
      nodes: 'Node IDs (optional, comma-separated)',
    },
    nodePlaceholder: '1,2,3',
    actions: {
      create: 'Create Match',
      creating: 'Creating...',
      goToGame: 'Go to Game',
    },
    errors: {
      required: 'Please fill in all required fields to create the match.',
      create: 'Could not create the match',
    },
    success: 'Match created successfully: {id}',
  },
  gameHistory: {
    title: 'Match History',
    newMatch: 'Play New Match',
    stats: {
      win: 'Win',
      loss: 'Loss',
      cancelled: 'Cancelled',
    },
    searchPlaceholder: 'Search by name, ID or opponent',
    filters: {
      all: 'All',
      win: 'Win',
      loss: 'Loss',
      cancelled: 'Cancelled',
    },
    status: {
      win: 'Win',
      loss: 'Loss',
      cancelled: 'Cancelled',
    },
    loading: 'Loading history...',
    empty: 'No matches in history.',
    labels: {
      id: 'ID',
      finished: 'Finished',
    },
    noDate: 'No date',
  },
  unity: {
    subtitle: 'Unity WebGL',
    actions: {
      endMatch: 'End Match',
      cancel: 'Cancel',
      win: 'Win',
      loss: 'Loss',
      cancelled: 'Cancelled',
    },
    loading: 'Loading Unity...',
    errorLoading: 'Error loading Unity: {error}',
    modal: {
      title: 'End Match',
      subtitle: 'Select the status to register this match in the history.',
    },
    defaults: {
      opponentLabel: 'VS AI - Normal',
    },
    tutorial: {
      title: 'How to play',
      intro: 'Quick guide to start your match:',
      steps: {
        selectBase: 'Left-click an allied base to select it.',
        spawnTroops: 'Use the bottom bar to spawn troops in your HQ.',
        selectTroops: 'Select troops with a click or by dragging a selection box.',
        moveTroops: 'Right-click a target base to send your troops.',
        winCondition: 'Capture all enemy bases to win.',
      },
    },
    errors: {
      endMatch: 'Could not end the match',
      createUnityUnavailable: 'createUnityInstance is not available after loading the loader',
      canvasReference: 'Could not get reference to canvas',
      loaderScript: 'Error loading the Unity loader script',
      unexpected: 'Unexpected error: {error}',
    },
  },
  factions: {
    hero: {
      label: 'Faction Intel',
      title: 'Factions',
      subtitle:
        'Overview of the three major powers in BitTheBoss. Use this as a reference for strengths, weaknesses, and doctrine.',
    },
    strengthsTitle: 'Strengths',
    items: {
      circuit: {
        name: 'Circuit Breakers',
        tag: 'Speed / Disruption',
        origin: 'Born from the collapsed grid sectors of Neon District 7.',
        lore:
          'When the Great Blackout of 2147 wiped out the eastern grids, rogue engineers rewired the ruins on their own terms. The Circuit Breakers move first, move fast, and force mistakes.',
        traits: ['Aggressive opener', 'High mobility', 'Node overload tactics'],
        weakness: 'Vulnerable to sustained sieges',
        motto: '"First in. Last standing."',
      },
      iron: {
        name: 'Iron Bastion',
        tag: 'Defense / Control',
        origin: 'Forged in the bunkers beneath the Citadel Core.',
        lore:
          'The Iron Bastion was built to hold territory under pressure. Their doctrine focuses on disciplined expansion, resource efficiency, and turning each captured node into a defensive anchor.',
        traits: ['Late-game dominance', 'Resource efficiency', 'Fortified node defense'],
        weakness: 'Slow early expansion',
        motto: '"What is built to last, cannot be taken."',
      },
      ember: {
        name: 'Ember Syndicate',
        tag: 'Chaos / High Risk',
        origin: 'Risen from the black markets of the Scorch Warrens.',
        lore:
          'The Ember Syndicate fights through sabotage, pressure, and unpredictability. Their strategy is to destabilize enemy plans, force bad trades, and win through disruption.',
        traits: ['Unpredictable playstyle', 'Sabotage mechanics', 'Explosive mid-game bursts'],
        weakness: 'Inconsistent long-term planning',
        motto: '"Let it all burn. We thrive in the ashes."',
      },
    },
  },
  community: {
    title: 'Community',
    subtitle: 'Connect with players, share strategies and rise together',
    cards: {
      players: {
        title: 'Players Online',
        value: '1,284',
        desc: 'Active players right now',
      },
      forum: {
        title: 'Forum',
        value: '3,540',
        desc: 'Posts this week',
      },
      top: {
        title: 'Top Players',
        value: 'Hall of Fame',
        desc: 'Best ranked this season',
      },
    },
    feed: {
      title: 'Latest Activity',
      alpha: {
        text: 'won a ranked match against IronWall',
        time: '2m ago',
      },
      synth: {
        text: 'reached Tier 5 - Circuit Legend',
        time: '11m ago',
      },
      neon: {
        text: 'posted a new strategy guide in the forum',
        time: '34m ago',
      },
      void: {
        text: 'challenged 3 players in a row',
        time: '1h ago',
      },
    },
  },
  profile: {
    backHome: 'Back to Home',
    logout: 'Log Out',
    title: 'User Profile',
    subtitle: 'Manage your information and statistics',
    noData: 'No data',
    errors: {
      noUserData: 'No user data found for this session.',
      loadError: 'Could not load profile',
      backendError:
        'Could not connect to the backend to load the full profile. Showing available data.',
    },
    sections: {
      personalInfo: 'Personal Information',
      rank: 'Competitive Rank',
      history: 'Match History',
    },
    labels: {
      username: 'Username',
      email: 'Email',
      userId: 'User ID',
      role: 'Role',
      memberSince: 'Member Since',
      currentTier: 'Current Tier',
      level: 'Level',
    },
    roles: {
      premium: 'PREMIUM',
      admin: 'ADMIN',
      user: 'USER',
    },
    buttons: {
      edit: 'Edit',
      viewDetails: 'View Details',
    },
    matches: {
      noRegistered: 'No matches registered',
    },
    playersCount: '{count} player(s)',
  },
  editProfile: {
    title: 'Edit Profile',
    subtitle: 'Update your personal information. Changes will be saved to your account.',
    username: 'Username',
    email: 'Email',
    usernamePlaceholder: 'Your username',
    emailPlaceholder: 'you{\'@\'}email.com',
    noteLabel: 'Note:',
    noteText: 'Your user ID{userId} and registration date cannot be modified.',
    actions: {
      cancel: 'Cancel',
      save: 'Save Changes',
    },
    success: {
      saved: 'Changes saved!',
    },
    errors: {
      required: 'Name and email are required.',
      noSession: 'No active session.',
      save: 'Error saving changes',
      unknown: 'Unknown error',
    },
  },
  logoutModal: {
    title: 'Log Out?',
    body: 'Are you sure you want to log out? You will need to log in again to access your profile.',
    cancel: 'Cancel',
    confirm: 'Log Out',
  },
  legalCommon: {
    label: 'Legal',
    back: 'Back',
    lastUpdated: 'Last updated: March 2025',
  },
  legalNotice: {
    title: 'Legal Notice',
    footerLink: 'Privacy Policy ->',
    sections: [
      {
        title: '1. Owner Information',
        paragraphs: [
          'This platform (BitTheBoss) is operated as an academic project developed for educational purposes. The platform is not a commercial product and is not intended for commercial use, distribution, or monetization.',
        ],
        bullets: [
          'Project name: BitTheBoss',
          'Nature: Academic / Educational project',
          'Contact: bittheboss{\'@\'}example.com',
        ],
      },
      {
        title: '2. Purpose of the Platform',
        paragraphs: [
          'BitTheBoss is a competitive strategy game platform built as a final-year academic project. Its purpose is to demonstrate the integration of a Vue.js frontend, a .NET backend, and a Unity WebGL game client within a single full-stack application.',
          'All gameplay data, rankings, and user profiles are generated within the scope of this academic demonstration and have no commercial value.',
        ],
      },
      {
        title: '3. Intellectual Property',
        paragraphs: [
          'All original content on this platform, including design, source code, game assets, faction lore, and interface elements, is the intellectual property of its respective authors and is protected under applicable copyright law.',
          'Reproduction, distribution, or public communication of any content without prior written authorization from the authors is strictly prohibited, except where permitted by law.',
        ],
      },
      {
        title: '4. Disclaimer of Liability',
        paragraphs: [
          'The platform is provided \"as is\" for academic demonstration purposes. The authors make no warranties, express or implied, regarding the accuracy, reliability, or availability of the service. The authors shall not be liable for any direct or indirect damages arising from use of the platform.',
          'The platform may contain links to third-party services. The authors are not responsible for the content or privacy practices of those services.',
        ],
      },
      {
        title: '5. Applicable Law',
        paragraphs: [
          'This legal notice is governed by Spanish law. Any disputes arising from or related to the use of this platform shall be subject to the jurisdiction of the competent courts of Spain.',
        ],
      },
      {
        title: '6. Modifications',
        paragraphs: [
          'The authors reserve the right to modify this legal notice at any time. Continued use of the platform after any such change constitutes acceptance of the updated terms.',
        ],
      },
    ],
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    highlight:
      'BitTheBoss is an academic project. We collect only the minimum data necessary to make the platform function, and we do not share it with any third parties.',
    footerLink: '<- Legal Notice',
    sections: [
      {
        title: '1. Data Controller',
        paragraphs: [
          'The data controller for this platform is the academic team responsible for the BitTheBoss project. For any privacy-related enquiries, contact us at: bittheboss{\'@\'}example.com',
        ],
      },
      {
        title: '2. Data We Collect',
        paragraphs: [
          'When you register and use the platform, we collect the following personal data:',
          'We do not collect payment data, location data, or any sensitive personal information.',
        ],
        bullets: [
          'Username - used to identify you within the platform',
          'Email address - used for account authentication',
          'Password - stored in hashed form, never in plain text',
          'Match history - game results associated with your account',
          'Competitive rank - tier and level derived from match results',
        ],
      },
      {
        title: '3. Legal Basis for Processing',
        paragraphs: [
          'The legal basis for processing your personal data is the execution of the service contract established when you create an account (Art. 6.1.b GDPR), and where applicable, your explicit consent (Art. 6.1.a GDPR).',
        ],
      },
      {
        title: '4. How We Use Your Data',
        paragraphs: [
          'Your personal data is used exclusively for the following purposes:',
          'Your data is never used for marketing, advertising, or sold to third parties under any circumstances.',
        ],
        bullets: [
          'Authenticating your identity and managing your session',
          'Displaying your profile, match history and competitive rank',
          'Enabling gameplay and recording match results',
          'Maintaining the integrity and security of the platform',
        ],
      },
      {
        title: '5. Data Retention',
        paragraphs: [
          'Your personal data is retained for as long as your account remains active. Upon account deletion, all associated personal data will be permanently removed from our systems within 30 days, except where retention is required by law.',
        ],
      },
      {
        title: '6. Cookies and Local Storage',
        paragraphs: [
          'This platform uses browser local storage to store your authentication token (JWT) and session preferences. No third-party tracking cookies are used. The stored token is used solely to maintain your authenticated session and is removed when you log out.',
        ],
      },
      {
        title: '7. Your Rights',
        paragraphs: [
          'Under the GDPR and applicable Spanish data protection law, you have the right to:',
          'To exercise any of these rights, contact us at bittheboss{\'@\'}example.com. You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD) at www.aepd.es.',
        ],
        bullets: [
          'Access - request a copy of the personal data we hold about you',
          'Rectification - correct any inaccurate or incomplete data',
          'Erasure - request deletion of your personal data (right to be forgotten)',
          'Portability - receive your data in a structured, machine-readable format',
          'Restriction - request limitation of processing in certain circumstances',
          'Objection - object to processing based on legitimate interests',
        ],
      },
      {
        title: '8. Data Security',
        paragraphs: [
          'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include password hashing, JWT-based authentication, and HTTPS-encrypted communication between client and server.',
        ],
      },
      {
        title: '9. Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page. Continued use of the platform after any changes constitutes your acceptance of the updated policy.',
        ],
      },
    ],
  },
} as const
