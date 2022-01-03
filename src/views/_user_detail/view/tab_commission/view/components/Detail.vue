<template>
    <div>
        <div class="desc">
            <span>{{ myProxy.dialogData.detailData.listQuery.date }}</span>
            <span
                >{{ tableColumns.directly_users.name }}({{ $t("common.create") }})：{{ tableData.directly_users }}({{
                    tableData.today_directly_users
                }})</span
            >
            <span
                >{{ tableColumns.group_users.name }}({{ $t("common.create") }})：{{ tableData.group_users }}({{
                    tableData.today_group_users
                }})</span
            >
            <span>{{ tableColumns.total_commission.name }}：{{ tableData.statistics_data.total_commission }}</span>
        </div>
        <el-table
            :data="infoList"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column
                :label="tableColumns.commission_info.vendor_type.name"
                prop="title"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.total_water.name"
                prop="total_water"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.self_water.name"
                prop="self_water"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.direct_water.name"
                prop="direct_water"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.group_water.name"
                prop="group_water"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.commission_num.name"
                prop="commission_num"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    {{ row.commission_num }}
                    <template v-if="row.is_promotion_floor == 1">
                        <span class="red">({{ $t("user_detail.keep") }})</span>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission_info.total_commission.name"
                prop="total_commission"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionProxy from "../../proxy/TabCommissionProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class Detail extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns.commission_detail;
    get tableData() {
        return this.myProxy.dialogData.detailData.tableData;
    }
    get infoList() {
        return this.myProxy.dialogData.detailData.infoList;
    }
}
</script>
<style scoped lang="scss">
.desc {
    span {
        margin-right: 16px;
    }
    margin-bottom: 16px;
}
.red {
    color: red;
}
</style>
