<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :rules="rules" :model="form" label-width="135px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable clearable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="`${tableColumns.type.name}`" prop="type">
                <el-radio-group v-model="form.type" filterable>
                    <el-radio class="radio" :label="TimeType.Now">{{
                        tableColumns.type.options[TimeType.Now]
                    }}</el-radio>
                    <el-radio class="radio" :label="TimeType.Setting">{{
                        tableColumns.type.options[TimeType.Setting]
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="isTimeSetting" size="mini" :label="`${tableColumns.start_time.name}`" prop="start_time">
                <el-date-picker
                    v-model="form.start_time"
                    type="datetime"
                    :placeholder="$t('plat_marquee.dateSelect')"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="margin-right: 16px"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item size="mini" :label="`${tableColumns.app_types.name}`" prop="app_types">
                <el-checkbox
                    v-for="(key, value) in tableColumns.app_types.options"
                    :key="key"
                    :label="Number(value)"
                    v-model="form.app_types"
                >
                    {{ tableColumns.app_types.options[value] }}
                </el-checkbox>
            </el-form-item>
            <el-form-item size="mini" :label="`${tableColumns.content.name}`" prop="content">
                <div class="flex d-flex">
                    <el-input
                        :rows="3"
                        type="textarea"
                        filterable
                        clearable
                        class="select"
                        maxlength="100"
                        :placeholder="$t('common.pleaseEnter')"
                        v-model="form.content"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.content)"
                    >
                        <!-- 翻译 -->
                        {{ $t("user_detail.translate") }}
                    </el-button>
                </div>
                <div class="contentDesc">
                    {{ $t("plat_marquee.contentDesc1")
                    }}<span>{{ myProxy.dialogData.contetnMaxLength - form.content.length }}</span
                    >{{ $t("plat_marquee.contentDesc2") }}
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="$t('plat_marquee.status')">
                <el-switch
                    v-model="form.status"
                    :active-value="StatusType.activated"
                    :inactive-value="StatusType.disactivated"
                    :active-text="$t('common.operating')"
                    :inactive-text="$t('common.close')"
                >
                </el-switch>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{
                    $t("common.delete")
                }}</el-button>
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
import PlatMarqueeProxy from "@/views/plat_marquee/proxy/PlatMarqueeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, dateFormat } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { TimeType, StatusType } from "../proxy/IPlatMarqueeProxy";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component({
    components: {
        SearchDatePicker,
    },
})
export default class PlatMarqueeDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatMarqueeProxy = this.getProxy(PlatMarqueeProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    // Iproxy property
    private TimeType = TimeType;
    private StatusType = StatusType;

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
    @Watch("form.type")
    private onWatchType(value: any) {
        if (value == TimeType.Now) {
            this.form.start_time = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
        }
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            app_types: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            content: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            start_time: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
        };
    }

    get isTimeSetting() {
        return this.form.type == TimeType.Setting;
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

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_MARQUEE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.contentDesc {
    text-align: right;
    span {
        color: red;
    }
}
</style>
