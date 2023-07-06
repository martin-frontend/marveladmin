<template>
    <el-dialog
        width="1300px"
        :title="LangUtil('游戏分类标签管理')"
        :visible.sync="myProxy.cateVendorProductsGameTypeTagDialog.bShow"
    >
        <div class="header-content">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
            />
            <div class="group">
                <SearchSelect
                    :title="tableColumns.game_type.name"
                    v-model="listQuery.game_type"
                    :options="tableColumns.game_type.options"
                />
                <SearchInput :title="tableColumns.name.name" v-model="listQuery.name" />
                <div>
                    <el-button @click="handlerSearch" class="header-button" type="primary" icon="el-icon-search">
                        {{ LangUtil("查询") }}
                    </el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="header-button">
                        {{ LangUtil("重置") }}
                    </el-button>
                    <el-button
                        class="header-button"
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        @click="handlerCreate"
                    >
                        {{ LangUtil("新增") }}
                    </el-button>
                </div>
            </div>
        </div>
        <div>
            <el-table
                :data="data"
                border
                fit
                highlight-current-row
                style="width: 100%"
                size="mini"
                v-loading="net_status.loading"
                class="drag_table"
            >
                <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" class-name="status-col">
                    <template slot-scope="{ row }">
                        <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns['game_type'].name" prop="game_type" class-name="status-col">
                    <template slot-scope="{ row }">
                        <div>{{ tableColumns["game_type"].options[row.game_type] }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="tableColumns['name'].name"
                    prop="name"
                    class-name="status-col"
                ></el-table-column>

                <el-table-column
                :label="tableColumns['icon_name'].name"
                prop="icon_name"
                class-name="status-col"
            ></el-table-column>

                <el-table-column :label="LangUtil('操作')" class-name="status-col" width="350px">
                    <template slot-scope="{ row, $index }">
                        <el-button size="mini" @click="handlerOpt(row, { opt: 2 })" :disabled="$index == 0"
                            >{{ LangUtil("置顶") }}
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handlerOpt(row, { opt: 1 })"
                            :disabled="$index == myProxy.gameTypeTableData.list.length - 1"
                            >{{ LangUtil("置底") }}</el-button
                        >
                        <el-button size="mini" type="primary" @click="handleEdit(row)">{{
                            LangUtil("编辑")
                        }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('排序')" class-name="status-col" min-width="60px">
                    <div class="sort">
                        <i class="el-icon-rank"></i>
                    </div>
                </el-table-column>
                <el-table-column :label="tableColumns['status'].name" prop="status" class-name="status-col">
                    <template slot-scope="{ row }">
                        <el-tag :type="row.status | statusFilter">
                            {{ tableColumns.status.options[row.status] }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>

            <pagination :pageInfo="myProxy.gameTypeTableData.pageInfo" @pageSwitch="handlerPageSwitch"></pagination>

        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import Sortable from "sortablejs";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        SearchInput,
        SearchSelect,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                99: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class GameTypeTagDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    tableColumns = this.myProxy.gameTypeTableData.columns;
    tableData = this.myProxy.gameTypeTableData.list;
    listQuery = this.myProxy.gameTypeListQuery;
    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    data = [];
    sortItem = {
        id: 0,
        next_id: 0,
    };

    handlerSearch() {
        this.myProxy.onGameTypeQuery();
    }

    handlerReset() {
        this.myProxy.resetGameTypeListQuery();
    }

    handlerCreate() {
        this.myProxy.showGameTypeDialog(DialogStatus.create);
    }

    @Watch("myProxy.gameTypeTableData.isResort")
    resort() {
        console.log(" 呗修改了000",this.myProxy.gameTypeTableData.isResort);
        if (this.myProxy.gameTypeTableData.isResort) {
            this.data = [];
            this.$nextTick(() => {
                this.data = this.tableData;
                this.initSort();
            });
            this.myProxy.gameTypeTableData.isResort = false;
        }
    }

    handleEdit(data: any) {
        this.myProxy.showGameTypeDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onGameTypeDelete(data.id);
    }

    /**更新排序 */
    handlerOpt(row: any, value: any) {
        const { id } = row;
        const { opt } = value;
        this.myProxy.onGameTypeUpdateOpt({ id, opt });
    }
    handlerPageSwitch(page: number) {
        this.myProxy.gameTypeListQuery.page_count = page;
        this.myProxy.onGameTypeQuery();
    }

    initSort() {
        const tbody: any = document.querySelector(".drag_table .el-table__body-wrapper tbody");
        console.log(tbody);

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
                this.myProxy.onGameTypeResort(this.sortItem);
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
