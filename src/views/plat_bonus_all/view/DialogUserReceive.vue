<template>
    <el-dialog :title="LangUtil('玩家领取记录')" :visible.sync="myProxy.tableData.bShow" width="850px">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" align="center"> </el-table-column>
            <el-table-column
                :label="tableColumns['receive_at'].name"
                prop="receive_at"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['cur_bonus_all_level'].name"
                prop="cur_bonus_all_level"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['group_water'].name"
                prop="group_water"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['stock_per_num'].name"
                prop="stock_per_num"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['stock_num'].name" prop="stock_num" align="center"></el-table-column>
            <el-table-column
                :label="tableColumns['bonus_all_received_gold'].name"
                prop="bonus_all_received_gold"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['nick_name'].name" prop="nick_name" align="center"></el-table-column>
        </el-table>

        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class DialogUserReceive extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentPromotionModelProxy = this.getProxy(PlatAgentPromotionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listStockTableQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.admin_plat_bonus_all_stock_index();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
