<script lang="ts">
	let aWindowProps = [
		{name: 'break window', method: breakWindow},
		{name: 'fullscreen', method: fullScreen},
		{name: 'close window', method: closeWindow}
	];
	let bFullScreen = false;
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
</script>

<div>
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
	<div id="bot">
		<div></div>
	</div>
</div>

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

</style>