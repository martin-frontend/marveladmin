<template>
    <el-dialog width="500px" append-to-body :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="statisticTableColumns.plat_id.name" prop="plat_id" label-width="100px">
                {{ statisticTableColumns.plat_id.options[statisticProxy.listQuery.plat_id] }}
            </el-form-item>
            <el-form-item :label="tableColumns.start_time.name" prop="start_time" label-width="100px">
                <el-date-picker
                    v-model="form.start_time"
                    :placeholder="LangUtil('选择开始时间')"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="tableColumns.end_time.name" prop="end_time" label-width="100px">
                <el-date-picker
                    v-model="form.end_time"
                    :placeholder="LangUtil('选择结束时间')"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" @click="handleDelete">{{ LangUtil("删除") }}</el-button>
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CreditDividendPeriodProxy from "../proxy/CreditDividendPeriodProxy";
import StatisticAgentCreditProxy from "@/views/statistic_agent_credit/proxy/StatisticAgentCreditProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class CreditDividendPeriodDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CreditDividendPeriodProxy = this.getProxy(CreditDividendPeriodProxy);
    private statisticProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private statisticTableColumns = this.statisticProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

    mounted() {
        this.form.plat_id = this.statisticProxy.listQuery.plat_id;
    }

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
        return {
            start_time: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            end_time: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
        };
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
</style>
