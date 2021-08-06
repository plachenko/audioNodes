<script lang="ts">
	import { onMount } from 'svelte';
import { prop_dev } from 'svelte/internal';

	let objectProps = [];
	let windowProps = [
		{name: 'break window', method: breakWindow},
		{name: 'fullscreen', method: fullScreen},
		{name: 'close window', method: closeWindow}
	];
	let actx = new AudioContext();
	let bFullScreen = false;
	
	for(let prop in actx){
		/*
		if(prop.includes('create')){
			const txt = prop.slice(6, prop.length);
			props.push(txt);
		}
		*/
		objectProps.push(prop);
	}

	function dragStart(e){
		e.preventDefault();
	}

	function dragEnd(e){
		// console.log('stop');
	}

	function fullScreen(){
		let elem = document.querySelector('main');
		if(!bFullScreen){
			elem.requestFullscreen();
			bFullScreen = true;
		}else {
			document.exitFullscreen();
			bFullScreen = false;
		}

		// console.log('enter fullscreen');
	}

	function breakWindow(){
		let width = window.innerWidth;
		let height = window.innerHeight;
		window.open(window.location.href, "", "width="+width+",height="+height+",fullscreen=true");
	}

	function closeWindow(){
		window.close();
	}

	function drag(e){
		e.dataTransfer.setDragImage(new Image(), 0, 0);
		// e.dataTransfer.setData('node', JSON.stringify(e.target.style));
	}

	function allowDrop(e){
		// console.log(e);
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
			let target: HTMLElement = e.target; 
			// console.log(target.parentElement.parentElement.classList)
			return false;
		});
	});
</script>

<main id="main">
	<div id="top">
		<ul class="menu" id="window">
			{#each windowProps as {name, method}, i}
				<li on:mousedown={method} class="{(!window.opener && i == 2) ? 'hide' : ''}">{name}</li>
			{/each}
		</ul>
	</div>
	<div id="mid">
		<div id="pallet">
			<ul class="menu">
				{#each objectProps as prop}
					<li draggable="true">{prop}</li>
				{/each}
			</ul>
		</div>
		<div id="container" on:dragover="{allowDrop}" on:drop="{drop}">
			<div class="node">
				<span class="head" draggable="true" on:dragexit="{dragEnd}" on:dragstart="{drag}">header</span>
				<div class="sockets">
					<ul class="input">
						<li draggable="true" on:dragend="{dragEnd}" on:dragstart="{drag}">input</li>
						<li>input</li>
						<li>input</li>
						<li>input</li>
					</ul>
					<ul class="output">
						<li draggable="true">input</li>
						<li>output</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div id="bot"></div>
</main>

<style>
	#top{
		background-color:#FFF;
		}
		#top .menu li{
			float: left;
			border-bottom: none;
			border-left: 1px solid;
			padding: 2px 5px;
			}
		#window{
			float:right;
			}
	#mid{
		min-height: 100px;
		flex:1;
		display: flex;
		}
	#bot{
		min-height: 100px;
		/* flex:1; */
	}


	.node{
		left: 100px;
		top: 100px;
		
		min-height: 100px;
		min-width: 200px;
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
			list-style: none;
			}
		.sockets li{
			position: relative;
			padding: 5px 0px;
			}
			.output{
				text-align: right;
				}

		.sockets li:hover{
			font-weight: bold;
		}
		.input li::before,
		.output li::after{
			content: " ";
			width: 10px;
			height: 10px;
			background-color:#FFF;
			position: absolute;
			cursor: crosshair;
			}
			.input li::before{
				left: -17px;
				top: 12px;
				}
			.output li::after{
				right: -17px;
				top: 12px;
				}
		.head{
			cursor: move;
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
	}

	.menu{
		user-select: none;
		margin: 0px;
		padding: 0px;
		list-style: none;
		}
		.menu li{
			border-bottom: 1px solid;
			display: block;
			padding: 15px;
			cursor: pointer;
			}
			.menu li:hover{
				background-color:#FF0;
				}


	main {
		display: flex;
		flex: 1;
		height: 100%;
		overflow: hidden;
		flex-direction: column;
		}
		.hide{
			display: none !important;
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