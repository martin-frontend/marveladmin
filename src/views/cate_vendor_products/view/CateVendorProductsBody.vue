<template>
    <div>
        <el-table
            :data="data"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            @selection-change="headleSelectionChange"
            v-loading="net_status.loading"
        >
            <el-table-column type="selection" width="50" align="center"></el-table-column>

            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_name'].name"
                prop="vendor_name"
                class-name="status-col"
                min-width="100px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_status'].name"
                prop="vendor_status"
                class-name="status-col"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    <el-tag :type="row.vendor_status | statusFilter">
                        {{ tableColumns.vendor_status.options[row.vendor_status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                class-name="status-col"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['category'].name"
                prop="category"
                class-name="status-col"
                min-width="150px"
            ></el-table-column>
            <el-table-column
            :label="tableColumns['icon_name'].name"
            prop="icon_name"
            class-name="status-col"
            min-width="150px"
        ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_status'].name"
                prop="vendor_product_status"
                class-name="status-col"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    <el-tag :type="row.vendor_product_status | statusFilter">
                        {{ tableColumns.vendor_product_status.options[row.vendor_product_status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_languages'].name"
                prop="vendor_product_languages"
                class-name="status-col"
                min-width="250"
            >
                <template slot-scope="{ row }">
                    <div style="text-align: left">
                        <el-tag v-for="language of row.vendor_product_languages" :key="language">
                            {{ tableColumns.languages.options[language] }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['languages'].name"
                prop="languages"
                class-name="status-col"
                min-width="250"
            >
                <template slot-scope="{ row }">
                    <div style="text-align: left">
                        <el-tag v-for="language of row.languages" :key="language">
                            {{ tableColumns.languages.options[language] }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="350px">
                <template slot-scope="{ row, $index }">
                    <el-button size="mini" @click="handlerOpt(row, { opt: 2 })" :disabled="$index == 0"
                        >{{ LangUtil("置顶") }}
                    </el-button>
                    <el-button
                        size="mini"
                        @click="handlerOpt(row, { opt: 1 })"
                        :disabled="$index == myProxy.tableData.list.length - 1"
                        >{{ LangUtil("置底") }}</el-button
                    >
                    <!-- <el-button
                        size="mini"
                        icon="el-icon-top"
                        @click="handlerOpt(row, { opt: 3 })"
                        :disabled="$index == 0"
                    ></el-button>
                    <el-button
                        size="mini"
                        icon="el-icon-bottom"
                        @click="handlerOpt(row, { opt: 4 })"
                        :disabled="$index == myProxy.tableData.list.length - 1"
                    ></el-button> -->
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" min-width="60px">
                <div class="sort">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column>
        </el-table>
        <div class="pagination" v-show="pageInfo.pageTotal">
            <span class="slot">
                {{ LangUtil("总共 {0} 条记录", pageInfo.pageTotal) }}
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Sortable from "sortablejs";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "warning",
                99: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class CateVendorProductsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    data = [];
    sortItem = {
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

    headleSelectionChange(selection: any) {
        //console.log("---- 选择 改变---",selection);
        this.myProxy.select_list_temp = selection;
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
    /**更新排序 */
    handlerOpt(row: any, value: any) {
        const { id } = row;
        const { opt } = value;
        this.myProxy.onUpdateOpt({ id, opt });
    }

    initSort() {
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
.sort {
    font-size: 32px;
}
</style>
