import { db, storage, timestamp } from "../firebase"
const flokkHistorier = db.collection("flokkhistorier")
let historieID = ""
let historieBildeUrl = ""

export const lagreHistorie = async (historieTittel, historieInnhold, valgteHistorieKategorier) => {
    try {
        const nyHistorie = await flokkHistorier.doc()
        const nyHistorieID = await nyHistorie.id
        
        await flokkHistorier.doc(nyHistorieID).set({ 
            historieTittel, historieInnhold, valgteHistorieKategorier, historieBildeUrl, historiePublisert: timestamp 
        })

        await window.localStorage.setItem(nyHistorieID, 
            {historieTittel, historieInnhold, valgteHistorieKategorier, historieBildeUrl, historiePublisert: timestamp 
        })
        
        historieID = nyHistorieID
    }
    catch (error) {
        console.error(error)
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
        const sti = storage.ref().child("historie-bilder/" + historieBildeFil.name)
        const opplasting = await sti.put(historieBildeFil)
        const storageUrl = await opplasting.ref.getDownloadURL()
        historieBildeUrl = storageUrl
    }
    catch (error) {
        console.error(error)
    }
}