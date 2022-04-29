<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="115px"
            v-loading="net_status.loading"
        >
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import BlockTransferOutOrderProxy from "@/views/block_transfer_out_order/proxy/BlockTransferOutOrderProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class BlockTransferOutOrderDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockTransferOutOrderProxy = this.getProxy(BlockTransferOutOrderProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: "编辑",
        create: "新增"
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

    // private handleAdd() {
    //     (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
    //         if (valid) {
    //             this.myProxy.onAdd();
    //         }
    //     });
    // }

    // private handleUpdate() {
    //     (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
    //         if (valid) {
    //             this.myProxy.onUpdate();
    //         }
    //     });
    // }

    // private handleDelete() {
    //     this.myProxy.onDelete(this.form.id);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
