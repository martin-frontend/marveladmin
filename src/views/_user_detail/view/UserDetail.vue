<template>
    <div :class="lang">
        <el-dialog :title="LangUtil('用户详情')" :visible.sync="pageSetting.bShow" width="1500px">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="LangUtil('基本信息')" name="tab1">
                    <TabUserInfo v-if="activeName == 'tab1'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('用户钱包')" name="tab2" :disabled="net_status.loading">
                    <TabWallet v-if="activeName == 'tab2'" />
                </el-tab-pane>
                <el-tab-pane
                    :label="LangUtil('资产明细')"
                    name="tab3"
                    v-if="checkUnique(unique.plat_users_gold_log)"
                    :disabled="net_status.loading"
                >
                    <TabGold v-if="activeName == 'tab3'" />
                </el-tab-pane>
                <el-tab-pane
                    :label="LangUtil('投注明细')"
                    name="tab4"
                    v-if="checkUnique(unique.plat_users_bet)"
                    :disabled="net_status.loading"
                >
                    <TabBet v-if="activeName == 'tab4'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('流水打码')" name="tab5" :disabled="net_status.loading">
                    <TabWater v-if="activeName == 'tab5'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('返佣明细')" name="tab6" :disabled="net_status.loading">
                    <TabCommission v-if="activeName == 'tab6'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('团队成员')" name="tab7" :disabled="net_status.loading">
                    <TabTeam v-if="activeName == 'tab7'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('关联查询')" name="tab8" :disabled="net_status.loading">
                    <TabRelatedUsers v-if="activeName == 'tab8'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('登陆日志')" name="tab9" :disabled="net_status.loading">
                    <TabLoginRecord v-if="activeName == 'tab9'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('流水配置')" name="tab10" :disabled="net_status.loading">
                    <TabWaterRate v-if="activeName == 'tab10'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('用户厂商')" name="tab11" :disabled="net_status.loading">
                    <TabPlatVendorUser v-if="activeName == 'tab11'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('信用代理')" name="tab12" :disabled="net_status.loading">
                    <TabCredit v-if="activeName == 'tab12'" />
                </el-tab-pane>
                <el-tab-pane :label="LangUtil('用户等级')" name="tab13" :disabled="net_status.loading">
                    <TabEasybet v-if="activeName == 'tab13'" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Prop, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import { page1, page2 } from "../PageSetting";
// tab components
import TabUserInfo from "./tab_user_info/view/TabUserInfo.vue";
import TabWallet from "./tab_wallet/view/TabWallet.vue";
import TabGold from "./tab_gold/view/TabGold.vue";
import TabBet from "./tab_bet/view/TabBet.vue";
import TabWater from "./tab_water/view/TabWater.vue";
import TabTeam from "./tab_team/view/TabTeam.vue";
import TabCommission from "./tab_commission/view/TabCommission.vue";
import TabRelatedUsers from "./tab_related_users/view/TabRelatedUsers.vue";
import TabLoginRecord from "./tab_login_record/view/TabLoginRecord.vue";
import TabWaterRate from "./tab_water_rate/view/TabWaterRate.vue";
import TabPlatVendorUser from "./tab_plat_vendor_user/view/TabPlatVendorUser.vue";
import TabCredit from "./tab_credit/view/TabCredit.vue";
import TabEasybet from "./tab_easybet/view/TabEasybet.vue";
import Cookies from "js-cookie";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        TabUserInfo,
        TabWallet,
        TabGold,
        TabBet,
        TabWater,
        TabTeam,
        TabCommission,
        TabRelatedUsers,
        TabLoginRecord,
        TabWaterRate,
        TabPlatVendorUser,
        TabCredit,
        TabEasybet,
    },
})
export default class UserDetail extends AbstractView {
    LangUtil = LangUtil;
    checkUnique = checkUnique;
    unique = unique;
    net_status = GlobalVar.net_status;

    @Prop() page!: number;
    pageSetting = this.page == 1 ? page1 : page2;
    activeName = "tab1";

    @Watch("pageSetting.bShow")
    onWatchShow() {
        this.activeName = this.pageSetting.bShow ? "tab1" : "";
    }

    get lang() {
        let _lang: string = Cookies.get("language") || "zh";
        return _lang;
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
