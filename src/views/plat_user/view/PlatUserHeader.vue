<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            style="width: 350px"
        />
        <div class="group">
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.nick_name.name" v-model="listQuery.nick_name" />
            <SearchInput :title="tableColumns.last_login_ip.name" v-model="listQuery.last_login_ip" />
            <SearchInput :title="tableColumns.register_ip.name" v-model="listQuery.register_ip" />
            <SearchInput :title="tableColumns.last_login_device.name" v-model="listQuery.last_login_device" />
            <SearchInput :title="tableColumns.phone.name" v-model="listQuery.phone" />
            <SearchInput :title="tableColumns.remark.name" v-model="listQuery.remark" :tip="tableColumns.remark.tips" />
            <SearchSelect
                :title="tableColumns.is_credit_user.name"
                v-model="listQuery.is_credit_user"
                :options="tableColumns.is_credit_user.options"
            />
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
            <SearchInput :title="tableColumns.cpf.name" v-model="listQuery.cpf" />
        </div>
        <div class="group">
            <SearchRange
                :title="tableColumns.total_win.name"
                min="-9999999"
                max="9999999"
                :minValue.sync="listQuery['total_win-{>=}']"
                :maxValue.sync="listQuery['total_win-{<}']"
                :placeholders="[LangUtil('最小金额'), LangUtil('最大金额')]"
            >
                <el-radio-group v-model="winLoss" @change="onWinLossChange">
                    <el-radio :label="0">{{ LangUtil("输") }}</el-radio>
                    <el-radio :label="1">{{ LangUtil("赢") }}</el-radio>
                </el-radio-group>
            </SearchRange>
            <SearchRange
                :title="tableColumns.vip_level.name"
                :min="0"
                :max="tableColumns.vip_level.options[listQuery.plat_id]"
                :minValue.sync="listQuery.min_level"
                :maxValue.sync="listQuery.max_level"
                :placeholders="[LangUtil('最小等级'), LangUtil('最大等级')]"
            />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<}']"
                :showTime="true"
            />
            <SearchDatePicker
                :title="tableColumns.last_online_at.name"
                :startDate.sync="listQuery['last_online_at-{>=}']"
                :endDate.sync="listQuery['last_online_at-{<}']"
                :showTime="true"
            />
            <el-button class="header-button" @click="handlerSearch()" type="primary">{{ LangUtil("查询") }}</el-button>
            <el-button class="header-button" @click="handlerReset()" type="primary">{{ LangUtil("重置") }}</el-button>
            <el-button
                class="header-button"
                @click="handlerExport()"
                type="primary"
                icon="el-icon-download"
                :disabled="list.length == 0"
            >
                {{ LangUtil("导出") }}
            </el-button>
            <el-button class="header-button" @click="handlerSearchWallet()" type="primary">{{
                LangUtil("平台当前用户余额")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import PlatUserProxy from "../proxy/PlatUserProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class PlatUserHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

    winLoss: string = "";
    onWinLossChange(value: any) {
        this.listQuery["total_win-{>=}"] = value ? 0 : "";
        this.listQuery["total_win-{<}"] = value ? "" : 0;
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.winLoss = "";
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    handlerSearchWallet() {
        this.myProxy.showWallet();
    }

    handlerExport() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
