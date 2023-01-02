<template>
    <div class="content">
        <div class="layout" v-loading="net_status.loading">
            <el-form ref="form" label-position="right" label-width="200px" :model="userInfo">
                <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                    {{ tableColumns["plat_id"].options[userInfo.plat_id] }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['channel_id'].name" prop="channel_id">
                    {{ userInfo.channel_id }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['username'].name" prop="username">
                    {{ userInfo.username }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                    {{ userInfo.user_id }}
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['backup_phone'].name"
                    prop="backup_phone"
                    v-if="!isChannelPlatUser"
                >
                    {{ userInfo.backup_phone }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['created_at'].name" prop="created_at">
                    {{ userInfo.created_at }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['last_login_at'].name" prop="last_login_at">
                    {{ userInfo.last_login_at }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['register_ip'].name" prop="register_ip">
                    {{ userInfo.register_ip }} ({{ LangUtil("人数") }} {{ userInfo.register_ip_counts }} /
                    {{ userInfo.register_ip_location }})
                </el-form-item>
                <!-- <el-form-item
                    size="mini"
                    :label="tableColumns['register_ip'].name + '（' + LangUtil('人数') + '）'"
                    prop="register_ip_counts"
                >
                    {{ userInfo.register_ip_counts }}
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['register_ip'].name + '（' + LangUtil('国家地区') + '）'"
                    prop="register_ip_location"
                >
                    {{ userInfo.register_ip_location }}
                </el-form-item> -->
                <el-form-item size="mini" :label="tableColumns['last_login_ip'].name" prop="last_login_ip">
                    {{ userInfo.last_login_ip }} ({{ LangUtil("人数") }} {{ userInfo.last_login_ip_counts }} /
                    {{ userInfo.last_ip_location }})
                </el-form-item>
                <!-- <el-form-item
                    size="mini"
                    :label="tableColumns['last_login_ip'].name + '（' + LangUtil('人数') + '）'"
                    prop="last_login_ip_counts"
                >
                    {{ userInfo.last_login_ip_counts }}
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['last_login_ip'].name + '（' + LangUtil('国家地区') + '）'"
                    prop="last_ip_location"
                >
                    {{ userInfo.last_ip_location }}
                </el-form-item> -->
                <el-form-item size="mini" :label="tableColumns['last_login_device'].name" prop="last_login_device">
                    {{ userInfo.last_login_device }} ({{ LangUtil("人数") }} {{ userInfo.login_device_counts }})
                </el-form-item>
                <!-- <el-form-item
                    size="mini"
                    :label="tableColumns['last_login_device'].name + '（' + LangUtil('人数') + '）'"
                    prop="login_device_counts"
                >
                    {{ userInfo.login_device_counts }}
                </el-form-item> -->
                <el-form-item size="mini" :label="tableColumns['vip_level'].name" prop="vip_level">
                    {{ userInfo.vip_level }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['total_recharge'].name" prop="total_recharge">
                    {{ userInfo.total_recharge }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['total_exchange'].name" prop="total_exchange">
                    {{ userInfo.total_exchange }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['total_water'].name" prop="total_water">
                    {{ userInfo.total_water }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['total_win'].name" prop="total_win">
                    {{ userInfo.total_win }}
                </el-form-item>
                <template v-if="!isChannelPlatUser">
                    <el-form-item size="mini" :label="tableColumns['is_gold_exchange'].name" prop="is_gold_exchange">
                        <el-switch
                            @change="onSwitchGoldExchange()"
                            v-model="userInfo.is_gold_exchange"
                            :active-value="1"
                            :inactive-value="98"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['is_credit_user'].options[1]" prop="is_credit_user">
                        <el-switch
                            @change="onSwitchCreditUser()"
                            v-model="userInfo.is_credit_user"
                            :active-value="1"
                            :inactive-value="98"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item
                        size="mini"
                        :label="tableColumns['show_credit_statistic'].name"
                        prop="show_credit_statistic"
                    >
                        <el-switch
                            @change="onSwitchCreditStatistic()"
                            v-model="userInfo.show_credit_statistic"
                            :active-value="1"
                            :inactive-value="98"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['credit_rate'].name" prop="credit_rate">
                        <el-input disabled v-model="userInfo.credit_rate" style="width: 100px"></el-input>%
                        <el-button
                            class="item"
                            type="primary"
                            @click="handlerEdit('credit_rate')"
                            style="margin-left: 20px"
                        >
                            {{ LangUtil("编辑") }}
                        </el-button>
                    </el-form-item>

                    <el-form-item
                        size="mini"
                        :label="tableColumns['show_credit_report'].name"
                        prop="show_credit_report"
                    >
                        <el-switch
                            @change="onSwitchCreditReport()"
                            v-model="userInfo.show_credit_report"
                            :active-value="1"
                            :inactive-value="98"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns['show_credit_set'].name" prop="show_credit_set">
                        <el-switch
                            @change="onSwitchCreditSet()"
                            v-model="userInfo.show_credit_set"
                            :active-value="1"
                            :inactive-value="98"
                        ></el-switch>
                    </el-form-item>
                </template>
            </el-form>

            <el-form ref="form" label-position="left" label-width="130px" :model="userInfo">
                <el-form-item size="mini" :label="tableColumns['real_name'].name" prop="real_name">
                    <el-input disabled v-model="userInfo.real_name" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('real_name')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_real_name) && !isChannelPlatUser"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                    <el-input disabled v-model="userInfo.nick_name" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('nick_name')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_phone) && !isChannelPlatUser"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['phone'].name" prop="phone" v-if="!isChannelPlatUser">
                    <el-input
                        disabled
                        v-model="userInfo.phone"
                        :style="{ width: userInfo.phone && userInfo.phone != '' ? '120px' : '200px' }"
                    ></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerLookPhone"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_phone) && userInfo.phone && userInfo.phone != ''"
                    >
                        {{ LangUtil("查看") }}
                    </el-button>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('phone')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_phone)"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['email'].name" prop="email">
                    <el-input disabled v-model="userInfo.email" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('email')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_email) && !isChannelPlatUser"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['pretty_user_id'].name" prop="pretty_user_id">
                    <el-input disabled v-model="userInfo.pretty_user_id" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('pretty_user_id')"
                        style="margin-left: 20px"
                        v-if="!isChannelPlatUser"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <!-- <el-form-item size="mini" :label="tableColumns['wechat'].name" prop="wechat">
                    <el-input disabled v-model="userInfo.wechat" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('wechat')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_wechat)"
                    >
                        {{ LangUtil('编辑') }}
                    </el-button>
                </el-form-item> -->
                <!-- <el-form-item size="mini" :label="tableColumns['qq'].name" prop="qq">
                    <el-input disabled v-model="userInfo.qq" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('qq')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_qq)"
                    >
                        {{ LangUtil('编辑') }}
                    </el-button>
                </el-form-item> -->
                <el-form-item size="mini" :label="tableColumns['password'].name" prop="password">
                    <el-input disabled v-model="userInfo.password" type="password" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('password')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.plat_user_update_password) && !isChannelPlatUser"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['base_recharge'].name" prop="base_recharge">
                    <el-input disabled v-model="userInfo.base_recharge" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('base_recharge')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.update_level_exp)"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['base_water'].name" prop="base_water">
                    <el-input disabled v-model="userInfo.base_water" style="width: 200px"></el-input>
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('base_water')"
                        style="margin-left: 20px"
                        v-if="checkUnique(unique.update_level_exp)"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>
                <template v-if="!isChannelPlatUser">
                    <div class="row_display">
                        <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                            <el-switch
                                @change="onSwitch()"
                                v-model="userInfo.status"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item
                            size="mini"
                            label-width="120px"
                            :label="LangUtil('清除缓存')"
                            prop="status"
                            class="btn"
                        >
                            <el-button
                                type="primary"
                                @click="handlerClear()"
                                v-if="checkUnique(unique.plat_user_clear_cache)"
                            >
                                {{ LangUtil("清除") }}
                            </el-button>
                        </el-form-item>
                    </div>
                    <!-- <div class="row_display">
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_promotion_statistics_display'].name"
                            prop="is_promotion_statistics_display"
                        >
                            <el-switch
                                @change="onSwitchPromotion()"
                                v-model="userInfo.is_promotion_statistics_display"
                                :active-value="1"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>

                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_channel_statistic_display'].name"
                            prop="is_channel_statistic_display"
                            class="second"
                        >
                            <label slot="label">
                                <el-tooltip placement="top-start">
                                    <div slot="content">{{ LangUtil('客户端APP是否展示渠道统计数据') }}</div>
                                    <i class="el-icon-question" />
                                </el-tooltip>
                                {{ tableColumns["is_channel_statistic_display"].name }}
                            </label>
                            <el-switch
                                @change="onSwitchChannel()"
                                v-model="userInfo.is_channel_statistic_display"
                                :active-value="1"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>
                    </div> -->

                    <div class="row_display">
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_receive_commission'].name"
                            prop="is_receive_commission"
                        >
                            <el-switch
                                @change="onSwitchCommission()"
                                v-model="userInfo.is_receive_commission"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>

                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_check_gold_water'].name"
                            prop="is_check_gold_water"
                            class="second"
                        >
                            <el-switch
                                @change="onSwitchGold_water()"
                                v-model="userInfo.is_check_gold_water"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>
                    </div>

                    <div class="row_display">
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_exchange_order_auto_check'].name"
                            prop="is_exchange_order_auto_check"
                        >
                            <el-switch
                                @change="onSwitchExchange_order_auto_check()"
                                v-model="userInfo.is_exchange_order_auto_check"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>

                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_can_game'].name"
                            prop="is_can_game"
                            class="second"
                        >
                            <el-switch
                                @change="onSwitchCan_game()"
                                v-model="userInfo.is_can_game"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>
                    </div>

                    <div class="row_display">
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_receive_reward'].name"
                            prop="is_receive_reward"
                            class="second"
                        >
                            <el-switch
                                @change="onSwitchReceive_reward()"
                                v-model="userInfo.is_receive_reward"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_gold_transfer'].name"
                            prop="is_gold_transfer"
                            class="second"
                        >
                            <el-switch
                                @change="onSwitchGold_transfer()"
                                v-model="userInfo.is_gold_transfer"
                                :active-value="1"
                                :inactive-value="98"
                            ></el-switch>
                        </el-form-item>
                    </div>

                    <div class="row_display">
                        <el-form-item
                            size="mini"
                            :label="tableColumns['is_login_need_google'].name"
                            prop="is_login_need_google"
                        >
                            <el-switch
                                @change="onSwitchLogin_need_google()"
                                v-model="userInfo.is_login_need_google"
                                :active-value="1"
                                :inactive-value="0"
                            ></el-switch>
                        </el-form-item>
                        <el-form-item
                            size="mini"
                            label-width="120px"
                            :label="LangUtil('清除谷歌验证码')"
                            prop="status"
                            class="btn"
                        >
                            <el-button type="primary" @click="handlerGoogleClear()">
                                {{ LangUtil("清除") }}
                            </el-button>
                        </el-form-item>
                    </div>

                    <el-form-item
                        size="mini"
                        :label="tableColumns.gold_columns_disable.name"
                        prop="gold_columns_disable"
                    >
                        <label slot="label">
                            <el-tooltip placement="top-start">
                                <div slot="content">{{ LangUtil("客户端APP金币明细,屏蔽该选择类型选项") }}</div>
                                <i class="el-icon-question" />
                            </el-tooltip>
                            {{ tableColumns.gold_columns_disable.name }}
                        </label>
                        <div class="gold_columns">
                            <div class="content">{{ userInfo.gold_columns_disable_list }}</div>
                            <el-button class="btn" type="primary" @click="handlerEdit('gold_columns_disable')">
                                {{ LangUtil("编辑") }}
                            </el-button>
                        </div>
                    </el-form-item>
                </template>

                <el-form-item size="mini" :label="tableColumns['remark'].name" prop="remark">
                    <div class="remark_group">
                        <div class="content">{{ userInfo.remark | remarkFilter }}</div>
                        <el-button class="btn" type="primary" @click="handlerEdit('remark')">
                            {{ LangUtil("编辑") }}
                        </el-button>
                    </div>
                </el-form-item>
                <div class="bind_relation" v-if="checkUnique(unique.plat_agent_bind)">
                    <div>{{ LangUtil("上级关系键条") }}</div>
                    <p>
                        <span v-for="(value, key) in relationChain" :key="key" :value="key"
                            ><span style="cursor: pointer; text-decoration: underline" @click="showUserDetail(value)"
                                >[{{ key + 1 }}]{{ value }}</span
                            >＜</span
                        >
                        <span>-{{ userInfo.user_id }}</span>
                    </p>
                </div>
            </el-form>
        </div>
        <EditDialog v-if="myProxy.dialogData.bShow" />
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabUserUnfoMediator from "../mediator/TabUserInfoMediator";
import TabUserInfoProxy from "../proxy/TabUserInfoProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import EditDialog from "./EditDialog.vue";

@Component({
    components: {
        EditDialog,
    },
    filters: {
        remarkFilter(remark: string) {
            if (remark == "") {
                return "-";
            }
            return remark;
        },
    },
})
export default class TabUserInfo extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabUserInfoProxy = getProxy(TabUserInfoProxy);
    tableColumns = this.myProxy.tableColumns;
    userInfo = this.myProxy.userInfo;
    relationChain = this.myProxy.relationChain;

    constructor() {
        super(TabUserUnfoMediator);
    }

    handlerEdit(filed: string) {
        this.myProxy.showDialog(filed);
    }

    onSwitch() {
        this.myProxy.dialogData.filed = "status";
        this.myProxy.onEdit("status", this.userInfo.status);
    }

    onSwitchCreditReport() {
        this.myProxy.dialogData.filed = "show_credit_report";
        this.myProxy.onEdit("show_credit_report", this.userInfo.show_credit_report);
    }

    onSwitchCreditSet() {
        this.myProxy.dialogData.filed = "show_credit_set";
        this.myProxy.onEdit("show_credit_set", this.userInfo.show_credit_set);
    }

    onSwitchCreditStatistic() {
        this.myProxy.dialogData.filed = "show_credit_statistic";
        this.myProxy.onEdit("show_credit_statistic", this.userInfo.show_credit_statistic);

        console.log(">>>>>>>>", this.userInfo.show_credit_statistic);
    }

    onSwitchCreditUser() {
        this.myProxy.dialogData.filed = "is_credit_user";
        this.myProxy.onEdit("is_credit_user", this.userInfo.is_credit_user);
        console.log(">>>>>>>>切换信用用户<<", this.userInfo.is_credit_user);
    }

    onSwitchGoldExchange() {
        this.myProxy.dialogData.filed = "is_gold_exchange";
        this.myProxy.onEdit("is_gold_exchange", this.userInfo.is_gold_exchange);
        console.log(">>>>>>>>切换 转换<<", this.userInfo.is_gold_exchange);
    }

    onEditXinYongFenBi(filed: number) {
        if (filed < 0 || filed > 100) {
            console.log(" 无效输入");
            return;
        }

        console.log(">>>>>>>>", filed);
    }

    onSwitchPromotion() {
        this.myProxy.dialogData.filed = "is_promotion_statistics_display";
        this.myProxy.onEdit("is_promotion_statistics_display", this.userInfo.is_promotion_statistics_display);
    }

    onSwitchChannel() {
        this.myProxy.dialogData.filed = "is_channel_statistic_display";
        this.myProxy.onEdit("is_channel_statistic_display", this.userInfo.is_channel_statistic_display);
    }

    onSwitchCommission() {
        this.myProxy.dialogData.filed = "is_receive_commission";
        this.myProxy.onEdit("is_receive_commission", this.userInfo.is_receive_commission);
    }

    onSwitchGold_water() {
        this.myProxy.dialogData.filed = "is_check_gold_water";
        this.myProxy.onEdit("is_check_gold_water", this.userInfo.is_check_gold_water);
    }

    onSwitchExchange_order_auto_check() {
        this.myProxy.dialogData.filed = "is_exchange_order_auto_check";
        this.myProxy.onEdit("is_exchange_order_auto_check", this.userInfo.is_exchange_order_auto_check);
    }

    onSwitchCan_game() {
        this.myProxy.dialogData.filed = "is_can_game";
        this.myProxy.onEdit("is_can_game", this.userInfo.is_can_game);
    }

    onSwitchReceive_reward() {
        this.myProxy.dialogData.filed = "is_receive_reward";
        this.myProxy.onEdit("is_receive_reward", this.userInfo.is_receive_reward);
    }

    onSwitchGold_transfer() {
        this.myProxy.dialogData.filed = "is_gold_transfer";
        this.myProxy.onEdit("is_gold_transfer", this.userInfo.is_gold_transfer);
    }

    onSwitchLogin_need_google() {
        this.myProxy.dialogData.filed = "is_login_need_google";
        this.myProxy.onEdit("is_login_need_google", this.userInfo.is_login_need_google);
    }

    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }

    handlerLookPhone() {
        this.myProxy.onGetPhone();
    }

    handlerClear() {
        this.myProxy.clearCache(this.userInfo.user_id);
    }

    handlerGoogleClear() {
        this.myProxy.clearGoogle(this.userInfo.user_id);
    }

    destroyed() {
        super.destroyed();
    }

    get isChannelPlatUser() {
        return (
            this.$route.name == "渠道用户" || this.$route.name == "渠道代理用户" || this.$route.name == "代理人员管理"
        );
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.content {
    .layout {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        .el-form {
            width: 50%;
        }
    }
}
.bind_relation {
    padding: 16px;
    border: 2px solid #dcdfe6;
    border-radius: 4px;
    height: 200px;
    overflow: auto;
    p {
        line-height: 25px;
    }
}
.remark_group {
    .content {
        width: 200px;
        color: red;
    }
    .btn {
        margin-left: 20px;
        height: 30px;
    }
    display: flex;
}
.gold_columns {
    display: flex;
    .content {
        width: 200px;
    }
    .btn {
        margin-left: 20px;
        height: 30px;
    }
}
.row_display {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .second {
        margin-right: 32px;
    }
    .btn {
        margin-right: 20px;
    }
}
</style>
