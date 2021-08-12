<script lang="ts">
	import { onMount }  from 'svelte';
	import Menu from './menu.svelte';
	import Node from '../nodes/node.svelte';
	
	let aWindowProps = [
		{name: 'break window', method: breakWindow},
		{name: 'close window', method: closeWindow}
	];
	let bFullScreen = false;
	let aNodes = [
		{name: 'createMediaElementSource', x: 100, y: 100, center: false},
		// {name: 'createMediaElementSource', x: 600, y: 300},
	];
	let aObjectProps = [];
	let bPanning = false;
	let select = {
		start: false,
		points: []
	}

	let elem = null;
	let container;
	let startPos = {
		x: 0,
		y: 0
	};

	for(let prop in AudioContext.prototype){
		aObjectProps.push(prop);
	}

	onMount(()=>{
		let iScrollAmt = 1;
		let xamt = 0;
		let yamt = 0;

		container.addEventListener('pointerdown', (e)=>{
			if(e.button == 0){
				startPos.x = e.offsetX;
				startPos.y = e.offsetY;
				/*
				if(!elem){
					select.start = true;
				}
				*/
			}
			if(e.button == 1){
				bPanning = true;
			}
		});

		container.addEventListener('mousemove', (e)=>{
			if(bPanning){
				xamt += e.movementX;
				yamt += e.movementY;
				pan(xamt, yamt);
			}
		});
		container.addEventListener('mouseup', (e)=>{
			if(bPanning){
				bPanning = false;
			}
		});

		container.addEventListener('wheel', (e)=>{
			if(iScrollAmt > 0){
				iScrollAmt -= (e.deltaY/1000);
			}else{
				iScrollAmt = .01;
			}
			zoom(iScrollAmt);
		});
	});
	

		
	function pan(x, y){
		let nodes = container;
			nodes.style.transform = "translate("+x+"px, "+y+"px)";
	}

	function zoom(iScrollAmt){
		let nodes = container;
			nodes.style.transformOrigin = (nodes.offsetWidth/2) + "px "+ ((nodes.offsetHeight/2) + window.innerHeight/2) + "px";
			nodes.style.transform = "scale("+iScrollAmt+")";
	}

	/* --- Drag and Drop functionality --- */
	function drop(e){

		let data = e.dataTransfer.getData('nodeName');

		if(data){
			aNodes = [...aNodes, {
				name: data, 
				x: e.layerX, 
				y: e.layerY,
				center: true
			}];
		}

		elem = null;

		e.preventDefault();
	}

	function dragOver(e){

		let left = e.offsetX - startPos.x;
		let top = e.offsetY - startPos.y;

		if(select.start){
			console.log(e);
		}

		if(elem){
			elem.style.left = `${left}px`;
			elem.style.top = `${top}px`;
		}
		
		e.preventDefault();
	}

	function dragCancel(){
		elem = null;
		select.start = false;
		select.points = [];
	}
	/* --- */

	/* --- Window methods ---*/
	function breakWindow(){
		let width = window.innerWidth;
		let height = window.innerHeight;
		window.open(window.location.href, "", "width="+width+",height="+height+",fullscreen=true");
	}

	function closeWindow(){
		window.close();
	}
	/* --- */

	function handleNodeMove(e){
		elem = e.detail.el;
	}

	function handleNodeSocket(e){
		// console.log('test')
	}

	function testDrag(e){
		// console.log('dragEvt', e);
	}

</script>

<div class="panel">
    <div class="top">
		<Menu sType='window' aProps={aWindowProps} />
	</div>
	<div class="mid">
		<Menu sType='pallet' aProps={aObjectProps} />
        
		<div class="container" on:drop="{drop}">
			<div class="{(elem) ? 'eventContainer' : ''}" on:pointermove="{dragOver}" on:pointerup="{dragCancel}" />
			<div  bind:this={container} class="innerContainer">
				{#each aNodes as {name, x, y, center}}
					<Node 
						on:nodeSocket="{handleNodeSocket}"
						on:nodeMove="{handleNodeMove}"
						center={center}
						nodeTitle={name} 
						pos={{x, y}} />
				{/each}
			</div>
		</div>
	</div>
	<div class="bot">
		<div></div>
	</div>

</div>

<style>
.panel{
	flex: 1;
	flex-direction: column;
	overflow: hidden;
}
.panel:not(:last-child){
	border-right: 2px solid;
	/* width: 100%; */
	/* resize: horizontal; */
}

.eventContainer{
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	/* background-color:#F00; */
	}

.container{
	position: relative;
	background-color:#999;
	overflow: hidden;
	flex:1;
	}

	.top, 
	.mid, 
	.bot {
		flex: 1;
		display: flex;
		background-color:#FFF;
		min-height: 30px;
		}

	.top{
		border-bottom: 1px solid;
		place-content: flex-end;
	}

	.mid{
		height: calc(100% - 32px);
		}

.innerContainer{
	width: 100%;
	height: 100%;
}
</style>