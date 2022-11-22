<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="85px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.contract_name.name" prop="contract_name">
                <el-input v-model="form.contract_name"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.contract_address.name" prop="contract_address">
                <el-input v-model="form.contract_address"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.contract_decimal.name" prop="contract_decimal">
                <el-input v-model="form.contract_decimal"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-select filterable v-model="form.type" :placeholder="LangUtil('请选择')">
                    <el-option v-for="(item, key) of tableColumns.type.options" :label="item" :value="key" :key="key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.block_network_id.name" prop="block_network_id">
                <el-select filterable v-model="form.block_network_id" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.block_network_id.options"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.coin_name_unique.name" prop="coin_name_unique">
                <el-select filterable v-model="form.coin_name_unique" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.coin_name_unique.options"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.contract_abi.name" prop="contract_abi">
                <el-input type="textarea" v-model="form.contract_abi"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.extends.name" prop="extends">
                <el-input type="textarea" v-model="form.extends"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn_group">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ LangUtil("删除") }}</el-button>
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
import BlockContractProxy from "@/views/block_contract/proxy/BlockContractProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BlockContractDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockContractProxy = this.getProxy(BlockContractProxy);
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
