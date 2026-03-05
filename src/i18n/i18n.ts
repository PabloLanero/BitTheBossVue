import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en: {
        message: {
            hello: 'hello world'
        },
    },
    es: {
        placeholder: 'Aqui va algo',
        header:{
            game: 'Game',
            factions: 'Factions',
            community: 'Community',
            preorder: 'Pre-Order Now',
            classification: 'Clasificacion',
            signin: 'Registrarse',
            login: 'Iniciar sesion'
        },
        landing: {
            heroTitle: 'Master the Cosmos',
            heroSubtitle: 'A universe of strategic conquest across our intuitive platform.',
            playDemo: 'Play Demo',
            learnMore: 'Learn More',
            featuresTitle: 'Features',
            feature1Title: 'Epic Campaigns',
            feature1Desc: 'Rotor de pas dved us to plennnclary.',
            feature2Title: 'Tactical Tools',
            feature2Desc: 'Conde nimorcth on trivoutre dollie the us pesiciary.',
            feature3Title: 'Seamless Integration',
            feature3Desc: 'Conido eh anerith yo unpentier ollor ue fatry.',
        },
        footer: {
            privacy: 'Privacy',
            terms: 'Terms',
            faq: 'FAQ',
        },
        message: {
            hello: 'Pollas como ollas'
        }
    }
  }
})