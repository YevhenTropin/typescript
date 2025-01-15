type Translations = {
    [language: string]: string | undefined
}

const appTranslations: Translations = {
    en: 'I love you',
    de: 'Ich liebe dich',
    it: 'Ti amo',
}

const languageKey = 'de'
const translation: string | undefined = appTranslations[languageKey]

if (translation !== undefined) {
    console.log(translation)
} else {
    console.log("Unknown key")
}

type OptionalTranslations = Translations & {
    default?: string
}

const appOptionalTranslations: OptionalTranslations = {
    en: 'I love you',
    de: 'Ich liebe dich',
    it: 'Ti amo',
    default: 'Я тебе кохаю'
}

const defaultTranslation: string | undefined = appOptionalTranslations['default']

if (defaultTranslation) {
    console.log(defaultTranslation)
} else {
    console.log("Default translation is empty")
}