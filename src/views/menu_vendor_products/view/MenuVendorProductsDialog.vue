<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                {{ tableColumns.plat_id.options[listQuery.plat_id] }}
            </el-form-item>
            <el-form-item :label="tableColumns.vendor_type.name" prop="vendor_type">
                <el-select
                    filterable
                    v-model="form.vendor_type"
                    :placeholder="LangUtil('请选择')"
                    @change="onChangeVendorType()"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.vendor_id.name" prop="vendor_id">
                <el-select
                    filterable
                    v-model="form.vendor_id"
                    :placeholder="LangUtil('请选择')"
                    @change="onChangeVendorId()"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_id_options_key"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.alias.name" prop="alias">
                <div class="flex d-flex">
                    <el-input v-model="form.alias" maxlength="100"></el-input>
                    <el-button
                        style="margin-left: 10px;max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.alias)"
                    >
                        翻译
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns.game_desc.name" prop="game_desc">
                <div class="flex d-flex">
                    <el-input v-model="form.game_desc" maxlength="100"></el-input>
                    <el-button
                        style="margin-left: 10px;max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.game_desc)"
                    >
                        翻译
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns.entrance_type.name" prop="entrance_type">
                <el-radio-group v-model="form.entrance_type" @change="onChangeEntranceType">
                    <el-radio
                        v-for="(value, key) in tableColumns.entrance_type.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.entrance_game.name" prop="entrance_game" v-if="form.entrance_type == 2">
                <el-select filterable v-model="form.entrance_game" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) of tableData.entrance_game_options"
                        :key="key"
                        :label="value"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_icon'].name" prop="vendor_icon_url">
                <div style="display: flex">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-change="handleChangeVendor"
                        :auto-upload="false"
                        :multiple="false"
                        :show-file-list="false"
                        ref="upload"
                        v-if="!form.vendor_icon_url[0] || form.vendor_icon_url == '-'"
                        class="upload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div
                        class="upload-box"
                        @mouseover="onMouseEnter"
                        @mouseleave="onMouseLeave"
                        v-if="form.vendor_icon_url[0] && form.vendor_icon_url != '-'"
                    >
                        <div class="mask" v-show="showMask">
                            <div class="icon-bar">
                                <i class="el-icon-delete" @click="handleRemoveVendor"></i>
                                <i class="el-icon-zoom-in" @click="handlePictureCardPreviewVendor"></i>
                            </div>
                        </div>
                        <img :src="formatImageUrl(form.vendor_icon_url[0])" />
                    </div>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['menu_icon'].name" prop="menu_icon_url">
                <div style="display: flex">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-change="handleChangeMenu"
                        :auto-upload="false"
                        :multiple="false"
                        :show-file-list="false"
                        ref="upload"
                        v-if="!form.menu_icon_url[0]"
                        class="upload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div
                        class="upload-box"
                        @mouseover="onMouseEnter"
                        @mouseleave="onMouseLeave"
                        v-if="form.menu_icon_url[0]"
                    >
                        <div class="mask" v-show="showMask">
                            <div class="icon-bar">
                                <i class="el-icon-delete" @click="handleRemoveMenu"></i>
                                <i class="el-icon-zoom-in" @click="handlePictureCardPreviewMenu"></i>
                            </div>
                        </div>
                        <img :src="formatImageUrl(form.menu_icon_url[0])" />
                    </div>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['entrance_icon'].name" prop="entrance_icon_url">
                <div style="display: flex">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-change="handleChangeEntrance"
                        :auto-upload="false"
                        :multiple="false"
                        :show-file-list="false"
                        ref="upload"
                        v-if="!form.entrance_icon_url[0]"
                        class="upload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div
                        class="upload-box"
                        @mouseover="onMouseEnter"
                        @mouseleave="onMouseLeave"
                        v-if="form.entrance_icon_url[0]"
                    >
                        <div class="mask" v-show="showMask">
                            <div class="icon-bar">
                                <i class="el-icon-delete" @click="handleRemoveEntrance"></i>
                                <i class="el-icon-zoom-in" @click="handlePictureCardPreviewEntrance"></i>
                            </div>
                        </div>
                        <img :src="formatImageUrl(form.entrance_icon_url[0])" />
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">
                {{ LangUtil("删除") }}
            </el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                {{ LangUtil("确认保存") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import MenuVendorProductsProxy from "@/views/menu_vendor_products/proxy/MenuVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, formatImageUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class MenuVendorProductsDialog extends AbstractView {
    LangUtil = LangUtil;
    formatImageUrl = formatImageUrl;
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: MenuVendorProductsProxy = this.getProxy(MenuVendorProductsProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    private tableData = this.myProxy.tableData;
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    private listQuery = this.myProxy.listQuery;

    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };
    showMask = false;

    created() {
        if (!this.isStatusUpdate) {
            //新增
            this.form.vendor_type = Number(Object.keys(this.tableColumns.vendor_type.options)[0]);
            this.onChangeVendorType();
        } else {
            //编辑
            this.onChangeVendorType();
        }
    }

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
            vendor_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            vendor_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            alias: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            game_desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            entrance_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            entrance_game: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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

    private onChangeVendorType() {
        this.form.entrance_game = "";
        this.tableData.columns.vendor_id_option = this.tableData.columns.vendor_id.options_key[this.form.vendor_type];
        // const vendor_id_options_keys = Object.keys(this.tableData.columns.vendor_id_option);
        // this.form.vendor_id = Number(vendor_id_options_keys[0]);
        this.form.vendor_id = "";
        if (
            this.tableColumns.entrance_game.options[this.form.vendor_id] == undefined ||
            this.tableColumns.entrance_game.options[this.form.vendor_id][this.form.vendor_type] == undefined
        ) {
            this.tableData.entrance_game_options = {};
        } else {
            this.tableData.entrance_game_options = this.tableColumns.entrance_game.options[this.form.vendor_id][
                this.form.vendor_type
            ];
        }
        this.myProxy.changeVendorType();
    }

    private onChangeVendorId() {
        this.form.entrance_game = "";
        if (
            this.tableColumns.entrance_game.options[this.form.vendor_id] == undefined ||
            this.tableColumns.entrance_game.options[this.form.vendor_id][this.form.vendor_type] == undefined
        ) {
            this.tableData.entrance_game_options = {};
        } else {
            this.tableData.entrance_game_options = this.tableColumns.entrance_game.options[this.form.vendor_id][
                this.form.vendor_type
            ];
        }
    }

    private onChangeEntranceType() {
        this.form.entrance_game = "";
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_VENDER_GAME_LANGUAGE;
        data.plat_id = this.listQuery.plat_id;
        this.langProxy.showDialog(data);
    }

    onMouseEnter() {
        this.showMask = true;
    }

    onMouseLeave() {
        this.showMask = false;
    }

    handleChangeVendor(file: any) {
        this.myProxy.onUploadImage(
            {
                type: 2,
                file: file.raw,
            },
            0
        );
    }

    handleChangeMenu(file: any) {
        this.myProxy.onUploadImage(
            {
                type: 2,
                file: file.raw,
            },
            1
        );
    }

    handleChangeEntrance(file: any) {
        this.myProxy.onUploadImage(
            {
                type: 2,
                file: file.raw,
            },
            2
        );
    }

    handleRemoveVendor() {
        this.form.vendor_icon_url[0] = "";
        this.form.vendor_icon[0] = "";
        this.showMask = false;
    }

    handleRemoveMenu() {
        this.form.menu_icon_url[0] = "";
        this.form.menu_icon[0] = "";
        this.showMask = false;
    }

    handleRemoveEntrance() {
        this.form.entrance_icon_url[0] = "";
        this.form.entrance_icon[0] = "";
        this.showMask = false;
    }

    handlePictureCardPreviewVendor() {
        GlobalVar.preview_image.url = this.form.vendor_icon_url[0];
    }

    handlePictureCardPreviewMenu() {
        GlobalVar.preview_image.url = this.form.menu_icon_url[0];
    }

    handlePictureCardPreviewEntrance() {
        GlobalVar.preview_image.url = this.form.entrance_icon_url[0];
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
