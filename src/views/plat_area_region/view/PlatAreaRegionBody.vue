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
            <el-table-column
                class-name="status-col"
                :label="tableColumns.default_sms_area_code.name"
                prop="default_sms_area_code"
                min-width="70px"
            >
                <template slot-scope="{ row }">
                    {{ row.default_sms_area_code != 0 ? row.default_sms_area_code : "-" }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.show_sms_area_code.name"
                prop="show_sms_area_code"
                min-width="70px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.show_sms_area_code != ''">
                        <el-tag v-for="item of getAreaCodes(row.area_region, row.show_sms_area_code.split(','))" :key="item">
                            {{item}}
                        </el-tag>
                    </div>
                    <div v-else>
                        -
                    </div>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.plat_id.name" prop="plat_id" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
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
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete)"
                        >{{ LangUtil("删除") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ LangUtil("编辑") }}</el-button
                    >
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" min-width="30px">
                <div class="sort">
                    <i class="el-icon-rank"></i>
                </div>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAreaRegionProxy from "../proxy/PlatAreaRegionProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Sortable from "sortablejs";

interface RowFace {
    plat_id: string;
    area_region: string;
    default_sms_area_code: number;
    show_sms_area_code: string;
}

@Component({
    components: {
        Pagination,
    },
})
export default class PlatAreaRegionBody extends AbstractView {
    public row!: RowFace;
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAreaRegionProxy = this.getProxy(PlatAreaRegionProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

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

    getAreaCodes(area_region: string, area_ids: string[]) {
        const entries = Object.entries(this.tableColumns.show_sms_area_code.options[area_region])
                            .filter(([id, _]) => area_ids.includes(id) )
        return entries.map(i => i[1].area_code)
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update as "create"|"update", data);
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.sort {
    font-size: 32px;
}
</style>
