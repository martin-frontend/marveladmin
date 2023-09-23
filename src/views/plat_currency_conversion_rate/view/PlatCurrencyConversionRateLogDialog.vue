<template>
    <el-dialog :title="LangUtil('转换记录')" :visible.sync="myProxy.logDialogData.bShow" width="1200px">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="id" :label="LangUtil('ID')" class-name="status-col"> </el-table-column>
            <el-table-column prop="trade_time" :label="LangUtil('时间')" class-name="status-col"> </el-table-column>
            <el-table-column prop="from_coin" :label="LangUtil('转换前币种')" class-name="status-col">
            </el-table-column>
            <el-table-column prop="from_coin_amount" :label="LangUtil('数量')" class-name="status-col">
            </el-table-column>
            <el-table-column prop="to_coin" :label="LangUtil('转换后币种')" class-name="status-col"> </el-table-column>
            <el-table-column prop="to_coin_amount" :label="LangUtil('数量')" class-name="status-col"> </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatCurrencyConversionRateProxy from "../proxy/PlatCurrencyConversionRateProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatCurrencyConversionRateLogDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatCurrencyConversionRateProxy = this.getProxy(PlatCurrencyConversionRateProxy);
    // proxy property
    tableData = this.myProxy.logDialogData.list;
    pageInfo = this.myProxy.logDialogData.pageInfo;
    listQuery = this.myProxy.logListQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onShowLog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
