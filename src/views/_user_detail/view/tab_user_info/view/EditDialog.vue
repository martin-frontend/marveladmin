<template>
    <el-dialog :title="$t('common.update')" :visible.sync="dialogData.bShow" width="500px" :append-to-body="true">
        <div v-loading="net_status.loading">
            <div class="input_title">{{ $t("common.pleaseEnter") }}</div>
            <!-- 金币明细屏蔽 start -->
            <template v-if="dialogData.filed == 'gold_columns_disable'">
                <el-select
                    v-model="dialogData.filedValue"
                    multiple
                    clearable
                    :placeholder="$t('common.pleaseChoose')"
                    style="width: 400px; margin-left: 25px"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.gold_columns_disable.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </template>
            <!-- 金币明细屏蔽 end-->

            <!-- 备注 start -->
            <template v-else-if="dialogData.filed == `remark`">
                <el-input
                    v-model="dialogData.filedValue"
                    rows="2"
                    maxlength="10"
                    show-word-limit
                    class="dialog_input"
                    :placeholder="$t('user_detail.userComment')"
                ></el-input>
            </template>
            <!--备注 end-->
            <!-- 推广靓号  -->
            <template v-else-if="dialogData.filed == `pretty_user_id`">
                <el-input
                    v-model="dialogData.filedValue"
                    rows="2"
                    maxlength="6"
                    show-word-limit
                    class="dialog_input"
                    :placeholder="`${tableColumns.pretty_user_id.name}最多六位数`"
                ></el-input>
            </template>

            <template v-else>
                <el-input class="dialog_input" v-model="dialogData.filedValue"></el-input>
            </template>

            <!-- 密码 start-->
            <template v-if="dialogData.filed == 'password'">
                <div class="input_title">
                    {{ $t("user_detail.inputAgain") }}{{ tableColumns[dialogData.filed].name }}
                </div>
                <el-input class="dialog_input" v-model="dialogData.filedValue1"></el-input>
            </template>
            <!--密码 end-->

            <div class="confirm">
                <el-button class="item" type="primary" @click="handlerSubmit"> {{ $t("common.save") }} </el-button>
            </div>
            <div slot="footer" class="dialog-footer"></div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabUserInfoProxy from "../proxy/TabUserInfoProxy";
import { checkMail, checkPhone } from "@/core/global/Functions";
import { Message } from "element-ui";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class EditDialog extends AbstractView {
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabUserInfoProxy = getProxy(TabUserInfoProxy);
    private tableColumns: any = this.myProxy.tableColumns;
    private dialogData = this.myProxy.dialogData;

    private handlerSubmit() {
        const filed = this.dialogData.filed;
        const filedValue = this.dialogData.filedValue;

        if (filed == "phone" && !checkPhone(filedValue)) {
            Message.error(this.$t("user_detail.errorCode1") + `${this.tableColumns[filed].name}`);
        } else if (filed == "email" && !checkMail(filedValue)) {
            Message.error(this.$t("user_detail.errorCode1") + `${this.tableColumns[filed].name}`);
        } else if (filed == "password" && !this.checkUserPassword(filedValue)) {
            Message.error(
                this.$t("user_detail.errorCode1") +
                    `${this.tableColumns[filed].name}` +
                    this.$t("user_detail.errorCode2")
            );
        } else if (filed == "password" && filedValue != this.dialogData.filedValue1) {
            const str: any = this.$t("user_detail.passwordError");
            Message.error(str);
        } else if ((filed == "base_win" || filed == "base_water") && !this.checkBaseInput(filedValue)) {
            const str: any = `${this.$t("user_detail.errorCode1")}${this.tableColumns[filed].name}${this.$t(
                "user_detail.errorCode3"
            )}`;
            Message.error(str);
        } else {
            this.myProxy.onEdit(this.dialogData.filed, this.dialogData.filedValue);
        }
    }

    /**
     * 验证密码是否合法
     * @param value
     */
    private checkUserPassword(value: string): boolean {
        const Regx = /^[A-Za-z0-9]*$/;
        return value.length >= 6 && value.length <= 20 && Regx.test(value);
    }

    private checkBaseInput(value: string): boolean {
        if (isNaN(Number(value)) || Number(value) < 0) {
            return false;
        }
        return true;
    }
}
</script>

<style scoped lang="scss">
.input_title {
    margin-bottom: 20px;
    margin-left: 25px;
}
.dialog_input {
    width: 400px;
    margin-bottom: 10px;
    margin-left: 25px;
}
.confirm {
    text-align: center;
    margin-top: 50px;
}
.ps {
    color: red;
}
</style>
