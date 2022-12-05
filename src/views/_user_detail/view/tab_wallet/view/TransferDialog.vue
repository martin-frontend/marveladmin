<template>
    <el-dialog :title="LangUtil('划转')" :append-to-body="true" :visible.sync="dialogTransferData.bShow">
        <el-form
            ref="dialogTransferData"
            :model="dialogTransferData"
            label-width="70px"
            v-loading="net_status.loading"
            :rules="rules"
        >
            <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="to_user_id">
                <el-select
                    v-model="dialogTransferData.to_user_id"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in userInfo.child_users"
                        :key="key"
                        :label="key"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['nick_name'].name">
                <el-input disabled v-model="userInfo.child_users[dialogTransferData.to_user_id]"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="币种" prop="coin_name_unique">
                <el-input disabled v-model="dialogTransferData.coin_name_unique"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['gold'].name" prop="gold">
                <el-input
                    disabled
                    v-model="userInfo.gold_info[dialogTransferData.coin_name_unique].plat_money"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('划转数量')">
                <el-input
                    v-model="dialogTransferData.gold"
                    type="number"
                    min="0"
                    onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="onTransferGold">{{ LangUtil("确认") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Message, MessageBox } from "element-ui";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { Component, Watch, Vue } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class DeductGoldDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabWalletProxy = getProxy(TabWalletProxy);
    tableColumns = this.myProxy.tableColumns;
    userInfo = this.myProxy.userInfo;
    get dialogTransferData() {
        return this.myProxy.dialogTransferData;
    }

    constructor() {
        super();
    }

    @Watch("dialogTransferData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["dialogTransferData"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    // 表单验证
    rules = {
        to_user_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
    };

    onTransferGold() {
        (this.$refs["dialogTransferData"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                const transferGold = this.dialogTransferData.gold == "" ? 0 : parseFloat(this.dialogTransferData.gold);
                if (
                    transferGold > 0 &&
                    transferGold <=
                        parseFloat(this.userInfo.gold_info[this.dialogTransferData.coin_name_unique].plat_money)
                ) {
                    MessageBox.confirm(
                        //@ts-ignore
                        this.LangUtil(
                            "您确认划转该用户{0}{1}？",
                            transferGold,
                            this.dialogTransferData.coin_name_unique
                        ),
                        this.LangUtil("提示"),
                        {
                            confirmButtonText: this.LangUtil("确定"),
                            cancelButtonText: this.LangUtil("取消"),
                            type: "warning",
                            center: true,
                        }
                    ).then(() => {
                        this.myProxy.onTransferGold(transferGold, this.dialogTransferData.coin_name_unique);
                    });
                } else {
                    let errorCode: any = this.LangUtil("请输入正确的扣除金额，大于0，小于平台余额");
                    Message.error({
                        type: "error",
                        message: errorCode,
                    });
                }
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
