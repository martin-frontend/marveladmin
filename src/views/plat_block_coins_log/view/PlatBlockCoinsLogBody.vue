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
            <!-- <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" min-width="30px">
            </el-table-column> -->
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
                    {{ row.coin_name_unique }}
                </template>
            </el-table-column>

            <el-table-column
                prop="scale"
                :label="`${tableColumns.scale.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ row.scale }}
                </template>
            </el-table-column>

            <el-table-column
                prop="created_at"
                :label="`${tableColumns.created_at.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ row.created_at }}
                </template>
            </el-table-column>

            <el-table-column
                prop="created_by"
                :label="`${tableColumns.created_by.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ row.created_by }}
                </template>
            </el-table-column>



            <!-- <el-table-column label="操作" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete) && row.update_btn == 1"
                        >删除</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show) && row.update_btn == 1"
                        >编辑</el-button
                    >
                </template>
            </el-table-column> -->
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBlockCoinsLogProxy from "../proxy/PlatBlockCoinsLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBlockCoinsLogBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBlockCoinsLogProxy = this.getProxy(PlatBlockCoinsLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
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
</style>
