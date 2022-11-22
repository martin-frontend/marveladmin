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

            <el-table-column :label="$t('user_detail.tradingCurrencyPair')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.coin_a }} / {{ row.coin_b }} </template>
            </el-table-column>

            <el-table-column prop="price" :label="`${tableColumns.price.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column :label="$t('user_detail.numberLiquidityPools')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }"> {{ row.coin_a_amount }} / {{ row.coin_b_amount }} </template>
            </el-table-column>

            <el-table-column :label="$t('user_detail.systemAdd')" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }">
                    {{ row.system_coin_a_amount }} / {{ row.system_coin_b_amount }}
                </template>
            </el-table-column>

            <el-table-column :label="$t('user_detail.userAdd')" class-name="status-col" min-width="90px">
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

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="300px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleLiquidity(row, 1)">
                        <!-- 添加流动性 -->
                        {{ $t("user_detail.addLiquidity") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleLiquidity(row, 2)">
                        <!-- 减少流动性 -->
                        {{ $t("user_detail.reduceLiquidity") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleSetting(row)">
                        {{ $t("common.setting") }}
                    </el-button>
                </template>
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatSwapLiquidityProxy = this.getProxy(PlatSwapLiquidityProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleSetting(data: any) {
        this.myProxy.showSettingDialog(data);
    }

    private handleLiquidity(row: any, type: number) {
        this.myProxy.showLiquidity(row, type);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
