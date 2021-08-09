<script lang="ts">
    export let aProps = [];
    export let sType = '';

    function dragging(e){
		e.dataTransfer.setData('nodeName', e.target.innerText)
	}
</script>

<div class="{sType}">
    <ul class="menu">
        {#if sType == 'pallet'}
            {#each aProps as prop}
                <li 
                    draggable="true" 
                    on:dragstart="{dragging}"
                    >
                    {prop}
                </li>
            {/each}
        {:else if sType == 'window'}
            {#each aProps as {name, method}, i}
            <li class="{(!window.opener && i == 2) ? 'hide' : ''}"
                on:mousedown={method}>
                {name}
            </li>
            {/each}
        {/if}
    </ul>
</div>

<style>
.window li{
    float: right;
    border-bottom: none !important;
    border-left: 1px solid;
    padding: 5px 15px !important;
    }

.pallet{
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