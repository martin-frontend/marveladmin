import { PageInfoVO } from "@/core/vo/PageInfoVO";
import { UserInfoVO } from "@/core/vo/UserInfoVO";

export default interface IVipRechargeProxy {
     /**表格相关数据 */
     tableData: {
        columns: any,
    };
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean,
        form: any,
        formSource: any
    };
    /**页面数据 */
    bodyData: {
        gold: string,
        form: {
            user_id: string
            amount: string;
        },
        isRechargeSuccess: any
    }

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**详细数据 */
    setDetail(data: any): void;

    /**查询玩家 */
    onQueryUser(): void;
    /**提交充值 */
    onTopup(): void;
    /**重置页面表单 */
    resetForm(): void;
    /**取得玩家资讯 */
    setUserInfo(userInfo: UserInfoVO): void
}
