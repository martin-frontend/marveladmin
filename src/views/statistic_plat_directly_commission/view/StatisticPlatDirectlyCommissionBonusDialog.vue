<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogBonusData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="LangUtil('邮件标题')" prop="title">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        maxlength="30"
                        filterable
                        clearable
                        show-word-limit
                        :placeholder="LangUtil('邮件标题')"
                        v-model="form.title"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('title')"
                        >翻译</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item :label="LangUtil('邮件内容')" prop="content">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        maxlength="300"
                        :rows="5"
                        filterable
                        clearable
                        show-word-limit
                        class="select"
                        :placeholder="LangUtil('邮件内容')"
                        v-model="form.content"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('content')"
                        >翻译</el-button
                    >
                </div>
            </el-form-item>

            <!-- 邮件分类 -->
            <el-form-item size="mini" :label="LangUtil('邮件分类')" prop="cate">
                <el-radio-group v-model="form.cate" :disabled="isStatusUpdate">
                    <el-radio key="1" label="1">{{ tableColumns.cate.options[1] }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 邮件类型 -->
            <el-form-item size="mini" :label="LangUtil('邮件类型')" prop="type">
                <el-radio-group v-model="form.type" :disabled="isStatusUpdate">
                    <el-radio v-for="(value, key) in tableColumns.type.options" :key="key" :label="key">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
                <div class="mark_font">{{ form.type | emailTypeDesc }}</div>
            </el-form-item>

            <!-- 发送用户 -->
            <template>
                <el-form-item size="mini" :label="LangUtil('发送用户')" prop="user_id">
                    <el-input style="width: 120px;" v-model="form.user_id" :disabled="isStatusUpdate"></el-input>
                </el-form-item>
            </template>

            <!-- 提现流水倍数 -->
            <el-form-item size="mini" :label="LangUtil('提现流水倍数')">
                <div class="withdraw_rate">
                    <el-input
                        style="width: 120px; margin-right: 8pxrem"
                        type="number"
                        step="0.1"
                        min="0"
                        v-model="form.bonus_multiple"
                        @keydown.native="inputOnlyPositive"
                    ></el-input>
                    <span class="mark_font">
                        {{
                            LangUtil("附件奖励为金币的时候有作用, 该笔金币奖励满足: 提领流水倍数X奖励金币数量才可提现")
                        }}
                    </span>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('奖励币种')">
                <el-select style="margin-right: 8px; width: 120px" v-model="form.coin_type" filterable>
                    <el-option
                        v-for="(key, value) in detailTableColumns.coin_name_unique.options[form.plat_id]"
                        :key="value"
                        :label="key"
                        :value="value"
                    >
                    </el-option> </el-select
            ></el-form-item>
            <el-form-item size="mini" :label="LangUtil('奖励金额')">
                <el-input
                    min="0"
                    step="1"
                    style="width: 120px"
                    type="number"
                    v-model="form.amount"
                    @keydown.native="inputOnlyPositive"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <div class="submit">
                    <el-button @click="handleAdd" type="primary">{{ LangUtil("发送邮件") }}</el-button>
                    <div class="mark_font" style="margin-top: 0.5rem">
                        {{ LangUtil("默认: 邮件发送日起 30日后失效") }}
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { inputOnlyPositive } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component({
    filters: {
        // 邮件类型描述
        emailTypeDesc(type: any) {
            const typeMap: any = {
                1: LangUtil("在时间范围内，无论新老用户都能领取该邮件"),
                2: LangUtil("只有发送时间以前的用户才能领取邮件"),
                3: LangUtil("指定用户获得邮件"),
            };
            return typeMap[type];
        },
    },
})
export default class StatisticPlatDirectlyCommissionBonusDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    detailTableColumns = this.myProxy.detailTableData.columns;
    form = this.myProxy.dialogBonusData.form;
    LangUtil = LangUtil;
    inputOnlyPositive = inputOnlyPositive;
    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogBonusData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogBonusData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            title: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            content: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            cate: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAddBonus();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    handleTranslate(source: string) {
        const data: any = {};
        // data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_EMAIL;
        data.plat_id = this.form.plat_id;
        //@ts-ignore
        data.sentence = this.form[source] || source;
        data.refForm = this.form;
        data.useKey = source;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.mark_font {
    color: red;
}
</style>
