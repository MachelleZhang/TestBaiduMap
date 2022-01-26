<template>
    <div id="app">
        <test-baidu-map></test-baidu-map>
        <operate-panel></operate-panel>
    </div>
</template>

<script>
    import TestBaiduMap from "@/components/TestBaiduMap";
    import OperatePanel from "@/components/OperatePanel";

    export default {
        name: 'App',
        components: {
            TestBaiduMap,
            OperatePanel
        }
    }
</script>

<style>
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
