<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- <el-form-item :label="tableColumns.key.name" prop="key">
                <el-input v-if="!isStatusUpdate" :placeholder="`${tableColumns.key.name}`" v-model="form.key"></el-input>
                <span v-else>
                    {{ form.key }}
                </span>
            </el-form-item> -->

            <div v-for="(value, key) in tableColumns.language.options" :key="key" :value="value">
                <el-form-item :label="value" prop="value">
                    <!-- <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            filterable
                            clearable
                            :placeholder="`${tableColumns[key].name}`"
                            v-model="form[key]"
                        ></el-input>
                        <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(key, form[key])">一键翻译成其他语言</el-button>
                    </div> -->

                    <div style="display: flex">
                        <el-upload
                            action="#"
                            list-type="picture-card"
                            :on-change="handleChanged(key)"
                            :auto-upload="false"
                            :multiple="false"
                            :show-file-list="false"
                            ref="upload"
                            v-if="!form[key].urls"
                            class="upload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div
                            class="upload-box"
                            @mouseover="onMouseEnter"
                            @mouseleave="onMouseLeave"
                            v-if="form[key].urls"
                        >
                            <div class="mask" v-show="showMask">
                                <div class="icon-bar">
                                    <i class="el-icon-delete" @click="handleRemove(key)"></i>
                                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview(key)"></i>
                                </div>
                            </div>
                            <img :src="formatImageUrl(form[key].urls)" />
                        </div>
                    </div>
                </el-form-item>
            </div>

            <el-form-item class="dialog-footer">
                <!-- <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{
                    LangUtil('删除')
                }}</el-button> -->
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import CommonLangImgProxy from "../proxy/CommonLangImgProxy";
import CommonLangImgMediator from "../mediator/CommonLangImgMediator";
import { formatImageUrl } from "@/core/global/Functions";

@Component({
    components: {},
})
export default class CommonLangImgDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form: any = this.myProxy.dialogData.form;

    showMask = false;

    formatImageUrl = formatImageUrl;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    constructor() {
        super(CommonLangImgMediator);
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            module: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            key: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                console.log("handleAdd");
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                console.log("handleUpdate");
                this.myProxy.onUpdate();
            }
        });
    }

    handleTranslate(source: string, sentence: string) {
        this.myProxy.translate({ source: source, sentence: sentence, plat_id: this.form.plat_id, id: this.form.id });
    }

    onMouseEnter() {
        this.showMask = true;
    }

    onMouseLeave() {
        this.showMask = false;
    }

    handleChanged(key: string): any {
        let myProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
        return function(source: any): any {
            myProxy.onUploadImage({
                file: source.raw,
                source: key,
            });
        };
    }

    handleChange(file: any) {
        // this.myProxy.appType = this.myProxy.appType;
        this.myProxy.onUploadImage({
            // type: 2,
            file: file.raw,
            // source: source,
        });
    }
    handleChange1(file: any) {
        // this.myProxy.appType = this.myProxy.appType;
        this.myProxy.onUploadImage(
            {
                // type: 2,
                file: file.raw,
            },
            true
        );
    }
    handleRemove(key: string) {
        this.form[key].urls = "";
        this.form[key].uris = "";
        this.showMask = false;
    }

    handlePictureCardPreview(key: string) {
        GlobalVar.preview_image.url = this.form[key].urls;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
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
