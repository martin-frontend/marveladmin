<template>
    <div :class="lang">
        <el-dialog :title="$t('user_detail.userDetail')" :visible.sync="pageSetting.bShow" width="1500px">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('common.baseInfo')" name="tab1">
                    <TabUserInfo v-if="activeName == 'tab1'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.userWallet')" name="tab2">
                    <TabWallet v-if="activeName == 'tab2'" />
                </el-tab-pane>
                <el-tab-pane
                    :label="$t('user_detail.assetDetail')"
                    name="tab3"
                    v-if="checkUnique(unique.plat_users_gold_log)"
                >
                    <TabGold v-if="activeName == 'tab3'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.betDetail')" name="tab4" v-if="checkUnique(unique.plat_users_bet)">
                    <TabBet v-if="activeName == 'tab4'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.water')" name="tab5">
                    <TabWater v-if="activeName == 'tab5'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.backDetail')" name="tab6">
                    <TabCommission v-if="activeName == 'tab6'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.teamMember')" name="tab7">
                    <TabTeam v-if="activeName == 'tab7'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.relatedUsers')" name="tab8">
                    <TabRelatedUsers v-if="activeName == 'tab8'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.loginRecord')" name="tab9">
                    <TabLoginRecord v-if="activeName == 'tab9'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.water_config')" name="tab10">
                    <TabWaterRate v-if="activeName == 'tab10'" />
                </el-tab-pane>
                <el-tab-pane :label="$t('user_detail.vendor_user')" name="tab11">
                    <TabPlatVendorUser v-if="activeName == 'tab11'" />
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script lang="ts">
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
import Cookies from "js-cookie";

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
    },
})
export default class UserDetail extends AbstractView {
    private checkUnique = checkUnique;
    private unique = unique;

    @Prop() page!: number;
    private pageSetting = this.page == 1 ? page1 : page2;
    private activeName = "tab1";

    @Watch("pageSetting.bShow")
    private onWatchShow() {
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
