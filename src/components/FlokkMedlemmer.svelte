<script>
	import FlokkMedlem from "./FlokkMedlem.svelte"
	export let valgtFlokk
</script>

<section class="flokkmedlemmer-container">
	{#each valgtFlokk as flokkmedlem (flokkmedlem.id)}
		<FlokkMedlem flokkMedlemID={flokkmedlem.id} flokkMedlemData={flokkmedlem} />
	{/each}
</section>

<style>
    .flokkmedlemmer-container {
		width: 100%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(30rem, 100%), 1fr) );
		gap: 5rem 5rem;
		letter-spacing: 0.03rem;
		justify-content: center;
		align-items: center;
	}
</style>  
