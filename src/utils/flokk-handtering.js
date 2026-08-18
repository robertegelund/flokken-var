export const hentFlokkMedlemmer = async () => {
    try {
        const respons = await fetch("/api/flokkmedlemmer")
        if (!respons.ok) {
            return []
        }
        return await respons.json()
    }
    catch (error) {
        console.error(error)
        return []
    }
}

export const velgFlokk = (flokkMedlemmer, flokk) => {
    if (flokk === "fagfolk" || flokk === "influensere")
        return flokkMedlemmer.filter(medlem => medlem.kategori === flokk)
    if (flokk === "alle")
        return flokkMedlemmer
    return flokkMedlemmer.filter(medlem => medlem.beskrivelse.toLowerCase().includes(flokk.toLowerCase()))
}
