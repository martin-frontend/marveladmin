<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <el-select v-model="form.vendor_id" filterable :placeholder="LangUtil('请选择')" @change="form.game_id = ''">
                    <el-option
                        v-for="(value, key) in tableColumns['vendor_id'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['game_id'].name" prop="game_id">
                <el-select v-model="form.game_id" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['game_id'].options[form.vendor_id]"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                <el-input v-model="form.user_id" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['username'].name" prop="username">
                <el-input v-model="form.username" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['award_time'].name" prop="award_time">
                <el-date-picker
                    v-model="form.award_time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="LangUtil('请输入')"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['award_uri'].name" prop="award_uri">
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
                    >
                        {{ LangUtil("多语言图片") }}
                    </el-button>
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['withdraw_uri'].name" prop="withdraw_uri">
                <div style="display: flex">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-change="handleChange1"
                        :auto-upload="false"
                        :multiple="false"
                        :show-file-list="false"
                        ref="upload"
                        v-if="!myProxy.dialogData.fileList1[0].url"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div class="upload-box" @mouseover="showMask1 = true" @mouseleave="showMask1 = false" v-else>
                        <div class="mask" v-show="showMask1">
                            <div class="icon-bar">
                                <i class="el-icon-delete" @click="handleRemove1"></i>
                                <i class="el-icon-zoom-in" @click="handlePictureCardPreview1"></i>
                            </div>
                        </div>

                        <img :src="formatImageUrl(myProxy.dialogData.fileList1[0].url)" />
                    </div>
                    <el-button
                        style="max-height: 35px; margin-left: 10px"
                        type="primary"
                        size="mini"
                        @click="handleLangImg1()"
                    >
                        {{ LangUtil("多语言图片") }}
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="isStatusUpdate" size="mini" type="danger" @click="handlerDelete">{{
                LangUtil("删除")
            }}</el-button>
            <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                {{ buttonText }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBigAwardProxy from "@/views/plat_big_award/proxy/PlatBigAwardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, formatImageUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import CommonLangImgProxy from "@/views/lang_img_dialog/proxy/CommonLangImgProxy";
import { Message } from "element-ui";

@Component
export default class PlatBigAwardDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBigAwardProxy = this.getProxy(PlatBigAwardProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    formatImageUrl = formatImageUrl;
    langImgProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);

    showMask = false;
    showMask1 = false;
    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

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
        return {};
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

    get buttonText() {
        return this.isStatusUpdate ? this.LangUtil("确认保存") : this.LangUtil("新增");
    }

    //图片相关---
    handleChange(file: any) {
        this.myProxy.dialogData.uploadType = "award_uri";
        const data = {
            type: 2,
            file: file.raw,
        };
        this.myProxy.uploadImage(data);
    }

    handleRemove(file: any) {
        this.myProxy.dialogData.form.award_uri = "";
        this.myProxy.dialogData.fileList = [{ rul: "" }];
        this.showMask = false;
    }
    handlePictureCardPreview() {
        GlobalVar.preview_image.url = this.myProxy.dialogData.fileList[0].url;
    }

    handleLangImg() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.award_uri;
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    handleChange1(file: any) {
        this.myProxy.dialogData.uploadType = "withdraw_uri";
        const data = {
            type: 2,
            file: file.raw,
        };
        this.myProxy.uploadImage(data);
    }

    handleRemove1(file: any) {
        this.myProxy.dialogData.form.withdraw_uri = "";
        this.myProxy.dialogData.fileList1 = [{ rul: "" }];
        this.showMask1 = false;
    }
    handlePictureCardPreview1() {
        GlobalVar.preview_image.url = this.myProxy.dialogData.fileList1[0].url;
    }

    handleLangImg1() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.withdraw_uri;
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    private handlerDelete() {
        this.myProxy.onDelete(this.form.id);
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
