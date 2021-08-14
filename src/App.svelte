<script lang="ts">
	import { onMount } from 'svelte';
	import Panel from './window/panel.svelte';

	onMount(()=>{
		document.addEventListener('contextmenu', (e)=>{
			e.preventDefault();
			return false;
		});
	});

	/* -- prevent default drag and drop functionality -- */
	/* We want to parse drag and drop based on content info */
	function drop(e){
		e.preventDefault();
	}
    
    function dragger(e){
		e.preventDefault();
    }
	/* --- */

</script>

<main id="main" on:drop="{drop}" on:dragover="{dragger}">
	<div style="flex:1; flex-direction: row; display: flex; height: 50%; box-sizing: border-box; border-bottom: 2px solid;">
		<Panel />
		<Panel />
	</div>
	<Panel type={1} />
</main>

<style>

main {
	flex-direction: column;
	display: flex;
	flex: 1;
	height: 100%;
	overflow: hidden;
	}

</style>