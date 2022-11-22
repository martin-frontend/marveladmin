<template>
    <div class="app-operation" v-if="selfModel.userInfo.type == 32 || selfModel.userInfo.type == 64">
        <div>{{ LangUtil("余额") }}: {{ userGold.gold }}</div>
        <div v-if="checkUnique(unique.coin_wallet_log)">
            <el-button size="mini" type="primary" @click="handlerShowGoldDetail()">
                {{ LangUtil("金币明细") }}
            </el-button>
        </div>
        <RecordQueryDialog v-if="!coinWalletProxy.logDialogData.isCoinWalletShow" />
        <div v-if="selfModel.userInfo.type == 64 && checkUnique(unique.coin_wallet_log)">
            <!-- 状态 -->
            {{ LangUtil("状态") }}:
            <el-switch @change="onSwitch()" v-model="status" :active-value="1" :inactive-value="99"></el-switch>
        </div>
        <div>
            <span>{{ cate_options[userInfo.cate] + "-" + type_options[userInfo.type] }}</span>

            &nbsp;<span>{{ userInfo.admin_username }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SelfModel from "@/core/model/SelfModel";
import RecordQueryDialog from "@/views/coin_wallet/view/RecordQueryDialog.vue";
import CoinWalletProxy from "@/views/coin_wallet/proxy/CoinWalletProxy";
import CoinWalletMediator from "@/views/coin_wallet/mediator/CoinWalletMediator";
import i18n from "@/lang";
import { checkUnique, unique } from "@/core/global/Permission";
@Component({
    components: {
        RecordQueryDialog,
    },
})
export default class BasicOperationIndex extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;

    selfModel = this.getProxy(SelfModel);

    constructor() {
        super(CoinWalletMediator);
    }
    destroyed() {
        super.destroyed();
    }

    cate_options: any = { 1: LangUtil("系统"), 2: LangUtil("平台") };
    type_options: any = {
        1: LangUtil("超级管理员"),
        2: LangUtil("管理员"),
        4: LangUtil("普通用户"),
        8: LangUtil("渠道用户"),
        32: LangUtil("币商代收"),
        64: LangUtil("币商代付"),
    };

    status: any = this.userGold.status;
    userInfo = this.selfModel.userInfo;
    get userGold() {
        return this.selfModel.userInfo.coin_user;
    }

    handlerShowGoldDetail() {
        const coinWalletProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
        coinWalletProxy.logDialogData.isCoinWalletShow = false;
        coinWalletProxy.showLog(this.selfModel.userInfo.admin_user_id);
    }

    onSwitch() {
        const coinWalletProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
        coinWalletProxy.onUpdateStatus({
            status: this.status,
            id: this.userGold.id,
        });
    }
}
</script>
<style lang="scss" scoped>
.app-operation {
    display: flex;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    > * {
        margin: 0 6px;
    }

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
