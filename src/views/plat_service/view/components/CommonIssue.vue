<template>
    <div>
        <div class="header_btn">
            <div>
                <el-button
                    @click="handlerCreate()"
                    v-if="checkUnique(unique.plat_service_fag_store)"
                    class="item"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    >{{ $t("plat_service.addQuestion") }}</el-button
                >
            </div>
            <div>
                <el-button
                    v-if="checkUnique(unique.plat_service_fag_sync)"
                    @click="handlerReset()"
                    class="item"
                    type="primary"
                    icon=""
                    >{{ $t("plat_service.resetToInit") }}</el-button
                >
            </div>
        </div>
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
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" min-width="40px" prop="id">
            </el-table-column>
            <el-table-column :label="`${tableColumns.name.name}`" min-width="400px">
                <template slot-scope="{ row }">
                    <div>【{{ tableColumns.name.name }}】:{{ row.name }}</div>
                    <div>【{{ tableColumns.content.name }}】:{{ row.content }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.module.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.module.options[row.module] }}</div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plat_service_fag_delete)"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ $t("common.delete") }}</el-button
                    >
                    <el-button
                        v-if="checkUnique(unique.plat_service_fag_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatServiceProxy from "../../proxy/PlatServiceProxy";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";
import Sortable from "sortablejs";

@Component({
    components: {
        Pagination,
    },
})
export default class CommonIssue extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
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

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
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

    private handlerReset() {
        let isResetToInit: any = this.$t("plat_service.isResetToInit");
        let prompt: any = this.$t("common.prompt");
        let determine: any = this.$t("common.determine");
        let cancel: any = this.$t("common.cancel");
        this.$confirm(isResetToInit, prompt, {
            confirmButtonText: determine,
            cancelButtonText: cancel,
            type: "warning",
        })
            .then(() => {
                this.myProxy.reSync();
            })
            .catch(() => {});
    }

    private initSort() {
        if (checkUnique(unique.plat_service_fag_order)) {
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
        } else {
            return false;
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.header_btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 16px;
}
.sort {
    font-size: 32px;
}
</style>
