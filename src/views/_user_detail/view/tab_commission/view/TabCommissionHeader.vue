<template>
    <div class="header-content">
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.date.name"
                :startDate.sync="listQuery['start_date']"
                :endDate.sync="listQuery['end_date']"
            />
            <div>
                <el-button class="header-button" @click="handlerSearch()" type="primary" icon="el-icon-search"
                    >{{ $t("common.search") }}</el-button
                >
                <el-button class="header-button" @click="handlerReset()" type="primary" icon="el-icon-refresh"
                    >{{ $t("common.reset") }}</el-button
                >
            </div>
        </div>
        <div class="desc" v-loading="net_status.loading">
            <p>{{ $t("user_detail.atMostDisplay",{"0": tableColumns.keep_time}) }}</p>
            <p>
                {{ tableColumns.commission_history_num }}：<span v-html="getAccessInfo(tableData.commission_history_num)"></span>
            </p>
            <p>
                {{ tableColumns.commission_received_num }}：<span v-html="getAccessInfo(tableData.commission_received_num)"></span>
            </p>
        </div>
    </div>
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchDatePicker,
    },
})
export default class TabCommissionHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    get tableColumns() {
        return this.myProxy.tableData.columns.commission;
    }
    private tableData = this.myProxy.tableData;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.myProxy.onQuery();
    }
    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    getAccessInfo(data: any) {
        let infoStr = "";
        if (data) {
            const keys = Object.keys(data);
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data[key] + "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
        }
        return infoStr;
    }
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";
.header-content {
    display: flex;
    justify-content: space-between;
    .group {
        transform: translateY(25%);
        height: 30px;
    }
    .desc {
        text-align: right;
        span {
            color: green;
        }
    }
}
</style>