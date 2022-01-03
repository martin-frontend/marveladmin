<template>
    <el-dialog :title="$t('common.create')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.black_type.name" prop="black_type">
                <el-select v-model="form.black_type" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.black_type.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
                <p class="desc">
                    {{ $t("plat_blacklist.typeDesc") }}
                </p>
            </el-form-item>

            <el-form-item :label="tableColumns.black_content.name" prop="black_contents">
                <el-input type="textarea" v-model="form.black_contents"></el-input>
                <p class="desc">
                    {{ $t("plat_blacklist.contentDesc1") }}
                    <br />{{ $t("plat_blacklist.contentDesc2") }} <br />{{ $t("plat_blacklist.contentDesc3") }}
                    <br />{{ $t("plat_blacklist.contentDesc4") }}
                </p>
            </el-form-item>

            <el-form-item :label="tableColumns.limit_type.name" prop="limit_type">
                <el-select v-model="form.limit_type" multiple :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.limit_type.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleAdd()">{{ $t("common.save") }}</el-button>
                <el-button @click="myProxy.hideDialog()">{{ $t("common.cancel") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBlacklistProxy from "@/views/plat_blacklist/proxy/PlatBlacklistProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBlacklistDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBlacklistProxy = this.getProxy(PlatBlacklistProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            black_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            black_contents: [
                { required: true, message: this.$t("common.requiredInput"), trigger: "blur" },
            ],
            limit_type: [
                {
                    type: "array",
                    required: true,
                    message: this.$t("common.requiredSelect"),
                    trigger: "blur",
                },
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

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.el-select--medium {
    width: 100%;
}
.desc {
    line-height: 1.5;
    margin: 6px;
}
</style>
