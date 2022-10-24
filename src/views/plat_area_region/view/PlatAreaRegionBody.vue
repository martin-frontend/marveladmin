<template>
    <div>
        <el-table
            :data="data"
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
                'text-align': 'left',
            }"
        >
            <el-table-column class-name="status-col" :label="tableColumns.id.name" prop="id" min-width="70px">
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.plat_id.name" prop="plat_id" min-width="70px">
                <template slot-scope="scope">
                    {{ tableColumns.plat_id.options[scope.row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.area_region.name"
                prop="area_region"
                min-width="70px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.area_region.options[row.area_region] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.created_at.name"
                prop="created_at"
                min-width="70px"
            ></el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.created_by.name"
                prop="created_by"
                min-width="70px"
            ></el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.updated_at.name"
                prop="updated_at"
                min-width="70px"
            ></el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.updated_by.name"
                prop="updated_by"
                min-width="70px"
            >
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete)"
                        >{{ $t("common.delete") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ $t("common.update") }}</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.sort')" class-name="status-col" min-width="30px">
                <div class="sort">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAreaRegionProxy from "../proxy/PlatAreaRegionProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Sortable from "sortablejs";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatAreaRegionBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAreaRegionProxy = this.getProxy(PlatAreaRegionProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private data = [];
    private sortItem = {
        id: 0,
        next_id: 0,
    };

    @Watch("myProxy.tableData.isResort")
    resort() {
        if (this.myProxy.tableData.isResort) {
            this.data = [];
            this.$nextTick(() => {
                this.data = this.tableData;
                this.initSort();
            });
            this.myProxy.tableData.isResort = false;
        }
    }

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

    private initSort() {
        const tbody: any = document.querySelector(".el-table__body-wrapper tbody");
        new Sortable(tbody, {
            onStart: e => {
                this.sortItem.id = this.tableData[e.oldIndex as number].id;
            },
            onEnd: e => {
                let oldIndex: number = e.oldIndex as number;
                let newIndex: number = e.newIndex as number;
                if (oldIndex < newIndex) {
                    if ((e.newIndex as number) + 1 >= this.tableData.length) {
                        this.sortItem.next_id = 0;
                    } else {
                        this.sortItem.next_id = this.tableData[(e.newIndex as number) + 1].id;
                    }
                } else {
                    this.sortItem.next_id = this.tableData[newIndex].id;
                }
                this.myProxy.onResort(this.sortItem);
            },
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.sort {
    font-size: 32px;
}
</style>
