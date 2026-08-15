import { db, storage, timestamp } from "./firebase.js"
const flokkHistorier = db.collection("flokkhistorier")
let historieID = ""
let historieBildeUrl = ""
const maksFilnavnLengde = 80

const lagTrygtFilnavn = (filnavn = "historie") => {
    const filnavnUtenSpesialtegn = filnavn
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "")
        .slice(0, maksFilnavnLengde)

    const grunnnavn = filnavnUtenSpesialtegn.length ? filnavnUtenSpesialtegn : "historie"
    return `${Date.now()}-${Math.random().toString(36).slice(2)}-${grunnnavn}`
}

export const lagreHistorie = async (historieTittel, historieInnhold, valgteHistorieKategorier) => {
    try {
        const nyHistorie = await flokkHistorier.doc()
        const nyHistorieID = await nyHistorie.id
        
        await flokkHistorier.doc(nyHistorieID).set({ 
            historieTittel, historieInnhold, valgteHistorieKategorier, historieBildeUrl, historiePublisert: timestamp 
        })

        await window.localStorage.setItem(
            nyHistorieID,
            JSON.stringify({
                historieTittel,
                historieInnhold,
                valgteHistorieKategorier,
                historieBildeUrl,
                historiePublisert: timestamp
            })
        )
        
        historieID = nyHistorieID
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}   

export const slettHistorie = (historieID) => {
    try {
        localStorage.removeItem(historieID)
        flokkHistorier.doc(historieID).delete()
    }
    catch(error) {
        console.error(error)
    }
}

export const lastOppHistorieBilde = async (historieBildeFil) => {
    try {
        if (!historieBildeFil) {
            return false
        }

        const trygtFilnavn = lagTrygtFilnavn(historieBildeFil.name)
        const sti = storage.ref().child("historie-bilder/" + trygtFilnavn)
        const opplasting = await sti.put(historieBildeFil, { contentType: historieBildeFil.type })
        const storageUrl = await opplasting.ref.getDownloadURL()
        historieBildeUrl = storageUrl
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}