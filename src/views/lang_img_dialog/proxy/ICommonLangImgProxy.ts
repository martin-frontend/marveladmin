import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICommonLangImgProxy {
    /**添加数据 */
    onAdd(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;
    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**获取全部翻译内容 */
    translate(data: any): void;

    /**根据key查询数据库是否有该key的翻译 */
    translateLangCheck(): void;

    /**更新数据 */
    update(): void;

    /**上传图片 */
    onUploadImage(data: any): void;
}
