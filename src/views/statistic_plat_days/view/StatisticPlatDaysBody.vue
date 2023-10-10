<template>
    <div>
        <el-tabs v-model="myProxy.tableData.activeName">
            <el-tab-pane :label="LangUtil('平台每日统计')" name="stats"> </el-tab-pane>
            <el-tab-pane :label="LangUtil('平台每日汇总')" name="summary"> </el-tab-pane>
        </el-tabs>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column
                prop="created_date"
                :label="tableColumns['created_date'].name"
                align="center"
                width="110px"
            >
            </el-table-column>

            <el-table-column :label="LangUtil('平台信息')" align="left" width="150px">
                <template slot-scope="{ row }">
                    <div>
                        <div v-if="row.plat_id === '合计' || row.plat_id === LangUtil('合计')">{{ row.plat_id }}</div>
                        <div v-else>
                            <div>{{ LangUtil("平台") }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                            <div v-if="myProxy.tableData.activeName == 'stats'">
                                {{ LangUtil("渠道") }}：{{ row.channel_id }}
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="new_register_device"
                :label="tableColumns['new_register_device'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_register_device'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_register_device"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_register.display"
                prop="new_register"
                :label="tableColumns['new_register'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['new_register'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_register"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="effective_new_rate"
                :label="tableColumns['effective_new_rate'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['effective_new_rate'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["effective_new_rate"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.effective_new_rate != null">{{ row.effective_new_rate }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge.display"
                prop="recharge"
                :label="tableColumns['recharge'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['recharge'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["recharge"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.recharge" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                prop="new_user_recharge"
                :label="tableColumns['new_user_recharge'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_user_recharge'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_user_recharge"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="old_user_recharge"
                :label="tableColumns['old_user_recharge'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['old_user_recharge'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["old_user_recharge"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.recharge_user.display"
                prop="recharge_user"
                :label="tableColumns['recharge_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['recharge_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["recharge_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_recharge_user.display"
                prop="new_recharge_user"
                :label="tableColumns['new_recharge_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_recharge_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_recharge_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.rech_amt.display"
                prop="rech_amt"
                :label="tableColumns['rech_amt'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['rech_amt'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["rech_amt"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.rech_amt != null">{{ row.rech_amt }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="new_recharge_rate"
                :label="tableColumns['new_recharge_rate'].name"
                align="center"
                min-width="120"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_recharge_rate'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_recharge_rate"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.new_recharge_rate != null">{{ row.new_recharge_rate }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_reg_rech_total.display"
                prop="new_reg_rech_total"
                :label="tableColumns['new_reg_rech_total'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_reg_rech_total'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_reg_rech_total"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>

                <template slot-scope="{ row }">
                    <span v-if="row.new_reg_rech_total != null">{{ row.new_reg_rech_total }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_reg_first_rech_count.display"
                prop="new_reg_first_rech_count"
                :label="tableColumns['new_reg_first_rech_count'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_reg_first_rech_count'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_reg_first_rech_count"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange.display"
                prop="exchange"
                :label="tableColumns['exchange'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['exchange'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["exchange"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.exchange" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exchange_user.display"
                prop="exchange_user"
                :label="tableColumns['exchange_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['exchange_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["exchange_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.net_rech.display"
                prop="net_rech"
                :label="tableColumns['net_rech'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['net_rech'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["net_rech"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.net_rech != null">{{ row.net_rech }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.channel_profit.display"
                prop="channel_profit"
                :label="tableColumns['channel_profit'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['channel_profit'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["channel_profit"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.channel_profit != null">
                        <WinLossDisplay :amount="row.channel_profit"></WinLossDisplay>
                    </span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.exch_amt.display"
                prop="exch_amt"
                :label="tableColumns['exch_amt'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['exch_amt'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["exch_amt"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.exch_amt != null">{{ row.exch_amt }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_exch_count.display"
                prop="new_exch_count"
                :label="tableColumns['new_exch_count'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_exch_count'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_exch_count"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.new_exchange_user.display"
                prop="new_exchange_user"
                :label="tableColumns['new_exchange_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_exchange_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_exchange_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.gift_gold.display"
                prop="gift_gold"
                :label="tableColumns['gift_gold'].name"
                align="center"
                min-width="100px"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['gift_gold'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["gift_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.gift_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.mail_gift_gold.name"
                align="center"
                min-width="120"
                prop="mail_gift_gold"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['mail_gift_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["mail_gift_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.activity_gift_gold.name"
                align="center"
                min-width="120"
                prop="activity_gift_gold"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['activity_gift_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["activity_gift_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.activity_coin_get.name"
                align="center"
                min-width="120"
                prop="activity_coin_get"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['activity_coin_get'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["activity_coin_get"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.activity_gold_exchange.name"
                align="center"
                min-width="120"
                prop="activity_gold_exchange"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['activity_gold_exchange'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["activity_gold_exchange"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.backwater_gold.display"
                prop="backwater_gold"
                :label="tableColumns['backwater_gold'].name"
                align="center"
                min-width="100px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['backwater_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["backwater_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.backwater_gold" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.win_loss.display"
                prop="win_loss"
                :label="tableColumns['win_loss'].name"
                align="center"
                min-width="130"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['win_loss'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["win_loss"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_loss"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                prop="pure_win_loss"
                :label="tableColumns['pure_win_loss'].name"
                align="center"
                min-width="130"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['pure_win_loss'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["pure_win_loss"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.pure_win_loss"></WinLossDisplay>
                </template>
            </el-table-column>

            <el-table-column
                v-if="tableColumns.commission_gold.display"
                prop="commission_gold"
                :label="tableColumns['commission_gold'].name"
                align="center"
                min-width="130"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['commission_gold'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["commission_gold"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.water.display"
                prop="water"
                :label="tableColumns['water'].name"
                align="center"
                min-width="130"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['water'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["water"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.water" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                prop="new_register_water"
                :label="tableColumns['new_register_water'].name"
                align="center"
                min-width="130"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_register_water'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_register_water"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.new_register_water" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                v-if="tableColumns.active_user.display"
                prop="active_user"
                :label="tableColumns['active_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['active_user'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["active_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!-- 周活跃用户 -->
            <!-- <el-table-column
                prop="active_user_week"
                :label="tableColumns['active_user_week'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['active_user_week'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["active_user_week"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <!-- 月活跃用户 -->
            <!-- <el-table-column
                prop="active_user_month"
                :label="tableColumns['active_user_month'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['active_user_month'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["active_user_month"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column> -->
            <el-table-column
                prop="active_user_recharge"
                :label="tableColumns['active_user_recharge'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['active_user_recharge'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["active_user_recharge"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="active_recharge_user"
                :label="tableColumns['active_recharge_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['active_recharge_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["active_recharge_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="recharge_seep_rate"
                :label="tableColumns['recharge_seep_rate'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['recharge_seep_rate'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["recharge_seep_rate"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.recharge_seep_rate != null">{{ row.recharge_seep_rate }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column prop="arpu_rate" :label="tableColumns['arpu_rate'].name" align="center" min-width="100">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['arpu_rate'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["arpu_rate"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.arpu_rate != null">{{ row.arpu_rate }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column prop="arppu_rate" :label="tableColumns['arppu_rate'].name" align="center" min-width="100">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['arppu_rate'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["arppu_rate"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.arppu_rate != null">{{ row.arppu_rate }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="p_user_rech"
                :label="tableColumns['p_user_rech'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['p_user_rech'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["p_user_rech"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.p_user_rech != null">{{ row.p_user_rech }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="p_rech_per_user"
                :label="tableColumns['p_rech_per_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['p_rech_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["p_rech_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.p_rech_per_user != null">{{ row.p_rech_per_user }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column prop="dau" :label="tableColumns['dau'].name" align="center" min-width="100">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['dau'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["dau"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.dau != null">{{ row.dau }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="new_user_arpu"
                :label="tableColumns['new_user_arpu'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_user_arpu'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_user_arpu"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.new_user_arpu != null">{{ row.new_user_arpu }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="new_user_arppu"
                :label="tableColumns['new_user_arppu'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_user_arppu'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_user_arppu"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.new_user_arppu != null">{{ row.new_user_arppu }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="d_exch_amt_per_user"
                :label="tableColumns['d_exch_amt_per_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['d_exch_amt_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["d_exch_amt_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.d_exch_amt_per_user != null">{{ row.d_exch_amt_per_user }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="d_user_cont_per_user"
                :label="tableColumns['d_user_cont_per_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['d_user_cont_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["d_user_cont_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.d_user_cont_per_user != null">{{ row.d_user_cont_per_user }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="d_exch_amt_per_dau"
                :label="tableColumns['d_exch_amt_per_dau'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['d_exch_amt_per_dau'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["d_exch_amt_per_dau"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.d_exch_amt_per_dau != null">{{ row.d_exch_amt_per_dau }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="user_cont_per_user"
                :label="tableColumns['user_cont_per_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['user_cont_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["user_cont_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.user_cont_per_user != null">{{ row.user_cont_per_user }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cost_per_user"
                :label="tableColumns['cost_per_user'].name"
                align="center"
                min-width="100"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['cost_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["cost_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <span v-if="row.cost_per_user != null">{{ row.cost_per_user }}</span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysProxy from "../proxy/StatisticPlatDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatDaysBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    get tableColumns() {
        return this.myProxy.tableData.columns;
    }
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    summaryListQuery = this.myProxy.summaryListQuery;

    @Watch("myProxy.tableData.updateNum")
    reload() {
        this.$forceUpdate();
    }

    handlerPageSwitch(page: number) {
        if (this.myProxy.tableData.activeName == "stats") {
            this.listQuery.page_count = page;
            this.myProxy.onQuery();
            return;
        }
        this.summaryListQuery.page_count = page;
        this.myProxy.onQuerySummary();
    }
    @Watch("myProxy.tableData.activeName")
    tabChange() {
        if (this.myProxy.tableData.activeName == "stats") {
            this.myProxy.onQuery();
        } else {
            this.myProxy.onQuerySummary();
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-table {
    display: flex;
    flex-direction: column;
}
::v-deep .el-table__footer-wrapper {
    order: -1;
}
::v-deep .el-table__header-wrapper {
    order: -2;
}
@for $i from 1 through 1 {
    ::v-deep .el-table__body .el-table__row:first-child {
        background-color: #f6f7fa;
        td:nth-child(#{$i}) {
            border-right: 0;
        }
        td:nth-child(2) {
            text-align: left;
        }
    }
}
</style>
