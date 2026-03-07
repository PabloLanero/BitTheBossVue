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
        placeholder: 'Something goes here',
        header:{
            game: 'History',
            factions: 'Game',
            community: 'Factions',
            communityLink: 'Community',
            preorder: 'Pre-Order Now',
            classification: 'Classification',
            signin: 'Sign Up',
            login: 'Log In'
        },
        home: {
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
        registerPage: {
            title: 'Create Account',
            subtitle: 'Join the battle for the circuit',
            userLabel: 'Username',
            userPlaceholder: 'CircuitMaster',
            userHint: 'Minimum 3 characters',
            emailLabel: 'Email',
            emailPlaceholder: 'you@email.com',
            passwordLabel: 'Password',
            passwordHint: 'Minimum 6 characters',
            termsPrefix: 'I accept the',
            terms: 'terms and conditions',
            termsMid: 'and the',
            privacy: 'privacy policy',
            submitBtn: 'Create Account',
            hasAccount: 'Already have an account?',
            loginBtn: 'Log In',
        },
        loginPage: {
            title: 'Log In',
            subtitle: 'Access your Battle Board account',
            emailLabel: 'Email',
            emailPlaceholder: 'you@email.com',
            passwordLabel: 'Password',
            forgotPassword: 'Forgot your password?',
            submitBtn: 'Log In',
            noAccount: "Don't have an account?",
            registerBtn: 'Create New Account',
        },
        message: {
            hello: 'Hello World'
        }
    }
  }
})
