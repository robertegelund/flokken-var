import * as flokken from "../data/flokken.json"

export const velgFlokk = flokk => {
    if (flokk === "fagfolk" || flokk === "influensere")
        return flokken[flokk] 
    else if (flokk === "alle") 
        return [...flokken["fagfolk"], ...flokken["influensere"]]
    else return flokkSok(flokk)
}

const flokkSok = (sokeord) => {
    let flokkenKopi = [...flokken["fagfolk"], ...flokken["influensere"]] 
    let resultat = flokkenKopi.filter(medlem => {
            return sjekkSamsvar(sokeord, medlem)
        })
    return resultat
};

const sjekkSamsvar = (sokeord, medlem) => {
    return medlem.data.beskrivelse.toLowerCase().includes(sokeord.toLowerCase())
}
