<script lang="ts">
	import { onMount } from 'svelte';
	import Panel from './window/panel.svelte';

	onMount(()=>{
		document.addEventListener('contextmenu', (e)=>{
			e.preventDefault();
			return false;
		});
	});
</script>

<main id="main">
	<Panel />
	<!-- <Panel /> -->
</main>

<style>

main {
	flex-direction: row;
	display: flex;
	flex: 1;
	height: 100%;
	overflow: hidden;
	}

</style>