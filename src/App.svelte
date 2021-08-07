<script lang="ts">
	import { onMount } from 'svelte';
	import Node from './nodes/node.svelte';

	let aObjectProps = [];
	let aNodes = [];
	let aWindowProps = [
		{name: 'break window', method: breakWindow},
		{name: 'fullscreen', method: fullScreen},
		{name: 'close window', method: closeWindow}
	];
	let actx = new AudioContext();
	let bFullScreen = false;
	let bPanning = false;
	
	for(let prop in actx){
		/*
		if(prop.includes('create')){
			const txt = prop.slice(6, prop.length);
			props.push(txt);
		}
		*/
		aObjectProps.push(prop);
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
	}

	function breakWindow(){
		let width = window.innerWidth;
		let height = window.innerHeight;
		window.open(window.location.href, "", "width="+width+",height="+height+",fullscreen=true");
	}

	function closeWindow(){
		window.close();
	}

	function allowDrop(e){
		// console.log(e);
		e.preventDefault();
	}
	
	function dragging(e){
		e.dataTransfer.setData('nodeName', e.target.innerText)
	}

	function drop(e){
		let data = e.dataTransfer.getData('nodeName');
		aNodes = [...aNodes, {
			name: data, 
			x: e.layerX, 
			y: e.layerY
		}];

		// let aNodes.push();
		// nodeArray
		// let data = JSON.parse(e.dataTransfer.getData('node'));
		// console.log(JSON.parse(data));
		// data.left =  e.screenX + "px";
		// e.target.style.left = e.screenX + "px";
	
		// e.target.style.top = e.screenY + "px";
		e.preventDefault();
	}

	function pan(x, y){
		let nodes = document.getElementById('innerContainer');
		nodes.style.transform = "translate("+x+"px, "+y+"px)";
		// console.log(x,y)

	}

	function zoom(iScrollAmt){
		let nodes = document.getElementById('innerContainer');
			nodes.style.transformOrigin = (nodes.offsetWidth/2) + "px "+ ((nodes.offsetHeight/2) + window.innerHeight/2) + "px";
			nodes.style.transform = "scale("+iScrollAmt+")";
	}

	onMount(()=>{
		let iScrollAmt = 1;
		let xamt = 0;
		let yamt = 0;

		document.getElementById('container').addEventListener('mousedown', (e)=>{
			if(e.button == 1){
				bPanning = true;
			}
			// console.log(e.button);
		});

		document.getElementById('container').addEventListener('mousemove', (e)=>{
			if(bPanning){
				xamt += e.movementX;
				yamt += e.movementY;
				pan(xamt, yamt);
			}
		});
		document.getElementById('container').addEventListener('mouseup', (e)=>{
			if(bPanning){
				bPanning = false;
			}

		});

		document.getElementById('container').addEventListener('wheel', (e)=>{
			if(iScrollAmt > 0){
				iScrollAmt -= (e.deltaY/1000);
			}else{
				iScrollAmt = .01;
			}
			zoom(iScrollAmt);
		});

		document.addEventListener('contextmenu', (e)=>{
			e.preventDefault();
			return false;
		});
	});
</script>

<main id="main">
	<div id="top">
		<ul class="menu" id="window">
			{#each aWindowProps as {name, method}, i}
				<li class="{(!window.opener && i == 2) ? 'hide' : ''}"
					on:mousedown={method}>
					{name}
				</li>
			{/each}
		</ul>
	</div>
	<div id="mid">
		<div id="pallet">
			<ul class="menu">
				{#each aObjectProps as prop}
					<li 
						draggable="true" 
						on:dragstart="{dragging}">
						{prop}
					</li>
				{/each}
			</ul>
		</div>
		<div id="container" on:dragover="{allowDrop}" on:drop="{drop}">
			<div id="innerContainer">
				{#each aNodes as {name, x, y}}
					<Node nodeTitle={name} pos={{x, y}} />
				{/each}
			</div>
		</div>
	</div>
	<div id="bot"></div>
</main>

<style>
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


	

	#container{
		position: relative;
		/* background-color:#F00; */
		background-color:#999;
		overflow: hidden;
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



</style>