<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="700px">
        <el-form ref="form" :rules="rules" :model="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.name.name" required prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.desc.name" required prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item required :label="tableColumns.backwater_config.name">
                <el-form :inline="true" class="inline_form">
                    <el-form-item
                        size="mini"
                        :label="tableColumns.backwater_config.options[citem]"
                        v-for="(citem, cindex) in Object.keys(form.backwater_config)"
                        :key="cindex"
                    >
                        <el-input
                            type="number"
                            step="0.0001"
                            min="0.0000"
                            max="0.9999"
                            oninput="if(value >0.9999)value=0.9999"
                            @keydown.native="inputLimit"
                            v-model="form.backwater_config[citem].backwater_rate"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" size="mini" @click="onClose">{{ LangUtil("关闭") }}</el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="
                        isStatusUpdate && checkUnique(unique.plat_users_backwater_model_update)
                            ? handleUpdate()
                            : handleAdd()
                    "
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersBackwaterModelProxy from "@/views/plat_users_backwater_model/proxy/PlatUsersBackwaterModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersBackwaterModelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersBackwaterModelProxy = this.getProxy(PlatUsersBackwaterModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };
    inputLimit(e: any) {
        let key = e.key;
        if (key === "-" || key === "e") {
            e.returnValue = false;
            return false;
        }
        return true;
    }
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
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
        this.myProxy.onDelete(this.form.backwater_model_id);
    }

    onClose() {
        this.myProxy.hideDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.inline_form {
    ::v-deep .el-form-item__content {
        line-height: 35px;
    }
    padding-left: 0px;
}
</style>
