import { db, storage, timestamp, auth, klarTilInnlogging } from "./firebase.js"
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const flokkHistorierRef = collection(db, "flokkhistorier")
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

export const lagreHistorie = async (historieTittel, historieInnhold, valgteHistorieKategorier, bildebeskrivelse = "") => {
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
            return false
        }

        await klarTilInnlogging
        if (!auth.currentUser) {
            return false
        }

        const trygtFilnavn = lagTrygtFilnavn(historieBildeFil.name)
        const storageRef = ref(storage, "historie-bilder/" + trygtFilnavn)
        const opplasting = await uploadBytes(storageRef, historieBildeFil, { contentType: historieBildeFil.type })
        const storageUrl = await getDownloadURL(opplasting.ref)
        historieBildeUrl = storageUrl
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}
