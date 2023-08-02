<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="plat_id" :label="tableColumns.plat_id.name" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] || row.plat_id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="vendor_id" :label="tableColumns.vendor_id.name" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.vendor_id.options[row.vendor_id] || row.vendor_id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="batch_no" :label="tableColumns.batch_no.name" align="center" min-width="100px">
            </el-table-column>
            <el-table-column prop="order_no" :label="tableColumns.order_no.name" align="center" min-width="100px">
            </el-table-column>
            <el-table-column prop="user_id" :label="tableColumns.user_id.name" align="center" min-width="60px">
            </el-table-column>
            <el-table-column prop="wallet_type" :label="tableColumns.wallet_type.name" align="center" min-width="60px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.wallet_type.options[row.wallet_type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" :label="tableColumns.type.name" align="center" min-width="60px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="coin_name_unique"
                :label="tableColumns.coin_name_unique.name"
                align="center"
                min-width="60px"
            >
            </el-table-column>

            <el-table-column prop="gold" :label="tableColumns.gold.name" align="center" min-width="120px">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.gold" :isShowColor="true" :isShowPlus="false" :isShowDollar="false" />
                </template>
            </el-table-column>
            <el-table-column prop="check_times" :label="tableColumns.check_times.name" align="center" min-width="60px">
            </el-table-column>

            <el-table-column prop="status" :label="tableColumns.status.name" align="center" width="200px">
                <template slot-scope="{ row }">
                    <div v-if="isorderno && editOrdernoID == row.id">
                        <SearchSelect
                            :isNeedTitle="false"
                            v-model="editOrdernoValue"
                            :options="tableColumns.status.options"
                        />

                        <el-button
                            class="item"
                            type="warning"
                            size="mini"
                            @click="
                                editOrdernoID = null;
                                isorderno = false;
                            "
                            >{{ LangUtil("取消") }}</el-button
                        >
                        <el-button class="item" type="success" size="mini" @click="onEditOrderNo(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div v-else>
                        <span style="margin-right: 10px">{{ tableColumns.status.options[row.status] }}</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            :disabled="isCantEditOrderno"
                            @click="
                                editOrdernoID = row.id;
                                isorderno = true;
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="log_created_at"
                :label="tableColumns.log_created_at.name"
                align="center"
                min-width="100px"
            >
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersVendorGoldLogAlarmProxy from "../proxy/PlatUsersVendorGoldLogAlarmProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import SearchSelect from "@/components/SearchSelect.vue";
import LangUtil from "@/core/global/LangUtil";
@Component({
    components: {
        Pagination,
        WinLossDisplay,
        SearchSelect,
    },
})
export default class PlatUsersVendorGoldLogAlarmBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersVendorGoldLogAlarmProxy = this.getProxy(PlatUsersVendorGoldLogAlarmProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

    editOrdernoID: any = null;
    isorderno = false;
    editOrdernoValue = "";
    /** 不能编辑*/
    get isCantEditOrderno() {
        return false;
    }
    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
    // get stateOptions()
    // {
    //     return [this.]
    // }
    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
    onEditOrderNo(row: any) {
        this.editOrdernoID = null;
        this.isorderno = false;

        this.myProxy.tableData.ctrlData.id = row.id;
        this.myProxy.tableData.ctrlData.status = this.editOrdernoValue;
        this.myProxy.onUpdate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
