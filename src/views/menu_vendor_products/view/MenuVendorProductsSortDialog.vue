<template>
    <el-dialog :title="LangUtil('类型展示排序')" :visible.sync="myProxy.sortDialogData.bShow">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            row-key="vendor_type"
            ref="dragTable"
        >
            <el-table-column
                prop="vendor_type"
                :label="`${tableColumns.vendor_type.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_type.options[row.vendor_type] }}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="LangUtil('排序')" width="80">
                <div class="sort">
                    <i class="el-icon-rank drag-handler" icon-class="drag"></i>
                </div>
            </el-table-column>
            <!-- <el-table-column :label="LangUtil('排序')" class-name="status-col" min-width="30px">
                <div class="sort">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column> -->
        </el-table>
        <div class="dialog-footer mt-20">
            <el-button type="primary" @click="handleUpdate()">
                {{ LangUtil("确认保存") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import MenuVendorProductsProxy from "@/views/menu_vendor_products/proxy/MenuVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import Sortable from "sortablejs";

@Component
export default class MenuVendorProductsSortDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: MenuVendorProductsProxy = this.getProxy(MenuVendorProductsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.sortDialogData.data;

    list: any = null;
    sortable: any = null;
    oldList = [];
    newList = [];

    created() {
        this.getList();
    }

    async getList() {
        this.list = this.tableData;
        this.oldList = this.tableData.map((v: { vendor_type: any }) => v.vendor_type);
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
            this.setSort();
        });
    }

    setSort() {
        //@ts-ignore
        const el = this.$refs.dragTable.$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0];
        this.sortable = Sortable.create(el, {
            ghostClass: "sortable-ghost",
            setData: function(dataTransfer) {
                dataTransfer.setData("Text", "");
            },
            onEnd: evt => {
                const targetRow = this.list.splice(evt.oldIndex, 1)[0];
                this.list.splice(evt.newIndex, 0, targetRow);
                //@ts-ignore
                const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
                //@ts-ignore
                this.newList.splice(evt.newIndex, 0, tempIndex);
            },
        });
    }

    handleUpdate() {
        this.myProxy.onUpdateSort(this.newList);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.sortable-ghost {
    opacity: 0.8;
    color: #fff !important;
    background: #42b983 !important;
}
.icon-star {
    margin-right: 2px;
}
.drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.show-d {
    margin-top: 15px;
}
.sort {
    font-size: 32px;
}
.mt-20 {
    margin-top: 20px;
}
::v-deep .el-dialog {
    width: 30%;
}
</style>
