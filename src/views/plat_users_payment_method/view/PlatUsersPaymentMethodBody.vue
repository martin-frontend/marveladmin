<template>
    <div>
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="id" label="ID" align="center" width="50px"> </el-table-column>
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>

            <el-table-column prop="user_id" :label="tableColumns['user_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ row.user_id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="username" :label="tableColumns['username'].name" align="center"> </el-table-column>
            <el-table-column prop="nick_name" :label="tableColumns['nick_name'].name" align="center"> </el-table-column>
            <el-table-column prop="type" :label="tableColumns['type'].name" width="110px" align="center">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns.type.options[row.type] }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="$t('plat_users_payment_method.content')" align="center">
                <template slot-scope="{ row }">
                    <p align="left" v-html="getAccessInfo(row)"></p>
                </template>
            </el-table-column>
            <el-table-column prop="address" :label="$t('common.operating')" width="80px" align="center">
                --
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersPaymentMethodProxy from "../proxy/PlatUsersPaymentMethodProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersPaymentMethodBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersPaymentMethodProxy = this.getProxy(PlatUsersPaymentMethodProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    getAccessInfo(data: any) {
        const options: any = this.tableColumns.payment_method.options[data.type];
        const keys = Object.keys(options);
        let infoStr = "";
        for (const key of keys) {
            infoStr += options[key] + "：";
            infoStr += `<span class="span_value">${data.payment_method[key]}</span><br>`;
        }
        return infoStr;
    }

    private handlerQuery() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.userDetailId = user_id;
        this.myProxy.onShowUserDetail();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
