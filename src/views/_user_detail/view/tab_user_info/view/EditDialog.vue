<template>
    <el-dialog :title="LangUtil('编辑')" :visible.sync="dialogData.bShow" width="600px" :append-to-body="true">
        <div v-loading="net_status.loading">
            <div v-if="dialogData.filed != 'user_tag'" class="input_title">{{ LangUtil("请输入") }}</div>
            <div v-else class="input_title">{{ LangUtil("选择标签") }}</div>

            <!-- 金币明细屏蔽 start -->
            <template v-if="dialogData.filed == 'gold_columns_disable'">
                <el-select
                    v-model="dialogData.filedValue"
                    multiple
                    clearable
                    :placeholder="LangUtil('请选择')"
                    style="width: 500px; margin-left: 25px"
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
                    type="textarea"
                    v-model="dialogData.filedValue"
                    rows="5"
                    show-word-limit
                    class="dialog_input"
                    :placeholder="LangUtil('输入用户备注信息 最多10个字')"
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
                    :placeholder="`${tableColumns.pretty_user_id.name} ${LangUtil('最多六位数')}`"
                ></el-input>
            </template>

            <!-- 用户标签 start-->
            <template v-else-if="dialogData.filed == 'user_tag'">
                <el-select
                    v-model="dialogData.filedValue"
                    multiple
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    style="width: 500px; margin-left: 25px"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.user_tag.options[userInfo.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </template>
            <!--用户标签 end-->

            <template v-else>
                <el-input class="dialog_input" v-model="dialogData.filedValue"></el-input>
            </template>

            <!-- 密码 start-->
            <template v-if="dialogData.filed == 'password'">
                <div class="input_title">{{ LangUtil("请再次输入") }}{{ tableColumns[dialogData.filed].name }}</div>
                <el-input class="dialog_input" v-model="dialogData.filedValue1"></el-input>
            </template>
            <!--密码 end-->

            <div class="confirm">
                <el-button class="item" type="primary" @click="handlerSubmit"> {{ LangUtil("确认保存") }} </el-button>
            </div>
            <div slot="footer" class="dialog-footer"></div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabUserInfoProxy from "../proxy/TabUserInfoProxy";
import { checkMail, checkPhone } from "@/core/global/Functions";
import { Message } from "element-ui";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class EditDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabUserInfoProxy = getProxy(TabUserInfoProxy);
    tableColumns: any = this.myProxy.tableColumns;
    dialogData = this.myProxy.dialogData;
    userInfo = this.myProxy.userInfo;

    handlerSubmit() {
        const filed = this.dialogData.filed;
        const filedValue = this.dialogData.filedValue;

        if (filed == "phone" && !checkPhone(filedValue)) {
            Message.error(this.LangUtil("请输入正确的") + `${this.tableColumns[filed].name}`);
        } else if (filed == "email" && !checkMail(filedValue)) {
            Message.error(this.LangUtil("请输入正确的") + `${this.tableColumns[filed].name}`);
        } else if (filed == "password" && !this.checkUserPassword(filedValue)) {
            Message.error(
                this.LangUtil("请输入正确的") +
                    `${this.tableColumns[filed].name}` +
                    this.LangUtil("，长度6～20的字母数字组合")
            );
        } else if (filed == "password" && filedValue != this.dialogData.filedValue1) {
            const str: any = this.LangUtil("两次密码输入不一致");
            Message.error(str);
        } else if ((filed == "base_win" || filed == "base_water") && !this.checkBaseInput(filedValue)) {
            const str: any = `${this.LangUtil("请输入正确的")}${this.tableColumns[filed].name}${this.LangUtil(
                "，必须是大于0的数字"
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
    checkUserPassword(value: string): boolean {
        const Regx = /^[A-Za-z0-9]*$/;
        return value.length >= 6 && value.length <= 20 && Regx.test(value);
    }

    checkBaseInput(value: string): boolean {
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
    width: 500px;
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
