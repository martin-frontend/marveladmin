<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    filterable
                    v-model="form.plat_id"
                    :placeholder="LangUtil('请选择')"
                    @change="onChangePlatId()"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.coin_name_unique.name" prop="coin_name_unique">
                <el-select
                    filterable
                    v-model="form.coin_name_unique"
                    :placeholder="LangUtil('请选择')"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.coin_name_unique.options"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-select filterable v-model="form.type" :placeholder="LangUtil('请选择')">
                    <el-option v-for="(item, key) of tableColumns.type.options" :label="item" :value="key" :key="key">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="isStatusUpdate" :label="tableColumns.coin_alias.name" prop="coin_alias">
                <el-input maxlength="12" v-model="form.coin_alias"></el-input>
            </el-form-item>

            <el-form-item v-if="form.type == 4" :label="tableColumns.priority.name" prop="priority">
                <el-input type="number" oninput="value=value.replace(/[^\d]/g,'')" min="0" v-model="form.priority">
                </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_types'].name" prop="vendor_types">
                <el-checkbox-group v-model="form.vendor_types" @change="OnChangeVendorTypes">
                    <el-checkbox v-for="(value, key) in tableColumns['vendor_types'].options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="tableColumns.vendor_ids.name" prop="vendor_ids">
                <el-select filterable multiple v-model="form.vendor_ids" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.vendor_ids_by_type.options"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                :label="tableColumns.transfer_coin_name_unique.name"
                prop="transfer_coin_name_unique"
                v-if="form.type == 4"
            >
                <el-select filterable v-model="form.transfer_coin_name_unique" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.transfer_coin_name_unique.options[form.plat_id]"
                        :label="item"
                        :value="key"
                        :key="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.scale.name" prop="scale">
                <el-input-number v-model="form.scale" :min="0" :precision="10" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.bonus_multiple.name" prop="bonus_multiple">
                <el-input-number v-model="form.bonus_multiple" :min="0" :precision="10" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item :label="tableColumns.can_play_game.name" prop="can_play_game">
                <el-radio-group v-model="form.can_play_game">
                    <el-radio
                        v-for="(value, key) in tableColumns.can_play_game.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.is_display.name" prop="is_display">
                <el-radio-group v-model="form.is_display">
                    <el-radio v-for="(value, key) in tableColumns.is_display.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.show_scale.name" prop="show_scale">
                <el-input-number v-model="form.show_scale" :min="0" :precision="10" :step="0.001"></el-input-number>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in tableColumns['languages'].options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div class="btn_group">
            <!-- <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ LangUtil("删除") }}</el-button> -->
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
import PlatBlockCoinsProxy from "@/views/plat_block_coins/proxy/PlatBlockCoinsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBlockCoinsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBlockCoinsProxy = this.getProxy(PlatBlockCoinsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap: any = {
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
            languages: [{ type: "array", required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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

    onChangePlatId() {
        this.form.vendor_ids = [];
        this.form.transfer_coin_name_unique = "";
        this.form.vendor_types = [];
        this.tableColumns.vendor_ids_by_type.options = {};
    }

    /**依照支持产品类型筛选支持产品 */
    OnChangeVendorTypes() {
        this.form.vendor_ids = [];

        let uniqueObject = {};
        this.tableColumns.vendor_ids.options[this.form.plat_id];
        this.form.vendor_types.forEach(key => {
            let selectedObject = this.tableColumns.vendor_ids.options[this.form.plat_id][key];

            if (selectedObject) {
                Object.entries(selectedObject).forEach(([subKey, value]) => {
                    if (!uniqueObject[subKey]) {
                        uniqueObject[subKey] = value;
                    }
                });
            }
        });
        this.tableColumns.vendor_ids_by_type.options = uniqueObject;
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
