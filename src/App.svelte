<script lang="ts">
	import { onMount } from 'svelte';
	import Node from './nodes/node.svelte';
	import Panel from './window/panel.svelte';

	let aObjectProps = [];
	let aNodes = [];

	let actx = new AudioContext();
	let bPanning = false;
	
	for(let prop in actx){
		aObjectProps.push(prop);
	}

	function allowDrop(e){
		e.preventDefault();
	}
	
	function dragging(e){
		e.dataTransfer.setData('nodeName', e.target.innerText)
	}

	function drop(e){
		console.log(e);
		let data = e.dataTransfer.getData('nodeName');
		if(data){
			aNodes = [...aNodes, {
				name: data, 
				x: e.layerX, 
				y: e.layerY
			}];
		}

		e.preventDefault();
	}

	function pan(x, y){
		let nodes = document.getElementById('innerContainer');
			nodes.style.transform = "translate("+x+"px, "+y+"px)";
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

		document.addEventListener('contextmenu', (e)=>{
			e.preventDefault();
			return false;
		});
	});
</script>

<main id="main">
	<Panel />
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

</style>