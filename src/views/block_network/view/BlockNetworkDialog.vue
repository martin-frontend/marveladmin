<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-scrollbar style="height:550px;">
            <el-form ref="form" :rules="rules" :model="form" label-width="125px" v-loading="net_status.loading">
                <el-form-item :label="tableColumns.name.name" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.main_coin_name.name" prop="main_coin_name">
                    <el-input v-model="form.main_coin_name"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.name_unique.name" prop="name_unique">
                    <el-input v-model="form.name_unique"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.rpc_url.name" prop="rpc_url">
                    <el-input v-model="form.rpc_url"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.scan_url.name" prop="scan_url">
                    <el-input v-model="form.scan_url"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.chain_id.name" prop="chain_id">
                    <el-input type="number" v-model="form.chain_id"></el-input>
                </el-form-item>

                <el-form-item :label="tableColumns.gas.name" prop="gas">
                    <el-input type="number" v-model="form.gas"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.gas_price.name" prop="gas_price">
                    <el-input type="number" v-model="form.gas_price"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.block_confirm_number.name" prop="block_confirm_number">
                    <el-input type="number" v-model="form.block_confirm_number"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.scan_token_url.name" prop="scan_token_url">
                    <el-input v-model="form.scan_token_url"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.extends.name" prop="extends">
                    <div class="editor-container">
                        <JsonEditor ref="jsonEditor" v-model="form.extends" />
                    </div>
                </el-form-item>
                <el-form-item :label="tableColumns.status.name" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </el-scrollbar>
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
import BlockNetworkProxy from "@/views/block_network/proxy/BlockNetworkProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class BlockNetworkDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockNetworkProxy = this.getProxy(BlockNetworkProxy);
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
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            name_unique: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            main_coin_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            rpc_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            scan_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            chain_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            gas: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            gas_price: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            block_confirm_number: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            status: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn_group {
    display: flex;
    justify-content: flex-end;
    position: relative;
    padding-top: 30px;
}
</style>
