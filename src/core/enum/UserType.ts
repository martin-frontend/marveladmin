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