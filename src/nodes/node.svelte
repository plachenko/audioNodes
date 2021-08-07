<script lang="ts">
import { onMount } from "svelte";


    export let nodeTitle;
    export let pos;

    let node;

    let title = "";

    onMount((e)=>{
        let actx = new AudioContext;
        
        if(nodeTitle.includes('create')){
			const txt = nodeTitle.slice(6, nodeTitle.length);
            title = txt;
		}else{
            title = nodeTitle;
        }

        // console.log(Object(actx[nodeTitle]).entries())

        /*
        for(let prop of actx[nodeTitle]){
            console.log(prop);
        }
        */
        let dim = {
            w: node.offsetWidth,
            h: node.offsetHeight
        };

        node.style.left = `${pos.x - (dim.w/2)}px`;
        node.style.top = `${pos.y - (dim.h/2)}px`;
        console.log(node.offsetWidth);
    })

    function dragStart(e){
		e.preventDefault();
		console.log(e);
		this.style.opacity = "0.4";
	}

	function dragEnd(e){
        e.preventDefault();
		console.log(e);
		this.style.opacity = "1";
	}

    function drag(e){
        console.log(e);
        // e.preventDefault();
		e.dataTransfer.setDragImage(new Image(), 0, 0);
	}
</script>

<div class="node" bind:this={node}>
    
    <span class="head" 
        draggable="true" 
        on:dragend="{dragEnd}" 
        on:dragstart="{dragStart}" 
        on:drag="{drag}">
        { title }
    </span>
        
    <div class="sockets">
        <ul class="input">
            <li 
                draggable="true" 
                on:dragend="{dragEnd}" 
                on:dragstart="{drag}">
                <!-- <div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; color: #F0F;" /> -->
                input
            </li>
        </ul>
        <ul class="output">
            <li draggable="true" 
            on:dragend="{dragEnd}" 
            on:dragstart="{drag}">output</li>
            <li draggable="true" 
            on:dragend="{dragEnd}" 
            on:dragstart="{drag}">output</li>
            <li draggable="true" 
            on:dragend="{dragEnd}" 
            on:dragstart="{drag}">output</li>
        </ul>
    </div>
</div>

<style>
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
    }
    .node:hover{
        box-shadow: 0px 0px 4px #000;
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
                    box-shadow: 0px 2px 5px #000;
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