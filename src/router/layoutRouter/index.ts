import Layout from "@/views/layout/view/Layout.vue";

const layoutRouter = {
    path: "/layout",
    name: "layout",
    component: Layout,
    children: [
        {
            path: "admin_cron",
            name: "定时任务",
            component: () => import(/* webpackChunkName: "admin_cron" */"@/views/admin_cron/view/AdminCron.vue")
        },        {
            path: "admin_permission",
            name: "节点管理",
            component: () => import(/* webpackChunkName: "admin_permission" */"@/views/admin_permission/view/AdminPermission.vue")
        },        {
            path: "admin_role",
            name: "权限组",
            component: () => import(/* webpackChunkName: "admin_role" */"@/views/admin_role/view/AdminRole.vue")
        },        {
            path: "admin_user",
            name: "账号管理",
            component: () => import(/* webpackChunkName: "admin_user" */"@/views/admin_user/view/AdminUser.vue")
        },        {
            path: "admin_user_log",
            name: "操作日志",
            component: () => import(/* webpackChunkName: "admin_user_log" */"@/views/admin_user_log/view/AdminUserLog.vue")
        },        {
            path: "admin_whitelist_index",
            name: "登录白名单",
            component: () => import(/* webpackChunkName: "admin_whitelist_index" */"@/views/admin_whitelist_index/view/AdminWhitelistIndex.vue")
        },        {
            path: "block_contract",
            name: "区块合约配置",
            component: () => import(/* webpackChunkName: "block_contract" */"@/views/block_contract/view/BlockContract.vue")
        },        {
            path: "block_network",
            name: "区块网络配置",
            component: () => import(/* webpackChunkName: "block_network" */"@/views/block_network/view/BlockNetwork.vue")
        },        {
            path: "block_recharge_address",
            name: "用户帐号列表",
            component: () => import(/* webpackChunkName: "block_recharge_address" */"@/views/block_recharge_address/view/BlockRechargeAddress.vue")
        },        {
            path: "block_system_coins",
            name: "系统代币管理",
            component: () => import(/* webpackChunkName: "block_system_coins" */"@/views/block_system_coins/view/BlockSystemCoins.vue")
        },        {
            path: "block_transfer_account",
            name: "代币帐号管理",
            component: () => import(/* webpackChunkName: "block_transfer_account" */"@/views/block_transfer_account/view/BlockTransferAccount.vue")
        },        {
            path: "block_transfer_in_order",
            name: "数字充值订单",
            component: () => import(/* webpackChunkName: "block_transfer_in_order" */"@/views/block_transfer_in_order/view/BlockTransferInOrder.vue")
        },        {
            path: "block_transfer_out_order",
            name: "数字兑换订单",
            component: () => import(/* webpackChunkName: "block_transfer_out_order" */"@/views/block_transfer_out_order/view/BlockTransferOutOrder.vue")
        },        {
            path: "coin_exchange_orders",
            name: "定时任务",
            component: () => import(/* webpackChunkName: "coin_exchange_orders" */"@/views/coin_exchange_orders/view/CoinExchangeOrders.vue")
        },        {
            path: "coin_receive_payment_channel",
            name: "币商收款通道",
            component: () => import(/* webpackChunkName: "coin_receive_payment_channel" */"@/views/coin_receive_payment_channel/view/CoinReceivePaymentChannel.vue")
        },        {
            path: "coin_receive_recharge_order",
            name: "币商充值订单",
            component: () => import(/* webpackChunkName: "coin_receive_recharge_order" */"@/views/coin_receive_recharge_order/view/CoinReceiveRechargeOrder.vue")
        },        {
            path: "coin_wallet",
            name: "币商管理",
            component: () => import(/* webpackChunkName: "coin_wallet" */"@/views/coin_wallet/view/CoinWallet.vue")
        },        {
            path: "dashboard",
            name: "首页",
            component: () => import(/* webpackChunkName: "dashboard" */"@/views/dashboard/view/Dashboard.vue")
        },        {
            path: "email_template",
            name: "邮件模版",
            component: () => import(/* webpackChunkName: "email_template" */"@/views/email_template/view/EmailTemplate.vue")
        },        {
            path: "email_vendor",
            name: "邮件厂商",
            component: () => import(/* webpackChunkName: "email_vendor" */"@/views/email_vendor/view/EmailVendor.vue")
        },        {
            path: "exchange_channel",
            name: "平台兑换渠道",
            component: () => import(/* webpackChunkName: "exchange_channel" */"@/views/exchange_channel/view/ExchangeChannel.vue")
        },        {
            path: "exchange_channel_method",
            name: "兑换渠道管理",
            component: () => import(/* webpackChunkName: "exchange_channel_method" */"@/views/exchange_channel_method/view/ExchangeChannelMethod.vue")
        },        {
            path: "exchange_orders",
            name: "用户兑换订单",
            component: () => import(/* webpackChunkName: "exchange_orders" */"@/views/exchange_orders/view/ExchangeOrders.vue")
        },        {
            path: "exchange_vendors",
            name: "兑换厂商",
            component: () => import(/* webpackChunkName: "exchange_vendors" */"@/views/exchange_vendors/view/ExchangeVendors.vue")
        },        {
            path: "game_domain",
            name: "游戏域名",
            component: () => import(/* webpackChunkName: "game_domain" */"@/views/game_domain/view/GameDomain.vue")
        },        {
            path: "gold_water",
            name: "兑换流水审核",
            component: () => import(/* webpackChunkName: "gold_water" */"@/views/gold_water/view/GoldWater.vue")
        },        {
            path: "lobby_model_product",
            name: "大厅产品管理",
            component: () => import(/* webpackChunkName: "lobby_model_product" */"@/views/lobby_model_product/view/LobbyModelProduct.vue")
        },        {
            path: "lobby_product",
            name: "平台大厅产品",
            component: () => import(/* webpackChunkName: "lobby_product" */"@/views/lobby_product/view/LobbyProduct.vue")
        },        {
            path: "lobby_vendor_products",
            name: "平台大厅厂商产品",
            component: () => import(/* webpackChunkName: "lobby_vendor_products" */"@/views/lobby_vendor_products/view/LobbyVendorProducts.vue")
        },        {
            path: "plat",
            name: "平台管理",
            component: () => import(/* webpackChunkName: "plat" */"@/views/plat/view/Plat.vue")
        },        {
            path: "plats_notice",
            name: "平台公告管理",
            component: () => import(/* webpackChunkName: "plats_notice" */"@/views/plats_notice/view/PlatsNotice.vue")
        },        {
            path: "plat_activity",
            name: "活动管理",
            component: () => import(/* webpackChunkName: "plat_activity" */"@/views/plat_activity/view/PlatActivity.vue")
        },        {
            path: "plat_activity_award",
            name: "派奖查询",
            component: () => import(/* webpackChunkName: "plat_activity_award" */"@/views/plat_activity_award/view/PlatActivityAward.vue")
        },        {
            path: "plat_activity_model",
            name: "活动模版配置",
            component: () => import(/* webpackChunkName: "plat_activity_model" */"@/views/plat_activity_model/view/PlatActivityModel.vue")
        },        {
            path: "plat_activity_rule",
            name: "活动规则配置",
            component: () => import(/* webpackChunkName: "plat_activity_rule" */"@/views/plat_activity_rule/view/PlatActivityRule.vue")
        },        {
            path: "plat_agent",
            name: "平台代理配置",
            component: () => import(/* webpackChunkName: "plat_agent" */"@/views/plat_agent/view/PlatAgent.vue")
        },        {
            path: "plat_agent_bind",
            name: "代理用户",
            component: () => import(/* webpackChunkName: "plat_agent_bind" */"@/views/plat_agent_bind/view/PlatAgentBind.vue")
        },        {
            path: "plat_agent_bonus",
            name: "总代分红",
            component: () => import(/* webpackChunkName: "plat_agent_bonus" */"@/views/plat_agent_bonus/view/PlatAgentBonus.vue")
        },        {
            path: "plat_agent_promotion_model",
            name: "推广配置",
            component: () => import(/* webpackChunkName: "plat_agent_promotion_model" */"@/views/plat_agent_promotion_model/view/PlatAgentPromotionModel.vue")
        },        {
            path: "plat_backwater",
            name: "实时返水",
            component: () => import(/* webpackChunkName: "plat_backwater" */"@/views/plat_backwater/view/PlatBackwater.vue")
        },        {
            path: "plat_blacklist",
            name: "黑名单管理",
            component: () => import(/* webpackChunkName: "plat_blacklist" */"@/views/plat_blacklist/view/PlatBlacklist.vue")
        },        {
            path: "plat_block_coins",
            name: "平台代币管理",
            component: () => import(/* webpackChunkName: "plat_block_coins" */"@/views/plat_block_coins/view/PlatBlockCoins.vue")
        },        {
            path: "plat_bonus_all",
            name: "全盘分红配置",
            component: () => import(/* webpackChunkName: "plat_bonus_all" */"@/views/plat_bonus_all/view/PlatBonusAll.vue")
        },        {
            path: "plat_bonus_all_stock_model",
            name: "全盘分红配置",
            component: () => import(/* webpackChunkName: "plat_bonus_all_stock_model" */"@/views/plat_bonus_all_stock_model/view/PlatBonusAllStockModel.vue")
        },        {
            path: "plat_channel",
            name: "渠道管理",
            component: () => import(/* webpackChunkName: "plat_channel" */"@/views/plat_channel/view/PlatChannel.vue")
        },        {
            path: "plat_email",
            name: "平台邮件",
            component: () => import(/* webpackChunkName: "plat_email" */"@/views/plat_email/view/PlatEmail.vue")
        },        {
            path: "plat_email_vendor",
            name: "邮件通道",
            component: () => import(/* webpackChunkName: "plat_email_vendor" */"@/views/plat_email_vendor/view/PlatEmailVendor.vue")
        },        {
            path: "plat_lang",
            name: "平台语言管理",
            component: () => import(/* webpackChunkName: "plat_lang" */"@/views/plat_lang/view/PlatLang.vue")
        },        {
            path: "plat_load_page_domain",
            name: "落地页域名配置",
            component: () => import(/* webpackChunkName: "plat_load_page_domain" */"@/views/plat_load_page_domain/view/PlatLoadPageDomain.vue")
        },        {
            path: "plat_marquee",
            name: "大厅跑马灯",
            component: () => import(/* webpackChunkName: "plat_marquee" */"@/views/plat_marquee/view/PlatMarquee.vue")
        },        {
            path: "plat_message",
            name: "消息系统",
            component: () => import(/* webpackChunkName: "plat_message" */"@/views/plat_message/view/PlatMessage.vue")
        },        {
            path: "plat_service",
            name: "平台客服功能管理",
            component: () => import(/* webpackChunkName: "plat_service" */"@/views/plat_service/view/PlatService.vue")
        },        {
            path: "plat_setting",
            name: "平台设定",
            component: () => import(/* webpackChunkName: "plat_setting" */"@/views/plat_setting/view/PlatSetting.vue")
        },        {
            path: "plat_sms",
            name: "短信通道",
            component: () => import(/* webpackChunkName: "plat_sms" */"@/views/plat_sms/view/PlatSms.vue")
        },        {
            path: "plat_stake",
            name: "平台质押分红",
            component: () => import(/* webpackChunkName: "plat_stake" */"@/views/plat_stake/view/PlatStake.vue")
        },        {
            path: "plat_swap_liquidity",
            name: "Swap管理",
            component: () => import(/* webpackChunkName: "plat_swap_liquidity" */"@/views/plat_swap_liquidity/view/PlatSwapLiquidity.vue")
        },        {
            path: "plat_swap_liquidity_log",
            name: "流动性日志",
            component: () => import(/* webpackChunkName: "plat_swap_liquidity_log" */"@/views/plat_swap_liquidity_log/view/PlatSwapLiquidityLog.vue")
        },        {
            path: "plat_swap_orders",
            name: "Swap交易",
            component: () => import(/* webpackChunkName: "plat_swap_orders" */"@/views/plat_swap_orders/view/PlatSwapOrders.vue")
        },        {
            path: "plat_user",
            name: "平台用户",
            component: () => import(/* webpackChunkName: "plat_user" */"@/views/plat_user/view/PlatUser.vue")
        },        {
            path: "plat_users_backwater_log",
            name: "返水明细",
            component: () => import(/* webpackChunkName: "plat_users_backwater_log" */"@/views/plat_users_backwater_log/view/PlatUsersBackwaterLog.vue")
        },        {
            path: "plat_users_backwater_model",
            name: "实时返水配置",
            component: () => import(/* webpackChunkName: "plat_users_backwater_model" */"@/views/plat_users_backwater_model/view/PlatUsersBackwaterModel.vue")
        },        {
            path: "plat_users_bet",
            name: "投注明细",
            component: () => import(/* webpackChunkName: "plat_users_bet" */"@/views/plat_users_bet/view/PlatUsersBet.vue")
        },        {
            path: "plat_users_gold_log",
            name: "金币明细",
            component: () => import(/* webpackChunkName: "plat_users_gold_log" */"@/views/plat_users_gold_log/view/PlatUsersGoldLog.vue")
        },        {
            path: "plat_users_payment_method",
            name: "用户收款方式",
            component: () => import(/* webpackChunkName: "plat_users_payment_method" */"@/views/plat_users_payment_method/view/PlatUsersPaymentMethod.vue")
        },        {
            path: "plat_users_vendor_gold_log",
            name: "上下分记录",
            component: () => import(/* webpackChunkName: "plat_users_vendor_gold_log" */"@/views/plat_users_vendor_gold_log/view/PlatUsersVendorGoldLog.vue")
        },        {
            path: "plat_users_vip_model",
            name: "VIP模版配置",
            component: () => import(/* webpackChunkName: "plat_users_vip_model" */"@/views/plat_users_vip_model/view/PlatUsersVipModel.vue")
        },        {
            path: "plat_user_login_log",
            name: "平台厂商用户登录log",
            component: () => import(/* webpackChunkName: "plat_user_login_log" */"@/views/plat_user_login_log/view/PlatUserLoginLog.vue")
        },        {
            path: "plat_user_sms_code",
            name: "短信验证码查询",
            component: () => import(/* webpackChunkName: "plat_user_sms_code" */"@/views/plat_user_sms_code/view/PlatUserSmsCode.vue")
        },        {
            path: "plat_user_statistic_days",
            name: "用户排行统计",
            component: () => import(/* webpackChunkName: "plat_user_statistic_days" */"@/views/plat_user_statistic_days/view/PlatUserStatisticDays.vue")
        },        {
            path: "plat_user_statistic_rank_days",
            name: "用户排行汇总",
            component: () => import(/* webpackChunkName: "plat_user_statistic_rank_days" */"@/views/plat_user_statistic_rank_days/view/PlatUserStatisticRankDays.vue")
        },        {
            path: "plat_vendors_wallet",
            name: "平台钱包",
            component: () => import(/* webpackChunkName: "plat_vendors_wallet" */"@/views/plat_vendors_wallet/view/PlatVendorsWallet.vue")
        },        {
            path: "plat_vendor_user",
            name: "平台厂商用户",
            component: () => import(/* webpackChunkName: "plat_vendor_user" */"@/views/plat_vendor_user/view/PlatVendorUser.vue")
        },        {
            path: "plat_vip",
            name: "平台VIP",
            component: () => import(/* webpackChunkName: "plat_vip" */"@/views/plat_vip/view/PlatVip.vue")
        },        {
            path: "promotion_discount_index",
            name: "平台公告管理",
            component: () => import(/* webpackChunkName: "promotion_discount_index" */"@/views/promotion_discount_index/view/PromotionDiscountIndex.vue")
        },        {
            path: "recharge_channels",
            name: "平台充值渠道",
            component: () => import(/* webpackChunkName: "recharge_channels" */"@/views/recharge_channels/view/RechargeChannels.vue")
        },        {
            path: "recharge_channels_paymethods",
            name: "充值渠道管理",
            component: () => import(/* webpackChunkName: "recharge_channels_paymethods" */"@/views/recharge_channels_paymethods/view/RechargeChannelsPaymethods.vue")
        },        {
            path: "recharge_orders",
            name: "用户充值订单",
            component: () => import(/* webpackChunkName: "recharge_orders" */"@/views/recharge_orders/view/RechargeOrders.vue")
        },        {
            path: "recharge_plats_paymethods",
            name: "支付方式管理",
            component: () => import(/* webpackChunkName: "recharge_plats_paymethods" */"@/views/recharge_plats_paymethods/view/RechargePlatsPaymethods.vue")
        },        {
            path: "recharge_vendors",
            name: "充值厂商",
            component: () => import(/* webpackChunkName: "recharge_vendors" */"@/views/recharge_vendors/view/RechargeVendors.vue")
        },        {
            path: "sms",
            name: "短信厂商",
            component: () => import(/* webpackChunkName: "sms" */"@/views/sms/view/Sms.vue")
        },        {
            path: "statistic_bet_plat_days",
            name: "每日输赢统计",
            component: () => import(/* webpackChunkName: "statistic_bet_plat_days" */"@/views/statistic_bet_plat_days/view/StatisticBetPlatDays.vue")
        },        {
            path: "statistic_plat_days",
            name: "平台统计",
            component: () => import(/* webpackChunkName: "statistic_plat_days" */"@/views/statistic_plat_days/view/StatisticPlatDays.vue")
        },        {
            path: "statistic_plat_funds_flow",
            name: "平台出入款",
            component: () => import(/* webpackChunkName: "statistic_plat_funds_flow" */"@/views/statistic_plat_funds_flow/view/StatisticPlatFundsFlow.vue")
        },        {
            path: "statistic_plat_swap_orders",
            name: "交易统计",
            component: () => import(/* webpackChunkName: "statistic_plat_swap_orders" */"@/views/statistic_plat_swap_orders/view/StatisticPlatSwapOrders.vue")
        },        {
            path: "statistic_plat_swap_price",
            name: "行情统计",
            component: () => import(/* webpackChunkName: "statistic_plat_swap_price" */"@/views/statistic_plat_swap_price/view/StatisticPlatSwapPrice.vue")
        },        {
            path: "statistic_user_days",
            name: "用户统计",
            component: () => import(/* webpackChunkName: "statistic_user_days" */"@/views/statistic_user_days/view/StatisticUserDays.vue")
        },        {
            path: "statistic_user_keep_days",
            name: "用户留存统计",
            component: () => import(/* webpackChunkName: "statistic_user_keep_days" */"@/views/statistic_user_keep_days/view/StatisticUserKeepDays.vue")
        },        {
            path: "statistic_user_promotion_days_index",
            name: "代理每日统计",
            component: () => import(/* webpackChunkName: "statistic_user_promotion_days_index" */"@/views/statistic_user_promotion_days_index/view/StatisticUserPromotionDaysIndex.vue")
        },        {
            path: "system_config",
            name: "系统参数",
            component: () => import(/* webpackChunkName: "system_config" */"@/views/system_config/view/SystemConfig.vue")
        },        {
            path: "system_fag",
            name: "系统常见问题配置",
            component: () => import(/* webpackChunkName: "system_fag" */"@/views/system_fag/view/SystemFag.vue")
        },        {
            path: "system_lang",
            name: "语言管理",
            component: () => import(/* webpackChunkName: "system_lang" */"@/views/system_lang/view/SystemLang.vue")
        },        {
            path: "system_resource",
            name: "资源管理",
            component: () => import(/* webpackChunkName: "system_resource" */"@/views/system_resource/view/SystemResource.vue")
        },        {
            path: "vendor",
            name: "厂商管理",
            component: () => import(/* webpackChunkName: "vendor" */"@/views/vendor/view/Vendor.vue")
        },        {
            path: "vendor_product",
            name: "厂商产品管理",
            component: () => import(/* webpackChunkName: "vendor_product" */"@/views/vendor_product/view/VendorProduct.vue")
        },        {
            path: "vip_receive_payment_channel",
            name: "平台VIP通道",
            component: () => import(/* webpackChunkName: "vip_receive_payment_channel" */"@/views/vip_receive_payment_channel/view/VipReceivePaymentChannel.vue")
        },        {
            path: "vip_receive_recharge_order",
            name: "VIP充值订单",
            component: () => import(/* webpackChunkName: "vip_receive_recharge_order" */"@/views/vip_receive_recharge_order/view/VipReceiveRechargeOrder.vue")
        },        {
            path: "vip_recharge",
            name: "VIP充值中心",
            component: () => import(/* webpackChunkName: "vip_recharge" */"@/views/vip_recharge/view/VipRecharge.vue")
        },
    ]
}

export default layoutRouter;
