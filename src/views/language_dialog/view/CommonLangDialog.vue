<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.key.name" prop="key">
                <el-input v-if="!isStatusUpdate" :placeholder="`${tableColumns.key.name}`" v-model="form.key"></el-input>
                <span v-else>
                    {{ form.key }}
                </span>
            </el-form-item>

            <div v-for="(value, key) in tableColumns.language.options" :key="key" :value="value">
                <el-form-item :label="value" prop="value">
                    <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            filterable
                            clearable
                            :placeholder="`${tableColumns[key].name}`"
                            v-model="form[key]"
                        ></el-input>
                        <el-button type="primary" size="mini" @click="handleTranslate(key, form[key])">一键翻译成其他语言</el-button>
                    </div>
                </el-form-item>
            </div>

            <el-form-item class="dialog-footer">
                <!-- <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{
                    $t("common.delete")
                }}</el-button> -->
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import CommonLangProxy from "../proxy/CommonLangProxy";
import CommonLangMediator from "../mediator/CommonLangMediator";

@Component({
    components: {

    },
})
export default class CommonLangDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
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

    constructor() {
        super(CommonLangMediator);
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            module: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            key: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            plat_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                console.log("handleAdd");
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                console.log("handleUpdate");
                this.myProxy.onUpdate();
            }
        });
    }

    handleTranslate(source: string, sentence: string) {
        this.myProxy.translate({"source": source, "sentence": sentence, plat_id: this.form.plat_id, id: this.form.id});
    }

    // private handleDelete() {
    //     this.myProxy.onDelete(this.form.id);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
