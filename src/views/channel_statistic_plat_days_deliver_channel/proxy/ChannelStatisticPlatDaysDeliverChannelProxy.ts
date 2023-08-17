import LangUtil from "@/core/global/LangUtil";
import StatisticPlatDaysDeliverChannelProxy from "@/views/statistic_plat_days_deliver_channel/proxy/StatisticPlatDaysDeliverChannelProxy";

export default class ChannelStatisticPlatDaysDeliverChannelProxy extends StatisticPlatDaysDeliverChannelProxy {
    static NAME = "ChannelStatisticPlatDaysDeliverChannelProxy";

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("渠道投放统计")}-${plat_name}`;
        if (this.listQuery["created_date-{>=}"] && this.listQuery["created_date-{<=}"]) {
            name += `-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{<=}"]}`;
        }
        return name;
    }
}
