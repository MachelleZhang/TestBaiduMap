<!--控制面板-->
<template>
    <div class="operate-panel">
        <button @click="randomMarker">随机标注点</button>
        <button @click="routeSearch">路径规划</button>
    </div>
</template>

<script>
    export default {
        name: "OperatePanel",
        methods: {
            randomMarker() {
                this.$bus.$emit("addRandomMarker");
            },
            routeSearch() {
                this.$bus.$emit("showRouteSearch");
            }
        }
    }
</script>

<style scoped>
    .operate-panel {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 100px;
        height: 100px;
        background-color: #fff;
        z-index: 999;
        border-radius: 5px;
        box-shadow: 2px 2px 5px #0004;
        padding: 10px;
    }
</style>