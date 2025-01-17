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
            <el-table-column
                prop="plat_id"
                :label="`${tableColumns.plat_id.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('交易币对')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.coin_a }} / {{ row.coin_b }} </template>
            </el-table-column>

            <el-table-column prop="price" :label="`${tableColumns.price.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column :label="LangUtil('流动性池数量')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.coin_a_amount }} / {{ row.coin_b_amount }} </template>
            </el-table-column>

            <el-table-column :label="LangUtil('系统添加')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }">
                    {{ row.system_coin_a_amount }} / {{ row.system_coin_b_amount }}
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('用户添加')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.user_coin_a_amount }} / {{ row.user_coin_b_amount }} </template>
            </el-table-column>

            <el-table-column :label="tableColumns.status.name" class-name="status-col" width="90">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.tolerance_params.name" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }">
                    {{ row.tolerance_params.toString() }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.swap_fee_ratio.name" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.swap_fee_ratio }} </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="300px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleLiquidity(row, 1)">
                        <!-- 添加流动性 -->
                        {{ LangUtil("添加流动性") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleLiquidity(row, 2)">
                        <!-- 减少流动性 -->
                        {{ LangUtil("减少流动性") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleSetting(row)">
                        {{ LangUtil("设置") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatSwapLiquidityProxy from "../proxy/PlatSwapLiquidityProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatSwapLiquidityBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatSwapLiquidityProxy = this.getProxy(PlatSwapLiquidityProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleSetting(data: any) {
        this.myProxy.showSettingDialog(data);
    }

    handleLiquidity(row: any, type: number) {
        this.myProxy.showLiquidity(row, type);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
