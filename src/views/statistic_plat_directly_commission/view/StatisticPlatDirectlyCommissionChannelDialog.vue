<template>
    <el-dialog :title="LangUtil('参与直属分红渠道设置')" :visible.sync="myProxy.dialogChannelData.bShow" width="1000px">
        <div class="header-content">
            <div class="group">
                <SearchInput :title="LangUtil('渠道ID')" v-model="listQuery.channel_id" />
                <SearchSelect
                    :title="tableColumns.directly_commission_status.name"
                    v-model="listQuery.directly_commission_status"
                    :options="tableColumns.directly_commission_status.options"
                />

                <div>
                    <el-button class="header-button" @click="handlerSearch()" type="primary">
                        {{ LangUtil("查询") }}
                    </el-button>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%; margin-top: 16px;"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column class-name="status-col" :label="LangUtil('渠道ID')" prop="channel_id"> </el-table-column>
            <el-table-column class-name="status-col" :label="LangUtil('参与状态')" prop="directly_commission_status">
                <template slot-scope="{ row }">
                    <el-switch
                        @change="onSwitchStatus(row)"
                        v-model="row.directly_commission_status"
                        :active-value="1"
                        :inactive-value="98"
                    >
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import Pagination from "@/components/Pagination.vue";
import { MessageBox } from "element-ui";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        Pagination,
    },
})
export default class StatisticPlatDirectlyCommissionDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.detailTableData.columns;
    tableData = this.myProxy.dialogChannelData.list;
    pageInfo = this.myProxy.dialogChannelData.pageInfo;
    listQuery = this.myProxy.channelListQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryChannel();
    }

    handlerSearch() {
        this.myProxy.onQueryChannel();
    }

    onSwitchStatus(row: any) {
        let confirmText = "";
        if (row.directly_commission_status == 98) {
            confirmText = LangUtil(
                "关闭{0}渠道的直属亏损分红功能，{1}渠道的所有会员均失去直属亏损分红的资格，请问确认要关闭吗？",
                row.channel_id,
                row.channel_id
            );
        } else {
            confirmText = LangUtil(
                "开启{0}渠道的直属亏损分红功能，{1}渠道的所有会员均开启直属亏损分红的资格，请问确认要开启吗？",
                row.channel_id,
                row.channel_id
            );
        }
        MessageBox.confirm(confirmText, LangUtil("提示"), {
            confirmButtonText: LangUtil("确定"),
            cancelButtonText: LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onUpdateSwitchChannel({
                    id: row.id,
                    directly_commission_status: row.directly_commission_status,
                });
            })
            .catch(() => {
                this.myProxy.onQueryChannel();
            });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-dialog {
    margin-top: 10px !important;
}
</style>
