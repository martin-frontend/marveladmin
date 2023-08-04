<template>
    <el-dialog width="700px" :title="LangUtil('批量新增标签')" :visible.sync="myProxy.addMutipleTagData.bShow">
        <el-form :rules="rules" ref="form" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item :label="LangUtil('标签人数')">
                <span>{{ myProxy.tableData.multipleSelection.length }}</span>
            </el-form-item>
            <el-form-item :label="LangUtil('选择标签')" prop="tags">
                <el-select
                    v-model="form.tags"
                    multiple
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    style="width: 100%"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.user_tag.options[listQuery.plat_id]"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="footer" @click="handleUpdate">
                    <el-button type="primary">{{ LangUtil("确认保存") }}</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import MultipleUserBody from "./MultipleUserBody.vue";
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch, Vue } from "vue-property-decorator";
import PlatUserProxy from "../proxy/PlatUserProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import ExportDialog from "@/components/ExportDialog.vue";
import { dateFormat } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
@Component({
    components: {
        MultipleUserBody,
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
        ExportDialog,
    },
})
export default class AddMultipleTagDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    net_status = GlobalVar.net_status;
    form = this.myProxy.addMutipleTagData.form;

    get rules() {
        return {};
    }
    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdateTags();
            }
        });
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
