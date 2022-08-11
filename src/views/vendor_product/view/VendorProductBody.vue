<template>
    <div>
        <el-table
            :data="tableData"
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
                'text-align': 'center',
            }"
        >
            <el-table-column :label="tableColumns['vendor_id'].name" prop="vendor_id" min-width="120px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_id.options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['languages'].name"
                prop="languages"
                class-name="status-col"
                width="300px"
            >
                <template slot-scope="{ row }">
                    <span v-for="(type, index) in row.languages" :key="type">
                        {{ tableColumns["languages"].options[type] }}
                        <span v-if="index < row.languages.length - 1">,</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['vendor_type'].name" min-width="80px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.vendor_type.options[row.vendor_type] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['ori_product_id'].name"
                prop="ori_product_id"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns['icon'].name" prop="icon" min-width="80px"></el-table-column>
            <el-table-column :label="$t('vendor_product.label1')" min-width="80px">
                <template slot-scope="{ row }">
                    <img
                        style="width: 40px; height: 40px; object-fit: contain"
                        :src="row.icon_url"
                        v-if="row.icon_url"
                    />
                    <span v-if="!row.icon_url">-</span>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['ori_vendor_extend'].name" prop="ori_vendor_extend"></el-table-column>
            <el-table-column :label="tableColumns['orientation'].name" :min-width="width">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.orientation"
                        :active-text="$t('vendor_product.landscape')"
                        :inactive-text="$t('vendor_product.portrait')"
                        :active-value="1"
                        :inactive-value="2"
                        @change="onOrientationChange(row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['currency_type'].name"
                prop="currency_type"
                width="150px"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['status'].name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.vendor_product_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import VendorProductProxy from "../proxy/VendorProductProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class VendorProductBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    get width() {
        let w_: string = "120px";
        if (Cookies.get("language") === "vi") {
            w_ = "220px";
        }
        return w_;
    }

    onOrientationChange(row: any) {
        this.myProxy.onUpdateOrientation(row);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
