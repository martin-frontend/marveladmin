<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                {{ tableColumns.plat_id.options[listQuery.plat_id] }}
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['app_type'].name" prop="app_type">
                <el-radio-group v-model="form.app_type" filterable clearable @change="handleChange">
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.app_type.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-radio-group v-model="form.languages" filterable clearable @change="handleChange">
                    <el-radio class="radio" :label="null" style="width: 60px">{{ LangUtil("全部") }}</el-radio>
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.languages.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['category'].name">
                <el-radio-group v-model="form.category" filterable @change="handleChange">
                    <el-radio class="radio" :label="null" style="width: 60px">{{ LangUtil("全部") }}</el-radio>
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.category.options"
                        :key="key"
                        :label="key"
                        style="width: 60px"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-table
                ref="multipleTable"
                :data="myProxy.dialogData.productFilterList"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                height="400px"
                v-loading="net_status.loading"
            >
                <el-table-column type="selection" min-width="55"> </el-table-column>
                <el-table-column :label="tableColumns['vendor_id'].name" prop="vendor_id" min-width="120px">
                    <template slot-scope="{ row }">
                        {{ tableColumns.vendor_id.options[row.vendor_id] }}
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns['show_type'].name" prop="show_type" min-width="120px">
                    <template slot-scope="{ row }">
                        {{ tableColumns.show_type.options[row.show_type] }}
                    </template>
                </el-table-column>

                <el-table-column :label="tableColumns['vendor_product_name'].name" prop="vendor_product_name">
                </el-table-column>
                <el-table-column :label="tableColumns['status'].name" class-name="status-col" min-width="100px">
                    <template slot-scope="{ row }">
                        <el-tag :type="row.status | statusFilter">
                            {{ tableColumns.status.options[row.status] }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleAdd()">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import LobbyProductProxy from "@/views/lobby_product/proxy/LobbyProductProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class LobbyProductDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyProductProxy = this.getProxy(LobbyProductProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    listQuery = this.myProxy.listQuery;

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
            app_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            lobby_model_product_ids: [
                {
                    required: this.form.lobby_model_product_ids.length > 0,
                    message: this.LangUtil("必须选择"),
                    trigger: "change",
                },
            ],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    /**表格资料异动 */
    handleSelectionChange(val: any) {
        const ids: any[] = [];
        val.map((item: { lobby_model_product_id: any }) => {
            ids.push(item.lobby_model_product_id);
        });
        this.form.lobby_model_product_ids = ids;
    }
    /**表单异动 */
    handleChange(val: number) {
        this.myProxy.handleFormChange();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
