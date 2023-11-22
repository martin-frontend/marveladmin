<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-loading="net_status.loading">
            <!--  -->
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    @change="changePlatId()"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['coin_name_unique'].name" prop="coin_name_unique">
                <el-select
                    v-model="form.coin_name_unique"
                    filterable
                    clearable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_name_unique.options[form.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['channel_name'].name" prop="channel_name">
                <el-input v-model="form.channel_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['ios_download_link'].name" prop="ios_download_link">
                <el-input v-model="form.ios_download_link" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['android_download_link'].name" prop="android_download_link">
                <el-input v-model="form.android_download_link" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <div class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.plat_channel_update)"
                    type="danger"
                    size="mini"
                    @click="handleDelete"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatChannelProxy from "@/views/plat_channel/proxy/PlatChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class PlatChannelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatChannelProxy = this.getProxy(PlatChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    listQuery = this.myProxy.listQuery;

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
            plat_id: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            channel_name: [{ required: true, message: LangUtil("必须填写"), trigger: "change" }],
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

    changePlatId() {
        this.form.coin_name_unique = "";
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
