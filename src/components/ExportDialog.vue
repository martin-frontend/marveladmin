<template>
    <span>
        <el-button @click="openFiterDialog" type="primary" icon="el-icon-download" :disabled="!chickExport">
            {{ LangUtil(title_btn) }}
        </el-button>

        <!-- 筛选弹框 -->
        <el-dialog
            :visible.sync="fiterSelectData.bShow"
            width="600px"
            class="dialog"
            :close-on-click-modal="false"
            :show-close="false"
            :title="LangUtil(title_fiter)"
        >
            <el-checkbox
                :indeterminate="fiterSelectData.isIndeterminate"
                v-model="fiterSelectData.checkAll"
                @change="handleCheckAllChange"
            >
                {{ LangUtil("全选") }}
            </el-checkbox>
            <el-checkbox-group v-model="fieldOptions" @change="handleCheckedFieldsChange">
                <el-row>
                    <template v-for="key in fiterOption">
                        <el-col :span="8" :key="key" v-if="proxy.tableData.columns[key]">
                            <el-checkbox :label="key">{{ proxy.tableData.columns[key].name }}</el-checkbox>
                        </el-col>
                    </template>
                </el-row>
            </el-checkbox-group>
            <div class="group">
                <el-button class="item" size="mini" @click="fiterSelectData.bShow = false">
                    {{ LangUtil("取消") }}
                </el-button>
                <el-button
                    :disabled="fieldOptions.length == 0"
                    type="primary"
                    class="item"
                    size="mini"
                    @click="handleSubmit"
                    >{{ LangUtil("确定") }}</el-button
                >
            </div>
        </el-dialog>

        <el-dialog
            :title="LangUtil(title_progress)"
            :visible.sync="exportData.bShow"
            width="50%"
            class="dialog"
            :close-on-click-modal="false"
            :show-close="false"
        >
            <el-progress :percentage="exportData.percentage"></el-progress>
            <div class="group">
                <el-button @click="cancel" type="primary">
                    {{ LangUtil("取消") }}
                </el-button>
            </div>
        </el-dialog>
    </span>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import i18n from "@/lang";
import { MessageBox } from "element-ui";
import { BaseInfo } from "@/components/vo/commonVo";
@Component
export default class ExportDialog extends Vue {
    LangUtil = LangUtil;
    @Prop({ default: "导出" }) title_btn!: string; //按钮上面的文字
    @Prop({ default: "导出栏位" }) title_fiter!: string; //导出内容选择的标题
    @Prop({ default: "导出进度" }) title_progress!: string; //进度条的标题

    // @Prop({ default: false }) disabled!: boolean; //导出按钮的禁用条件
    @Prop({ default: [] }) fiterOption: any; //需要导出的数据的选项
    @Prop({ default: {} }) proxy: any; //主要数据
    @Prop({ default: "" }) export_file_name!: string; //导出文件的名字

    @Prop({ default: 1000 }) everyPage_Size!: number; //每一页的大小

    @Prop({ default: null }) _convertKeys!: string[];
    @Prop({ default: null }) _excludeKeys!: string[];

    get convertKeys() {
        if (!this._convertKeys) {
            return [
                "plat_id",
                "type",
                "vendor_id",
                "vendor_type",
                "vendor_wallet_type",
                "time_region_hour_interval",
                "status",
            ];
        }
        return this._convertKeys;
    }
    get excludeKeys() {
        if (!this._excludeKeys) {
            return ["id", "data_belong", "vendor_product_id"];
        }
        return this._excludeKeys;
    }

    org_percentage = 10; //进度条的 起始值

    fieldOptions = JSON.parse(JSON.stringify(this.fiterOption_val));

    get fiterOption_val() {
        return this.fiterOption || [];
    }
    //导出相关的数据
    exportData = {
        isExportExcel: false,
        percentage: 0,
        bShow: false,
    };

    //导出选项的相关数据
    fiterSelectData = {
        isIndeterminate: false,
        checkAll: true,
        bShow: false,
    };

    pageInfo = {
        pageTotal: 0,
        pageCurrent: 0,
        pageCount: 1,
        page_size: 5,
    };

    curPageInfo = {
        pageCount: 1,
        page_size: 5,
    };
    //所有数据存在 这个地方 而且这个地方数据是需要连续的，用 页码作为 key ，list中的内容作为value
    alldata = {};

    get chickExport(): boolean {
        return this.proxy.tableData.list && this.proxy.tableData.list.length > 0;
    }

    openFiterDialog() {
        //console.log("打开 选择导出 框");
        this.fiterSelectData.bShow = true;
        //重置一下
        this.handleCheckAllChange(true);
        this.fiterSelectData.checkAll = true;
    }
    cancel() {
        MessageBox.confirm(String(this.LangUtil("确定要取消汇出")), String(this.LangUtil("提示")), {
            confirmButtonText: String(this.LangUtil("确定")),
            cancelButtonText: String(this.LangUtil("取消")),
            type: "warning",
        })
            .then(() => {
                console.log("---点击取消");
                this.cancleSend();
            })
            .catch(() => {});
    }

