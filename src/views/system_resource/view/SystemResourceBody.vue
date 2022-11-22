<template>
    <div>
        <el-table
            :data="tableData"
            border
            @selection-change="handelSelectionChange"
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column type="selection" :selectable="checkSelectable" class-name="status-col"> </el-table-column>
            <el-table-column :label="tableColumns['name'].name" prop="name" class-name="status-col"></el-table-column>
            <el-table-column :label="tableColumns['type'].name" class-name="status-col">
                <template slot-scope="scope">
                    {{ tableColumns["type"].options[scope.row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['size'].name" class-name="status-col">
                <template slot-scope="{ row }"> {{ row.size }}(byte) </template>
            </el-table-column>
            <el-table-column :label="tableColumns['url'].name" prop="url" class-name="status-col">
                <template slot-scope="{ row }"> {{ formatImageUrl(row.url) }} </template>
            </el-table-column>
            <el-table-column :label="LangUtil('缩略图')" class-name="status-col">
                <template slot-scope="{ row }">
                    <img style="width: 80px" @click="showPic(row.url)" :src="formatImageUrl(row.url)" width="100%"
                /></template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.system_resource_delete)"
                        type="primary"
                        @click="handlerDelete(row)"
                        >{{ LangUtil("删除") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemResourceProxy from "../proxy/SystemResourceProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { formatImageUrl } from "@/core/global/Functions";

@Component({
    components: {
        Pagination,
    },
})
export default class SystemResourceBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    // 图片地址转换
    formatImageUrl = formatImageUrl;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    handelSelectionChange(selectItems: any) {
        this.myProxy.imgBatchDialogData.deleteItems = selectItems;
    }

    checkSelectable(row: any, index: number) {
        return !(row.is_delete == 1);
    }

    showPic(url: string) {
        GlobalVar.preview_image.url = url;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.ViewPic {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 999;
    text-align: center;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
