<template>
    <div>
        <div class="item" v-if="checkUnique(unique.exchange_orders)">
            <el-link href="#/layout/exchange_orders?flag=1"
                >{{ textGroup.paymentReview }}： {{ messageInfo[1] }}</el-link
            >
            <div
                class="bell"
                @click="handlerChange(1)"
                :class="enabledSound1 ? 'el-icon-bell' : 'el-icon-close-notification'"
            ></div>
        </div>
        <div class="item" v-if="checkUnique(unique.coin_receive_recharge_order)">
            <el-link href="#/layout/coin_receive_recharge_order">{{ textGroup.order }}： {{ messageInfo[2] }}</el-link>
            <div
                class="bell"
                @click="handlerChange(2)"
                :class="enabledSound2 ? 'el-icon-bell' : 'el-icon-close-notification'"
            ></div>
        </div>
        <div class="item" v-if="checkUnique(unique.exchange_orders)">
            <el-link href="#/layout/exchange_orders?flag=12">{{ textGroup.orderError }}： {{ messageInfo[4] }}</el-link>
            <!-- <div
                class="bell"
                @click="handlerChange(2)"
                :class="enabledSound2 ? 'el-icon-bell' : 'el-icon-close-notification'"
            ></div> -->
        </div>
        <div class="item" v-if="checkUnique(unique.plat_message)">
            <el-link href="#/layout/plat_message">{{ textGroup.stationLetter }}： {{ messageInfo[3] }}</el-link>
        </div>

        <div class="item" v-if="checkUnique(unique.plat_register_same_ip_log)">
            <el-link href="#/layout/plat_register_same_ip_log">{{ textGroup.ip_limit }}： {{ messageInfo[5] }}</el-link>
            <div
                class="bell"
                @click="handlerChange(5)"
                :class="enabledSound5 ? 'el-icon-bell' : 'el-icon-close-notification'"
            ></div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import SelfModel from "@/core/model/SelfModel";
import { Component } from "vue-property-decorator";
import i18n from "@/lang";

@Component
export default class MessagePanel extends AbstractView {
    LangUtil = LangUtil;
    checkUnique = checkUnique;
    unique = unique;

    selfModel = this.getProxy(SelfModel);
    messageInfo = this.selfModel.userInfo.message_info;

    enabledSound1 = localStorage.getItem("sound1") != "false";
    enabledSound2 = localStorage.getItem("sound2") != "false";
    enabledSound5 = localStorage.getItem("sound5") != "false";
    textGroup = {
        paymentReview: LangUtil("出款审核"),
        order: LangUtil("币商充值订单"),
        orderError: LangUtil("订单失败"),
        stationLetter: LangUtil("站内信"),
        ip_limit: LangUtil("IP风控"),
    };

    handlerChange(index: number) {
        if (index == 1) {
            this.enabledSound1 = !this.enabledSound1;
            localStorage.setItem("sound1", this.enabledSound1.toString());
        } else if (index == 2){
            this.enabledSound2 = !this.enabledSound2;
            localStorage.setItem("sound2", this.enabledSound2.toString());
        } else if (index == 5){
            this.enabledSound5 = !this.enabledSound5;
            localStorage.setItem("sound5", this.enabledSound5.toString());
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.item {
    width: 200px;
    display: flex;
}
.bell {
    text-align: right;
    flex: 1;
}
</style>
