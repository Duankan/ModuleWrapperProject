<script>
import config from 'config';

export default {
  name: 'Map',
  data() {
    return {
      // 地图配置
      center: config.map.center,
      zoom: config.map.zoom,
      maxZoom: config.map.maxZoom,
    };
  },
};
</script>

<template>
  <BaseMap
    ref="map"
    :center="center"
    :zoom="zoom"
    :max-zoom="maxZoom"
  >
    <slot />
    <NavControl />
    <MiniMap />
    <MapTool />
    <TileWMSLayer />
    <TileWMTSLayer />
    <BaseLayer />
    <TemporaryLayers></TemporaryLayers>
    <GeoJson
      ref="geojson"
      :light-geometry="false"
      color="#ff9900"
      fill-color="#ff9900"
      animate-light
    />
    <MousePosition />
    <MapPolygon ref="polygon"></MapPolygon>
    <MapRectangle ref="rectangle"></MapRectangle>
    <MapMarker ref="marker"></MapMarker>
    <MapPolyLine ref="polyline"></MapPolyLine>
    <MapCircle ref="circle"></MapCircle>
  </BaseMap>
</template>

<style lang="less" scoped>
</style>
