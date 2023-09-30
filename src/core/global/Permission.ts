/**
 * 拥有的权限
 */
export var permissions_unique: string[] = [];
/**
 * 权限检测
 * @param value 节点标识符
 */
export function checkUnique(value: string): boolean {
    return permissions_unique.includes(value);
}
/**
 * 节点标识符 枚举
 */
export var unique = {
    dashboard: "dashboard", //首页
    index_message: "index_message", //消息提示
    /**系统管理 */
    //厂商管理-API厂商管理
    test_vendor: "test_vendor",
    vendor_store: "vendor_store",
    vendor_show: "vendor_show",
    vendor_update: "vendor_update",
    vendor_delete: "vendor_delete",
    //厂商管理-短信厂商
    sms_store: "sms_store",
    sms_show: "sms_show",
    sms_update: "sms_update",
    sms_delete: "sms_delete",
    //厂商管理-充值厂商
    recharge_vendors_store: "recharge_vendors_store",
    recharge_vendors_show: "recharge_vendors_show",
    recharge_vendors_update: "recharge_vendors_update",
    recharge_vendors_delete: "recharge_vendors_delete",
    //厂商管理-兑换厂商
    exchange_vendors_store: "exchange_vendors_store",
    exchange_vendors_show: "exchange_vendors_show",
    exchange_vendors_update: "exchange_vendors_update",
    exchange_vendors_delete: "exchange_vendors_delete",
    //产品管理-大厅产品管理
    lobby_model_product_store: "lobby_model_product_store",
    lobby_model_product_show: "lobby_model_product_show",
    lobby_model_product_update: "lobby_model_product_update",
    lobby_model_product_delete: "lobby_model_product_delete",
    //产品管理-厂商产品管理
    vendor_product_store: "vendor_product_store",
    vendor_product_show: "vendor_product_show",
    vendor_product_update: "vendor_product_update",
    vendor_product_delete: "vendor_product_delete",
    //平台功能-整盘分红模板配置
    plat_bonus_all_stock_model_store: "plat_bonus_all_stock_model_store",
    plat_bonus_all_stock_model_update: "plat_bonus_all_stock_model_update",
    plat_bonus_all_stock_model_show: "plat_bonus_all_stock_model_show",

    //平台功能-返佣折扣
    store_fake_bet: "store_fake_bet",
    promotion_discount_recover: "promotion_discount_recover",
    //平台功能-实时返水配置
    plat_users_backwater_model_store: "plat_users_backwater_model_store",
    plat_users_backwater_model_show: "plat_users_backwater_model_show",
    plat_users_backwater_model_update: "plat_users_backwater_model_update",
    plat_users_backwater_model_delete: "plat_users_backwater_model_delete",
    //平台功能-VIP模版配置
    plat_users_vip_model_store: "plat_users_vip_model_store",
    plat_users_vip_model_show: "plat_users_vip_model_show",
    plat_users_vip_model_update: "plat_users_vip_model_update",
    plat_users_vip_model_delete: "plat_users_vip_model_delete",
    //平台功能-推广配置
    plat_agent_promotion_model_store: "plat_agent_promotion_model_store",
    plat_agent_promotion_model_show: "plat_agent_promotion_model_show",
    plat_agent_promotion_model_update: "plat_agent_promotion_model_update",
    plat_agent_promotion_model_delete: "plat_agent_promotion_model_delete",
    //平台功能-活动模版配置
    plat_activity_model_store: "plat_activity_model_store",
    plat_activity_model_update: "plat_activity_model_update",
    plat_activity_model_show: "plat_activity_model_show",
    plat_activity_model_delete: "plat_activity_model_delete",
    //平台功能-活动规则配置
    plat_activity_rule_store: "plat_activity_rule_store",
    plat_activity_rule_show: "plat_activity_rule_show",
    plat_activity_rule_update: "plat_activity_rule_update",
    plat_activity_rule_delete: "plat_activity_rule_delete",
    //平台功能-系统常见问题配置
    system_fag_store: "system_fag_store",
    system_fag_show: "system_fag_show",
    system_fag_update: "system_fag_update",
    system_fag_delete: "system_fag_delete",
    system_fag_order: "system_fag_order",
    //平台渠道-平台商户
    plat_upload_load_page: "plat_upload_load_page",
    plat_clear_cache: "plat_clear_cache",
    plat_sharding: "plat_sharding",
    plat_store: "plat_store",
    plat_show: "plat_show",
    plat_update: "plat_update",
    plat_delete: "plat_delete",
    plat_update_vip: "plat_update_vip",
    plat_update_backwater: "plat_update_backwater",
    plat_update_promotion: "plat_update_promotion",
    //平台渠道-渠道管理
    plat_channel_store: "plat_channel_store",
    plat_channel_show: "plat_channel_show",
    plat_channel_update: "plat_channel_update",
    plat_channel_delete: "plat_channel_delete",
    //平台渠道-游戏域名
    game_domain_update: "game_domain_update",
    game_domain_store: "game_domain_store",
    game_domain_show: "game_domain_show",
    //充兑管理-平台充值渠道
    recharge_channels_store: "recharge_channels_store",
    recharge_channels_show: "recharge_channels_show",
    recharge_channels_update: "recharge_channels_update",
    recharge_channels_delete: "recharge_channels_delete",
    //充兑管理-平台兑换渠道
    exchange_channel_store: "exchange_channel_store",
    exchange_channel_show: "exchange_channel_show",
    exchange_channel_update: "exchange_channel_update",
    exchange_channel_delete: "exchange_channel_delete",
    exchange_channel_method_update: "exchange_channel_method_update",
    //系统功能-资源管理
    system_resource_store: "system_resource_store",
    resource_update: "resource_update",
    system_resource_delete: "system_resource_delete",
    //系统功能-系统参数
    system_config_store: "system_config_store",
    system_config_update: "system_config_update",
    // 平台管理-大厅产品
    lobby_product_store: "lobby_product_store",
    lobby_product_tag: "lobby_product_tag",
    lobby_product_order: "lobby_product_order",
    lobby_product_delete: "lobby_product_delete",
    // 平台管理-实时返水
    plat_backwater_update: "plat_backwater_update",
    // 平台管理-vip配置
    plat_vip_update: "plat_vip_update",
    // 平台管理-代理配置
    plat_agent_update: "plat_agent_update",
    plat_agent_update_banner: "plat_agent_update_banner",
    // 平台管理-公告管理
    plats_notice_store: "plats_notice_store",
    plats_notice_show: "plats_notice_show",
    plats_notice_update: "plats_notice_update",
    plats_notice_delete: "plats_notice_delete",
    plats_notice_cancel: "plats_notice_cancel",
    // 平台管理-大厅跑马灯
    plat_marquee_store: "plat_marquee_store",
    plat_marquee_show: "plat_marquee_show",
    plat_marquee_update: "plat_marquee_update",
    plat_marquee_delete: "plat_marquee_delete",
    // 平台管理-客服功能-客服平台管理
    plat_service_plat_show: "plat_service_plat_show",
    plat_service_plat_update: "plat_service_plat_update",
    // 平台管理-客服功能-常见问题配置
    plat_service_fag_store: "plat_service_fag_store",
    plat_service_fag_sync: "plat_service_fag_sync",
    plat_service_fag_show: "plat_service_fag_show",
    plat_service_fag_update: "plat_service_fag_update",
    plat_service_fag_delete: "plat_service_fag_delete",
    plat_service_fag_order: "plat_service_fag_order",

    //平台钱包
    plat_wallet_add_points: "plat_wallet_add_points", //公共钱包上分
    plat_wallet_minus_points: "plat_wallet_minus_points", //公共钱包下分
    plat_wallet_log: "plat_wallet_log", //公共钱包记录查询
    plat_vendors_wallet_store: "plat_vendors_wallet_store", //新增厂商钱包
    plat_vendors_wallet_quota: "plat_vendors_wallet_quota", //额度设置
    plat_vendors_wallet_add_points: "plat_vendors_wallet_add_points", //上分
    plat_vendors_wallet_minus_points: "plat_vendors_wallet_minus_points", //下分
    plat_vendors_wallet_log: "plat_vendors_wallet_log", //记录查询
    plat_vendors_wallet_setting: "plat_vendors_wallet_setting", //厂商设置
    //账号管理
    admin_user_store: "admin_user_store", //新增用户
    admin_user_show: "admin_user_show", //查看详情
    admin_user_edit: "admin_user_edit", //编辑
    admin_user_delete: "admin_user_delete", //删除
    //权限组
    admin_role_store: "admin_role_store", //新增权限组
    admin_role_show: "admin_role_show", //查看详情
    admin_role_edit: "admin_role_edit", //编辑
    admin_role_delete: "admin_role_delete", //删除
    admin_role_setting_show: "admin_role_setting_show", //查看权限设置
    admin_role_setting_edit: "admin_role_setting_edit", //编辑权限设置
    //平台用户
    plat_user_clear_cache: "plat_user_clear_cache", //清除短链缓存
    plat_user_update_safe_gold: "plat_user_update_safe_gold", //用户保险箱-提取
    plat_user_update_user_gold: "plat_user_update_user_gold", //用户平台钱包-扣除
    plat_user_show: "plat_user_show", //平台用户详情
    plat_user_update_real_name: "plat_user_update_real_name", //编辑用户信息-是否可编辑用户真实姓名
    plat_user_update_nick_name: "plat_user_update_nick_name", //用户信息-是否可编辑用户昵称
    plat_user_update_phone: "plat_user_update_phone", //用户信息-是否可编辑用户手机
    plat_user_update_email: "plat_user_update_email", //用户信息-是否可编辑用户邮箱
    plat_user_phone: "plat_user_phone", //用户信息-是否可查看用户手机
    plat_user_email: "plat_user_email", //用户信息-是否可查看用户邮箱
    plat_user_update_wechat: "plat_user_update_wechat", //用户信息-是否可编辑用户微信
    plat_user_update_qq: "plat_user_update_qq", //用户信息-是否可编辑用户QQ
    plat_user_update_password: "plat_user_update_password", //用户信息-是否可编辑用户密码
    update_level_exp: "update_level_exp", //更新用户基础经验值
    plat_user_refresh: "plat_user_refresh", //用户钱包-金币刷新
    plat_user_withdraw: "plat_user_withdraw", //用户钱包-提取
    plat_user_store_credit_user: "plat_user_store_credit_user", //添加信用用户
    plat_user_update_admin_added_user: "plat_user_update_admin_added_user", //编辑后台批量新增用户
    plat_user_get_admin_added_user: "plat_user_get_admin_added_user", //后台批量新增用户列表
    plat_user_store_user_by_admin: "plat_user_store_user_by_admin", //批量新增用户

    admin_plat_user_index2: "plat_user2", //查看完整手机与信箱
    admin_plat_user_statistic_rank_days_index2: "plat_user_statistic_rank_days2", //查看完整手机与信箱
    //上下分记录
    plat_users_vendor_gold_log_update_manual: "plat_users_vendor_gold_log_update_manual", //上下分手动处理
    //操作日志
    admin_admin_user_log_show: "admin_admin_user_log_show", //操作日志-详情
    //金币明细
    plat_users_gold_log: "plat_users_gold_log",
    //投注明细
    plat_users_bet: "plat_users_bet",
    //代理用户
    plat_agent_bind: "plat_agent_bind",
    plat_agent_bonus_config_show: "plat_agent_bonus_config_show", //显示分红统计数据
    plat_agent_bonus_config_update: "plat_agent_bonus_config_update", //更新分红统计数据
    //用户兑换订音
    exchange_orders: "exchange_orders",
    //币商充值订单
    coin_receive_recharge_order: "coin_receive_recharge_order",
    //站内信
    plat_message: "plat_message",
    plat_register_same_ip_log: "plat_register_same_ip_log", //注册IP人数显示
    //登录白名单
    admin_whitelist_update: "admin_whitelist_update", //编辑登录白名单-编辑
    admin_whitelist_store: "admin_whitelist_store", //添加登录白名单
    //派奖查询
    plat_activity_award_send: "plat_activity_award_send", //派奖
    plat_activity_award_show: "plat_activity_award_show", //查看详情
    //活动管理
    plat_activity_store: "plat_activity_store", //添加活动
    plat_activity_show: "plat_activity_show", //查看活动
    plat_activity_update: "plat_activity_update", //编辑活动
    plat_activity_close: "plat_activity_close", //关闭活动
    plat_activity_order: "plat_activity_order", //活动排序
    plat_activity_statistic_ball_user: "plat_activity_statistic_ball_user",//彩球活动参与玩家
    ball_prize_update: "ball_prize_update",//彩球奖池新增
    //返水明细
    plat_users_backwater_log_show: "plat_users_backwater_log_show", //详情
    //投注明细
    plat_users_bet_show: "plat_users_bet_show", //详情
    //平台用户
    plat_user: "plat_user_related_users", //平台用户关联查询
    //兑换流水审核
    gold_water_approved: "gold_water_approved", //兑换流水审核设置通过
    //用户兑换订单
    exchange_orders_dispatch_cancel: "exchange_orders_dispatch_cancel", //兑换订单取消派发
    exchange_orders_dispatch: "exchange_orders_dispatch", //兑换订单派发
    exchange_orders_update_remark: "exchange_orders_update_remark", //更改兑换订单备注
    exchange_orders_rush: "exchange_orders_rush", //用户兑换订单冲正
    exchange_orders_update_channel: "exchange_orders_update_channel", //更换兑换渠道
    exchange_orders_finish_order: "exchange_orders_finish_order", //平台已付款完成订单
    exchange_orders_approved: "exchange_orders_approved", //用户兑换订单审核通过
    exchange_orders_return: "exchange_orders_return", //用户兑换订单退回金币
    exchange_orders_finish_order_manually: "exchange_orders_finish_order_manually", //用户手动兑换订单退回金币
    exchange_orders_close: "exchange_orders_close", //用户兑换订单关闭|不退回金币
    exchange_orders_batch_cancel_accept: "exchange_orders_batch_cancel_accept", //批量取消接单
    //用户充值订单
    recharge_orders_complete: "recharge_orders_complete", //用户充值订单补单
    //支付方式管理
    recharge_plats_paymethods_update: "recharge_plats_paymethods_update", //编辑支付方式管理
    //充值渠道管理
    recharge_channels_paymethods_store: "recharge_channels_paymethods_store", //充值渠道参数列表-添加渠道参数
    recharge_channels_paymethods_show: "recharge_channels_paymethods_show", //充值渠道参数列表-查看渠道参数
    recharge_channels_paymethods_update: "recharge_channels_paymethods_update", //充值渠道参数列表-编辑渠道参数
    recharge_channels_paymethods_delete: "recharge_channels_paymethods_delete", //充值渠道参数列表-编辑渠道参数
    //币商充值订单
    coin_receive_recharge_order_close: "coin_receive_recharge_order_close", //关闭币商充值订单
    coin_receive_recharge_order_confirm: "coin_receive_recharge_order_confirm", //确认币商充值订单
    //币商收款通道
    coin_receive_payment_channel_update: "coin_receive_payment_channel_update", //编辑币商收款通道-编辑
    coin_receive_payment_channel_store: "coin_receive_payment_channel_store",
    //编辑币商收款通道-添加
    coin_receive_payment_channel_show: "coin_receive_payment_channel_show", //币商收款通道-详情
    //平台VIP通道
    vip_receive_payment_channel_update: "vip_receive_payment_channel_update", //编辑平台VIP通道
    vip_receive_payment_channel_store: "vip_receive_payment_channel_store", //添加平台VIP通道
    //VIP充值中心
    vip_recharge_recharge: "vip_recharge_recharge", //VIP充值
    //币商管理
    coin_wallet_log: "coin_wallet_log", //币商上下分记录
    coin_wallet_withdraw: "coin_wallet_withdraw", //币商下分
    coin_wallet_deposit: "coin_wallet_deposit", //币商上分
    //黑名单管理
    plats_blacklist_delete_batch: "plats_blacklist_delete_batch", //批量删除黑名单
    plat_blacklist_store: "plat_blacklist_store", //添加黑名单
    plat_blacklist_update: "plat_blacklist_update", //编辑黑名单- 编辑
    plat_blacklist_delete: "plat_blacklist_delete", //编辑黑名单-删除
    //短信通道
    plat_sms_store: "plat_sms_store", //添加短信通道
    plat_sms_show: "plat_sms_show", //查看短信通道
    plat_sms_update: "plat_sms_update", //编辑短信通道-编辑
    plat_sms_delete: "plat_sms_delete", //编辑短信通道-删除
    plat_sms_send: "plat_sms_send", //编辑短信通道-测试
    plat_sms_balance: "plat_sms_balance", //查看短信余量
    //平台邮件
    plat_email_store: "plat_email_store", //添加邮件
    plat_email_update: "plat_email_update", //撤销邮件
    plat_email_show: "plat_email_show", //查看邮件
    plat_email_store_attachment: "plat_email_store_attachment",
    //平台质押分红
    plat_stake_config_update: "plat_stake_config_update", //平台质押分红配置
};
