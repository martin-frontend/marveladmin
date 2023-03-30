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
                prop="vendor_type"
                :label="`${tableColumns.vendor_type.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_type.options[row.vendor_type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="vendor_id"
                :label="`${tableColumns.vendor_id.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_id.options[row.vendor_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="vendor_icon"
                :label="`${tableColumns.vendor_icon.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    <span v-if="row.vendor_icon_url[0] == '' || row.vendor_icon_url.length == 0">-</span>
                    <img v-else :src="row.vendor_icon_url" class="pic" />
                </template>
            </el-table-column>
            <el-table-column
                prop="alias"
                :label="`${tableColumns.alias.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="game_desc"
                :label="`${tableColumns.game_desc.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="menu_icon"
                :label="`${tableColumns.menu_icon.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    <span v-if="row.menu_icon_url[0] == ''">-</span>
                    <img v-else :src="row.menu_icon_url" class="pic" />
                </template>
            </el-table-column>
            <el-table-column aling="left" :label="tableColumns['languages'].name" prop="languages">
                <template slot-scope="{ row }">
                    <el-tag v-for="item of row.languages" :key="item">{{
                        tableColumns["languages"].options[item]
                    }}</el-tag>
                    <el-button class="item ml-1" type="primary" size="mini" @click="onUpdateLanguages(row)">{{
                        LangUtil("编辑")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="entrance_type"
                :label="`${tableColumns.entrance_type.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.entrance_type.options[row.entrance_type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="entrance_icon"
                :label="`${tableColumns.entrance_icon.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    <span v-if="row.entrance_icon_url[0] == ''">-</span>
                    <img v-else :src="row.entrance_icon_url" class="pic" />
                </template>
            </el-table-column>
            <el-table-column
                prop="entrance_game"
                :label="`${tableColumns.entrance_game.name}`"
                class-name="status-col"
                min-width="30px"
            >
                <template slot-scope="{ row }">
                    <span v-if="row.entrance_game == '-'">-</span>
                    <span v-else>
                        {{ tableColumns.entrance_game.options[row.vendor_id][row.vendor_type][row.entrance_game] }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete) && row.update_btn == 1"
                        >删除</el-button
                    > -->
                    <el-button size="mini" type="primary" @click="handleEdit(row)">
                        {{ LangUtil("编辑") }}
                    </el-button>
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
import MenuVendorProductsProxy from "../proxy/MenuVendorProductsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { formatImageUrl } from "@/core/global/Functions";
import Sortable from "sortablejs";

@Component({
    components: {
        Pagination,
    },
})
export default class MenuVendorProductsBody extends AbstractView {
    LangUtil = LangUtil;
    formatImageUrl = formatImageUrl;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: MenuVendorProductsProxy = this.getProxy(MenuVendorProductsProxy);
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

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
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

    onUpdateLanguages(row: any) {
        this.myProxy.showLanguagesDialog(DialogStatus.update, row);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.sort {
    font-size: 32px;
}
.pic {
    max-width: 135px;
    max-height: 135px;
}
.ml-1 {
    margin-left: 12px;
}
</style>
