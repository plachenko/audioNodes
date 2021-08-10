<script lang="ts">
	import { onMount }  from 'svelte';
	import Menu from './menu.svelte';
	import Node from '../nodes/node.svelte';
	let aWindowProps = [
		{name: 'break window', method: breakWindow},
		// {name: 'fullscreen', method: fullScreen},
		{name: 'close window', method: closeWindow}
	];
	let bFullScreen = false;
	let aNodes = [
		{name: 'createMediaElementSource', x: 200, y: 200},
		// {name: 'createMediaElementSource', x: 600, y: 300},
	];
	let aObjectProps = [];
	let bPanning = false;

	let elem;
	let elemStartPos = {
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

		/*
		document.getElementById('container').addEventListener('mousedown', (e)=>{
			if(e.button == 0){
				console.log('test')
			}
			if(e.button == 1){
				bPanning = true;
			}
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
		*/

	});
	

		
	function pan(x, y){
		let nodes = document.getElementById('innerContainer');
			nodes.style.transform = "translate("+x+"px, "+y+"px)";
	}

	function zoom(iScrollAmt){
		let nodes = document.getElementById('innerContainer');
			nodes.style.transformOrigin = (nodes.offsetWidth/2) + "px "+ ((nodes.offsetHeight/2) + window.innerHeight/2) + "px";
			nodes.style.transform = "scale("+iScrollAmt+")";
	}

	/* --- Drag and Drop functionality --- */
	function drop(e){
		// console.log('dropping', e.dataTransfer.getData('node'));
		// let el = JSON.parse(e.dataTransfer.getData('node'));
		// console.log(el);

		let data = e.dataTransfer.getData('nodeName');
		if(data){
			aNodes = [...aNodes, {
				name: data, 
				x: e.layerX, 
				y: e.layerY
			}];
		}

		// console.log(elem);
		// elem.style.left = `${e.clientX}px`;
		// elem.style.top = `${e.clientY}px`;
		// console.log(elem.offsetWidth);
		elem = null;

		e.preventDefault();
	}

	function allowDrop(e){
		// console.log(window.getComputedStyle(elem).left)
		// console.log(elemStartPos);

		// let left = e.clientX;
		let left = e.x;
			left -= 298;
			// left -= 50;
		let top = e.clientY;
			// top -= - 53;
			top -= 50;

		if(elem){
			elem.style.left = `${left}px`;
			elem.style.top = `${top}px`;
		}

		e.preventDefault();
	}
	/* --- */

	/* --- Window methods ---*/
	/* NOTE PROBABLY NOT NEEDED -- Opt for native F11 fullscreen. */
	/*
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
	*/

	function breakWindow(){
		let width = window.innerWidth;
		let height = window.innerHeight;
		window.open(window.location.href, "", "width="+width+",height="+height+",fullscreen=true");
	}

	function closeWindow(){
		window.close();
	}
	/* --- */

	function handleMessage(e){
		elem = e.detail.el;
		
		elemStartPos.x = parseInt(elem.style.left);
		elemStartPos.y = parseInt(elem.style.top);
	}

</script>

<div class="panel">
    <div class="top">
		<Menu sType='window' aProps={aWindowProps} />
	</div>
	<div class="mid">
		<Menu sType='pallet' aProps={aObjectProps} />
        
		<div class="container" on:dragover="{allowDrop}" on:drop="{drop}">
			<div class="innerContainer">
				{#each aNodes as {name, x, y}}
					<Node on:message="{handleMessage}" nodeTitle={name} pos={{x, y}} />
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

</style>