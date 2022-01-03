<template>
    <div class="item_group search_date_picker">
        <div class="cust_title">{{ title }}</div>
        <el-date-picker
            v-model="timeRange"
            :type="type"
            range-separator="-"
            :start-placeholder="start"
            :end-placeholder="end"
            :picker-options="pickerOptions"
            @change="datePick"
            :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
        <slot></slot>
    </div>
    <!-- 父组件用法 -->
    <!-- <date-picker :title="" :date.sync=""></date-picker> -->
</template>

<script lang="ts">
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import i18n from "@/lang";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DateRangePicker extends Vue {
    @Prop({ default: "选择时间" })
    private title!: string;
    @Prop({ default: false })
    private showSecond!: boolean;

    private timeRange: string[] = [];

    @Prop()
    private date!: string[];
    @Watch("date", { immediate: true })
    private setTime(value: string[]) {
        this.timeRange = value;
    }
    private start: any = i18n.t("component.startFrom");
    private end: any = i18n.t("component.endTo");

    get type() {
        if (this.showSecond) {
            return "datetimerange";
        } else {
            return "daterange";
        }
    }

    private datePick(data: Date[]) {
        if (!data) {
            this.$emit("update:date", []);
            return;
        }

        let format: string = "";
        if (this.showSecond) {
            format = "yyyy-MM-dd hh:mm:ss";
        } else {
            format = "yyyy-MM-dd";
        }

        let dateFrom = dateFormat(data[0], format);
        let dateTo = dateFormat(data[1], format);

        this.$emit("update:date", [dateFrom, dateTo]);
        this.$emit("change");
    }

    @Prop({
        type: Object,
        default() {
            return {
                shortcuts: [
                    {
                        text: i18n.t("common.today"),
                        onClick(picker: any) {
                            const start = getTodayOffset();
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: i18n.t("common.yesterday"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-1);
                            const end = getTodayOffset(0, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: i18n.t("common.lastWeek"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-6);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: i18n.t("common.lastMonth"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-30);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: i18n.t("common.last3Month"),
                        onClick(picker: any) {
                            const start = getTodayOffset(-90);
                            const end = getTodayOffset(1, 1);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            };
        },
    })
    private pickerOptions!: Object;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
