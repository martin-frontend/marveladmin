<template>
    <div class="content plat_user">
        <el-dialog width="700px" :title="LangUtil(textMap[status])" :visible.sync="myProxy.addMutipleUserData.bShow">
            <el-form :rules="rules" ref="form" :model="form" label-width="80px" v-loading="net_status.loading">
                <SearchSelect
                    :title="tableColumns.plat_id.name"
                    :options="tableColumns.plat_id.options"
                    :width="'100%'"
                    v-model="form.plat_id"
                    @change="changePlat()"
                    :clearable="false"
                    :disabled="!isCanEdit"
                />
                <SearchSelect
                    :title="tableColumns.channel_id.name"
                    :options="tableColumns.channel_id.options[form.plat_id]"
                    v-model="form.channel_id"
                    :isUseKey="true"
                    :disabled="!isCanEdit"
                />
                <!-- 新增模式 -->
                <template v-if="isCanEdit">
                    <el-form-item :label="tableColumns.username.name" prop="usernames">
                        <div class="send_users">
                            <el-input
                                size="medium"
                                filterable
                                clearable
                                :placeholder="LangUtil('请输入单个或多个用户')"
                                v-model.trim="form.usernames"
                                style="margin-right: 0.8rem"
                                :rows="3"
                            ></el-input>
                            <input
                                v-show="false"
                                ref="excel-upload-input"
                                class="excel-upload-input"
                                type="file"
                                accept=".xlsx, .xls"
                                @change="handleClick"
                            />

                            <!-- <el-button @click="onImportUser" type="primary" icon="">{{ LangUtil("导入用户") }}</el-button>
                        <el-button @click="onLoadModule" type="primary" icon="">{{
                            LangUtil("下载导入模版")
                        }}</el-button> -->
                        </div>
                        <div class="mark_font">{{ LangUtil("用户ID, 多个用户使用英文逗号", "区分") }}</div>
                    </el-form-item>

                    <el-form-item size="mini" :label="tableColumns.password.name" prop="passwords">
                        <div class="send_users">
                            <el-input
                                size="medium"
                                filterable
                                clearable
                                :placeholder="LangUtil('请输入单个或多个用户')"
                                v-model.trim="form.passwords"
                                style="margin-right: 0.8rem"
                                :rows="3"
                            ></el-input>
                        </div>
                        <div class="mark_font">{{ LangUtil("用户ID, 多个用户使用英文逗号", "区分") }}</div>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="onImportUser" type="primary" icon="">{{ LangUtil("导入用户") }}</el-button>
                        <el-button @click="onLoadModule" type="primary" icon="">{{
                            LangUtil("下载导入模版")
                        }}</el-button>
                    </el-form-item>
                </template>
                <!-- 编辑模式 -->
                <template v-else>
                    <el-form-item :label="tableColumns.user_count.name">
                        <el-input v-model="form.user_count" :placeholder="LangUtil('请输入')" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="tableColumns.user_id.name">
                        <el-input v-model="form.user_id" :placeholder="LangUtil('请输入')" disabled></el-input>
                    </el-form-item>

                    <!-- <el-form-item size="mini" :label="tableColumns.username.name" prop="username">
                        <el-input
                            size="medium"
                            filterable
                            clearable
                            :placeholder="LangUtil('请输入单个或多个用户')"
                            v-model.trim="form.username"
                            style="margin-right: 0.8rem"
                            disabled
                            :rows="3"
                        ></el-input>
                    </el-form-item> -->
                </template>

                <el-form-item :label="tableColumns.remark.name" prop="remark">
                    <el-input v-model="form.remark" :placeholder="LangUtil('请输入')" oninput="value=value"></el-input>
                </el-form-item>
                <el-form-item v-if="!isCanEdit" :label="tableColumns.status.name">
                    <el-radio-group v-model="form.status">
                        <el-radio v-for="(item, key) of tableColumns.status.options" :key="key" :label="Number(key)">{{
                            item
                        }}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item class="dialog-footer">
                    <el-button type="primary" @click="handleAdd">{{ LangUtil("确定") }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

import SearchSelect from "@/components/SearchSelect.vue";
import { BaseInfo } from "@/components/vo/commonVo";
import { readerData } from "@/core/global/Excel";
import { removeRepeatStr } from "@/core/global/Functions";
import PlatUserProxy from "../proxy/PlatUserProxy";
import { DialogStatus } from "@/core/global/Constant";
@Component({
    components: {
        SearchSelect,
    },
})
export default class AddMultipleUserDialog extends AbstractView {
    LangUtil = LangUtil;
    net_status = GlobalVar.net_status;

    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    listQuery = this.myProxy.listQuery_mutiple;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    capsTooltip = false;
    dialogData = this.myProxy.addMutipleUserData;

    textMap = {
        update: "编辑",
        create: "新增",
    };

    get form() {
        return this.myProxy.addMutipleUserData.form;
    }

    get status() {
        return this.myProxy.addMutipleUserData.status;
    }

    get isCanEdit() {
        return this.status == DialogStatus.create;
    }
    checkCapslock(e: any) {
        const { key } = e;
        this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    }
    rules = {
        username: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
        password: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
    };

    handleAdd() {
        if (this.isCanEdit) {
            (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
                if (valid) {
                    this.myProxy.onAddCreditUser_multiple();
                }
            });
        } else {
            this.myProxy.onUpdate_multiple();
        }
    }
    //更换平台切换对应渠道
    changePlat() {
        this.form.channel_id = "";
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        console.log(" 导入的 结果 为---", excel);

        const userList = removeRepeatStr(
            excel.results,
            this.myProxy.addMutipleUserData.excelColumnInfo.username.name,
            ","
        );
        this.form.usernames = userList;

        const password_list = removeRepeatStr(
            excel.results,
            this.myProxy.addMutipleUserData.excelColumnInfo.password.name,
            ","
        );
        this.form.passwords = password_list;
    }
    // 汇入用户excel
    onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }
    // 载入模组
    onLoadModule() {
        let emailTemplate: any = this.LangUtil("导入模版");
        new BaseInfo.ExportExcel(
            `【` + emailTemplate + `】`,
            [],
            this.myProxy.addMutipleUserData.excelColumnInfo,
            [],
            []
        );
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.mark_font {
    color: red;
    font-size: 0.5rem;
}
.withdraw_rate {
    display: flex;
    flex-direction: row;
}
.send_users {
    display: flex;
    flex-direction: row;
}
</style>
