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
        >
            <el-table-column v-if="isShowColumn" :label="LangUtil('平台信息')" align="center" width="180">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.plat_id.name }}：{{ tableColumns.plat_id.options[row.plat_id] }}</p>
                        <p>{{ tableColumns.channel_id.name }}：{{ row.channel_id }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" width="180" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>
                            {{ tableColumns.user_id.name }}：<span
                                @click="showUserDetail(row.user_id)"
                                class="user_id"
                                >{{ row.user_id }}</span
                            >
                        </p>
                        <p>{{ tableColumns.nick_name.name }}：{{ row.nick_name }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="order_no"
                :label="LangUtil('订单号')"
                align="center"
                min-width="120px"
            ></el-table-column>
            <el-table-column :label="LangUtil('后台账号')" align="center" width="180px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.created_id.name }}：{{ row.created_id }}</p>
                        <p>{{ tableColumns.created_by.name }}：{{ row.created_by }}</p>
                        <p>
                            {{ tableColumns.created_type.name }}：{{
                                tableColumns.created_type.options[row.created_type]
                            }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单状态')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.status.options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('支付方式')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gold" :label="LangUtil('订单金额')" align="center"></el-table-column>
            <el-table-column
                prop="gold"
                :label="LangUtil('玩家付款金额')"
                align="center"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                prop="created_at"
                :label="LangUtil('创建时间')"
                align="center"
                width="170px"
            ></el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import VipReceiveRechargeOrderProxy from "../proxy/VipReceiveRechargeOrderProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";

@Component({
    components: {
        Pagination,
    },
})
export default class VipReceiveRechargeOrderBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VipReceiveRechargeOrderProxy = this.getProxy(VipReceiveRechargeOrderProxy);
    SelfModel: SelfModel = this.getProxy(SelfModel);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    get isShowColumn() {
        //@ts-ignore
        return this.SelfModel._userInfo.type == 32 ? false : true;
    }

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
