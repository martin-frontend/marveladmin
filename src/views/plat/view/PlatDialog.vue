<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="900px">
        <el-form ref="form" :rules="rules" :model="form" label-width="125px" v-loading="net_status.loading">
            <el-scrollbar style="height: 430px">
                <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                    <el-input v-model="form.plat_name" :placeholder="$t('common.pleaseEnter')"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['app_types'].name" prop="app_types">
                    <el-checkbox-group v-model="form.app_types">
                        <el-checkbox
                            v-for="(value, key) in tableColumns.app_types.options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['currency_type'].name" prop="currency_type">
                    <el-radio-group v-model="form.currency_type">
                        <el-radio v-for="(value, key) in tableColumns.currency_type.options" :key="key" :label="key">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['language'].name" prop="language">
                    <!-- <el-radio-group v-model="form.language">
                        <el-radio v-for="(value, key) in tableColumns.language.options" :key="key" :label="key">
                            {{ value }}
                        </el-radio>
                    </el-radio-group> -->
                    <el-checkbox-group v-model="form.language">
                        <el-checkbox
                            v-for="(value, key) in Object.values(tableColumns.language.options)"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item size="mini" :label="`${tableColumns.status.name}`" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 类型 -->
                <el-form-item size="mini" :label="tableColumns['api_type'].name" prop="api_type">
                    <el-radio-group v-model="form.api_type">
                        <el-radio v-for="(value, key) in tableColumns.api_type.options" :key="key" :label="Number(key)">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 安全设置 -->
                <el-form-item size="mini" :label="tableColumns['validate_type'].name" prop="validate_type">
                    <el-checkbox-group v-model="form.validate_type">
                        <el-checkbox
                            v-for="(value, key) in tableColumns.validate_type.options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <!--流水配置 -->
                <el-form-item size="mini" :label="tableColumns['water_config'].name" prop="water_config">
                    <div class="water_config_item" v-for="(value, key) in waterData" :key="key">
                        <div class="title">{{ value }}</div>
                        <template v-if="form.water_config[key]">
                            <el-select
                                v-model="form.water_config[key].type"
                                filterable
                                :placeholder="$t('common.pleaseChoose')"
                            >
                                <el-option
                                    v-for="(value, key) in tableColumns.vendor_type.options_type[0]"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                ></el-option>
                            </el-select>
                            <el-input-number
                                size="mini"
                                :min="Number(tableColumns.vendor_type.options_rate[0].min)"
                                :max="Number(tableColumns.vendor_type.options_rate[0].max)"
                                :step="0.01"
                                :precision="2"
                                controls-position="right"
                                v-model="form.water_config[key].rate"
                            >
                            </el-input-number>
                        </template>
                    </div>
                </el-form-item>
                <!--代理保底 -->
                <el-form-item
                    size="mini"
                    class="switch_setting"
                    :label="tableColumns['promotion_floor'].name"
                    prop="promotion_floor"
                >
                    <div class="vendor_type">
                        <div
                            class="dropdown-item"
                            style="width: 180px"
                            v-for="(value, key) in tableColumns.vendor_type.options"
                            :key="key"
                        >
                            <div style="margin-right: 10px; width: 40px">{{ value }}</div>
                            <el-input
                                type="number"
                                min="0"
                                max="999"
                                v-model="form.promotion_floor[key]"
                                oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                            ></el-input>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns.promotion_floor_unit.name }}</span>
                            <el-input
                                style="width: 90px"
                                type="number"
                                min="0"
                                step="0.001"
                                v-model="form.promotion_floor_unit"
                                @keydown.native="inputLimit"
                            ></el-input>
                        </div>
                        <div>
                            <span class="title_1" style="margin-left: 10px">{{
                                tableColumns.is_promotion_same.name
                            }}</span>
                            <el-select class="select" v-model="form.is_promotion_same">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_promotion_same.options"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                ></el-option>
                            </el-select>
                            <span class="desc" v-if="form.is_promotion_same == 0"
                                >({{ $t("plat.promotionDesc") }})</span
                            >
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_promotion_solid"].name }}</span>
                            <el-select class="select" v-model="form.is_promotion_solid">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_promotion_solid.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <!--总代分红 -->
                <el-form-item size="mini" class="switch_setting" :label="tableColumns['is_agent_bonus'].name">
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ $t("plat.switchSetting") }}</span>
                            <el-select class="select" v-model="form.is_agent_bonus">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_agent_bonus.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns.recharge_cost_rate.name }}</span>
                            <el-input
                                style="width: 90px"
                                type="number"
                                min="0"
                                step="0.001"
                                v-model="form.recharge_cost_rate"
                                @keydown.native="inputLimit"
                            ></el-input>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns.game_cost_rate.name }}</span>
                            <el-input
                                style="width: 90px"
                                type="number"
                                min="0"
                                step="0.001"
                                v-model="form.game_cost_rate"
                                @keydown.native="inputLimit"
                            ></el-input>
                        </div>
                        <div>
                            <span class="title_2">{{ tableColumns.agent_bonus_rate_limit.name }}</span>
                            <el-input
                                style="width: 90px"
                                type="number"
                                min="0"
                                max="0.5"
                                step="0.001"
                                v-model="form.agent_bonus_rate_limit"
                                @keydown.native="inputLimit"
                                oninput="if(value > 0.5) value = 0.5;"
                            ></el-input>
                        </div>
                    </div>
                </el-form-item>
                <!--开关设定 -->
                <el-form-item size="mini" :label="$t('plat.switchSetting')" prop="">
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_bind_phone_award"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_award">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_award.options"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_bind_phone_exchange"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_exchange">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_exchange.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_bet_water_display"].name }}</span>
                            <el-select class="select" v-model="form.is_bet_water_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bet_water_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_promotion_statistics_display"].name }}</span>
                            <el-select class="select" v-model="form.is_promotion_statistics_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_promotion_statistics_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_bind_phone_transfer"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_transfer">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_transfer.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_bind_real_name"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_real_name">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_real_name.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_password_gold_transfer"].name }}</span>
                            <el-select class="select" v-model="form.is_password_gold_transfer">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_password_gold_transfer.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_show_message_win"].name }}</span>
                            <el-select class="select" v-model="form.is_show_message_win">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_show_message_win.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_bet_gold_display"].name }}</span>
                            <el-select class="select" v-model="form.is_bet_gold_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bet_gold_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_win_gold_display"].name }}</span>
                            <el-select class="select" v-model="form.is_win_gold_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_win_gold_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_open_registration"].name }}</span>
                            <el-select class="select" v-model="form.is_open_registration">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_open_registration.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_force_short_chain"].name }}</span>
                            <el-select class="select" v-model="form.is_force_short_chain">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_force_short_chain.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_game_with_parent"].name }}</span>
                            <el-select class="select" v-model="form.is_game_with_parent">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_game_with_parent.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_bind_phone_recharge"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_recharge">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_recharge.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <!--  -->
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_win_leaderboard_display"].name }}</span>
                            <el-select class="select" v-model="form.is_win_leaderboard_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_win_leaderboard_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_1">{{ tableColumns["is_water_leaderboard_display"].name }}</span>
                            <el-select class="select" v-model="form.is_water_leaderboard_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_water_leaderboard_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="el_select_group">
                        <div>
                            <span class="title">{{ tableColumns["is_recharge_leaderboard_display"].name }}</span>
                            <el-select class="select" v-model="form.is_recharge_leaderboard_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_recharge_leaderboard_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item size="mini" :label="$t('plat.goldTransfer')" prop="">
                    <div class="item-content">
                        <span>{{ tableColumns["is_gold_transfer"].name }}：</span>
                        <el-select v-model="form.is_gold_transfer" class="select">
                            <el-option
                                v-for="(value, key) in tableColumns.is_gold_transfer.options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="item-content">
                        <span>{{ tableColumns["gold_transfer_fee"].name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            step="0.001"
                            v-model="form.gold_transfer_fee"
                        ></el-input>
                    </div>
                    <div class="item-content">
                        <span>{{ tableColumns["gold_transfer_water_multiple"].name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            v-model="form.gold_transfer_water_multiple"
                            oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                        ></el-input>
                    </div>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['extends'].name" prop="extends">
                    <div class="editor-container">
                        <json-editor ref="jsonEditor" v-model="form.extends" />
                    </div>
                </el-form-item>
            </el-scrollbar>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.plat_update)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ $t("common.delete") }}</el-button
                >
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
import PlatProxy from "@/views/plat/proxy/PlatProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class PlatDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }

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

    get waterData() {
        let result: any = JSON.parse(JSON.stringify(this.tableColumns.vendor_type.options));
        delete result[0];
        return result;
    }

    get rules() {
        return {
            plat_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            app_types: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            currency_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            language: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            api_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            validate_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.plat_id);
    }

    inputLimit(e: any) {
        let key = e.key;
        if (key === "-" || key === "e") {
            e.returnValue = false;
            return false;
        }
        return true;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.water_config_item {
    display: flex;
    margin-bottom: 10px;
    .title {
        width: 60px;
    }
    .el-select {
        margin-right: 10px;
        width: 120px;
    }
}
.switch_setting {
    .vendor_type {
        display: flex;
        flex-wrap: wrap;
    }
}
.el_select_group {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    .title {
        display: inline-block;
        width: 120px;
    }
    .title_1 {
        margin-left: 32px;
        display: inline-block;
        width: 100px;
    }
    .title_2 {
        margin-left: 12px;
        display: inline-block;
        width: 100px;
    }
    .select {
        width: 70px;
    }
    .desc {
        color: red;
        font-size: 12px;
    }
}
.item-content {
    display: inline-table;
    margin-bottom: 5px;
    margin-right: 10px;
    span {
        width: 150px;
    }
    .select {
        width: 150px;
    }
}
::v-deep .el-scrollbar__wrap {
    overflow-x: auto;
}
</style>