    @Watch("proxy.myExportPagedata")
    dataChange() {
        console.warn("记录分页信息");
        const data = this.proxy.myExportPagedata;
        if (!data || !data.pageInfo) {
            console.error("页面数据错误", data);
            this.endSend();
            return;
        }
        Object.assign(this.pageInfo, data.pageInfo);
        //收到数据之后开始对分页数据进行处理  ,检查数据中是否存在这个页面的数据， 不管是否存在直接覆盖掉
        if (!data.list || data.list.length < 1) {
            console.log("没有更多数据l ");
            this.endSend();
            return;
        }
        //将数据添加到 所有数据的容器中去
        //@ts-ignore
        this.alldata[data.pageInfo.pageCurrent] = data;
        //当前页面是最后一个页面
        if (data.pageInfo.pageCurrent == data.pageInfo.pageCount) {
            this.endSend();
            return;
        }
        //计算 当前进度条的进度
        {
            const totlePage = data.pageInfo.pageCount; //页面的总数
            const curTotlePage = Object.keys(this.alldata).length; //当前已经保存好的页面的数量
            this.exportData.percentage = Math.floor(
                (curTotlePage / totlePage) * (100 - this.org_percentage) + this.org_percentage
            );
        }
        //需要将 页码向后添加  并且开始发送 下一页的请求数据
        this.curPageInfo.pageCount = data.pageInfo.pageCurrent + 1;
        this.startSend();
    }

    //重置 页面信息
    resetPageInfo() {
        //这个是需要发送给服务器的请求
        Object.assign(this.curPageInfo, {
            pageCount: 1,
            page_size: this.everyPage_Size,
        });
        this.exportData.percentage = this.org_percentage; //进度条数据起始值
        this.alldata = {}; // 存所有数据的容器，重置
    }
    //开始发送数据请求
    startSend() {
        this.$emit("exportExcel", true, this.curPageInfo);
    }

    //数据请求结束
    endSend() {
        console.log("数据请求结束");
        //结束导出的时候将进度条 设置为100，然后关闭 这个页面
        this.exportData.percentage = 100;
        this.exportData.bShow = false;

        const data = this.setFullData();
        this.exportExcel(data);
        this.$emit("exportExcel", false, null);
    }
    cancleSend() {
        this.exportData.bShow = false;
        this.fiterSelectData.bShow = false;
        this.$emit("exportExcel", false, null);
    }
    /**导出excel */
    exportExcel(data: any) {
        const option = [];
        //设置导出的筛选
        for (let index = 0; index < this.fiterOption.length; index++) {
            const element = this.fiterOption[index];
            if (this.fieldOptions.includes(element)) {
                option.push(element);
            }
        }
        new BaseInfo.ExportExcel(
            this.export_file_name,
            option,
            this.proxy.tableData.columns,
            data.list,
            this.convertKeys,
            this.excludeKeys
        );
    }

    setFullData() {
        //将每个页面按照页面的顺序重组为 一个大的数据
        const keys = Object.keys(this.alldata);
        const fulldata = {
            list: [],
            pageInfo: {},
            summary: {},
        };
        //检查数组是否完整
        if (this.pageInfo.pageCount != keys.length) {
            console.log(
                "数量不正确，需要重新发送: this.pageInfo.pageCount " + this.pageInfo.pageCount + "-------keys:" + keys
            );
            return fulldata;
        }
        for (let index = 1; index <= this.pageInfo.pageCount; index++) {
            //@ts-ignore
            fulldata.list.push(...this.alldata[index].list);
            //@ts-ignore
            Object.assign(fulldata.pageInfo, this.alldata[index].pageInfo);
            //@ts-ignore
            Object.assign(fulldata.summary, this.alldata[index].summary);
        }
        console.log("重组之后的数据为", fulldata);
        return fulldata;
    }
    //选择 导出 列表 结束，开始发送信息请求数据，
    handleSubmit() {
        //this.myProxy.onClickExport(this.myProxy.fieldSelectionData.fieldOptions);
        this.fiterSelectData.bShow = false;
        this.exportData.bShow = true;
        console.log("开始请求数据。。。。", this.fieldOptions);
        this.resetPageInfo();
        this.startSend();
    }

    handleCheckAllChange(val: any) {
        console.log("选择全部---", val);
        this.fieldOptions = val ? this.fiterOption_val : [];
        this.fiterSelectData.isIndeterminate = false;
    }

    handleCheckedFieldsChange(value: any) {
        console.log(" 选项变化---");
        let checkedCount = value.length;
        this.fiterSelectData.checkAll = checkedCount === this.fiterOption_val.length;
        this.fiterSelectData.isIndeterminate = checkedCount > 0 && checkedCount < this.fiterOption_val.length;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog {
    padding-top: 8rem;
}
</style>
