<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="115px"
            v-loading="net_status.loading"
        >
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
                <el-input v-model="form.chain_id"></el-input>
            </el-form-item>

            <el-form-item :label="tableColumns.gas.name" prop="gas">
                <el-input v-model="form.gas"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.gas_price.name" prop="gas_price">
                <el-input v-model="form.gas_price"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.block_confirm_number.name" prop="block_confirm_number">
                <el-input v-model="form.block_confirm_number"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.extends.name" prop="extends">
                <el-input type="textarea" v-model="form.extends"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="btn_group">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ $t("common.delete") }}</el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                $t("common.save")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import BlockNetworkProxy from "@/views/block_network/proxy/BlockNetworkProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BlockNetworkDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockNetworkProxy = this.getProxy(BlockNetworkProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow(){
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
