import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Envelope
    exclusiveInvite: "This invitation is exclusively for",
    openHint: "Tap to Open",

    // Hero
    togetherWithFamilies: "Together with their families",
    inviteYou: "Invite you to celebrate their wedding",

    // Wedding Info (When)
    celebrationDetails: "Celebration Details",
    theDate: "The Date",
    when: "When",
    march: "March 2026",
    ceremonyTime: "Ceremony to start at 3:00 PM",
    theCeremony: "The Ceremony · 28 March 2026",
    days: "Days",
    hours: "Hours",
    minutes: "Min",
    seconds: "Sec",

    // Wedding Info (Where)
    theVenue: "The Venue",
    where: "Where",
    venueName: "San José Succotz",
    venueAddress1: "cultural center",
    venueAddress2: "San José Succotz, Cayo, Belize",
    getDirections: "Get Directions",

    // Wedding Info (People)
    thePeople: "The People",
    blessingOfParents: "With the blessing of our parents",
    bride: "Bride",
    groom: "Groom",
    accompaniedByGodparents: "Accompanied by our godparents",
    godparents: "Godparents",

    // Verses
    verse1Text: "Many waters cannot quench love, neither can floods drown it.",
    verse1Ref: "Song of Solomon 8:7",
    verse2Text: "Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres. Love never fails.",
    verse2Ref: "1 Corinthians 13:4, 7-8",

    // RSVP
    rsvpTitle: "RSVP",
    replyBy: "Kindly reply by March 8th, 2026",
    willYouAttend: "Will you be attending?",
    yesAttending: "Joyfully Accept",
    noDeclining: "Regretfully Decline",
    confirmNumber: "Please confirm total number attending",
    guestNames: "Names of all guests attending",
    dietaryNotes: "Any dietary requirements?",
    submitRsvp: "Send RSVP",
    submitting: "Sending...",
    rsvpSuccess: "Thank You!",
    rsvpSuccessMessage: "Your RSVP has been received.",
    canBringUpTo: "You can bring up to",
    guests: "guests",

    // Gifts
    giftsTitle: "Gifts",
    giftsMessage: "Your presence is the best gift, but if you wish to give us a detail you can do it:",
    giftTable: "Gift Table",
    inEnvelope: "Inside an envelope",
    bankDetails: "Bank Details:",
    bankName: "Luis Alberto Coc",
    accountNumber: "279275010160000",
    bankInstitution: "Belize Bank",

    // Dress Code
    dressCodeTitle: "Dress Code",
    dressCodeStyle: "Formal Attire",
    dressCodeMessage: "We kindly request that you avoid wearing white or black, as these colors are reserved for the bride and groom.",
    colorWhite: "White",
    colorBlack: "Black",

    // Footer
    madeWithLove: "Made with love for Alexus & Luis's Wedding",
  },
  es: {
    // Envelope
    exclusiveInvite: "Esta invitación es exclusivamente para",
    openHint: "Toca para Abrir",

    // Hero
    togetherWithFamilies: "Junto con sus familias",
    inviteYou: "Te invitan a celebrar su boda",

    // Wedding Info (When)
    celebrationDetails: "Detalles de la Celebración",
    theDate: "La Fecha",
    when: "Cuándo",
    march: "Marzo 2026",
    ceremonyTime: "La ceremonia comenzará a las 3:00 PM",
    theCeremony: "La Ceremonia · 28 Marzo 2026",
    days: "Días",
    hours: "Horas",
    minutes: "Min",
    seconds: "Seg",

    // Wedding Info (Where)
    theVenue: "El Lugar",
    where: "Dónde",
    venueName: "San José Succotz",
    venueAddress1: "Cultural Center",
    venueAddress2: "San José Succotz, Cayo, Belize",
    getDirections: "Obtener Direcciones",

    // Wedding Info (People)
    thePeople: "Las Personas",
    blessingOfParents: "Con la bendición de nuestros padres",
    bride: "Novia",
    groom: "Novio",
    accompaniedByGodparents: "Acompañados de nuestros padrinos",
    godparents: "Padrinos",

    // Verses
    verse1Text: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.",
    verse1Ref: "Cantares 8:7",
    verse2Text: "El amor es sufrido, es benigno... Todo lo sufre, todo lo cree, todo lo espera, todo lo soporta. El amor nunca deja de ser.",
    verse2Ref: "1 Corintios 13:4, 7-8",

    // RSVP
    rsvpTitle: "RSVP",
    replyBy: "Por favor responde antes del 8 de Marzo de 2026",
    willYouAttend: "¿Asistirás?",
    yesAttending: "Acepto con Alegría",
    noDeclining: "Declino con Pesar",
    confirmNumber: "Por favor confirma el número total de asistentes",
    guestNames: "Nombres de todos los asistentes",
    dietaryNotes: "¿Algún requerimiento dietético?",
    submitRsvp: "Enviar RSVP",
    submitting: "Enviando...",
    rsvpSuccess: "¡Gracias!",
    rsvpSuccessMessage: "Tu RSVP ha sido recibido.",
    canBringUpTo: "Puedes traer hasta",
    guests: "invitados",

    // Gifts
    giftsTitle: "Regalos",
    giftsMessage: "Vuestra presencia es el mejor regalo, pero si tu deseo es tener un detalle con nosotros puedes hacerlo:",
    giftTable: "Mesa de regalo",
    inEnvelope: "Dentro de un sobre",
    bankDetails: "Dato bancario:",
    bankName: "Luis Alberto Coc",
    accountNumber: "279275010160000",
    bankInstitution: "Belize Bank",

    // Dress Code
    dressCodeTitle: "Código de Vestimenta",
    dressCodeStyle: "Vestimenta Formal",
    dressCodeMessage: "Te pedimos amablemente evitar vestir de blanco o negro, ya que estos colores están reservados para los novios.",
    colorWhite: "Blanco",
    colorBlack: "Negro",

    // Footer
    madeWithLove: "Hecho con amor para la Boda de Alexus y Luis",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Try to get saved language, default to 'en'
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("wedding_lang");
    return saved === "es" || saved === "en" ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("wedding_lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key) => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  return <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
