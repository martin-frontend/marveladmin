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
            LangUtil('总共 {0} 条记录，{1}/{2}页', pageInfo.pageTotal, pageInfo.pageCurrent, Math.ceil(pageInfo.pageTotal / pageInfo.pageSize)),
        }}</span>
    </el-pagination>
    <!-- 父组件用法 -->
    <!-- <pagination :pageInfo="" @pageSwitch=""></pagination> -->
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { PageInfoVO } from "@/core/vo/PageInfoVO";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
    LangUtil = LangUtil;
    @Prop()
    readonly pageInfo!: PageInfoVO;

    @Emit("pageSwitch")
    pageSwitch(page: number) {}
    onPageSwitch(page: number) {
        this.pageSwitch(page);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
