<template>
    <el-pagination
        class="pagination"
        background
        layout="slot, prev, pager, next, jumper"
        :page-size="Number(pageInfo.pageSize)"
        @current-change="onPageSwitch"
        :current-page="Number(pageInfo.pageCurrent)"
        :total="Number(pageInfo.pageTotal)"
    >
        <span class="slot" v-show="pageInfo.pageTotal">{{
            $t("component.pageInfo", {
                "0": pageInfo.pageTotal,
                "1": pageInfo.pageCurrent,
                "2": Math.ceil(pageInfo.pageTotal / pageInfo.pageSize),
            })
        }}</span>
    </el-pagination>
    <!-- 父组件用法 -->
    <!-- <pagination :pageInfo="" @pageSwitch=""></pagination> -->
</template>

<script lang="ts">
import { PageInfoVO } from "@/core/vo/PageInfoVO";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
    @Prop()
    readonly pageInfo!: PageInfoVO;

    @Emit("pageSwitch")
    private pageSwitch(page: number) {}
    private onPageSwitch(page: number) {
        this.pageSwitch(page);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
