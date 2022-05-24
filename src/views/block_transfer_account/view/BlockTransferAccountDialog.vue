<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="75px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select filterable v-model="form.plat_id" class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :label="item"
                        :value="Number(key)"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.block_network_id.name" prop="block_network_id">
                <el-select filterable v-model="form.block_network_id" class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.block_network_id.options"
                        :label="item"
                        :value="Number(key)"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio v-for="(value, key) in tableColumns.type.options" :key="key" :label="Number(key)">
                        {{ value }}
                        <!-- {{ tableColumns.type.options[key] }} -->
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.private_key.name" prop="private_key">
                <el-input v-model="form.private_key"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.address.name" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>


            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input v-model="form.remark"></el-input>
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
import BlockTransferAccountProxy from "@/views/block_transfer_account/proxy/BlockTransferAccountProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BlockTransferAccountDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockTransferAccountProxy = this.getProxy(BlockTransferAccountProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
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
