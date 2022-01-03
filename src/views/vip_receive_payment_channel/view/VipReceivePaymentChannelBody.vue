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
            <el-table-column :label="tableColumns.plat_id.name" width="110" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" :label="tableColumns.title.name" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="url" :label="tableColumns.url.name" align="center"> </el-table-column>
            <el-table-column prop="status" :label="$t('common.status')" align="center" width="110px">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.status"
                        active-value="1"
                        inactive-value="98"
                        @change="handlerStatus(row)"
                        :disabled="!checkUnique(unique.vip_receive_payment_channel_update)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="170px" align="center">
                <template slot-scope="{ row }">
                    <div class="btn_group">
                        <el-button
                            size="mini"
                            @click="handlerOrder(row, 2)"
                            v-if="checkUnique(unique.vip_receive_payment_channel_update)"
                            >{{ $t("common.setTop") }}</el-button
                        >
                        <el-button
                            size="mini"
                            @click="handlerOrder(row, 1)"
                            v-if="checkUnique(unique.vip_receive_payment_channel_update)"
                            >{{ $t("common.setBottom") }}</el-button
                        >
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            @click="handlerOrder(row, 3)"
                            v-if="checkUnique(unique.vip_receive_payment_channel_update)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="handlerOrder(row, 4)"
                            v-if="checkUnique(unique.vip_receive_payment_channel_update)"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.vip_receive_payment_channel_update)"
                            >{{ $t("common.update") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import VipReceivePaymentChannelProxy from "../proxy/VipReceivePaymentChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class VipReceivePaymentChannelBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VipReceivePaymentChannelProxy = this.getProxy(VipReceivePaymentChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handlerStatus(row: any) {
        Object.assign(this.myProxy.tableUpdateData, {
            status: row.status,
            id: row.id,
            opt: null,
        });

        this.myProxy.onUpdate(true);
    }

    private handlerOrder(row: any, opt: any) {
        Object.assign(this.myProxy.tableUpdateData, {
            id: row.id,
            status: null,
            opt,
        });
        this.myProxy.onUpdate(true);
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.add_btn {
    margin-bottom: 6px;
}
::v-deep table {
    .el-button {
        display: block;
        margin: 0 0 6px 0;
        width: 80px;
        text-align: center;
    }
    .btn_group {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}
</style>
