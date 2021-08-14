<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';


    export let nodeTitle;
    export let pos;
    export let center = false;

    const dispatch = createEventDispatcher();
    let node;
    let title = "";

    let socketPos = {
        x: 0,
        y: 0
    }

    let offset = {
        x: 0,
        y: 0
    }

    onMount(()=>{
        if(nodeTitle.includes('create')){
			const txt = nodeTitle.slice(6, nodeTitle.length);
            title = txt;
		}else{
            title = nodeTitle;
        }

        getProps(nodeTitle);

        let dim = {
            w: node.offsetWidth,
            h: node.offsetHeight
        };

        if(center){
            offset.x = dim.w / 2;
            offset.y = dim.h / 2;
        }

        node.style.left = `${pos.x - offset.x}px`;
        node.style.top = `${pos.y - offset.y}px`;

        // node.style.left = `${pos.x - (dim.w/2)}px`;
        // node.style.top = `${pos.y - (dim.h/2)}px`;
    })

    function dragStart(e){
        let elm = e.path[1];
        let pos = {
            x: parseInt(elm.style.left),
            y: parseInt(elm.style.top),
        };

        dispatch('nodeMove', {
            el: node
        });

		// e.dataTransfer.setDragImage(new Image(), 0, 0);

        // let el = JSON.stringify(node);
        // console.log(node);
        // e.dataTransfer.setData('node', el);
		// e.preventDefault();
        // this.style.opacity = "0.4";
	}

    function dragSocketStart(e){
        dispatch('nodeSocket', {
            el: node
        });
        socketPos.x = e.offsetX;
        socketPos.y = e.offsetY;

        // console.log(socketPos);

		// e.dataTransfer.setDragImage(new Image(), 0, 0);
    }

	function dragEnd(e){
        e.preventDefault();
		// console.log(e);
		this.style.opacity = "1";
	}

    function drag(e){
        // e.preventDefault();
        // console.log(e);
		// e.dataTransfer.setDragImage(new Image(), 0, 0);
	}

    function dragSocket(e){
        let nodeLine = document.querySelector('.nodeLines');
        let stop = e.offsetY - socketPos.y;
        let sleft =  e.offsetX - socketPos.x;

        // nodeLine.style.width = `${sleft}px`;
        // nodeLine.style.left = `60px`;
        // nodeLine.style.height =  `${stop}px`;
        // nodeLine.style.top = `calc(50% - ${stop}px)`
        // nodeLine.style.top = `0px`;
    }

    function getProps(obj){
        // console.log('adding');
        let actx = new AudioContext();
        // console.log(actx);
        // let iObj = actx[obj];
        // console.log(iObj())
        // console.log(Object.getPrototypeOf(iObj))
        /*
        for(let prop of iObj.__proto__){
            console.log(prop);
        }
        */
        // console.log(actx, iObj)
        // console.log(Object(actx[nodeTitle]).entries())

        // let 
        /*
        for(let prop of actx[nodeTitle]){
            console.log(prop);
        }
        */
    }
</script>

<div class="node" bind:this={node}>
    <span class="head" 
        draggable="true" 
        on:dragend="{dragEnd}" 
        on:pointerdown="{dragStart}"
        >
        { title }
    </span>
    <div on:pointerdown="{dragStart}" style="box-sizing: border-box; width: 100%; height: 100%; top: 0px; position: absolute;"></div>
        
    <div class="sockets">
        <ul class="input">
            <li 
                draggable="true" 
                on:dragend="{dragEnd}" 
                on:dragstart="{dragSocketStart}"
                on:drag="{drag}"
                >
                input
            </li>
            <div class="nodeLines">

            </div>
        </ul>
        <ul class="output">
            {#each Array(1) as _}
                <li 
                    draggable="true" 
                    on:dragend="{dragEnd}" 
                    on:dragstart="{dragSocketStart}"
                    on:drag="{dragSocket}"
                    >
                    output
                    <div class="nodeLines">

                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>

.nodeLines{
    z-index: 0;
    width: 10px;
    position: absolute;
    top: calc(50% + 1px);
    border-bottom: 2px solid;
    background-color:#F00;
    }
    .output .nodeLines{
        top: calc(50%);
        right: -20px;
        }
    .input .nodeLines{
        top: calc(50% + 3px);
        left: -23px;
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
    user-select: none;
    cursor: move;
    }
    .node:hover{
        box-shadow: 0px 0px 4px #000;
        }

    .node ul{
        flex: 1;
        margin: 0px;
        padding: 0px;
        list-style: none;
        }

        .sockets{
            padding: 5px;
            display: flex;
            }
            .sockets li{
                box-sizing: border-box;
                position: relative;
                padding: 5px 0px;
			    cursor: crosshair;
                }
                .sockets li:hover{
                    text-shadow: 0.5px 0px 0px #000;
		            }
                .sockets li:hover::before,
                .sockets li:hover::after{
                    box-shadow: 0px 0px 5px #000;
                    }

        .input li::before,
		.output li::after{
			content: " ";
			width: 10px;
			height: 10px;
			background-color:#FFF;
			position: absolute;
			}

        .input li{
            text-align: left;
            padding-left: 10px;
            margin-left: -7px;
            float: left;
            }
            .input li::before{
				left: -10px;
				top: 12px;
				}

        .output li{
            text-align: right;
            padding-right: 10px;
            margin-right: -7px;
            float: right;
            }
            .output li::after{
				right: -10px;
				top: 12px;
				}
</style>