<template>
    <el-dialog :title="LangUtil('游戏厂商流水')" :visible.sync="myProxy.vendorDialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="160px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.vendor_id.name">
                <el-select filterable v-model="form.vendor_id" :placeholder="LangUtil('请选择')">
                    <!-- <el-option
                        v-for="(item, key) of tableColumns.vendor_ids.options[listQuery.plat_id]"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option> -->

                    <el-option v-for="(item, key) of myProxy.vendor_options" :label="item.name" :value="item.value" :key="key">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- <el-form-item :label="LangUtil('游戏厂商流水')" prop="name">
                <el-input :placeholder="LangUtil('请输入')" v-model="form.name"></el-input>
            </el-form-item> -->
            <el-form-item :label="LangUtil('流水%')" prop="water">
                <!-- <el-input :placeholder="LangUtil('请输入')" v-model="form.water"></el-input> -->

                <el-input-number
                    size="mini"
                    :min="0"
                    :max="100"
                    :step="1"
                    controls-position="right"
                    v-model="form.water"
                >
                </el-input-number>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleAdd">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityProxy from "../proxy/PlatActivityProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { dateFormat, removeRepeatStr } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { readerData } from "@/core/global/Excel";
import { BaseInfo } from "@/components/vo/commonVo";

@Component
export default class VendorDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    form = this.myProxy.vendorDialogData.form;
    LangUtil = LangUtil;

    @Watch("myProxy.vendorDialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            activity_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAddVendor();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
