<template>
    <baidu-map class="baidu-map" ak="niTIU87wrt1tniMjFc5P1bHhqLQb6aoS"
               :center="center" :zoom="zoom" :scroll-wheel-zoom="true"
               @ready="mapReady">
        <!--静态控件-->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
        <bm-navigation type="BMAP_NAVIGATION_CONTROL_ZOOM" anchor="BMAP_ANCHOR_BOTTOM_LEFT"
                       :offset="navOffset"></bm-navigation>
        <!--动态添加的覆盖物-->
        <bm-marker v-for="(item, index) in markerCollection" :position="item.position" :key="index" @click="infoWindowOpen(item)">
            <bm-info-window :show="item.infoWindowShow" @close="infoWindowClose(item)">{{ item.infoText }}</bm-info-window>
        </bm-marker>
        <bm-driving v-if="drivingSearchShow" :location="walkStart" :start="walkStart" :end="walkEnd" :auto-viewport="true"
                    :select-first-result="true" @searchcomplete="drivingSearchComplete"></bm-driving>
    </baidu-map>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map';
    import BmScale from 'vue-baidu-map/components/controls/Scale';
    import BmNavigation from 'vue-baidu-map/components/controls/Navigation';
    import BmMarker from 'vue-baidu-map/components/overlays/Marker';
    import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow';
    import BmDriving from 'vue-baidu-map/components/search/Driving';

    export default {
        name: "TestBaiduMap",
        components: {
            BaiduMap,
            BmScale,
            BmNavigation,
            BmMarker,
            BmInfoWindow,
            BmDriving
        },
        data() {
            return {
                center: { lng: 0, lat: 0 }, //中心坐标点
                zoom: 3, //缩放等级
                navOffset: { width: 20, height: 60 }, //缩放控件偏移量
                markerCollection: [], //标注点数组
                walkStart: { lng: 0, lat: 0 }, //行进起点
                walkEnd: { lng: 0, lat: 0 }, //行进终点
                drivingSearchShow: false, //驾车路径规划显示标志
            }
        },
        mounted() {
            this.$bus.$on("addRandomMarker", () => {
                this.addRandomMarker();
            });
            this.$bus.$on("showRouteSearch", () => {
                this.showRouteSearch();
            });
        },
        beforeDestroy() {
            this.$bus.$off("addRandomMarker");
            this.$bus.$off("showRouteSearch");
        },
        methods: {
            //地图加载是异步的，不能依赖vue的生命周期，需要使用地图的ready回调函数
            mapReady({ BMap, map }) {
                console.log(BMap, map);
                this.center.lng = 118;
                this.center.lat = 25;
                this.zoom = 10;
            },
            //添加(118, 25)附近的随机标注
            addRandomMarker() {
                let lng = 118 + Math.floor(Math.random() * 1000000) / 1000000;
                let lat = 25 + Math.floor(Math.random() * 1000000) / 1000000;
                let marker = {
                    position: { lng, lat },
                    infoWindowShow: false,
                    infoText: `我的经度是${lng}，我的纬度是${lat}。`
                };
                this.markerCollection.push(marker);
            },
            //信息框打开
            infoWindowOpen(item) {
                item.infoWindowShow = true;
            },
            //信息框关闭
            infoWindowClose(item) {
                item.infoWindowShow = false;
            },
            //展示路径规划
            showRouteSearch() {
                this.walkStart = { lng: 118.356812, lat: 25.375500 };
                this.walkEnd = { lng: 118.403652, lat: 25.406532 };
                this.drivingSearchShow = true;
            },
            //路径规划结果回调
            drivingSearchComplete(results) {
                if (results && results.taxiFare) {
                    let distance = results.taxiFare.distance;
                    let disStr = "";
                    if (distance > 1000) {
                        let kiloMeter = distance / 1000;
                        disStr = parseFloat(kiloMeter.toFixed(2)).toString() + '公里';
                    } else {
                        disStr = distance.toString() + '米';
                    }
                    console.log(`全程${disStr}`);
                }
            }
        }
    }
</script>

<style scoped>
    .baidu-map {
        width: 100%;
        height: 100vh;
    }
</style>