/**
 * 用户类型
 * 1: "超级管理员" 2: "管理员" 4: "普通用户" 8: "渠道用户" 32: "币商用户代收" 64:"币商用户代付"
 */
export enum UserType {
    ADMIN_SUPER = 1,
    ADMIN = 2,
    ADMIN_NORMAL = 4,
    CHANNEL = 8,
    COIN = 32,
    COINUSEREXCHANGE = 64
}

/**
 * 语言管理里面的管理类型
 * options: {1: '前端WEB皮肤1语言', 2: '后端管理语言', 3: '服务器数据语言', 4: '厂商游戏', 5: '平台公告', 6: '常见问题', 7: '平台邮件', 
 * 8: '平台活动',11:‘跑马灯’,12:'系统邮件模版','13':'平台短信通道'，‘14’:'充值兑换'}
 */
export enum LanguageType {
    TYPE_WEB_SKIN_LANGUAGE = 1,
    TYPE_ADMIN_LANGUAGE = 2,
    TYPE_SQL_LANGUAGE = 3,
    TYPE_VENDER_GAME_LANGUAGE = 4,
    TYPE_PLAT_NOTICE = 5,
    TYPE_QUESTION = 6,
    TYPE_PLAT_EMAIL = 7,
    TYPE_PLAT_ACTIVITY = 8,
    TYPE_PLAT_MARQUEE = 11,
    TYPE_SYSTEM_EMAIL_MODEl = 12,
    TYPE_PLAT_SMS = 13,
    TYPE_PLAT_RECHARGE_EXCHANGE = 14,
}