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
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" min-width="80px"></el-table-column>
            <el-table-column :label="tableColumns['plat_name'].name" prop="plat_name" min-width="100"></el-table-column>

            <el-table-column :label="tableColumns['app_types'].name" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag
                        v-for="type in row.app_types"
                        :key="type"
                        type="primary"
                        effect="dark"
                        size="mini"
                        style="margin-right: 5px"
                    >
                        {{ tableColumns.app_types.options[type] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['vip_model_id'].name" min-width="160">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        :type="tableColumns.vip_model_id.options[row.vip_model_id] ? 'success' : 'danger'"
                        @click="handlerVipModel(row)"
                    >
                        {{
                            tableColumns.vip_model_id.options[row.vip_model_id]
                                ? tableColumns.vip_model_id.options[row.vip_model_id]
                                : LangUtil("未设定")
                        }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['backwater_model_id'].name" min-width="160">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        :type="tableColumns.backwater_model_id.options[row.backwater_model_id] ? 'success' : 'danger'"
                        @click="handlerBackwaterModel(row)"
                    >
                        {{
                            tableColumns.backwater_model_id.options[row.backwater_model_id]
                                ? tableColumns.backwater_model_id.options[row.backwater_model_id]
                                : LangUtil("未设定")
                        }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['promotion_model_id'].name" min-width="200">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        :type="myProxy.getPromotionModelById(row.promotion_model_id) ? 'success' : 'danger'"
                        @click="handlerPromotionModel(row)"
                    >
                        {{
                            myProxy.getPromotionModelById(row.promotion_model_id)
                                ? myProxy.getPromotionModelById(row.promotion_model_id).name
                                : LangUtil("无模板")
                        }}
                    </el-button>
                </template>
            </el-table-column>
            <!-- 质押分红 -->
            <el-table-column :label="tableColumns['stake_bonus_model_id'].name" min-width="160">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        :type="row.stake_bonus_model_id ? 'success' : 'danger'"
                        @click="handleAllBonusModel(row)"
                    >
                        <!-- {{
                            tableColumns.all_bonus_model_id.options[row.all_bonus_model_id]
                                ? tableColumns.all_bonus_model_id.options[row.all_bonus_model_id]
                                : LangUtil('无模板')
                        }} -->
                        <!-- 分红初始化 -->
                        {{ LangUtil("分红初始化") }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['language'].name" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        <span v-for="(lang, i) of row.language" :key="'lang' + i"
                            >{{ tableColumns.language.options[lang] }},</span
                        >
                        <!-- {{ tableColumns.language.options[row.language] }} -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.main_language.name}`" prop="main_language" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns.main_language.options[row.main_language] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['currency_type'].name"
                prop="currency_type"
                min-width="100px"
                align="center"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="270px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plat_show)"
                        type="primary"
                        @click="handlePromotionDiscount(row)"
                        >{{ tableColumns.promotion_discount.name }}</el-button
                    >
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
                    <el-button
                        v-if="checkUnique(unique.plat_clear_cache)"
                        size="mini"
                        type="primary"
                        @click="handleClearCache(row)"
                        >{{ LangUtil("清除缓存") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <VipModelDialog v-if="myProxy.vipModelDialogData.bShow" />
        <BackwaterDialog v-if="myProxy.backwaterModelDialogData.bShow" />
        <PromotionDialog v-if="myProxy.promotionModelDialogData.bShow" />
        <PromotionDiscountDialog v-if="myProxy.promotionDiscountDialogData.bShow" />
        <AllBonusModelDialog v-if="myProxy.allBonusModelDialogData.bShow" />
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatProxy from "../proxy/PlatProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
// components
import VipModelDialog from "./components/VipModelDialog.vue";
import BackwaterDialog from "./components/BackwaterModelDialog.vue";
import PromotionDialog from "./components/PromotionModelDialog.vue";
import PromotionDiscountDialog from "./components/PromotionDiscountDialog.vue";
import AllBonusModelDialog from "./components/AllBonusModelDialog.vue";

@Component({
    components: {
        VipModelDialog,
        BackwaterDialog,
        PromotionDialog,
        PromotionDiscountDialog,
        AllBonusModelDialog,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class PlatBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleClearCache(data: any) {
        this.myProxy.clearCache(data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    handlerVipModel(row: any) {
        this.myProxy.showVipModelDialog(row);
    }

    handlerBackwaterModel(row: any) {
        this.myProxy.showBackwaterModelDialog(row);
    }

    handlerPromotionModel(row: any) {
        this.myProxy.showPromotionModelDialog(row);
    }

    handlePromotionDiscount(row: any) {
        this.myProxy.showPromotionDiscountDialog(row);
    }

    handleAllBonusModel(row: any) {
        this.myProxy.showAllBonusModelDialog(row);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
