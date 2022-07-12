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
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" min-width="30px">
            </el-table-column>
            <el-table-column
                prop="plat_id"
                :label="`${tableColumns.plat_id.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.coin_name_unique.options[row.coin_name_unique] }}
                </template>
            </el-table-column>
            <el-table-column prop="type" :label="`${tableColumns.type.name}`" class-name="status-col" min-width="30px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="scale"
                :label="`${tableColumns.scale.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                :label="`${tableColumns.remark.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="can_play_game"
                :label="`${tableColumns.can_play_game.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.can_play_game.options[row.can_play_game] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.sort')" class-name="status-col" width="280px">
                <template slot-scope="{ row }">
                    <div>
                        <el-button size="mini" @click="handlerSort(row, 2)">
                            {{ $t("common.setTop") }}
                        </el-button>
                        <el-button size="mini" @click="handlerSort(row, 1)">
                            {{ $t("common.setBottom") }}
                        </el-button>
                        <el-button size="mini" icon="el-icon-top" @click="handlerSort(row, 3)"></el-button>
                        <el-button size="mini" icon="el-icon-bottom" @click="handlerSort(row, 4)"></el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ $t("common.update") }}</el-button>
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
import PlatBlockCoinsProxy from "../proxy/PlatBlockCoinsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBlockCoinsBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBlockCoinsProxy = this.getProxy(PlatBlockCoinsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    /**排序 */
    private handlerSort(row: any, opt: any) {
        this.myProxy.sortData.id = row.id;
        this.myProxy.sortData.opt = opt;
        this.myProxy.onSort();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
