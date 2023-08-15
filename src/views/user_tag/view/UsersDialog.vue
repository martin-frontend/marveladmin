<template>
    <el-dialog :title="LangUtil('用户列表')" :visible.sync="myProxy.usersDialogData.bShow" width="1000px">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="LangUtil('平台信息')" min-width="150px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" prop="user_id" min-width="150px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>
                        ID：<span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                    </div>
                    <div>{{ LangUtil("账号") }}：{{ row.username }}</div>
                    <div>{{ LangUtil("昵称") }}：{{ row.nick_name }}</div>
                    <div>
                        {{ LangUtil("备注") }}：<span class="user_remark">{{ row.remark }}</span>
                    </div>
                    <div>VIP：{{ row.vip_level }}</div>
                    <div>{{ tableColumns.real_name.name }}：{{ row.real_name }}</div>
                    <div>{{ tableColumns.cpf.name }}：{{ row.cpf }}</div>
                    <div>
                        {{ tableColumns.is_credit_user.name }}：{{
                            tableColumns.is_credit_user.options[row.is_credit_user]
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.contact_info.name" min-width="120px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.phone.name }}：{{ row.phone }}</div>
                    <div>{{ tableColumns.email.name }}：{{ row.email }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('登录信息')" min-width="245px" class-name="status-col">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：{{ row.created_at }}</p>
                    <p>{{ tableColumns["last_online_at"].name }}：{{ row.last_online_at }}</p>
                    <p>{{ tableColumns["register_ip"].name }}：{{ row.register_ip }}</p>
                    <p>{{ tableColumns["last_login_ip"].name }}：{{ row.last_login_ip }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="showUserDetail(row.user_id)">{{ LangUtil("详情") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import UserTagProxy from "../proxy/UserTagProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class UsersDialog extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: UserTagProxy = this.getProxy(UserTagProxy);
    // proxy property
    tableColumns = this.myProxy.usersDialogData.columns;
    tableData = this.myProxy.usersDialogData.list;
    pageInfo = this.myProxy.usersDialogData.pageInfo;
    listQuery = this.myProxy.usersDialogData.query;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onUsersQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
