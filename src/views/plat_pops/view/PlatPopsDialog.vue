<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="1200px" top="20px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['app_platform'].name" prop="app_platform">
                <!-- <el-checkbox-group v-model="form.app_platform" @change="onAppTypesChange"> -->
                <el-checkbox-group v-model="form.app_platform">
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
            <el-form-item :label="tableColumns['type'].name" prop="type">
                <el-select
                    v-model="form.type"
                    clearable
                    class="select"
                    placeholder="请选择"
                    @change="onTypeChange"
                    :disabled="form.plat_id == ''"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="form.notice"
                    clearable
                    class="select"
                    placeholder="请选择"
                    style="margin-left: 20px;"
                    v-if="form.type == 1"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['notice'].options"
                        :key="key"
                        :label="value.name"
                        :value="value.id"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="form.acitvity"
                    clearable
                    class="select"
                    placeholder="请选择"
                    style="margin-left: 20px;"
                    @change="onActivityChange"
                    v-if="form.type == 2"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['acitvity'].options"
                        :key="key"
                        :label="value.activity_name"
                        :value="value.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns['ftitle'].name" prop="ftitle" v-if="form.type == 3">
                <el-input
                    :placeholder="LangUtil('请输入')"
                    v-model="form.ftitle"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns['content'].name" prop="content" v-if="form.type == 3">
                <el-input
                    :placeholder="LangUtil('请输入')"
                    v-model="form.content"
                    maxlength="500"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['scenarios_type'].name" prop="scenarios_type">
                <el-radio-group v-model="form.scenarios_type">
                    <el-radio
                        v-for="(value, key) in tableColumns.scenarios_type.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <div style="height: 28px;">
                <div class="red_label"><span style="color:red;">* </span>{{ LangUtil("受众范围") }}</div>
            </div>
            <!-- 参与用户 -->
            <el-form-item size="mini" :label="LangUtil('全部用户')" prop="assign_is_all" label-width="200px">
                <el-checkbox v-model="form.range_type_all"> </el-checkbox>
            </el-form-item>
            <!-- 指定用户 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_user_id'].name"
                prop="assign_is_user"
                class="display_felx"
                label-width="200px"
            >
                <el-checkbox v-model="form.range_type_user_id">{{ LangUtil("是") }}</el-checkbox>
                <el-form-item
                    size="mini"
                    :label="LangUtil('用户ID')"
                    class="display"
                    prop="range_user_ids"
                    v-if="form.range_type_user_id == 1"
                >
                    <div class="send_users">
                        <el-input
                            size="medium"
                            filterable
                            clearable
                            :placeholder="LangUtil('请输入单个或多个用户')"
                            v-model.trim="form.range_user_ids"
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
                        <el-button @click="onImportAssignUser" type="primary" icon="">
                            {{ LangUtil("导入用户") }}
                        </el-button>
                        <el-button @click="onLoadModule" type="primary" icon="">
                            {{ LangUtil("下载导入模版") }}
                        </el-button>
                    </div>
                    <div class="mark_font">
                        {{ LangUtil("用户ID, 多个用户使用英文逗号", "区分") }}
                    </div>
                </el-form-item>
            </el-form-item>
            <!-- 指定标签 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_user_tag_id'].name"
                prop="range_type_user_tag_id"
                label-width="200px"
            >
                <el-checkbox v-model="form.range_type_user_tag_id" :true-label="1" :false-label="99">
                    {{ LangUtil("是") }}
                </el-checkbox>
                <el-select
                    v-model="form.range_user_tag_ids"
                    multiple
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    style="width: 80%; margin-left: 25px"
                    v-if="form.range_type_user_tag_id == 1"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.user_tag.options[form.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 指定渠道 -->
            <el-form-item
                size="mini"
                :label="tableColumns['range_type_channel_id'].name"
                prop="range_type_channel_id"
                label-width="200px"
            >
                <el-checkbox v-model="form.range_type_channel_id" :true-label="1" :false-label="99">
                    {{ LangUtil("是") }}
                </el-checkbox>
                <el-select
                    v-model="form.range_channel_ids"
                    multiple
                    filterable
                    :placeholder="LangUtil('请选择')"
                    style="width: 80%; margin-left: 25px"
                    v-if="form.range_type_channel_id == 1"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.channel_id.options[form.plat_id]"
                        :key="key"
                        :label="key"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="98"></el-switch>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatPopsProxy from "../proxy/PlatPopsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { removeRepeatStr, dateFormat } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { readerData } from "@/core/global/Excel";
import { BaseInfo } from "@/components/vo/commonVo";

@Component
export default class PlatPopsDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatPopsProxy = this.getProxy(PlatPopsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
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

    get curTime() {
        return dateFormat(new Date(), "yyyy-MM-dd hh-mm-ss");
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            app_platform: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            languages: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            scenarios_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            status: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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

    onTypeChange() {
        if (this.form.type == "1") {
            this.myProxy.onQueryNotice(this.form.plat_id);
        } else if (this.form.type == "2") {
            this.myProxy.onQueryActivity(this.form.plat_id);
        }
    }

    onActivityChange() {}

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        let userList = removeRepeatStr(excel.results, this.myProxy.dialogData.excelColumnInfo.userid.name, ",");
        this.form.range_user_ids = userList;
    }

    // 汇入用户excel
    onImportAssignUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    // 载入模组
    onLoadModule() {
        let emailTemplate: any = this.LangUtil("用户模版");
        new BaseInfo.ExportExcel(
            `【` + emailTemplate + `】${this.curTime}`,
            [],
            this.myProxy.dialogData.excelColumnInfo,
            [],
            []
        );
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.display_felx {
    ::v-deep .el-form-item__content {
        display: flex;
    }
    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }
}
.display {
    ::v-deep .el-form-item__content {
        display: block;
    }
}
.send_users {
    display: flex;
    flex-direction: row;
}
.red_label {
    width: 115px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    padding: 0 12px 0 0;
    line-height: 28px;
}
</style>
