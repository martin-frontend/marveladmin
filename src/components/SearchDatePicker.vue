<template>
    <div class="content search_date_picker">
        <div v-if="isNeedTitle" class="title">
            {{ title }}
            <el-tooltip v-if="tip" effect="dark" :content="tip" placement="top">
                <i class="el-icon-question"></i>
            </el-tooltip>
        </div>
        <el-date-picker
            v-model="timeRange"
            :type="showTime ? 'datetimerange' : 'daterange'"
            :range-separator="to"
            :start-placeholder="start"
            :end-placeholder="end"
            :picker-options="pickerOptions"
            @change="datePick"
            :disabled="getDisabled"
            :default-time="['00:00:00', '23:59:59']"
            :clearable="getClearable"
        >
        </el-date-picker>
        <slot></slot>
    </div>
    <!-- 父组件用法 -->
    <!-- <SearchDatePicker
        :title="tableColumns.created_at.name"
        :startDate.sync="listQuery['created_at-{>=}']"
        :endDate.sync="listQuery['created_at-{<}']"
    /> -->
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import i18n from "@/lang";

@Component
export default class SearchDatePicker extends Vue {
    LangUtil = LangUtil;
    @Prop({ default: "选择时间" })
    title!: string;
    @Prop({ default: false })
    showTime!: boolean;
    @Prop() tip!: string;

    @Prop() startDate!: string;
    @Prop() endDate!: string;
    @Prop({ default: false }) disabled!: boolean;
    @Prop({ default: true }) clearable!: boolean;
    @Prop({ default: true }) isNeedTitle!: boolean;
    @Prop({
        default: () => {
            return {
                shortcuts: [
                    {
                        text: LangUtil("今日"),
                        onClick(picker: any) {
                            const start = getTodayOffset();
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: LangUtil("昨日"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-1);
                            const end = getTodayOffset(0, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: LangUtil("最近一周"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-6);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: LangUtil("最近一个月"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-29);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近60天",
                        onClick(picker: any) {
                            const start = getTodayOffset(-59);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            };
        },
    })
    pickerOptions!: {};

    timeRange: any = [this.getStartDate, this.getEndDate];
    start: any = LangUtil("选择开始时间");
    end: any = LangUtil("选择结束时间");
    to: any = LangUtil("至");
    defaultWidth: any = "350px";

    @Watch("startDate")
    onMinValueChange() {
        this.timeRange = [this.startDate, this.endDate];
    }

    @Watch("endDate")
    onMaxValueChange() {
        this.timeRange = [this.startDate, this.endDate];
    }

    get getStartDate() {
        return this.startDate ? this.startDate : "";
    }

    get getEndDate() {
        return this.endDate ? this.endDate : "";
    }

    get getDisabled() {
        return this.disabled;
    }

    get getClearable() {
        return this.clearable;
    }

    datePick(data: Date[]) {
        if (!data) {
            this.$emit("update:startDate", "");
            this.$emit("update:endDate", "");
        } else {
            let format: string = "yyyy-MM-dd hh:mm:ss";

            let dateFrom = dateFormat(data[0], format);
            let dateTo = dateFormat(data[1], format);

            this.$emit("update:startDate", dateFrom);
            this.$emit("update:endDate", dateTo);
        }
        this.$emit("change");
    }
}
</script>

<style scoped lang="scss">
.title {
    min-width: 97px;
    text-align: center;
    border-radius: 4px 0 0px 4px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    font-size: 14px;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.content {
    display: inline-table;
    margin-right: 10px;
    margin-bottom: 10px;
}
::v-deep .el-date-editor {
    border-radius: 0;
}
</style>
