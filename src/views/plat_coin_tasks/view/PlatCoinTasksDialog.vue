<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="1000px">
        <el-form ref="form" :rules="rules" :model="form" label-width="160px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <span>{{ tableColumns.plat_id.options[form.plat_id] }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.activity_name.name" prop="activity_name">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        :placeholder="LangUtil('请输入')"
                        v-model="form.activity_name"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.activity_name)">
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <!-- <el-form-item :label="tableColumns.activity_id.name" prop="activity_id">
                <el-select filterable v-model="form.activity_id" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.activity_id.options[form.plat_id]"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item size="mini" :label="LangUtil('发送用户')" prop="user_ids">
                <div class="send_users">
                    <el-input
                        size="medium"
                        filterable
                        clearable
                        :placeholder="LangUtil('请输入单个或多个用户')"
                        v-model.trim="form.user_ids"
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

                    <el-button @click="onImportUser" type="primary" icon="">{{ LangUtil("导入用户") }}</el-button>
                    <el-button @click="onLoadModule" type="primary" icon="">{{ LangUtil("下载导入模版") }}</el-button>
                </div>
                <div class="mark_font">{{ LangUtil("用户ID, 多个用户使用英文逗号", "区分") }}</div>
            </el-form-item>
            <el-form-item :label="tableColumns.task_coin_name_unique.name" prop="task_coin_name_unique">
                <el-select filterable v-model="form.task_coin_name_unique" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.task_coin_name_unique.options[form.plat_id]"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.task_coin_amount.name" prop="task_coin_amount">
                <div class="flex d-flex">
                    <el-input
                        :placeholder="LangUtil('请输入')"
                        v-model="form.task_coin_amount"
                        oninput="value=value.replace(/[^\d]/g,'');"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns.bonus_multiple.name" prop="bonus_multiple">
                <div class="flex d-flex">
                    <el-input
                        :placeholder="LangUtil('请输入')"
                        v-model="form.bonus_multiple"
                        oninput="value=value.replace(/[^\d]/g,'');"
                    ></el-input>
                </div>
            </el-form-item>
            <div class="title">{{ LangUtil("奖励任务设置") }}</div>
            <div class="layout">
                <div>
                    <el-form-item style="margin-bottom: 0px;" :label="LangUtil('基本设置')"></el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_days"
                        prop="task_days"
                        label-width="250px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入天数')" v-model="form.task_days"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.transfer_amount_rate"
                        prop="transfer_amount_rate"
                        label-width="250px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.transfer_amount_rate"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 15px;padding-top: 20px;" :label="LangUtil('游戏厂商流水')">
                        <el-button
                            type="primary"
                            icon="el-icon-circle-plus-outline"
                            @click="handleAddVendor"
                            size="mini"
                            >{{ LangUtil("新增") }}</el-button
                        >
                    </el-form-item>
                    <el-form-item
                        v-for="(item, index) of form.vendorArr"
                        :key="index"
                        :label="tableColumns.vendor_ids.options[form.plat_id][item.vendor_id]"
                    >
                        <div class="flex d-flex">
                            <el-input-number
                                size="mini"
                                :min="0"
                                :max="100"
                                :step="1"
                                controls-position="right"
                                v-model="form.vendorArr[index].water"
                                style="margin-right: 10px"
                            >
                            </el-input-number>
                            <!-- <el-input
                                :placeholder="LangUtil('请输入')"
                                v-model="form.vendorArr[index].water"
                                style="margin-right: 10px"
                            ></el-input> -->
                            <el-button type="danger" @click="handleDeleteVendor(index)" size="mini">{{
                                LangUtil("删除")
                            }}</el-button>
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item style="margin-bottom: 0px;" :label="LangUtil('任务流水%')"> </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_2"
                        prop="task_water_rate_2"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input
                                :placeholder="LangUtil('请输入')"
                                v-model="form.task_water_rate_2"
                                oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                            ></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_4"
                        prop="task_water_rate_4"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_4"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_8"
                        prop="task_water_rate_8"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_8"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_16"
                        prop="task_water_rate_16"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_16"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_32"
                        prop="task_water_rate_32"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_32"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_64"
                        prop="task_water_rate_64"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_64"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item
                        :label="tableColumns.task_config.options.task_water_rate_128"
                        prop="task_water_rate_128"
                        label-width="200px"
                    >
                        <div class="flex d-flex">
                            <el-input :placeholder="LangUtil('请输入')" v-model="form.task_water_rate_128"></el-input>
                        </div>
                    </el-form-item>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatCoinTasksProxy from "../proxy/PlatCoinTasksProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { dateFormat, removeRepeatStr } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { readerData } from "@/core/global/Excel";
import { BaseInfo } from "@/components/vo/commonVo";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class PlatCoinTasksDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatCoinTasksProxy = this.getProxy(PlatCoinTasksProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);

    private textMap = {
        update: "编辑",
        create: "新增",
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
        return {
            activity_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_coin_name_unique: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            task_coin_amount: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            bonus_multiple: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_days: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            transfer_amount_rate: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_2: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_4: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_8: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_16: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_32: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_64: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_128: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
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

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let userList = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.userid.name, ",");
        this.form.user_ids = userList;
    }
    // 汇入用户excel
    onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }
    // 载入模组
    onLoadModule() {
        let emailTemplate: any = this.LangUtil("活动模版");
        new BaseInfo.ExportExcel(
            `【` + emailTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelColumnInfo,
            [],
            []
        );
    }
    handleAddVendor() {
        this.myProxy.showVendorDialog();
    }
    handleDeleteVendor(i: any) {
        this.form.vendorArr.splice(i, 1);
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_ACTIVITY;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data, true);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.mark_font {
    color: red;
    font-size: 0.5rem;
}
.send_users {
    display: flex;
    flex-direction: row;
}

.layout {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 20px;
    .el-form {
        width: 50%;
    }
    div {
        width: 100%;
    }
}
.title {
    font-weight: bold;
    font-size: 18px;
}
</style>
