import { db, storage, timestamp, auth, klarTilInnlogging } from "./firebase.js"
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const flokkHistorierRef = collection(db, "flokkhistorier")
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

export const lagreHistorie = async (historieTittel, historieInnhold, valgteHistorieKategorier, bildebeskrivelse = "", historieBildeUrl = "") => {
    try {
        await klarTilInnlogging
        if (!auth.currentUser) {
            return false
        }

        const nyHistorieRef = doc(flokkHistorierRef)
        const opprettetAv = auth.currentUser.uid

        await setDoc(nyHistorieRef, {
            historieTittel, historieInnhold, valgteHistorieKategorier, historieBildeUrl, bildebeskrivelse, opprettetAv, historiePublisert: timestamp()
        })

        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}

export const slettHistorie = (historieID) => {
    try {
        klarTilInnlogging.then(() => deleteDoc(doc(db, "flokkhistorier", historieID)))
    }
    catch(error) {
        console.error(error)
    }
}

export const lastOppHistorieBilde = async (historieBildeFil) => {
    try {
        if (!historieBildeFil) {
            return null
        }

        await klarTilInnlogging
        if (!auth.currentUser) {
            return null
        }

        const trygtFilnavn = lagTrygtFilnavn(historieBildeFil.name)
        const storageRef = ref(storage, "historie-bilder/" + trygtFilnavn)
        const opplasting = await uploadBytes(storageRef, historieBildeFil, { contentType: historieBildeFil.type })
        return await getDownloadURL(opplasting.ref)
    }
    catch (error) {
        console.error(error)
        return null
    }
}
