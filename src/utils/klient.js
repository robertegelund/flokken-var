// Netlify Functions har ingen innebygd brukerautentisering. Eierskap til en
// historie sjekkes derfor via en hemmelig slettenøkkel: serveren genererer
// den når historien opprettes og returnerer den kun i det ene svaret til
// oppretteren (se historie-handtering.js) - den vises aldri i offentlige
// GET-responser. Vi lagrer den lokalt per historie-ID for å kunne slette
// historien igjen senere i samme nettleser.
const NOKKEL_PREFIX = "flokken-slettenokkel-"

export const lagreSlettenokkel = (historieID, slettenokkel) => {
    try {
        localStorage.setItem(NOKKEL_PREFIX + historieID, slettenokkel)
    } catch {
        // Utilgjengelig localStorage (f.eks. privat nettlesing) betyr bare at
        // brukeren ikke kan slette historien sin igjen senere.
    }
}

export const hentSlettenokkel = (historieID) => {
    try {
        return localStorage.getItem(NOKKEL_PREFIX + historieID)
    } catch {
        return null
    }
}

export const harSlettenokkel = (historieID) => hentSlettenokkel(historieID) !== null
