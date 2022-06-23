<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="750px" top="20px">
        <el-scrollbar style="height: 700px">
            <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
                <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                    <el-select
                        v-model="form.plat_id"
                        filterable
                        :placeholder="$t('common.pleaseChoose')"
                        :disabled="isStatusUpdate"
                        @change="onPlatChange"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.plat_id.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="tableColumns['activity_name'].name" prop="activity_name">
                    <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            :placeholder="$t('common.pleaseEnter')"
                            v-model="form.activity_name"
                        ></el-input>
                        <el-button
                            style="max-height: 35px"
                            type="primary"
                            size="mini"
                            @click="handleTranslate(form.activity_name)"
                            >翻译</el-button
                        >
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="$t('plat_activity.eventTemplate')">
                    <div class="d-flex">
                        <el-select
                            v-model="form.type"
                            filterable
                            :placeholder="$t('common.pleaseChoose')"
                            :disabled="isStatusUpdate"
                            @change="onTypeChange"
                            class="model"
                        >
                            <el-option :label="$t('plat_activity.customize')" value="2"></el-option>
                            <el-option :label="$t('plat_activity.template')" value="1"></el-option>
                        </el-select>
                        <el-select
                            v-model="form.model_id"
                            filterable
                            :placeholder="$t('plat_activity.selectTemplate')"
                            v-if="form.type == 1"
                            @change="onModelIdChange"
                            :disabled="isStatusUpdate"
                        >
                            <el-option
                                v-for="(value, key) in activityModelList"
                                :key="key"
                                :label="value.activity_name"
                                :value="Number(value.id)"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="$t('common.templateDesc')"
                    prop="des"
                    v-if="form.type == 1 && form.model_id"
                >
                    <div>{{ form.des }}</div>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['start_time'].name" prop="start_time">
                    <el-date-picker
                        v-model="form.start_time"
                        type="date"
                        align="right"
                        :placeholder="$t('component.startFrom')"
                        value-format="yyyy-MM-dd"
                        :disabled="isStatusUpdate"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['end_time'].name" prop="end_time">
                    <el-date-picker
                        v-model="form.end_time"
                        type="date"
                        align="right"
                        :placeholder="$t('component.endTo')"
                        value-format="yyyy-MM-dd"
                        :disabled="isStatusUpdate"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['is_preheat'].name"
                    prop="is_preheat"
                    v-if="form.show_type == 2 || form.show_type == 4"
                >
                    <el-radio-group v-model="form.is_preheat" :disabled="isStatusUpdate">
                        <el-radio
                            v-for="(value, key) in tableColumns['is_preheat'].options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['model_open_mode'].name" prop="model_open_mode">
                    <el-select v-model="form.model_open_mode" filterable :placeholder="$t('common.pleaseChoose')">
                        <el-option
                            v-for="(value, key) in tableColumns['model_open_mode'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" v-if="isCustom" :label="tableColumns['open_mode_url'].name">
                    <el-input
                        v-model="form.open_mode_url"
                        :placeholder="$t('common.pleaseEnter')"
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['activity_category'].name">
                    <el-input
                        v-model="form.activity_category"
                        :placeholder="$t('common.pleaseEnter')"
                        maxlength="30"
                        show-word-limit
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['award_type'].name"
                    prop="award_type"
                    v-if="form.type == 1 && (form.settlement_type == 1 || form.settlement_type == 2)"
                >
                    <el-radio-group v-model="form.award_type" disabled v-if="isStatusUpdate">
                        <el-radio
                            v-for="(value, key) in tableColumns['award_type'].options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ tableColumns["award_type"].options[key] }}
                        </el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="form.award_type" v-else>
                        <el-radio v-for="(item, index) in form.award_types" :key="index" :label="item">
                            {{ tableColumns["award_type"].options[item] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['bonus_multiple'].name"
                    prop="bonus_multiple"
                    v-if="form.type == 1"
                >
                    <el-input
                        v-model="form.bonus_multiple"
                        :placeholder="$t('common.pleaseEnter')"
                        :disabled="isStatusUpdate"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="!form.model_id"
                >
                    <el-radio-group v-model="form.show_type" @change="showTypeChange">
                        <el-radio
                            v-for="(value, key) in spliceShowTypes(tableColumns['show_type'].options)"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="!isStatusUpdate && form.model_id"
                >
                    <el-radio-group v-model="form.show_type" @change="showTypeChange">
                        <el-radio v-for="(value, key) in form.show_types" :key="key" :label="Number(value)">
                            {{ tableColumns["show_type"].options[value] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="isStatusUpdate && form.model_id"
                >
                    <el-radio-group v-model="form.show_type" @change="showTypeChange">
                        <el-radio
                            v-for="(item, index) in getShowTypes(form.model_id)"
                            :key="index"
                            :label="Number(item)"
                        >
                            {{ tableColumns["show_type"].options[item] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item size="mini" :label="$t('common.uploadImage')" v-if="form.show_type == 4" prop="link_url">
                    <div style="display: flex">
                        <el-upload
                            action="#"
                            list-type="picture-card"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :multiple="false"
                            :show-file-list="false"
                            ref="upload"
                            v-if="!myProxy.dialogData.fileList[0].url"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="upload-box" @mouseover="showMask = true" @mouseleave="showMask = false" v-else>
                            <div class="mask" v-show="showMask">
                                <div class="icon-bar">
                                    <i class="el-icon-delete" @click="handleRemove"></i>
                                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview"></i>
                                </div>
                            </div>

                            <img :src="formatImageUrl(myProxy.dialogData.fileList[0].url)" />
                        </div>
                        <el-button
                            style="max-height: 35px; margin-left: 10px"
                            type="primary"
                            size="mini"
                            @click="handleLangImg()"
                            >多语言图片</el-button
                        >
                    </div>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['link_url'].name"
                    prop="link_url"
                    v-if="form.show_type == 2"
                >
                    <el-input v-model="form.link_url" :placeholder="$t('common.pleaseEnter')"></el-input>
                </el-form-item>
            </el-form>
            <!-- 奖励规则 -->
            <div v-if="form.type == 1 && form.model_id" class="_title">
                {{ $t("plat_activity.rule") }}
            </div>
            <div v-if="form.type == 1" style="bordertop: 2px solid #dddddd">
                <div
                    class="rules-item"
                    v-for="(item, index) in form.rules"
                    :key="index"
                    style="color: #666666; font-size: 14px; font-weight: bold"
                >
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="2">
                            <div>{{ $t("common.id") }}: {{ item.rule_num }}</div>
                        </el-col>
                        <el-col :span="10">
                            <div>{{ item.name }}</div>
                        </el-col>
                    </el-row>
                    <div class="rule-list" v-for="(rule, secondIndex) in item.list" :key="secondIndex">
                        <el-row type="flex" justify="start" align="middle" :gutter="24">
                            <el-col :span="3">
                                <div>{{ $t("common.id") }}: {{ secondIndex + 1 }}</div>
                            </el-col>
                            <el-col :span="10">
                                <div>{{ rule.name }}</div>
                            </el-col>
                        </el-row>
                        <div class="child-rule-list" v-for="(childRule, thirdIndex) in rule.list" :key="thirdIndex">
                            <el-row type="flex" justify="start" align="middle" :gutter="24">
                                <el-col :span="4">
                                    <div>{{ typeOptions[childRule.type] }}</div>
                                </el-col>
                                <el-col :span="5">
                                    <div>{{ getRuleInfo(childRule).params_name }}</div>
                                </el-col>
                                <el-col :span="15">
                                    <el-input
                                        size="small"
                                        v-if="childRule.params_type == '1'"
                                        v-model="childRule.params"
                                        :placeholder="$t('common.pleaseEnter')"
                                        :disabled="isStatusUpdate"
                                        style="width: 80px"
                                    ></el-input>
                                    <el-select
                                        size="small"
                                        v-if="childRule.type == 61 && childRule.params_type == 5"
                                        v-model="childRule.coin_type"
                                        filterable
                                        :placeholder="$t('common.pleaseChoose')"
                                        :disabled="isStatusUpdate"
                                        style="margin-right: 5px"
                                    >
                                        <el-option
                                            v-for="(value, key) in tableColumns.reward_coin.options[form.plat_id]"
                                            :key="key"
                                            :label="value"
                                            :value="key"
                                        ></el-option>
                                    </el-select>
                                    <el-input-number
                                        size="small"
                                        v-if="childRule.type == 61 && childRule.params_type == 5"
                                        v-model="childRule.coin_amount"
                                        :placeholder="$t('common.pleaseEnter')"
                                        :disabled="isStatusUpdate"
                                        :min="0"
                                        :step="1"
                                        controls-position="right"
                                    ></el-input-number>
                                    <el-radio-group
                                        v-model="childRule.params"
                                        v-if="childRule.params_type == '2'"
                                        :disabled="isStatusUpdate"
                                    >
                                        <el-radio v-for="(value, key) in boolOptions" :key="key" :label="Number(key)">
                                            {{ value }}
                                        </el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="start" align="middle" :gutter="24">
                                <el-col :span="4"> </el-col>
                                <el-col :span="20" style="color: red">
                                    {{ getRuleInfo(childRule).desc }}
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <div slot="footer" class="dialog-footer">
            <el-button
                type="danger"
                size="mini"
                @click="handleCloseActive"
                v-if="isStatusUpdate && checkUnique(unique.plat_activity_close)"
            >
                {{ $t("common.close") }}
            </el-button>
            <el-button
                type="primary"
                size="mini"
                @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                v-if="checkUnique(unique.plat_activity_update)"
                >{{ buttonText }}</el-button
            >
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityProxy from "@/views/plat_activity/proxy/PlatActivityProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, formatImageUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import { Message } from "element-ui";
import CommonLangImgProxy from "@/views/lang_img_dialog/proxy/CommonLangImgProxy";

@Component
export default class PlatActivityDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    private langImgProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    private typeOptions: any = {
        "1": this.$t("common.condition"),
        "21": this.$t("common.consume"),
        "61": this.$t("common.reward"),
        "71": this.$t("common.probabilityPot"),
    };

    get buttonText() {
        return this.isStatusUpdate ? this.$t("common.save") : this.$t("common.create");
    }

    // private paramsTypeOptions: any = {
    //     "1": "数值",
    //     "2": "布尔值",
    // };

    private boolOptions: any = {
        0: this.$t("common.no"),
        1: this.$t("common.yes"),
    };

    // private runTypeOptions: any = {
    //     1: "多次结算",
    //     2: "单次次结算",
    // };

    private dialogStatus = DialogStatus;
    private formatImageUrl = formatImageUrl;

    private showMask = false;
    private dialogImageUrl = "";
    private dialogVisible = false;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    @Watch("myProxy.dialogData.update")
    private onWatchUpdate() {
        this.$nextTick(() => {
            this.$forceUpdate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get isCustom() {
        return this.form.type === "2";
    }

    // 活动模板 下拉选单
    get activityModelList() {
        console.log("活动模板 下拉选单");
        return this.myProxy.activeModelData.options;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            activity_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            is_preheat: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            start_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            end_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            model_open_mode: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            settlement_type: [{ required: false }],
            award_type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            bonus_multiple: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            model_id: [{ required: false }],
            link_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            show_type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            rules: [{ required: false, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private handleCloseActive() {
        this.myProxy.onCloseActive();
    }
    //图片相关---
    handleChange(file: any) {
        const data = {
            type: 2,
            file: file.raw,
        };
        this.myProxy.uploadImage(data);
    }

    handleRemove(file: any) {
        this.myProxy.dialogData.form.link_url = "";
        this.myProxy.dialogData.fileList = [{ rul: "" }];
        this.showMask = false;
    }
    handlePictureCardPreview() {
        GlobalVar.preview_image.url = this.myProxy.dialogData.fileList[0].url;
    }
    //---图片相关

    onPlatChange(id: any) {
        const data: any = {
            page_count: 1,
            page_size: 3000,
            plat_id: id,
        };
        this.myProxy.getActivityModel(data);
    }

    onTypeChange(type: any) {
        this.$nextTick(() => {
            (this.$refs["form"] as any & { clearValidate: () => void }).clearValidate();
        });
        if (type == 2) {
            this.myProxy.resetDialogForm();
        } else {
            this.myProxy.dialogData.form.show_type = 2;
        }
    }

    onModelIdChange(id: any) {
        this.myProxy.getModelDetail(id);
    }

    showTypeChange() {
        this.form.link_url = "";
        (this.$refs["form"] as any & { clearValidate: () => void }).clearValidate();
    }

    spliceShowTypes(showTypes: any) {
        if (!showTypes) return "";
        return {
            2: showTypes[2],
            4: showTypes[4],
        };
    }

    getRuleInfo(rule: any) {
        let result: any = [];
        result = this.myProxy.activeModelData.ruleList.filter((item: any) => parseInt(rule.rule_id) === item.id);
        return result.length > 0 ? result[0] : "";
    }

    getShowTypes(model_id: any) {
        const model: any = this.activityModelList.find((item: any) => item.id == model_id);
        if (model && model.show_types) {
            return model.show_types;
        }
        return "";
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_ACTIVITY;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }

    handleLangImg() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.link_url;
        if (!data.key) {
            Message.warning("请先上传默认图片");
            return;
        }
        this.langImgProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.d-flex {
    display: flex;
    .model {
        width: 110px;
    }
}
.rules-item {
    margin-left: 12px;
    margin-top: 24px;
    border: 1px solid #f08080;
    padding: 12px;
    padding-bottom: 0;
    .rule-list {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #ddd;
        .child-rule-list {
            margin: 16px 0;
            padding: 10px;
            border: 1px solid #ddd;
        }
    }
}
.dialog-footer {
    // display: flex;
    justify-content: space-between;
    text-align: right;
    &.plat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.upload-box {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
        .icon-bar {
            display: flex;
            justify-content: space-around;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            i {
                color: #fff;
                font-size: 20px;
            }
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
._title {
    color: #666666;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 14px;
    margin-left: 12px;
    margin-top: 48px;
}
</style>
