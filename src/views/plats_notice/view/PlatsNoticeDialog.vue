<template>
    <el-dialog :title="textMap[status]" width="850px" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="140px" v-loading="net_status.loading">
            <!--  -->
            <el-form-item size="mini" :label="LangUtil('发布平台')" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    :placeholder="LangUtil('请选择')"
                    filterable
                    style="width: 300px"
                    @change="onChangePlatId"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['app_platform'].name" prop="app_platform">
                <el-checkbox-group v-model="form.app_platform" @change="onAppTypesChange">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['app_platform'].options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in tableColumns['languages'].options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item> -->

            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        :placeholder="LangUtil('请输入')"
                        v-model="form.name"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.name)">
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <div class="layout">
                <div style="position: relative;">
                    <el-form-item size="mini" :label="tableColumns['type_position'].name" prop="type_position">
                        <el-select
                            v-model="form.type_position"
                            :placeholder="LangUtil('请选择')"
                            filterable
                            style="width: 220px"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns['type_position'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <!-- 分类 -->
                    <el-form-item
                        size="mini"
                        :label="tableColumns['category'].name"
                        prop="category"
                        class="right_label"
                    >
                        <div class="flex d-flex">
                            <el-input
                                style="margin-right: 0.8rem"
                                v-model="form.category"
                                :placeholder="LangUtil('请输入')"
                            ></el-input>
                            <el-button
                                style="max-height: 35px"
                                type="primary"
                                size="mini"
                                @click="handleTranslate(form.category)"
                            >
                                <!-- 翻译 -->
                                {{ LangUtil("翻译") }}
                            </el-button>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item size="mini" :label="LangUtil('有效时间')" prop="time">
                <el-date-picker
                    v-model="form.time"
                    type="datetimerange"
                    :range-separator="to"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :start-placeholder="start"
                    :end-placeholder="end"
                    :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
                <!-- <el-date-picker
                    v-model="form.start_time"
                    type="datetime"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="LangUtil('请选择')"
                >
                </el-date-picker> -->
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns['end_time'].name" prop="end_time">
                <el-date-picker
                    v-model="form.end_time"
                    type="datetime"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="LangUtil('请选择')"
                >
                </el-date-picker>
            </el-form-item> -->
            <!-- 模块 -->
            <el-form-item size="mini" :label="tableColumns['open_mode'].name" prop="open_mode">
                <el-select v-model="form.open_mode" :placeholder="LangUtil('请选择')" filterable>
                    <el-option
                        v-for="(value, key) in tableColumns['open_mode'].options"
                        :key="key"
                        :value="key"
                        :label="value"
                    >
                    </el-option>
                </el-select>
                <el-checkbox v-model="form.isNeedOtherParam" style="margin-left: 10px;">
                    {{ LangUtil("是否需要额外参数") }}
                </el-checkbox>
            </el-form-item>
            <!-- 转跳 -->
            <el-form-item size="mini" :label="tableColumns['open_mode_url'].name">
                <el-select v-model="form.open_mode_url" filterable :placeholder="LangUtil('跳转url')">
                    <el-option
                        v-for="(value, key) in openOptions"
                        :key="key"
                        :label="value.name"
                        :value="value.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="form.isNeedOtherParam" size="mini" :label="LangUtil('额外参数')" prop="other_param">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.other_param" />
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio v-for="(value, key) in tableColumns['type'].options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['content'].name" prop="content" v-if="form.type == 1">
                <div class="flex d-flex">
                    <!-- <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        rows="5"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.content"
                    ></el-input> -->
                    <TinymceUpload v-model="form.content" />
                    <!-- <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.content)"
                    >
                        {{ LangUtil("翻译") }}
                    </el-button> -->
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['img_uris'].name" prop="img_urls" v-if="form.type == 2">
                <el-tabs type="border-card" v-model="myProxy.appType">
                    <el-tab-pane
                        :label="tableColumns['app_platform'].options[item]"
                        :name="`${item}`"
                        v-for="item in form['app_platform']"
                        :key="item"
                    >
                        <div style="display: flex">
                            <el-upload
                                action="#"
                                list-type="picture-card"
                                :on-change="handleChange"
                                :auto-upload="false"
                                :multiple="false"
                                :show-file-list="false"
                                ref="upload"
                                v-if="!form.img_urls[myProxy.appType]"
                                class="upload"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <div
                                class="upload-box"
                                @mouseover="onMouseEnter"
                                @mouseleave="onMouseLeave"
                                v-if="form.img_urls[myProxy.appType]"
                            >
                                <div class="mask" v-show="showMask">
                                    <div class="icon-bar">
                                        <i class="el-icon-delete" @click="handleRemove"></i>
                                        <i class="el-icon-zoom-in" @click="handlePictureCardPreview"></i>
                                    </div>
                                </div>
                                <img :src="formatImageUrl(form.img_urls[myProxy.appType])" />
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-button
                    style="max-height: 35px; margin-top: 10px"
                    type="primary"
                    size="mini"
                    @click="handleLangImg()"
                >
                    <!-- 多语言图片 -->
                    {{ LangUtil("多语言图片") }}
                </el-button>
            </el-form-item>

            <el-form-item
                size="mini"
                :label="tableColumns['thumbnail_uris'].name"
                prop="thumbnail_urls"
                v-if="form.type == 2"
            >
                <el-tabs type="border-card" v-model="myProxy.appType">
                    <el-tab-pane
                        :label="tableColumns['app_platform'].options[item]"
                        :name="`${item}`"
                        v-for="item in form['app_platform']"
                        :key="item"
                    >
                        <div style="display: flex">
                            <el-upload
                                action="#"
                                list-type="picture-card"
                                :on-change="handleChange1"
                                :auto-upload="false"
                                :multiple="false"
                                :show-file-list="false"
                                ref="upload"
                                v-if="!form.thumbnail_urls[myProxy.appType]"
                                class="upload"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <div
                                class="upload-box"
                                @mouseover="onMouseEnter"
                                @mouseleave="onMouseLeave"
                                v-if="form.thumbnail_urls[myProxy.appType]"
                            >
                                <div class="mask" v-show="showMask">
                                    <div class="icon-bar">
                                        <i class="el-icon-delete" @click="handleRemove1"></i>
                                        <i class="el-icon-zoom-in" @click="handlePictureCardPreview1"></i>
                                    </div>
                                </div>
                                <img :src="formatImageUrl(form.thumbnail_urls[myProxy.appType])" />
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-button
                    style="max-height: 35px; margin-top: 10px"
                    type="primary"
                    size="mini"
                    @click="handleLangImg1()"
                >
                    <!-- 多语言图片 -->
                    {{ LangUtil("多语言图片") }}
                </el-button>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['video_uris'].name" prop="video_uris" v-if="form.type == 3">
                <el-input v-model="form.video_uris" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>

            <div v-if="form.type_position == 15" style="margin-bottom: 18px;">
                <div style="margin-bottom: 18px;">
                    <el-button
                        @click="myProxy.addCondition()"
                        size="mini"
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                    >
                        {{ LangUtil("条件") }}
                    </el-button>
                    <!-- <el-button
                        size="mini"
                        @click="addRelation()"
                        type="primary"
                        icon="el-icon-circle-plus-outline"
                        :disabled="myProxy.dialogData.addSwitch"
                    >
                        {{ LangUtil("关系") }}
                    </el-button> -->
                    <input
                        v-show="false"
                        ref="excel-upload-input"
                        class="excel-upload-input"
                        type="file"
                        accept=".xlsx, .xls"
                        @change="handleClick"
                    />
                    <el-button
                        size="mini"
                        type="primary"
                        style="margin-left: 10px;"
                        @click="onImportUser"
                        :disabled="!canImportChannelId"
                    >
                        {{ LangUtil("导入渠道ID") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="onLoadModule">
                        {{ LangUtil("下载渠道ID模版") }}
                    </el-button>
                </div>
                <div
                    class="rules_item"
                    v-for="(item, index) in form.condition"
                    :key="index"
                    style="margin-bottom: 5px;"
                >
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="4">
                            <el-button @click="deleteCondition(index)" size="mini" icon="el-icon-delete">
                                {{ LangUtil("刪除") }}
                            </el-button>
                        </el-col>
                        <el-col :span="8" class="vi_div">
                            <el-select
                                v-model="item.condition"
                                :placeholder="LangUtil('请选择')"
                                filterable
                                @change="myProxy.onChangeCondition()"
                            >
                                <el-option
                                    v-for="{ name, key, disabled } in newConditions"
                                    :key="key"
                                    :label="name"
                                    :value="key"
                                    :disabled="disabled"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_channel_id'">
                            <el-input
                                :placeholder="LangUtil('渠道ID, 多个渠道使用英文逗号')"
                                size="small"
                                v-model="item.channel_id"
                                oninput="value=value.replace(/[^\d,]/g,'')"
                            ></el-input>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_is_login'">
                            <el-radio-group v-model="item.isLogin">
                                <template v-for="(value, key) in tableColumns['condition_is_login'].options">
                                    <el-radio :key="key" :label="Number(key)" v-if="key != 0">
                                        {{ value }}
                                        <!-- <el-tooltip
                                            class="tip-item"
                                            effect="dark"
                                            :content="
                                                key == 1
                                                    ? LangUtil('表示未登录过新用户')
                                                    : LangUtil('已经登录过的老用户')
                                            "
                                            placement="top"
                                            v-if="key != 0"
                                            :key="value"
                                        >
                                            <i class="el-icon-question"></i>
                                        </el-tooltip> -->
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_is_first_login'">
                            <el-radio-group v-model="item.firstLogin">
                                <template v-for="(value, key) in tableColumns['condition_is_first_login'].options">
                                    <el-radio :key="key" :label="Number(key)" v-if="key != 0">
                                        {{ value }}
                                        <el-tooltip
                                            class="tip-item"
                                            effect="dark"
                                            :content="
                                                key == 1
                                                    ? LangUtil('表示未登录过新用户')
                                                    : LangUtil('已经登录过的老用户')
                                            "
                                            placement="top"
                                            v-if="key != 0"
                                            :key="value"
                                        >
                                            <i class="el-icon-question"></i>
                                        </el-tooltip>
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="8" class="vi_div" v-if="item.condition == 'condition_is_first_recharge'">
                            <el-radio-group v-model="item.firstRecharge">
                                <template v-for="(value, key) in tableColumns['condition_is_first_recharge'].options">
                                    <el-radio :key="key" :label="Number(key)" v-if="key != 0">
                                        {{ value }}
                                        <el-tooltip
                                            class="tip-item"
                                            effect="dark"
                                            :content="
                                                key == 1
                                                    ? LangUtil('已有首次充值的用户')
                                                    : LangUtil('未有首次充值的用户')
                                            "
                                            placement="top"
                                            v-if="key != 0"
                                            :key="value"
                                        >
                                            <i class="el-icon-question"></i>
                                        </el-tooltip>
                                    </el-radio>
                                </template>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="5" class="vi_div" v-if="item.condition == 'condition_balance'">
                            <el-select v-model="item.coin" :placeholder="LangUtil('请选择')" filterable>
                                <el-option
                                    v-for="(value, key) in tableColumns['condition_balance_options']"
                                    :key="key"
                                    :label="value"
                                    :value="value"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3" class="vi_div" v-if="item.condition == 'condition_balance'">
                            <el-select v-model="item.mark" :placeholder="LangUtil('请选择')" filterable disabled>
                                <el-option
                                    v-for="(value, key) in tableColumns['mark'].options"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" class="vi_div" v-if="item.condition == 'condition_balance'">
                            <el-input
                                size="small"
                                v-model="item.balance"
                                :placeholder="LangUtil('请输入')"
                                onkeyup="this.value=(this.value.match(/\d+(.\d{0,3})?/)||[''])[0]"
                            ></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-if="item.showRelation == 1">
                        <el-col :span="2">
                            <el-select v-model="item.relation" :placeholder="LangUtil('请选择')" filterable disabled>
                                <el-option
                                    v-for="(value, key) in tableColumns['relation'].options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                >
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    isStatusUpdate ? LangUtil("确认保存") : LangUtil("确认发布")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatsNoticeProxy from "@/views/plats_notice/proxy/PlatsNoticeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { formatImageUrl, removeRepeatStr } from "@/core/global/Functions";
import { ClientModuleUrl, DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import CommonLangImgProxy from "@/views/lang_img_dialog/proxy/CommonLangImgProxy";
import { Message } from "element-ui";
import TinymceUpload from "@/components/TinymceUpload/index.vue";
import { BaseInfo } from "@/components/vo/commonVo";
import { dateFormat } from "@/core/global/Functions";
import { readerData } from "@/core/global/Excel";
import JsonEditor from "@/components/JsonEditor/index.vue";
@Component({
    components: {
        TinymceUpload,
        JsonEditor,
    },
})
export default class PlatsNoticeDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    langImgProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    start: any = LangUtil("发布时间");
    end: any = LangUtil("结束时间");
    to: any = LangUtil("至");

    formatImageUrl = formatImageUrl;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };
    showMask = false;
    openOptions = ClientModuleUrl;
    mounted() {
        this.onChangePlatId();
    }

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }
    @Watch("myProxy.dialogData.form.isNeedOtherParam")
    onWatchOtherParam() {
        if (this.form.isNeedOtherParam && typeof this.form.other_param == "string") {
            //组回原始 extends
            this.myProxy.dialogData.form.other_param = JSON.parse(this.form.other_param);
        }
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            app_platform: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            start_time: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            end_time: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            languages: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            type_position: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            time: [
                {
                    type: "array",
                    required: true,
                    message: this.LangUtil("必须选择"),
                },
            ],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    onAppTypesChange(types: any) {
        for (const key in this.form.img_urls) {
            if (Object.prototype.hasOwnProperty.call(this.form.img_urls, key)) {
                if (!types.find((item: any) => item == key)) this.form.img_urls[key] = "";
            }
        }
        for (const key in this.form.img_uris) {
            if (Object.prototype.hasOwnProperty.call(this.form.img_uris, key)) {
                if (!types.find((item: any) => item == key)) this.form.img_uris[key] = "";
            }
        }
        if (this.form.app_platform.length > 0 && this.form.app_platform.indexOf(this.myProxy.appType) == -1) {
            this.myProxy.appType = this.form.app_platform[0].toString();
        }
    }

    onMouseEnter() {
        this.showMask = true;
    }

    onMouseLeave() {
        this.showMask = false;
    }

    handleChange(file: any) {
        // this.myProxy.appType = this.myProxy.appType;
        this.myProxy.onUploadImage({
            type: 2,
            file: file.raw,
        });
    }

    handleChange1(file: any) {
        // this.myProxy.appType = this.myProxy.appType;
        this.myProxy.onUploadImage(
            {
                type: 2,
                file: file.raw,
            },
            true
        );
    }

    handleRemove() {
        this.form.img_urls[this.myProxy.appType] = "";
        this.form.img_uris[this.myProxy.appType] = "";
        this.showMask = false;
    }

    handleRemove1() {
        this.form.thumbnail_urls[this.myProxy.appType] = "";
        this.form.thumbnail_uris[this.myProxy.appType] = "";
        this.showMask = false;
    }

    handlePictureCardPreview() {
        GlobalVar.preview_image.url = this.form.img_urls[this.myProxy.appType];
    }
    handlePictureCardPreview1() {
        GlobalVar.preview_image.url = this.form.thumbnail_urls[this.myProxy.appType];
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_NOTICE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }

    handleLangImg() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        // for (const key in this.form.img_uris) {
        //     if (Object.prototype.hasOwnProperty.call(this.form.img_uris, key)) {
        //         if (this.form.app_platform.find((item: any) => item == key)) {
        //             console.log("----console-11--",this.form.app_platform);
        //             console.log("----console---",key);
        //             data.key = this.form.img_uris[key];
        //         }
        //     }
        // }
        data.key = this.form.img_uris[this.myProxy.appType];
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    //缩略图
    handleLangImg1() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        // for (const key in this.form.thumbnail_uris) {
        //     if (Object.prototype.hasOwnProperty.call(this.form.thumbnail_uris, key)) {
        //         if (this.form.app_platform.find((item: any) => item == key)) {
        //             data.key = this.form.thumbnail_uris[key];
        //         }
        //     }
        // }
        data.key = this.form.img_uris[this.myProxy.appType];
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    onChangePlatId() {
        this.tableColumns.condition_balance_options = this.tableColumns.condition_balance.options[this.form.plat_id];
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let channel_id = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.channel_id.name, ",");
        this.form.condition.find((item: any) => {
            if (item.condition == "condition_channel_id") {
                item.channel_id = channel_id;
            }
        });
    }

    // 汇入用户excel
    onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    // 载入模组
    onLoadModule() {
        let channelIdTemplate: any = this.LangUtil("渠道ID模版");
        new BaseInfo.ExportExcel(
            `【` + channelIdTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelColumnInfo,
            [],
            []
        );
    }

    deleteCondition(index: any) {
        this.form.condition.splice(index, 1);

        if (this.form.condition.length == index && index > 0) {
            this.form.condition[index - 1].showRelation = "0";
        }

        this.myProxy.onChangeCondition();
    }

    get newConditions() {
        let newArr = [];
        const keys = Object.keys(this.tableColumns.conditions.options);
        // @ts-ignore
        const selectedKeys = this.form.condition.map(item => item.condition);
        newArr = keys.map(key => {
            return {
                name: this.tableColumns.conditions.options[key],
                key,
                disabled: selectedKeys.includes(key) && key != "condition_balance",
            };
        });
        return newArr;
    }

    get canImportChannelId() {
        // @ts-ignore
        return this.form.condition.find(({ condition }) => condition == "condition_channel_id") != undefined;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.plat-notice {
    padding: 24px;
    .upload {
        margin-right: 10px;
    }
}
.upload-box {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
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
::v-deep .el-dialog {
    margin-top: 0 !important;
}
.content {
    .layout {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        .el-form {
            width: 50%;
        }
        div {
            width: 100%;
        }
    }
}
.right_label {
    ::v-deep .el-form-item__label {
        width: 100px !important;
    }
    ::v-deep .el-form-item__content {
        margin-left: 100px !important;
    }
}
.vi_div {
    padding: 0 3px !important;
}
.tip-item {
    color: #606266;
}
</style>
