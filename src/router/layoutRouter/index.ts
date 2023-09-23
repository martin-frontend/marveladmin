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
            path: "admin_user_login_record",
            name: "用户登陸记录表",
            component: () => import(/* webpackChunkName: "admin_user_login_record" */"@/views/admin_user_login_record/view/AdminUserLoginRecord.vue")
        },        {
            path: "admin_user_log_user",
            name: "人员修改记录",
            component: () => import(/* webpackChunkName: "admin_user_log_user" */"@/views/admin_user_log_user/view/AdminUserLogUser.vue")
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
            path: "cate_vendor_products",
            name: "首页分类游戏",
            component: () => import(/* webpackChunkName: "cate_vendor_products" */"@/views/cate_vendor_products/view/CateVendorProducts.vue")
        },        {
            path: "channel_event_record_pix",
            name: "渠道pix事件统计",
            component: () => import(/* webpackChunkName: "channel_event_record_pix" */"@/views/plat_users_event_record_pix/view/PlatUsersEventRecordPix.vue")
        },        {
            path: "channel_plat_user",
            name: "渠道用户",
            component: () => import(/* webpackChunkName: "channel_plat_user" */"@/views/channel_plat_user/view/ChannelPlatUser.vue")
        },        {
            path: "channel_plat_user_statistic_rank_days",
            name: "渠道用户排行榜汇总",
            component: () => import(/* webpackChunkName: "channel_plat_user_statistic_rank_days" */"@/views/channel_plat_user_statistic_rank_days/view/ChannelPlatUserStatisticRankDays.vue")
        },        {
            path: "channel_statistic_agent_keep_days",
            name: "渠道代理留存统计",
            component: () => import(/* webpackChunkName: "channel_statistic_agent_keep_days" */"@/views/channel_statistic_agent_keep_days/view/ChannelStatisticAgentKeepDays.vue")
        },        {
            path: "channel_statistic_coin_keep_days",
            name: "渠道价值留存统计",
            component: () => import(/* webpackChunkName: "channel_statistic_coin_keep_days" */"@/views/channel_statistic_coin_keep_days/view/ChannelStatisticCoinKeepDays.vue")
        },        {
            path: "channel_statistic_plat_days",
            name: "渠道每日统计",
            component: () => import(/* webpackChunkName: "channel_statistic_plat_days" */"@/views/channel_statistic_plat_days/view/ChannelStatisticPlatDays.vue")
        },        {
            path: "channel_statistic_plat_days_date",
            name: "渠道当日统计",
            component: () => import(/* webpackChunkName: "channel_statistic_plat_days_date" */"@/views/channel_statistic_plat_days_date/view/ChannelStatisticPlatDaysDate.vue")
        },        {
            path: "channel_statistic_plat_days_deliver",
            name: "渠道投放日报",
            component: () => import(/* webpackChunkName: "channel_statistic_plat_days_deliver" */"@/views/channel_statistic_plat_days_deliver/view/ChannelStatisticPlatDaysDeliver.vue")
        },        {
            path: "channel_statistic_plat_days_deliver_channel",
            name: "渠道投放统计",
            component: () => import(/* webpackChunkName: "channel_statistic_plat_days_deliver_channel" */"@/views/channel_statistic_plat_days_deliver_channel/view/ChannelStatisticPlatDaysDeliverChannel.vue")
        },        {
            path: "channel_statistic_user_keep_days",
            name: "渠道用户留存统计",
            component: () => import(/* webpackChunkName: "channel_statistic_user_keep_days" */"@/views/channel_statistic_user_keep_days/view/ChannelStatisticUserKeepDays.vue")
        },        {
            path: "channel_statistic_user_promotion_days_index",
            name: "渠道代理统计",
            component: () => import(/* webpackChunkName: "channel_statistic_user_promotion_days_index" */"@/views/channel_statistic_user_promotion_days_index/view/ChannelStatisticUserPromotionDaysIndex.vue")
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
            path: "country",
            name: "国家信息",
            component: () => import(/* webpackChunkName: "country" */"@/views/country/view/Country.vue")
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
            path: "menu_vendor_products",
            name: "游戏类型管理",
            component: () => import(/* webpackChunkName: "menu_vendor_products" */"@/views/menu_vendor_products/view/MenuVendorProducts.vue")
        },        {
            path: "plat",
            name: "平台管理",
            component: () => import(/* webpackChunkName: "plat" */"@/views/plat/view/Plat.vue")
        },        {
            path: "plats_module_share",
            name: "平台共享",
            component: () => import(/* webpackChunkName: "plats_module_share" */"@/views/plats_module_share/view/PlatsModuleShare.vue")
        },        {
            path: "plats_notice",
            name: "平台公告管理",
            component: () => import(/* webpackChunkName: "plats_notice" */"@/views/plats_notice/view/PlatsNotice.vue")
        },        {
            path: "plats_wallet",
            name: "平台资产",
            component: () => import(/* webpackChunkName: "plats_wallet" */"@/views/plats_wallet/view/PlatsWallet.vue")
        },        {
            path: "plats_wallet_log",
            name: "平台资产明细",
            component: () => import(/* webpackChunkName: "plats_wallet_log" */"@/views/plats_wallet_log/view/PlatsWalletLog.vue")
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
            path: "plat_activity_statistic",
            name: "活动统计",
            component: () => import(/* webpackChunkName: "plat_activity_statistic" */"@/views/plat_activity_statistic/view/PlatActivityStatistic.vue")
        },        {
            path: "plat_activity_statistic_ball",
            name: "彩球统计",
            component: () => import(/* webpackChunkName: "plat_activity_statistic_ball" */"@/views/plat_activity_statistic_ball/view/PlatActivityStatisticBall.vue")
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
            path: "plat_agent_manage",
            name: "代理人员管理",
            component: () => import(/* webpackChunkName: "plat_agent_manage" */"@/views/plat_agent_manage/view/PlatAgentManage.vue")
        },        {
            path: "plat_agent_manage_bind",
            name: "渠道代理用户",
            component: () => import(/* webpackChunkName: "plat_agent_manage_bind" */"@/views/plat_agent_manage_bind/view/PlatAgentManageBind.vue")
        },        {
            path: "plat_agent_promotion_model",
            name: "推广配置",
            component: () => import(/* webpackChunkName: "plat_agent_promotion_model" */"@/views/plat_agent_promotion_model/view/PlatAgentPromotionModel.vue")
        },        {
            path: "plat_area_region",
            name: "平台地区管理",
            component: () => import(/* webpackChunkName: "plat_area_region" */"@/views/plat_area_region/view/PlatAreaRegion.vue")
        },        {
            path: "plat_asset_wallet",
            name: "资产钱包",
            component: () => import(/* webpackChunkName: "plat_asset_wallet" */"@/views/plat_asset_wallet/view/PlatAssetWallet.vue")
        },        {
            path: "plat_backwater",
            name: "实时返水",
            component: () => import(/* webpackChunkName: "plat_backwater" */"@/views/plat_backwater/view/PlatBackwater.vue")
        },        {
            path: "plat_big_award",
            name: "大额爆奖图管理",
            component: () => import(/* webpackChunkName: "plat_big_award" */"@/views/plat_big_award/view/PlatBigAward.vue")
        },        {
            path: "plat_blacklist",
            name: "黑名单管理",
            component: () => import(/* webpackChunkName: "plat_blacklist" */"@/views/plat_blacklist/view/PlatBlacklist.vue")
        },        {
            path: "plat_block_coins",
            name: "平台代币管理",
            component: () => import(/* webpackChunkName: "plat_block_coins" */"@/views/plat_block_coins/view/PlatBlockCoins.vue")
        },        {
            path: "plat_block_coins_log",
            name: "汇率日志",
            component: () => import(/* webpackChunkName: "plat_block_coins_log" */"@/views/plat_block_coins_log/view/PlatBlockCoinsLog.vue")
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
            path: "plat_coin_tasks",
            name: "奖励活动任务",
            component: () => import(/* webpackChunkName: "plat_coin_tasks" */"@/views/plat_coin_tasks/view/PlatCoinTasks.vue")
        },        {
            path: "plat_currency_conversion_rate",
            name: "币种汇率管理",
            component: () => import(/* webpackChunkName: "plat_currency_conversion_rate" */"@/views/plat_currency_conversion_rate/view/PlatCurrencyConversionRate.vue")
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
            path: "plat_mail_template",
            name: "平台邮件模版",
            component: () => import(/* webpackChunkName: "plat_mail_template" */"@/views/plat_mail_template/view/PlatMailTemplate.vue")
        },        {
            path: "plat_marquee",
            name: "大厅跑马灯",
            component: () => import(/* webpackChunkName: "plat_marquee" */"@/views/plat_marquee/view/PlatMarquee.vue")
        },        {
            path: "plat_message",
            name: "消息系统",
            component: () => import(/* webpackChunkName: "plat_message" */"@/views/plat_message/view/PlatMessage.vue")
        },        {
            path: "plat_register_same_ip_log",
            name: "同IP注册用户风控",
            component: () => import(/* webpackChunkName: "plat_register_same_ip_log" */"@/views/plat_register_same_ip_log/view/PlatRegisterSameIpLog.vue")
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
            path: "plat_swap_pairs",
            name: "币对管理",
            component: () => import(/* webpackChunkName: "plat_swap_pairs" */"@/views/plat_swap_pairs/view/PlatSwapPairs.vue")
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
            path: "plat_users_coin_statistic_days",
            name: "用户每日币种统计",
            component: () => import(/* webpackChunkName: "plat_users_coin_statistic_days" */"@/views/plat_users_coin_statistic_days/view/PlatUsersCoinStatisticDays.vue")
        },        {
            path: "plat_users_event_record",
            name: "事件统计",
            component: () => import(/* webpackChunkName: "plat_users_event_record" */"@/views/plat_users_event_record/view/PlatUsersEventRecord.vue")
        },        {
            path: "plat_users_event_record_pix",
            name: "pix事件统计",
            component: () => import(/* webpackChunkName: "plat_users_event_record_pix" */"@/views/plat_users_event_record_pix/view/PlatUsersEventRecordPix.vue")
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
            path: "plat_users_vendor_gold_log_alarm",
            name: "投注报警",
            component: () => import(/* webpackChunkName: "plat_users_vendor_gold_log_alarm" */"@/views/plat_users_vendor_gold_log_alarm/view/PlatUsersVendorGoldLogAlarm.vue")
        },        {
            path: "plat_users_verification",
            name: "用户认证",
            component: () => import(/* webpackChunkName: "plat_users_verification" */"@/views/plat_users_verification/view/PlatUsersVerification.vue")
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
            path: "statistic_agent_credit",
            name: "代理总报表",
            component: () => import(/* webpackChunkName: "statistic_agent_credit" */"@/views/statistic_agent_credit/view/StatisticAgentCredit.vue")
        },        {
            path: "statistic_agent_keep_days",
            name: "代理留存统计",
            component: () => import(/* webpackChunkName: "statistic_agent_keep_days" */"@/views/statistic_agent_keep_days/view/StatisticAgentKeepDays.vue")
        },        {
            path: "statistic_bet_plat_days",
            name: "每日输赢统计",
            component: () => import(/* webpackChunkName: "statistic_bet_plat_days" */"@/views/statistic_bet_plat_days/view/StatisticBetPlatDays.vue")
        },        {
            path: "statistic_bet_vendor_days",
            name: "平台游戏报表",
            component: () => import(/* webpackChunkName: "statistic_bet_vendor_days" */"@/views/statistic_bet_vendor_days/view/StatisticBetVendorDays.vue")
        },        {
            path: "statistic_coin_keep_days",
            name: "价值留存统计",
            component: () => import(/* webpackChunkName: "statistic_coin_keep_days" */"@/views/statistic_coin_keep_days/view/StatisticCoinKeepDays.vue")
        },        {
            path: "statistic_credit",
            name: "信用统计",
            component: () => import(/* webpackChunkName: "statistic_credit" */"@/views/statistic_credit/view/StatisticCredit.vue")
        },        {
            path: "statistic_credit_user",
            name: "代理用户报表",
            component: () => import(/* webpackChunkName: "statistic_credit_user" */"@/views/statistic_credit_user/view/StatisticCreditUser.vue")
        },        {
            path: "statistic_plat_coin_days",
            name: "每日币种统计",
            component: () => import(/* webpackChunkName: "statistic_plat_coin_days" */"@/views/statistic_plat_coin_days/view/StatisticPlatCoinDays.vue")
        },        {
            path: "statistic_plat_coin_days_date",
            name: "当日币种统计",
            component: () => import(/* webpackChunkName: "statistic_plat_coin_days_date" */"@/views/statistic_plat_coin_days_date/view/StatisticPlatCoinDaysDate.vue")
        },        {
            path: "statistic_plat_days",
            name: "平台统计",
            component: () => import(/* webpackChunkName: "statistic_plat_days" */"@/views/statistic_plat_days/view/StatisticPlatDays.vue")
        },        {
            path: "statistic_plat_days_date",
            name: "平台当日统计",
            component: () => import(/* webpackChunkName: "statistic_plat_days_date" */"@/views/statistic_plat_days_date/view/StatisticPlatDaysDate.vue")
        },        {
            path: "statistic_plat_days_deliver",
            name: "投放日报",
            component: () => import(/* webpackChunkName: "statistic_plat_days_deliver" */"@/views/statistic_plat_days_deliver/view/StatisticPlatDaysDeliver.vue")
        },        {
            path: "statistic_plat_days_deliver_channel",
            name: "投放统计",
            component: () => import(/* webpackChunkName: "statistic_plat_days_deliver_channel" */"@/views/statistic_plat_days_deliver_channel/view/StatisticPlatDaysDeliverChannel.vue")
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
            path: "system_sms_area_code",
            name: "区号管理",
            component: () => import(/* webpackChunkName: "system_sms_area_code" */"@/views/system_sms_area_code/view/SystemSmsAreaCode.vue")
        },        {
            path: "third_party_vendor_login",
            name: "第三方登录厂商 ",
            component: () => import(/* webpackChunkName: "third_party_vendor_login" */"@/views/third_party_vendor_login/view/ThirdPartyVendorLogin.vue")
        },        {
            path: "user_tag",
            name: "标签列表",
            component: () => import(/* webpackChunkName: "user_tag" */"@/views/user_tag/view/UserTag.vue")
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
        },        {
            path: "vip_replenish_recharge",
            name: "VIP补单中心",
            component: () => import(/* webpackChunkName: "vip_replenish_recharge" */"@/views/vip_replenish_recharge/view/VipReplenishRecharge.vue")
        },        {
            path: "vip_replenish_recharge_order",
            name: "VIP补单订单",
            component: () => import(/* webpackChunkName: "vip_replenish_recharge_order" */"@/views/vip_replenish_recharge_order/view/VipReplenishRechargeOrder.vue")
        },
    ]
}

export default layoutRouter;
