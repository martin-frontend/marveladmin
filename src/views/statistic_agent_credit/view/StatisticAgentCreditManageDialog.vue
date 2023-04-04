<template>
    <el-dialog width="1000px" :title="LangUtil('信用分红期管理')" :visible.sync="myProxy.manageDialogData.bShow">
        <CreditDividendPeriod :plat_id="myProxy.listQuery.plat_id"/>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticAgentCreditProxy from "@/views/statistic_agent_credit/proxy/StatisticAgentCreditProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import CreditDividendPeriod from "./component/credit_dividend_period/view/CreditDividendPeriod.vue";

@Component({
    components: {
        CreditDividendPeriod,
    },
})
export default class StatisticAgentCreditManageDialog extends AbstractView {
    LangUtil = LangUtil;
    private myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);

}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
