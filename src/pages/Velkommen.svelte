<script>
    import { lenkeKlikk } from "../utils/router.js"
</script>

<section class="velkomstside" id="hovedinnhold" tabindex="-1">
    <h1 class="velkomstside-overskrift">Flokken <span>vår.</span></h1>
    <p class="velkomstside-avsnitt">Smak på orda. Per Fugelli sa det ikke bare én, men flere ganger.
        Hva mente han egentlig? Vi lever alle i en og samme flokk. Med våre gleder, med våre sorger.
        Vi er individer, avhengige av hverandre - i det enkle og utfordrende. En del av samme livsprosjekt.
        Selv om du føler deg aleine, er du ikke aleine. Du er en del av en flokk. Vår felles flokk.
        <a href="/historier" class="lenke-knapp" on:click={lenkeKlikk("/historier")}><b>Klikk her for å lese andres og dele dine egne historier.</b></a>
        <a href="/fagfolk" class="lenke-knapp" on:click={lenkeKlikk("/fagfolk")}><b>Klikk her for å møte fagfolk og influencere.</b></a>
    </p>
</section>

<style>
    .velkomstside {
        width: 100%;
        height: 100%;
        background-image: url("../images/per.jpg");
        background-size: cover;
        filter: opacity(0.95);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .velkomstside span {
        color: #bbb;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
    }

    .velkomstside-overskrift {
        display: inline-block;
        font-size: 15rem;
        text-align: center;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
        background-color: rgba(0, 0, 0, 0.25);
        padding: 0.5rem 2.5rem;
        border-radius: 0.3rem;
    }

    .velkomstside-avsnitt {
        width: 80%;
        font-size: 4rem;
        margin: 2rem;
        padding: 2rem 3rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0.2rem;
        letter-spacing: 0.05rem;
        line-height: calc(4rem * 1.5);
    }

    .velkomstside-avsnitt b {
        color: gold;
        cursor: pointer;
        text-decoration: underline;
    }

    .lenke-knapp {
        border: none;
        background: transparent;
        color: inherit;
        display: block;
        text-align: left;
        margin: 0;
        padding: 0;
        text-decoration: none;
    }

    @media (max-width: 965px) {
        .velkomstside-overskrift {
            font-size: 12rem;
        }
        
        .velkomstside-avsnitt {
            font-size: 3rem;
            line-height: calc(3rem * 1.5)
        }
    }

    @media (max-width: 800px) {
        .velkomstside-overskrift {
            font-size: 10rem;
        }

        .velkomstside-avsnitt {
            font-size: 2.5rem;
            line-height: calc(2.5rem * 1.5)
        }
    }

    @media (max-width: 594px) {
        .velkomstside-overskrift {
            font-size: 7rem;
        }
    }

    @media (max-width: 400px) {
        .velkomstside-overskrift {
            font-size: 5rem;
        }
    
        .velkomstside-avsnitt {
            font-size: 2rem;
            line-height: calc(2rem * 1.2)
        }
    }
</style>