<template>
    <!-- 添加/编辑 充值通道编辑 -->
    <el-dialog
        width="850px"
        :title="textMap[status]"
        :visible.sync="myProxy.addDialogData.bShow"
        append-to-body
        class="innerVisible"
    >
        <el-form
            :model="addFrom"
            :rules="rules"
            label-width="150px"
            ref="form"
            class="demo-ruleForm"
            v-loading="net_status.loading"
        >
            <!-- 充值方式 -->
            <!-- <el-form-item :label="tableColumns['paymethod_id'].name" prop="paymethod_id">
                <span>{{ tableColumns["paymethod_id"].options[addFrom.paymethod_id] }}</span>
            </el-form-item> -->
            <!-- 币种 -->
            <el-form-item size="mini" :label="tableColumns['coin_name_unique'].name" prop="coin_name_unique">
                <el-select
                    v-model="addFrom.coin_name_unique"
                    filterable
                    clearable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    @change="getBlockNetworkOptions"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['coin_network_map'].options[form.plat_id]"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 链 -->
            <el-form-item size="mini" :label="tableColumns['block_network_id'].name" prop="block_network_id">
                <el-select v-model="addFrom.block_network_id" class="select" placeholder="请选择">
                    <el-option
                        v-for="(value, key) in blockNetworkOptions"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <!-- 充值说明 -->
            <el-form-item :label="`${tableColumns.subtitle.name}`">
                <div class="flex d-flex">
                    <el-input
                        v-model="addFrom.subtitle"
                        :placeholder="LangUtil('请输入')"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(addFrom.subtitle)"
                    >
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <!-- 提示信息 -->
            <el-form-item :label="`${tableColumns.notice.name}`">
                <div class="flex d-flex">
                    <el-input
                        v-model="addFrom.notice"
                        :placeholder="LangUtil('请输入')"
                        type="textarea"
                        filterable
                        clearable
                        class="select"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(addFrom.notice)"
                    >
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <!-- 充值最小额度 -->
            <el-form-item :label="`${tableColumns.min_gold.name}`" prop="min_gold">
                <el-input v-model="addFrom.min_gold" type="number" min="0" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <!-- 充值最大额度 -->
            <el-form-item :label="`${tableColumns.max_gold.name}`" prop="max_gold">
                <el-input v-model="addFrom.max_gold" type="number" min="0" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>

            <!-- 是否固定充值额度 -->
            <el-form-item :label="`${tableColumns.is_fixed_gold.name}`">
                <el-radio v-model="addFrom.is_fixed_gold" label="1">{{ LangUtil("是") }}</el-radio>
                <el-radio v-model="addFrom.is_fixed_gold" label="0">{{ LangUtil("否") }}</el-radio>
            </el-form-item>
            <!-- 充值金额 -->
            <div class="recharge_amount">
                <el-form-item :label="`${tableColumns.fixed_gold_list.name}`" prop="fixed_gold_list">
                    <div class="item-group">
                        <el-input
                            v-for="n in 4"
                            :key="n"
                            v-model="addFrom.fixed_gold_list[n - 1]"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            :placeholder="LangUtil('金额') + `${n}`"
                        ></el-input>
                    </div>
                    <div class="item-group">
                        <el-input
                            v-for="n in 4"
                            :key="n"
                            v-model="addFrom.fixed_gold_list[n + 3]"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            :placeholder="LangUtil('金额') + `${n + 4}`"
                        ></el-input>
                    </div>
                </el-form-item>
            </div>

            <!-- 状态 -->
            <el-form-item :label="`${tableColumns.status.name}`">
                <el-radio v-model="addFrom.status" label="1">{{ LangUtil("正常") }}</el-radio>
                <el-radio v-model="addFrom.status" label="98">{{ LangUtil("关闭") }}</el-radio>
            </el-form-item>
            <div class="btn-group">
                <el-form-item>
                    <el-button
                        type="danger"
                        v-if="isStatusUpdate && checkUnique(unique.recharge_channels_paymethods_delete)"
                        @click="handleDelete()"
                        >{{ LangUtil("删除") }}</el-button
                    >
                    <el-button
                        type="primary"
                        v-if="isStatusUpdate && checkUnique(unique.recharge_channels_paymethods_update)"
                        @click="handleUpdate()"
                        >{{ LangUtil("确认保存") }}</el-button
                    >
                    <el-button
                        type="primary"
                        v-if="!isStatusUpdate && checkUnique(unique.recharge_channels_paymethods_store)"
                        @click="onAdd()"
                        >{{ LangUtil("确认保存") }}</el-button
                    >
                </el-form-item>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeChannelsPaymethodsProxy from "@/views/recharge_channels_paymethods/proxy/RechargeChannelsPaymethodsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class RechargeChannelsPaymethodsEditDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeChannelsPaymethodsProxy = this.getProxy(RechargeChannelsPaymethodsProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    tableColumns: any = this.myProxy.dialogTableData.columns;
    list = this.myProxy.channelList;
    form: any = this.myProxy.dialogData.form;
    addFrom = this.myProxy.addDialogData.form;
    //练 下拉选单
    blockNetworkOptions: any = [];

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    /**二级联动 链 */
    getBlockNetworkOptions() {
        this.blockNetworkOptions = this.tableColumns.coin_network_map.options[this.form.plat_id][
            this.addFrom.coin_name_unique
        ].options;
    }

    @Watch("addFrom.coin_name_unique")
    onWatchCoinNameUnique() {
        if (this.isStatusUpdate) {
            this.getBlockNetworkOptions();
        }
    }

    @Watch("myProxy.addDialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.addDialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            block_network_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            coin_name_unique: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            paymethod_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            title: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            min_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            max_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }

    onAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleEdit(data: any) {
        this.myProxy.showAddDialog(DialogStatus.update, data);
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.addFrom.id);
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_RECHARGE_EXCHANGE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.title-group {
    .title-item {
        display: flex;
        padding: 6px 0;
        font-weight: bold;
        span {
            margin-right: 16px;
        }
        p {
            margin: 0;
        }
    }
}
.table {
    margin: 16px 0;
}
.create_channel_btn {
    margin-top: 16px;
}

.innerVisible {
    ::v-deep .el-select {
        width: 100%;
    }
    ::v-deep .btn-group {
        display: flex;
        justify-content: flex-end;
    }
    .recharge_amount .item-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        ::v-deep .el-input--medium {
            width: 100px;
            display: inline-block;
        }
    }
}
</style>
