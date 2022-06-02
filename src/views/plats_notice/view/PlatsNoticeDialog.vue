<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-loading="net_status.loading">
            <!--  -->
            <el-form-item size="mini" :label="$t('plats_notice.release')" prop="plat_id">
                <el-select v-model="form.plat_id" :placeholder="$t('common.pleaseChoose')" filterable style="width: 300px">
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['app_types'].name" prop="app_types">
                <el-checkbox-group v-model="form.app_types" @change="onAppTypesChange">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['app_types'].options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item> -->

            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            filterable
                            clearable
                            :placeholder="$t('common.pleaseEnter')"
                            v-model="form.name"
                        ></el-input>
                        <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.name)">翻译</el-button>
                    </div>

            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['type_position'].name" prop="type_position">
                <el-select v-model="form.type_position" :placeholder="$t('common.pleaseChoose')" filterable style="width: 300px">
                    <el-option
                        v-for="(value, key) in tableColumns['type_position'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['start_time'].name" prop="start_time">
                <el-date-picker
                    v-model="form.start_time"
                    type="datetime"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="$t('common.pleaseChoose')"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['end_time'].name" prop="end_time">
                <el-date-picker
                    v-model="form.end_time"
                    type="datetime"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="$t('common.pleaseChoose')"
                >
                </el-date-picker>
            </el-form-item>
            <!-- 模块 -->
            <el-form-item size="mini" :label="tableColumns['open_mode'].name" prop="open_mode">
                <el-select v-model="form.open_mode" :placeholder="$t('common.pleaseChoose')" filterable>
                    <el-option
                        v-for="(value, key) in tableColumns['open_mode'].options"
                        :key="key"
                        :value="key"
                        :label="value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 转跳 -->
            <el-form-item size="mini" :label="tableColumns['open_mode_url'].name">
                <el-input
                    v-model="form.open_mode_url"
                    :placeholder="$t('common.pleaseEnter')"
                    maxlength="100"
                    show-word-limit
                ></el-input>
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
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            filterable
                            clearable
                            rows="5"
                            :placeholder="$t('common.pleaseEnter')"
                            v-model="form.content"
                        ></el-input>
                        <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.content)">翻译</el-button>
                    </div>

            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['img_uris'].name" prop="img_urls" v-if="form.type == 2">
                <el-tabs type="border-card" v-model="myProxy.appType">
                    <el-tab-pane
                        :label="tableColumns['app_types'].options[item]"
                        :name="`${item}`"
                        v-for="item in form['app_types']"
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
                <el-button style="max-height: 35px" type="primary" size="mini" @click="handleLangImg()">多语言图片</el-button>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['thumbnail_uris'].name" prop="thumbnail_urls" v-if="form.type == 2">
                <el-tabs type="border-card" v-model="myProxy.appType">
                    <el-tab-pane
                        :label="tableColumns['app_types'].options[item]"
                        :name="`${item}`"
                        v-for="item in form['app_types']"
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
                <el-button style="max-height: 35px" type="primary" size="mini" @click="handleLangImg1()">多语言图片</el-button>
            </el-form-item>


            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    isStatusUpdate ? $t("common.save") : $t("plats_notice.releaseConfirm")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatsNoticeProxy from "@/views/plats_notice/proxy/PlatsNoticeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, formatImageUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import CommonLangImgProxy from "@/views/lang_img_dialog/proxy/CommonLangImgProxy";
import { Message } from "element-ui";

@Component
export default class PlatsNoticeDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    private langImgProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private formatImageUrl = formatImageUrl;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };
    private showMask = false;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
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
            app_types: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            start_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            end_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            content: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            img_urls: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            // thumbnail_urls: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            language: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            type_position: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
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

    private handleDelete() {
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
        if (this.form.app_types.length > 0 && this.form.app_types.indexOf(this.myProxy.appType) == -1) {
            this.myProxy.appType = this.form.app_types[0].toString();
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
        this.myProxy.onUploadImage({
            type: 2,
            file: file.raw,
        }, true);
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
        for (const key in this.form.img_urls) {
            if (Object.prototype.hasOwnProperty.call(this.form.img_urls, key)) {
                if (this.form.app_types.find((item: any) => item == key)) {
                     data.key = this.form.img_urls[key];
                }
            }
        }
        if (!data.key) {
            Message.warning("请先上传默认图片");
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    //缩略图
    handleLangImg1() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        for (const key in this.form.img_uris) {
            if (Object.prototype.hasOwnProperty.call(this.form.img_uris, key)) {
                if (this.form.app_types.find((item: any) => item == key)) {
                     data.key = this.form.img_uris[key];
                }
            }
        }
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
</style>
