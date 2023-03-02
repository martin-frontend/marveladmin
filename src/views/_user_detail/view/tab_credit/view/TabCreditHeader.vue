<template>
    <div>
        <div v-loading="net_status.loading">
            <el-form ref="form" label-position="right" label-width="120px" :model="userInfo">
                <el-form-item size="mini" :label="tableColumns['is_credit_user'].options[1]" prop="is_credit_user">
                    <el-switch
                        @change="onSwitchCreditUser"
                        v-model="userInfo.is_credit_user"
                        :active-value="1"
                        :inactive-value="98"
                    ></el-switch>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('信用类型')" prop="show_credit_set">
                    <!-- <el-switch
                        @change="onSwitchCreditSet()"
                        v-model="userInfo.show_credit_set"
                        :active-value="1"
                        :inactive-value="98"
                    ></el-switch> -->
                    <el-radio-group @input="onSwitchCreditSet()" v-model="userInfo.show_credit_set">
                        <el-radio :label="1">{{ LangUtil("信用代理") }}</el-radio>
                        <el-radio :label="98">{{ LangUtil("信用玩家") }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- <el-form-item
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
                </el-form-item> -->

                <el-form-item size="mini" :label="tableColumns['credit_rate_min'].name" prop="credit_rate_min">
                    <el-input disabled v-model="userInfo.credit_rate_min" style="width: 100px"></el-input>%
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('credit_rate_min')"
                        style="margin-left: 20px"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['credit_rate_max'].name" prop="credit_rate_max">
                    <el-input disabled v-model="userInfo.credit_rate_max" style="width: 100px"></el-input>%
                    <el-button
                        class="item"
                        type="primary"
                        @click="handlerEdit('credit_rate_max')"
                        style="margin-left: 20px"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['show_credit_report'].name" prop="show_credit_report">
                    <el-switch
                        @change="onSwitchCreditReport()"
                        v-model="userInfo.show_credit_report"
                        :active-value="1"
                        :inactive-value="98"
                    ></el-switch>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCreditProxy from "../proxy/TabCreditProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import { Message } from "element-ui";

@Component({
    filters: {
        remarkFilter(remark: string) {
            if (remark == "") {
                return "-";
            }
            return remark;
        },
    },
})
export default class TabCreditHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabCreditProxy = getProxy(TabCreditProxy);
    tableColumns = this.myProxy.tableColumns;
    userInfo = this.myProxy.userInfo;
    relationChain = this.myProxy.relationChain;

    handlerEdit(filed: string) {
        this.myProxy.showDialog(filed);
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

    onSwitchCreditUser(val: any) {
        if ((this.userInfo.credit_rate_max == 0 || this.userInfo.credit_rate_max == 0) && val == "1") {
            Message.error(LangUtil("信用占成不能为0"));
            this.userInfo.is_credit_user = "98";
            return;
        }

        if (this.userInfo.credit_rate_max < this.userInfo.credit_rate_min) {
            Message.error(LangUtil("最小占比不能大于最大占比"));
            this.userInfo.is_credit_user = "98";
            return;
        }
        this.myProxy.dialogData.filed = "is_credit_user";
        this.myProxy.onEdit("is_credit_user", this.userInfo.is_credit_user);
        console.log(">>>>>>>>切换信用用户<<", this.userInfo.is_credit_user);
    }

    destroyed() {
        super.destroyed();
    }

    get isChannelPlatUser() {
        return (
            this.$route.path == "/layout/channel_plat_user" ||
            this.$route.path == "/layout/plat_agent_manage_bind" ||
            this.$route.path == "/layout/plat_agent_manage"
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
</style>
