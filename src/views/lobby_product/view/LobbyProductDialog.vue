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
            <el-form-item size="mini" :label="tableColumns['category'].name">
                <el-radio-group v-model="form.category" filterable @change="handleChange">
                    <el-radio class="radio" :label="null" style="width: 60px">{{ $t("common.all") }}</el-radio>
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
                max-height="400px"
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
                <el-button type="primary" size="mini" @click="handleAdd()">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: LobbyProductProxy = this.getProxy(LobbyProductProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    private listQuery = this.myProxy.listQuery;

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
        return {
            app_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            lobby_model_product_ids: [
                { required: this.form.lobby_model_product_ids.length > 0, message: this.$t("common.requiredSelect"), trigger: "change" },
            ],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    /**表格资料异动 */
    private handleSelectionChange(val: any) {
        const ids: any[] = [];
        val.map((item: { lobby_model_product_id: any }) => {
            ids.push(item.lobby_model_product_id);
        });
        this.form.lobby_model_product_ids = ids;
    }
    /**表单异动 */
    private handleChange(val: number) {
        this.myProxy.handleFormChange();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
