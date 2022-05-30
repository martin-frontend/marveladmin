<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <template v-if="readonly">
                    {{ tableColumns.plat_id.options[form.plat_id] }}
                </template>
                <template v-else>
                    <el-select
                        v-model="form.plat_id"
                        filterable
                        class="select"
                        :placeholder="$t('common.pleaseChoose')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.plat_id.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </template>
            </el-form-item>

            <el-form-item :label="`${tableColumns.title.name}`" prop="title">
                <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            maxlength="30"
                            filterable
                            clearable
                            show-word-limit
                            :readonly="readonly"
                            :placeholder="`${tableColumns.title.name}`"
                            v-model="form.title"
                        ></el-input>
                        <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.title)">翻译</el-button>
                    </div>
            </el-form-item>

            <el-form-item :label="`${tableColumns.content.name}`" prop="content">
                <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            maxlength="300"
                            :rows="5"
                            filterable
                            clearable
                            show-word-limit
                            :readonly="readonly"
                            class="select"
                            :placeholder="`${tableColumns.content.name}`"
                            v-model="form.content"
                        ></el-input>
                        <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.content)">翻译</el-button>
                    </div>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.cate.name" prop="cate">
                <template v-if="readonly">{{ tableColumns.cate.options[form.cate] }} </template>
                <template v-else>
                    <el-radio-group v-model="form.cate">
                        <el-radio key="1" label="1">{{ tableColumns.cate.options[1] }}</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.type.name" prop="type">
                <template v-if="readonly">
                    {{ tableColumns.type.options[form.type] }}
                </template>
                <template v-else>
                    <el-radio-group v-model="form.type">
                        <el-radio v-for="(value, key) in tableColumns.type.options" :key="key" :label="key">{{
                            value
                        }}</el-radio>
                    </el-radio-group>
                    <div class="mark_font">{{ form.type | emailTypeDesc }}</div>
                </template>
            </el-form-item>
            <el-form-item
                v-if="isGroupMail && readonly"
                size="mini"
                :label="tableColumns.receive_users.name"
                prop="type"
            >
                {{ form.receive_users }}
            </el-form-item>
            <template v-if="isGroupMail && !readonly">
                <el-form-item size="mini" :label="$t('plat_email.sendUser')" prop="user_list">
                    <div class="send_users">
                        <el-input
                            size="medium"
                            filterable
                            clearable
                            :placeholder="$t('plat_email.requireInput')"
                            v-model.trim="form.user_list"
                            oninput="value=value.replace(/[^\d,]/g,'')"
                            style="margin-right: 0.8rem"
                        ></el-input>
                        <input
                            v-show="false"
                            ref="excel-upload-input"
                            class="excel-upload-input"
                            type="file"
                            accept=".xlsx, .xls"
                            @change="handleClick"
                        />

                        <el-button @click="onImportUser()" type="primary" icon="">{{ $t("plat_email.importUser") }}</el-button>
                        <el-button @click="onLoadModule()" type="primary" icon="">{{ $t("plat_email.downloadModule") }}</el-button>
                    </div>
                    <div class="mark_font">{{ $t("plat_email.userRule") }}</div>
                </el-form-item>
            </template>
            <template v-if="!readonly">
                <el-form-item size="mini" :label="tableColumns.attachment_content.name" class="additional-bonus">
                    <el-button @click="onAddBonus()" type="success">{{ $t("plat_email.addReward") }}</el-button>
                    <span class="mark_font">{{ $t("plat_email.atMost") }}</span>
                </el-form-item>
            </template>
            <el-form-item
                size="mini"
                :label="tableColumns.bonus_multiple.name"
                v-if="hasAttachmentContent || (readonly && hasAttachmentContent)"
            >
                <div class="withdraw_rate">
                    <template v-if="readonly">
                        {{ form.bonus_multiple }}
                    </template>
                    <template v-else>
                        <el-input
                            style="width: 90px; margin-right: 8pxrem"
                            type="number"
                            step="0.1"
                            min="0"
                            v-model="form.bonus_multiple"
                            @keydown.native="inputOnlyPositive"
                        ></el-input>
                        <div class="mark_font">
                            {{ $t("plat_email.attachDesc") }}
                        </div>
                    </template>
                </div>
            </el-form-item>
            <el-form-item size="mini" v-for="(item, index) in form.attachment_content" :key="index">
                <template v-if="readonly">
                    {{ index }}：{{ item }}
                </template>
                <template v-if="!readonly">
                    <el-button style="margin-right: 8px" size="mini" @click="onDeleteBonus(item)" type="primary" icon=""
                        >{{ $t("common.delete") }}</el-button
                    >
                    <el-select
                        style="margin-right: 8px; width: 120px"
                        v-model="item.type"
                        filterable
                        :placeholder="tableColumns.attachment_content.options[form.plat_id]"
                    >
                        <el-option
                            v-for="(key, value) in tableColumns.attachment_content.options[form.plat_id]"
                            :key="value"
                            :label="key"
                            :value="value"
                        ></el-option>
                    </el-select>
                    <el-input
                        min="0"
                        step="1"
                        style="width: 80px"
                        type="number"
                        v-model="item.amount"
                        @keydown.native="inputOnlyPositive"
                    ></el-input>
                </template>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <div class="delete">
                    <el-button v-if="readonly && this.form.status != 99" @click="handleDelete()" type="danger" icon=""
                        >{{ $t("plat_email.revodeEmail") }}</el-button
                    >
                </div>
                <div class="submit">
                    <div style="">
                        <el-button v-if="!readonly" @click="handleAdd()" type="primary" icon="">{{ $t("plat_email.submitEmail") }}</el-button>
                    </div>
                    <div v-if="!readonly" class="mark_font" style="margin-top: 0.5rem">
                        {{ $t("plat_email.emailDesc") }}
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <AlertDialog v-if="myProxy.alertDialogData.bShow" />
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatEmailProxy from "@/views/plat_email/proxy/PlatEmailProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import {
    inputOnlyPositive,
    checkUserName,
    checkUserPassword,
    dateFormat,
    removeRepeatStr,
} from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { BonusType } from "../proxy/IPlatEmailProxy";
import { readerData } from "@/core/global/Excel";
import { BaseInfo } from "@/components/vo/commonVo";
import AlertDialog from "./components/AlertDialog.vue";
import i18n from "@/lang";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component({
    components: { AlertDialog },
    filters: {
        // 邮件类型描述
        emailTypeDesc(type: any) {
            const typeMap: any = {
                1: i18n.t("plat_email.emailTypeDesc1"),
                2: i18n.t("plat_email.emailTypeDesc2"),
                3: i18n.t("plat_email.emailTypeDesc3"),
            };
            return typeMap[type];
        },
    },
})
export default class PlatEmailDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    private readonly = this.myProxy.dialogData.readonly;
    // Global Function
    private inputOnlyPositive = inputOnlyPositive;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }
    get isGroupMail() {
        return this.myProxy.isGroupMail;
    }
    get hasAttachmentContent() {
        return this.form.attachment_content.length != 0;
    }
    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            title: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            content: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            cate: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            user_list: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            let atMostUser:any = this.$t("plat_email.atMostUser")
            let emailConfirm:any = this.$t("plat_email.emailConfirm")
            let prompt:any = this.$t("common.prompt")
            let determine:any = this.$t("common.determine")
            let cancel:any = this.$t("common.cancel")
            if (valid) {
                let userCount: number = this.myProxy.dialogData.form.user_list.split(",").length;
                if (userCount > 1000) {
                    this.$message.warning(atMostUser );
                    return;
                }
                this.$confirm(emailConfirm, prompt, {
                    confirmButtonText: determine,
                    cancelButtonText: cancel,
                    type: "warning",
                })
                    .then(() => {
                        this.myProxy.onAdd();
                    })
                    .catch(() => {});
            }
        });
    }

    private handleDelete() {
        this.myProxy.onDelete(this.form.content_id);
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let userList = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.userid.name, ",");
        this.form.user_list = userList;
    }
    // 汇入用户excel
    private onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }
    // 载入模组
    private onLoadModule() {
        let emailTemplate:any = this.$t("plat_email.emailTemplate")
        new BaseInfo.ExportExcel(`【` + emailTemplate + `】${this.curTime}`, [], this.myProxy.dialogData.excelColumnInfo, [], []);
    }
    // 添加奖励
    onAddBonus() {
        if (this.myProxy.dialogData.form.attachment_content.length >= 5) {
            return;
        }
        this.myProxy.dialogData.form.attachment_content.push({
            type: " ",
            amount: 0,
        });
    }
    // 删除奖励
    onDeleteBonus(obj: any) {
        this.form.attachment_content = this.form.attachment_content.filter((item: any) => item !== obj);
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_EMAIL;
        this.langProxy.showDialog(data);
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
