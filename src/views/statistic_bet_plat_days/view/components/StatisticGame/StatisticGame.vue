<template>
    <div class="content">
        <StatisticGameHeader />
        <StatisticGameBody />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import StatisticGameHeader from "./StatisticGameHeader.vue";
import StatisticGameBody from "./StatisticGameBody.vue";

@Component({
    components: {
        StatisticGameHeader,
        StatisticGameBody,
    },
})
export default class StatisticGame extends AbstractView {}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
