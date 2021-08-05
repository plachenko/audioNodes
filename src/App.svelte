<script lang="ts">
	import { onMount } from 'svelte';

	let props = [];
	let actx = new AudioContext();
	
	for(let prop: String in actx){
		if(prop.includes('create')){
			const txt = prop.slice(6, prop.length);
			props.push(txt);
		}
	}

	function drag(e){
		// e.dataTransfer.setData('node', JSON.stringify(e.target.style));
	}

	function allowDrop(e){
		e.preventDefault();
	}
	
	function drop(e){
		// console.log(e);
		// let data = JSON.parse(e.dataTransfer.getData('node'));
		// console.log(JSON.parse(data));
		// data.left =  e.screenX + "px";
		// e.target.style.left = e.screenX + "px";
		// e.target.style.top = e.screenY + "px";
		e.preventDefault();
	}

	onMount(()=>{
		document.addEventListener('contextmenu', (e)=>{
			e.preventDefault();
			return false;
		});
	});
</script>

<main>
	<div id="pallet">
		<ul>
			{#each props as prop}
			<li draggable="true">{prop}</li>
			{/each}
		</ul>
	</div>
	<div id="container" on:dragover="{allowDrop}" on:drop="{drop}">

		<div class="node" draggable="true" on:dragstart="{drag}">
			<span class="head">header</span>
			<div class="sockets">
				<ul class="input">
					<li>input</li>
				</ul>
				<ul class="output">
					<li>output</li>
				</ul>
			</div>
			
		</div>

	</div>
</main>

<style>

	.node{
		height: 100px;
		min-width: 100px;
		background-color:#F0F;
		border: 2px solid;
		border-radius: 10px;
		position: absolute;
		box-sizing: border-box;
		flex: 1;
		}
		.sockets{
			padding: 5px;
			display: flex;
		}
		.node ul{
			flex: 1;
			margin: 0px;
			padding: 0px;
			/*list-style: none;*/
		}
		.output{
			
			text-align: right;
    		list-style-position: inside;
		}
		.head{
			background-color:#CCC;
			padding: 5px 0px;
			text-align: center;
			width: 100%;
			display:block;
			border-radius: 10px 10px 0px 0px;
		}
	#container{
		position: relative;
		background-color:#F00;
		flex:1;
	}
	#pallet{
		background-color:#CCC;
		overflow-y: scroll;
		user-select: none;
	}
		#pallet ul{
			margin: 0px;
			padding: 0px;
			list-style: none;
			}
			#pallet li{
				border-bottom: 1px solid;
				display: block;
				padding: 15px;
				cursor: pointer;
				}
				#pallet li:hover{
					background-color:#FF0;
				}
	main {
		display: flex;
		flex: 1;
		height: 100%;
		overflow: hidden;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>