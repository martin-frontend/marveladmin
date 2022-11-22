<template>
    <div class="content">
        <StatisticPlatHeader />
        <StatisticPlatBody />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import StatisticPlatHeader from "./StatisticPlatHeader.vue";
import StatisticPlatBody from "./StatisticPlatBody.vue";

@Component({
    components: {
        StatisticPlatHeader,
        StatisticPlatBody,
    },
})
export default class StatisticPlat extends AbstractView {}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
