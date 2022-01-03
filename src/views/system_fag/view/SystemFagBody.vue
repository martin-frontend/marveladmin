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
        >
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" width="100px" prop="id">
            </el-table-column>
            <el-table-column :label="`${tableColumns.name.name}`">
                <template slot-scope="scope">
                    <div class="table_style">
                        <div>{{ tableColumns.name.name }}:{{ scope.row.name }}</div>
                        <div>{{ tableColumns.content.name }}:{{ scope.row.content }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <div class="operation">
                        <el-button
                            v-if="checkUnique(unique.system_fag_show)"
                            @click="handleEdit(row)"
                            class="item"
                            type="primary"
                            icon=""
                            >{{ $t("common.update") }}</el-button
                        >
                        <el-button
                            v-if="checkUnique(unique.system_fag_delete)"
                            @click="handlerDelete(row)"
                            class="item"
                            type="danger"
                            icon=""
                            >{{ $t("common.delete") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-if="checkUnique(unique.system_fag_order)"
                :label="$t('common.sort')"
                class-name="status-col"
                width="100px"
            >
                <div style="font-size: 1.5rem">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemFagProxy from "../proxy/SystemFagProxy";
import Pagination from "@/components/Pagination.vue";
import Sortable from "sortablejs";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class SystemFagBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemFagProxy = this.getProxy(SystemFagProxy);
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

    @Watch("myProxy.isResort")
    resort() {
        if (this.myProxy.isResort) {
            this.data = [];
            this.$nextTick(() => {
                this.data = this.tableData;
                this.initSort();
            });
            this.myProxy.isResort = false;
        }
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
</style>
