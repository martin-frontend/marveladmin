<template>
    <el-dialog
        :visible.sync="myProxy.fieldSelectionData.bShow"
        width="600px"
        class="dialog"
        :close-on-click-modal="false"
        :show-close="false"
        :title="LangUtil('导出栏位')"
    >
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
            {{ LangUtil("全选") }}
        </el-checkbox>
        <el-checkbox-group v-model="myProxy.exportData.fieldOrder" @change="handleCheckedFieldsChange">
            <el-row>
                <template v-for="key in fieldOptions">
                    <el-col :span="8" :key="key" v-if="tableColumns[key]">
                        <el-checkbox :label="key">{{ tableColumns[key].name }}</el-checkbox>
                    </el-col>
                </template>
            </el-row>
        </el-checkbox-group>
        <div class="group">
            <el-button class="item" size="mini" @click="myProxy.fieldSelectionData.bShow = false">
                {{ LangUtil("取消") }}
            </el-button>
            <el-button
                :disabled="myProxy.exportData.fieldOrder.length == 0"
                type="primary"
                class="item"
                size="mini"
                @click="handleSubmit"
                >{{ LangUtil("确定") }}</el-button
            >
        </div>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import PlatUsersEventRecordProxy from "../../proxy/PlatUsersEventRecordProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class FieldSelectionDialog extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: PlatUsersEventRecordProxy = this.getProxy(PlatUsersEventRecordProxy);
    fieldOptions = this.myProxy.fieldSelectionData.fieldOptions;
    tableColumns = this.myProxy.tableData.columns;
    isIndeterminate = false;
    checkAll = true;

    handleSubmit() {
        this.myProxy.fieldSelectionData.bShow = false;
        this.myProxy.onQueryExportData();
    }

    handleCheckAllChange(val: any) {
        this.myProxy.exportData.fieldOrder = val ? this.fieldOptions : [];
        this.isIndeterminate = false;
    }

    handleCheckedFieldsChange(value: any) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fieldOptions.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fieldOptions.length;
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog {
    padding-top: 8rem;
}
.group {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

::v-deep .el-checkbox__label {
    display: inline-grid;
    white-space: pre-line;
    padding-right: 20px;
}
</style>
