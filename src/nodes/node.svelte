<script lang="ts">
import { onMount } from "svelte";


    export let nodeTitle;
    export let pos;

    let title = "";

    onMount((e)=>{
        let actx = new AudioContext;
        
        if(nodeTitle.includes('create')){
			const txt = nodeTitle.slice(6, nodeTitle.length);
            title = txt;
		}else{
            title = nodeTitle;
        }

        for(let prop in actx[nodeTitle]){
            console.log(prop);
        }
        // this.style.left = pos.x + "px";
        // this.style.top = pos.y + "px";
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
        e.preventDefault();
		e.dataTransfer.setDragImage(new Image(), 0, 0);
	}
</script>

<div class="node" style="left: {pos.x}px; top: {pos.y}px">
    
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
                position: relative;
                padding: 5px 0px;
                }
                .sockets li:hover{
			        font-weight: bold;
		            }
        .input{
            text-align: left;
            }
        .output{
            text-align: right;
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

        .input li{
            padding-left: 10px;
            margin-left: -7px;
            }
            .input li::before{
				left: -10px;
				top: 12px;
				}
        .output li{
            padding-right: 10px;
            margin-right: -7px;
            }
            .output li::after{
				right: -10px;
				top: 12px;
				}
			

</style>