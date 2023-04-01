<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.cronDialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- 任务频率  -->
            <el-form-item :label="tableColumns.frequency.name" prop="frequency">
                <el-input type="text" v-model="listQuery.frequency"></el-input>
            </el-form-item>
            <!-- 类型  -->
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-select v-model="form.type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.type.options"
                        :key="key"
                        :label="item"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 任务名称 -->
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input type="text" v-model="listQuery.name"></el-input>
            </el-form-item>
            <!-- 任务内容 -->
            <el-form-item :label="tableColumns.content.name" prop="content">
                <el-input type="textarea" v-model="listQuery.content"></el-input>
            </el-form-item>
            <!-- 超时时间 -->
            <el-form-item :label="tableColumns.timeout.name" prop="timeout">
                <el-input type="text" v-model="listQuery.timeout"></el-input>
            </el-form-item>
            <!-- 任务描述 -->
            <el-form-item :label="tableColumns.desc.name" prop="desc">
                <el-input type="text" v-model="listQuery.desc"></el-input>
            </el-form-item>
            <!-- 是否有执行 -->
            <el-form-item :label="tableColumns.is_ordered_exec.name" prop="is_ordered_exec">
                <el-switch v-model="listQuery.is_ordered_exec" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <!-- 状态 -->
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-switch v-model="listQuery.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item>
                <div class="footer">
                    <el-button type="danger" @click="handleDelete()" v-if="isStatusUpdate">{{
                        LangUtil("删除")
                    }}</el-button>
                    <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                        LangUtil("确认保存")
                    }}</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "@/views/admin_cron/proxy/AdminCronProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminCronDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    tableColumns = this.myProxy.cronTableData.columns;
    listQuery = this.myProxy.cronDialogData.form;

    get form() {
        return this.myProxy.cronDialogData.form;
    }

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.cronDialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.cronDialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            frequency: [
                { required: true, message: this.LangUtil("秒[5的倍数]、分钟、小时、日、月、周"), trigger: "blur" },
            ],
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            content: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            timeout: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            is_ordered_exec: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            status: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
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
                this.myProxy.onCronUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.footer {
    display: flex;
    justify-content: flex-end;
}
</style>
