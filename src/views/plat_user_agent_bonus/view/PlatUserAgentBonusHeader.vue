<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="
                    changePlat();
                    handlerSearch();
                "
            />
            <SearchDatePicker
                :title="tableColumns.settlement_at.name"
                :startDate.sync="listQuery.settlement_date_start"
                :endDate.sync="listQuery.settlement_date_end"
                :showTime="true"
            />
            <SearchSelect
                :title="tableColumns.channel_id.name"
                :options="tableColumns.channel_id_options"
                v-model="listQuery.channel_id"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.invite_user_id.name" v-model="listQuery.invite_user_id" />
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
        </div>
        <div class="group">
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="handlerExport()" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
        <div style="margin-top:5px;">
            {{
                LangUtil(
                    "代理分红：查询时间段内，该代理实际要发放的分红金额，计算公式：团队净亏损*分红比例-下级代理总分红，如果代理是最底层代理下级没有开分红的情况，代理分红=团队净亏损 * 分红比例；团队净亏损=团队游戏总输赢-团队代理总佣金-三方游戏成本-充值成本-提现成本-活动成本-挖矿返水。"
                )
            }}
        </div>
        <div>
            {{ LangUtil("团队分红：查询时间段内，团队实际要发放的分红金额，是根据各个代理实际分红金额累加所得。") }}
        </div>
        <div>
            {{ LangUtil("下级代理总分红：查询时间段内，所有下级、下下级等代理实际分红金额累加所的。") }}
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUserAgentBonusProxy from "../proxy/PlatUserAgentBonusProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class PlatUserAgentBonusHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserAgentBonusProxy = this.getProxy(PlatUserAgentBonusProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    list = this.myProxy.tableData.list;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    //更换平台切换对应渠道
    changePlat() {
        this.listQuery.channel_id = "";
        this.tableColumns.channel_id_options = this.tableColumns.channel_id.options[this.listQuery.plat_id];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        channel_id_keys.forEach((key: any) => {
            this.tableColumns.channel_id_options[key] = key;
        });
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    handlerExport() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
