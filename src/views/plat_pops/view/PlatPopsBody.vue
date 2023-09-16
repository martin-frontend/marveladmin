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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" prop="id" min-width="150px">
            </el-table-column>
            <el-table-column :label="tableColumns.title.name" class-name="status-col" prop="title" min-width="150px">
            </el-table-column>
            <el-table-column
                :label="tableColumns.app_platform.name"
                class-name="status-col"
                prop="app_platform"
                min-width="150px"
            >
                <template slot-scope="{ row }">
                    <template v-for="item of row.app_platform">
                        <el-tag
                            :key="item"
                            effect="dark"
                            size="mini"
                            v-if="tableColumns.app_platform.options[item]"
                            style="margin-right: 5px"
                        >
                            {{ tableColumns.app_platform.options[item] }}
                        </el-tag>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.start_time.name"
                class-name="status-col"
                prop="start_time"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.end_time.name"
                class-name="status-col"
                prop="end_time"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" prop="status" min-width="150px">
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="300px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerCopy">
                        {{ LangUtil("复制") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerCancel(row.id)"
                        v-if="row.status == 1 || row.status == 2"
                    >
                        {{ LangUtil("撤销") }}
                    </el-button>
                    <el-button size="mini" type="danger" @click="handlerDelete(row)">{{ LangUtil("删除") }}</el-button>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="320px">
                <template slot-scope="{ row }">
                    <div>
                        <el-button size="mini" @click="handlerOrder(row.id, 2)">
                            {{ LangUtil("置顶") }}
                        </el-button>
                        <el-button size="mini" @click="handlerOrder(row.id, 1)">{{ LangUtil("置底") }}</el-button>
                        <el-button size="mini" icon="el-icon-top" @click="handlerOrder(row.id, 3)"></el-button>
                        <el-button size="mini" icon="el-icon-bottom" @click="handlerOrder(row.id, 4)"></el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="100px">
                <div style="font-size: 1.5rem">
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
import PlatPopsProxy from "../proxy/PlatPopsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import Sortable from "sortablejs";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatPopsBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatPopsProxy = this.getProxy(PlatPopsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

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

    initSort() {
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

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderData.id = id;
        this.myProxy.tableData.orderData.opt = opt;
        this.myProxy.tableData.orderData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderList();
    }

    handlerCopy() {}
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
