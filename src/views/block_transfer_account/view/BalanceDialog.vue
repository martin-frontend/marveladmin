<template>
    <el-dialog :title="LangUtil('查看余额')" :visible.sync="dialogBalance.bShow">
        <el-form ref="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item v-for="(item, key) of dialogBalance.data" :label="key" :key="key" :prop="key">
                {{ item }}
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import GlobalVar from "@/core/global/GlobalVar";
import Component from "vue-class-component";
import BlockTransferAccountProxy from "../proxy/BlockTransferAccountProxy";
@Component
export default class BalanceDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockTransferAccountProxy = this.getProxy(BlockTransferAccountProxy);
    // proxy property
    dialogBalance = this.myProxy.dialogBalance;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn_group {
    display: flex;
    justify-content: flex-end;
    position: relative;
}
</style>
