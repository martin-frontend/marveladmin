<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="105px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.coin_name.name" prop="coin_name">
                <el-input v-model="form.coin_name" :disabled="isStatusUpdate"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.coin_name_unique.name" prop="coin_name_unique">
                <el-input v-model="form.coin_name_unique" :disabled="isStatusUpdate"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.icon.name" prop="icon">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.is_digital_currency.name" prop="is_digital_currency">
                <el-radio-group v-model="form.is_digital_currency">
                    <el-radio
                        v-for="(value, key) in tableColumns.is_digital_currency.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.symbol.name" prop="symbol">
                <el-input v-model="form.symbol"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn_group">
            <!-- <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ LangUtil("删除") }}</el-button> -->
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                LangUtil("确认保存")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import BlockSystemCoinsProxy from "@/views/block_system_coins/proxy/BlockSystemCoinsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BlockSystemCoinsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

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

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {};
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn_group {
    display: flex;
    justify-content: flex-end;
    position: relative;
}
</style>
