<template>
    <div class="recharge_channel_component table_list_component">
        <el-table :data="tableData" border style="width: 100%" v-loading="net_status.loading">
            <el-table-column prop="id" :label="tableColumns['id'].name" width="50px" align="center"> </el-table-column>
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" :label="tableColumns['name'].name" align="center"> </el-table-column>
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.vendor_id.options[row.vendor_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" :label="tableColumns['type'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="LangUtil('状态')" align="center">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.status"
                        :active-value="1"
                        :inactive-value="98"
                        @change="switchChangeHandler(row)"
                        :disabled="!checkUnique(unique.recharge_channels_update)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" align="center" :width="width">
                <template slot-scope="{ row }">
                    <el-button v-if="row.type === 1" @click="handleEdit(row)" type="primary" size="small">{{
                        LangUtil("充值渠道参数列表")
                    }}</el-button>
                    <span v-else>--</span>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="320px">
                <template slot-scope="{ row, $index }">
                    <div>
                        <el-button size="mini" @click="handlerOrder(row.id, 1)" :disabled="$index == 0">
                            {{ LangUtil("置顶") }}
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handlerOrder(row.id, 2)"
                            :disabled="$index == myProxy.tableData.list.length - 1"
                        >
                            {{ LangUtil("置底") }}
                        </el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            @click="handlerOrder(row.id, 3)"
                            :disabled="$index == 0"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="handlerOrder(row.id, 4)"
                            :disabled="$index == myProxy.tableData.list.length - 1"
                        ></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeChannelsPaymethodsProxy from "../proxy/RechargeChannelsPaymethodsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";

@Component({
    components: {
        Pagination,
    },
})
export default class RechargeChannelsPaymethodsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeChannelsPaymethodsProxy = this.getProxy(RechargeChannelsPaymethodsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    onUpdate(row: any) {
        this.myProxy.onUpdate({ id: row.id, status: row.status });
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    switchChangeHandler(row: any) {
        this.myProxy.onUpdateSwitch({ id: row.id, status: row.status }, "body");
    }

    get width() {
        let _w: string = "200px";
        if (Cookies.get("language") === "vi") {
            _w = "300px";
        }
        return _w;
    }

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderData.id = id;
        this.myProxy.tableData.orderData.opt = opt;
        this.myProxy.tableData.orderData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderList();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
