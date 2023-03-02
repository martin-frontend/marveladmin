<template>
    <el-dialog
        width="900px"
        :title="LangUtil('投注详情')"
        :append-to-body="true"
        :visible.sync="myProxy.dialogData.bShow"
    >
        <el-tabs v-model="activeName" style="margin-left: 20px; margin-right: 20px" @tab-click="handleClick">
            <el-tab-pane :label="LangUtil('基本信息')" name="first">
                <el-form label-position="right" label-width="100px">
                    <el-form-item size="mini" :label="tableColumns['order_no'].name" prop="order_no">
                        {{ form["order_no"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                        {{ form["nick_name"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                        {{ form["user_id"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['is_credit_user'].name" prop="is_credit_user">
                        {{ tableColumns["is_credit_user"].options[form["is_credit_user"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                        {{ tableColumns["vendor_id"].options[form["vendor_id"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['vendor_type'].name" prop="vendor_type">
                        {{ tableColumns["vendor_type"].options[form["vendor_type"]] }}
                    </el-form-item>
                    <el-form-item
                        size="mini"
                        :label="tableColumns['vendor_product_name'].name"
                        prop="vendor_product_name"
                    >
                        {{ form["vendor_product_name"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_status'].name" prop="settlement_status">
                        {{ tableColumns["settlement_status"].options[form["settlement_status"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['bet_at'].name" prop="bet_at">
                        {{ form["bet_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_at'].name" prop="settlement_at">
                        {{ form["settlement_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['pull_at'].name" prop="pull_at">
                        {{ form["pull_at"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['bet_gold'].name" prop="bet_gold">
                        {{ form["bet_gold"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['valid_bet_gold'].name" prop="valid_bet_gold">
                        {{ form["valid_bet_gold"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['win_gold'].name" prop="win_gold">
                        <div v-if="form.win_gold == '-'">{{ form.win_gold }}</div>
                        <WinLossDisplay v-else :amount="form.win_gold" />
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['settlement_water'].name" prop="settlement_water">
                        {{ form["settlement_water"] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['water_type'].name" prop="water_type">
                        {{ tableColumns["water_type"].options[form["water_type"]] }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['water_rate'].name" prop="water_rate">
                        {{ form["water_rate"] }}
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['water'].name" prop="water">
                        {{ form["water"] }}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="form && form.game_info" :label="LangUtil('厂商数据')" name="second">
                <div v-if="activeName == 'second'" style="min-height: 200px">
                    <json-editor ref="jsonEditor" v-model="form.game_info" :readOnly="true" />
                </div>
            </el-tab-pane>
            <el-tab-pane
                v-if="form.has_credit_rate_log == 1 || form.has_credit_rate_log == 0"
                :label="LangUtil('分层依据')"
                name="third"
            >
                <div v-if="activeName == 'third'" class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.credit_rate_info" :readOnly="true" />
                </div>
            </el-tab-pane>
            <el-tab-pane :label="LangUtil('分层数据')" name="fourth">
                <el-table
                    :data="logTableData"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    size="mini"
                    v-loading="net_status.loading"
                >
                    <el-table-column
                        :label="logTableColumns['settlement_water_coin'].name"
                        prop="settlement_water_coin"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['valid_bet_gold_coin'].name"
                        prop="valid_bet_gold_coin"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['backwater_config'].name"
                        prop="backwater_config"
                        class-name="status-col"
                        min-width="120px"
                    >
                        <template slot-scope="{ row }">
                            <el-button size="mini" type="primary" @click="handleDetail(row.backwater_config)">{{
                                LangUtil("详情")
                            }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['user_id'].name"
                        prop="user_id"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['subordinate_user_id'].name"
                        prop="subordinate_user_id"
                        class-name="status-col"
                        min-width="120px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['credit_rate_self'].name"
                        prop="credit_rate_self"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['credit_rate_invite'].name"
                        prop="credit_rate_invite"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['coin_rate_self'].name"
                        prop="coin_rate_self"
                        class-name="status-col"
                        min-width="120px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['coin_rate_subordinate'].name"
                        prop="coin_rate_subordinate"
                        class-name="status-col"
                        min-width="120px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['coin_rate_superior'].name"
                        prop="coin_rate_superior"
                        class-name="status-col"
                        min-width="120px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['water_config'].name"
                        prop="water_config"
                        class-name="status-col"
                        min-width="120px"
                    >
                        <template slot-scope="{ row }">
                            <el-button size="mini" type="primary" @click="handleDetail(row.water_config)">{{
                                LangUtil("详情")
                            }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['coin_self'].name"
                        prop="coin_self"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['coin_subordinate'].name"
                        prop="coin_subordinate"
                        class-name="status-col"
                        min-width="120px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['settlement_water_coin_real'].name"
                        prop="settlement_water_coin_real"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                    <el-table-column
                        :label="logTableColumns['backwater_coin_real'].name"
                        prop="backwater_coin_real"
                        class-name="status-col"
                        min-width="80px"
                    >
                    </el-table-column>
                </el-table>
                <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import JsonEditor from "@/components/JsonEditor/index.vue";
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";
import AbstractView from "@/core/abstract/AbstractView";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        WinLossDisplay,
        JsonEditor,
        Pagination,
    },
})
export default class PlatUserBetDetail extends AbstractView {
    net_status = GlobalVar.net_status;

    LangUtil = LangUtil;

    activeName = "first";

    gameInfo: string = "";
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);

    tableColumns = this.myProxy.tableData.columns;

    logTableColumns = this.myProxy.dialogData.log.columns;

    logTableData = this.myProxy.dialogData.log.list;
    pageInfo = this.myProxy.dialogData.log.pageInfo;
    listQuery = this.myProxy.dialogData.log.listQuery;

    @Watch("form")
    onWatchData() {
        this.activeName = "first";
    }

    handleClick() {
        if (this.activeName == "fourth") {
            this.myProxy.getCreditLogTableColumns();
        }
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.getCreditLogList();
    }

    handleDetail(config: any) {
        this.myProxy.jsonEditorDialog.bShow = true;
        this.myProxy.jsonEditorDialog.data = { ...config };
    }

    get form() {
        return  this.myProxy.dialogData.form;
    }
}
</script>

<style lang="scss" scoped></style>
