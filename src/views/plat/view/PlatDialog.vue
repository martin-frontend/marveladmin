<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="90%">
        <el-form ref="form" :rules="rules" :model="form" label-width="125px" v-loading="net_status.loading">
            <el-scrollbar>
                <el-form-item size="mini" :label="tableColumns['plat_name'].name" prop="plat_name">
                    <el-input v-model="form.plat_name" :placeholder="LangUtil('请输入')"></el-input>
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
                <!-- "钱包类型" -->
                <el-form-item size="mini" :label="tableColumns['vendor_wallet_types'].name" prop="vendor_wallet_types">
                    <el-checkbox-group v-model="form.vendor_wallet_types">
                        <el-checkbox
                            v-for="(value, key) in tableColumns.vendor_wallet_types.options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <!-- "注册方式" -->
                <el-form-item size="mini" :label="tableColumns['register_types'].name" prop="register_types">
                    <el-checkbox-group v-model="form.register_types">
                        <el-checkbox
                            v-for="(value, key) in tableColumns.register_types.options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['auth_types'].name">
                    <el-select v-model="form.auth_types" filterable class="select" :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns.auth_types.options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['language'].name" prop="language">
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

                <el-form-item size="mini" :label="tableColumns['main_language'].name" prop="main_language">
                    <el-select v-model="form.main_language" filterable class="select" :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns.main_language.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
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
                    <div class="water_config">
                        <div class="water_config_item" v-for="(value, key) in waterData" :key="key">
                            <div class="title">{{ value }}</div>
                            <template v-if="form.water_config[key]">
                                <el-select
                                    v-model="form.water_config[key].type"
                                    filterable
                                    :placeholder="LangUtil('请选择')"
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
                            style="width: 400px"
                            v-for="(value, key) in tableColumns.vendor_type.options"
                            :key="key"
                        >
                            <div style="margin-right: 10px; min-width: 140px; text-align: right;">{{ value }}</div>
                            <el-input type="number" min="0" v-model="form.promotion_floor[key]"></el-input>
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
                            <span class="title_1">{{ tableColumns.is_promotion_same.name }}</span>
                            <el-select class="select" v-model="form.is_promotion_same">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_promotion_same.options"
                                    :key="key"
                                    :label="value"
                                    :value="key"
                                ></el-option>
                            </el-select>
                            <span class="desc" v-if="form.is_promotion_same == 0"
                                >({{ LangUtil("设置保底金额不能与上级相同") }})</span
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
                            <span class="title">{{ LangUtil("开关设定") }}</span>
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
                        <div>
                            <span class="title_1">{{ tableColumns.game_cost_rate.name }}</span>
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
                            <span class="title_1">{{ tableColumns.agent_bonus_rate_limit.name }}</span>
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
                    <div class="el_select_group"></div>
                </el-form-item>
                <!--开关设定 -->
                <el-form-item size="mini" :label="LangUtil('开关设定')" prop="">
                    <div class="el_select_group">
                        <div>
                            <span class="title_switch">{{ tableColumns["is_bind_phone_award"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_bind_phone_exchange"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_exchange">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_exchange.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_bet_water_display"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_promotion_statistics_display"].name }}</span>
                            <el-select class="select" v-model="form.is_promotion_statistics_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_promotion_statistics_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_bind_phone_transfer"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_bind_real_name"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_real_name">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_real_name.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_password_gold_transfer"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_show_message_win"].name }}</span>
                            <el-select class="select" v-model="form.is_show_message_win">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_show_message_win.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_bet_gold_display"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_win_gold_display"].name }}</span>
                            <el-select class="select" v-model="form.is_win_gold_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_win_gold_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_open_registration"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_force_short_chain"].name }}</span>
                            <el-select class="select" v-model="form.is_force_short_chain">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_force_short_chain.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_game_with_parent"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_bind_phone_recharge"].name }}</span>
                            <el-select class="select" v-model="form.is_bind_phone_recharge">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_bind_phone_recharge.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_win_leaderboard_display"].name }}</span>
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
                            <span class="title_switch">{{ tableColumns["is_water_leaderboard_display"].name }}</span>
                            <el-select class="select" v-model="form.is_water_leaderboard_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_water_leaderboard_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_recharge_leaderboard_display"].name }}</span>
                            <el-select class="select" v-model="form.is_recharge_leaderboard_display">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_recharge_leaderboard_display.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_show_commission"].name }}</span>
                            <el-select v-model="form.is_show_commission" class="select">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_show_commission.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_gold_exchange"].name }}</span>
                            <el-select class="select" v-model="form.is_gold_exchange">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_gold_exchange.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{
                                tableColumns["is_exchange_fail_automatic_refund"].name
                            }}</span>
                            <el-select class="select" v-model="form.is_exchange_fail_automatic_refund">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_exchange_fail_automatic_refund.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_first_login_send_sms"].name }}</span>
                            <el-select class="select" v-model="form.is_first_login_send_sms">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_first_login_send_sms.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_user_manual_refund"].name }}</span>
                            <el-select class="select" v-model="form.is_user_manual_refund">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_user_manual_refund.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>

                        <div>
                            <span class="title_switch">{{ tableColumns["is_user_verification"].name }}</span>
                            <el-select class="select" v-model="form.is_user_verification">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_user_verification.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="title_switch">{{ tableColumns["is_active_digital_currency"].name }}</span>
                            <el-select class="select" v-model="form.is_active_digital_currency">
                                <el-option
                                    v-for="(value, key) in tableColumns.is_active_digital_currency.options"
                                    :key="key"
                                    :label="value"
                                    :value="Number(key)"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item size="mini" :label="LangUtil('金币划转')" prop="">
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
                <el-form-item size="mini" :label="LangUtil('投注记录')">
                    <div class="item-content">
                        <span>{{ tableColumns["bet_log_keep_days"].name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            v-model="form.bet_log_keep_days"
                            oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                        ></el-input>
                    </div>
                    <div class="item-content">
                        <span>{{ tableColumns["bet_log_search_days"].name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            v-model="form.bet_log_search_days"
                            oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                        ></el-input>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('兑换')">
                    <div class="item-content">
                        <span>{{ tableColumns.exchange_count.name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            v-model="form.exchange_count"
                            oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                        ></el-input>
                    </div>
                    <div class="item-content">
                        <span>{{ tableColumns.max_exchange_gold.name }}：</span>
                        <el-input class="select" type="number" v-model="form.max_exchange_gold"></el-input>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('注册IP人数')">
                    <div class="item-content">
                        <span>{{ tableColumns.register_same_ip_limit.name }}：</span>
                        <el-input
                            class="select"
                            type="number"
                            min="0"
                            max="999"
                            v-model="form.register_same_ip_limit"
                            oninput="value=value.replace(/[^\d]/g,'');if(value >999)value=999"
                        ></el-input>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('受限国家')">
                    <div class="el_select_group">
                        <span>{{ tableColumns.forbidden_country.name }}：</span>
                        <el-input class="select" v-model="form.forbidden_country"></el-input>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['client_config'].name" prop="client_config">
                    <div class="editor-container">
                        <json-editor ref="jsonEditor" v-model="form.client_config" />
                    </div>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['other_config'].name" prop="other_config">
                    <div class="editor-container">
                        <json-editor ref="jsonEditor" v-model="form.other_config" />
                    </div>
                </el-form-item>
            </el-scrollbar>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.plat_update)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }

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

    get waterData() {
        let result: any = JSON.parse(JSON.stringify(this.tableColumns.vendor_type.options));
        delete result[0];
        return result;
    }

    get rules() {
        return {
            register_types: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            plat_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            app_types: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            status: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            currency_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            language: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            api_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            validate_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            main_language: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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
.water_config {
    display: flex;
    flex-wrap: wrap;
}
.water_config_item {
    display: flex;
    margin-bottom: 10px;
    .title {
        margin-right: 8px;
        text-align: right;
        min-width: 150px;
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
    flex-wrap: wrap;
    .title {
        text-align: right;
        display: inline-block;
        width: 120px;
        margin-right: 8px;
    }
    .title_switch {
        display: inline-block;
        min-width: 320px;
        text-align: right;
        margin-right: 8px;
        margin-bottom: 5px;
    }
    .title_1 {
        margin-right: 8px;
        text-align: right;
        margin-left: 32px;
        display: inline-block;
        width: 120px;
    }
    .title_2 {
        margin-left: 12px;
        display: inline-block;
        width: 100px;
    }
    .select {
        width: 90px;
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

::v-deep .el-scrollbar {
    height: 100%;
}
::v-deep .el-dialog {
    margin-top: 0 !important;
    height: 99%;
}

::v-deep .el-dialog__body {
    height: 95%;
}

::v-deep .el-form {
    height: 90%;
}
</style>
