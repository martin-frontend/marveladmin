import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICoinReceivePaymentChannelProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        status: string;
        form: any;
        formSource: any;
    };

    /**dialog plat id 需要去掉所有平台选项 */
    dialogPlatIdOptions: any;

    /**收款提示信息 预设*/
    receiveNoticeStr: string;

    /**金额随机 提示 */
    goldNotice: string;

    /**tabs 切换用, 预设1 银行卡*/
    tabsName: string;

    /**图片上传 */
    uploadData: any;

    /**银行列表 */
    bankList: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**查询 */
    onQuery(): void;

    /**添加数据 */
    onAdd(): void;

    /**更新数据 */
    onUpdate(): void;

    /**删除数据 */
    onDelete(id: any): void;

    /**tabs 切换 */
    onTypeChange(name: any): void;

    /**取银行列表 */
    onGetBankList(): void;

    /**写入银行列表 */
    setGetBankList(data: any): void;

    /**图片上传 */
    imageUpload(): void;

    /**图片上传后 api 返回的处理 */
    uploadSuccess(data: any): void;

    /**dialog 资料预先处理 */
    dialogInfo(): void;
}
