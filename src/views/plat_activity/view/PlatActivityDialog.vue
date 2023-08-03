<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="1200px" top="20px">
        <el-scrollbar style="height: 700px">
            <el-form ref="form" :rules="rules" :model="form" label-width="160px" v-loading="net_status.loading">
                <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                    <el-select
                        v-model="form.plat_id"
                        filterable
                        :placeholder="LangUtil('请选择')"
                        :disabled="isStatusUpdate"
                        @change="onPlatChange"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.plat_id.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="tableColumns['activity_name'].name" prop="activity_name">
                    <div class="flex d-flex">
                        <el-input
                            style="margin-right: 0.8rem"
                            :placeholder="LangUtil('请输入')"
                            v-model="form.activity_name"
                        ></el-input>
                        <el-button
                            style="max-height: 35px"
                            type="primary"
                            size="mini"
                            @click="handleTranslate(form.activity_name)"
                            >{{ LangUtil("翻译") }}</el-button
                        >
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                    <div style="display: flex">
                        <el-upload
                            action="#"
                            list-type="picture-card"
                            :on-change="handleChange1"
                            :auto-upload="false"
                            :multiple="false"
                            :show-file-list="false"
                            ref="upload"
                            v-if="!myProxy.dialogData.fileList1[0].url"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="upload-box" @mouseover="showMask1 = true" @mouseleave="showMask1 = false" v-else>
                            <div class="mask" v-show="showMask1">
                                <div class="icon-bar">
                                    <i class="el-icon-delete" @click="handleRemove1"></i>
                                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview1"></i>
                                </div>
                            </div>

                            <img :src="formatImageUrl(myProxy.dialogData.fileList1[0].url)" />
                        </div>
                        <el-button
                            style="max-height: 35px; margin-left: 10px"
                            type="primary"
                            size="mini"
                            @click="handleLangImg1()"
                        >
                            <!-- 多语言图片 -->
                            {{ LangUtil("多语言图片") }}
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('活动模板')">
                    <div class="d-flex">
                        <el-select
                            v-model="form.type"
                            filterable
                            :placeholder="LangUtil('请选择')"
                            :disabled="isStatusUpdate"
                            @change="onTypeChange"
                            class="model"
                        >
                            <el-option :label="LangUtil('自定义')" value="2"></el-option>
                            <el-option :label="LangUtil('模板')" value="1"></el-option>
                        </el-select>
                        <el-select
                            v-model="form.model_id"
                            filterable
                            :placeholder="LangUtil('选择活动模板')"
                            v-if="form.type == 1"
                            @change="onModelIdChange"
                            :disabled="isStatusUpdate"
                        >
                            <el-option
                                v-for="(value, key) in activityModelList"
                                :key="key"
                                :label="value.activity_name"
                                :value="Number(value.id)"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="LangUtil('模板描述')"
                    prop="des"
                    v-if="form.type == 1 && form.model_id"
                >
                    <div>{{ form.des }}</div>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['active_model_tag'].name" prop="active_model_tag">
                    <el-input v-model="form.active_model_tag" :placeholder="LangUtil('请输入')"></el-input>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['start_time'].name" prop="start_time">
                    <el-date-picker
                        v-model="form.start_time"
                        type="date"
                        align="right"
                        :placeholder="LangUtil('选择开始时间')"
                        value-format="yyyy-MM-dd"
                        :disabled="isStatusUpdate"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['end_time'].name" prop="end_time">
                    <el-date-picker
                        v-model="form.end_time"
                        type="date"
                        align="right"
                        :placeholder="LangUtil('选择结束时间')"
                        value-format="yyyy-MM-dd"
                        :disabled="isStatusUpdate"
                        :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['process_control'].name" prop="process_control">
                    <el-radio-group v-model="form.process_control" :disabled="isStatusUpdate">
                        <el-radio
                            v-for="(value, key) in tableColumns['process_control'].options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['is_preheat'].name"
                    prop="is_preheat"
                    v-if="form.show_type == 2 || form.show_type == 4"
                >
                    <el-radio-group v-model="form.is_preheat" :disabled="isStatusUpdate">
                        <el-radio
                            v-for="(value, key) in tableColumns['is_preheat'].options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['model_open_mode'].name" prop="model_open_mode">
                    <el-select v-model="form.model_open_mode" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['model_open_mode'].options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" v-if="isCustom" :label="tableColumns['open_mode_url'].name">
                    <el-input
                        v-model="form.open_mode_url"
                        :placeholder="LangUtil('请输入')"
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['activity_category'].name">
                    <div class="flex d-flex">
                        <el-input
                            v-model="form.activity_category"
                            :placeholder="LangUtil('请输入')"
                            style="margin-right: 0.8rem"
                            maxlength="30"
                            show-word-limit
                            clearable
                            type="textarea"
                        ></el-input>
                        <el-button
                            style="max-height: 35px"
                            type="primary"
                            size="mini"
                            @click="handleTranslate(form.activity_category)"
                            >{{ LangUtil("翻译") }}</el-button
                        >
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="tableColumns['rule_desc'].name">
                    <div class="flex d-flex">
                        <el-input
                            v-model="form.rule_desc"
                            :placeholder="LangUtil('请输入')"
                            style="margin-right: 0.8rem"
                            show-word-limit
                            clearable
                            type="textarea"
                            rows="3"
                        ></el-input>
                        <el-button
                            style="max-height: 35px"
                            type="primary"
                            size="mini"
                            @click="handleTranslate(form.rule_desc)"
                            >{{ LangUtil("翻译") }}</el-button
                        >
                    </div>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['award_type'].name"
                    prop="award_type"
                    v-if="form.type == 1 && (form.settlement_type == 1 || form.settlement_type == 2)"
                >
                    <el-radio-group v-model="form.award_type" disabled v-if="isStatusUpdate">
                        <el-radio
                            v-for="(value, key) in tableColumns['award_type'].options"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ tableColumns["award_type"].options[key] }}
                        </el-radio>
                    </el-radio-group>
                    <el-radio-group v-model="form.award_type" v-else>
                        <el-radio v-for="(item, index) in form.award_types" :key="index" :label="item">
                            {{ tableColumns["award_type"].options[item] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['bonus_multiple'].name"
                    prop="bonus_multiple"
                    v-if="form.type == 1"
                >
                    <el-input
                        v-model="form.bonus_multiple"
                        :placeholder="LangUtil('请输入')"
                        :disabled="isStatusUpdate"
                    ></el-input>
                </el-form-item>
                <!-- 展示方式 -->
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="!form.model_id"
                >
                    <el-radio-group :disabled="isStatusUpdate" v-model="form.show_type" @change="showTypeChange">
                        <el-radio
                            v-for="(value, key) in spliceShowTypes(tableColumns['show_type'].options)"
                            :key="key"
                            :label="Number(key)"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="!isStatusUpdate && form.model_id"
                >
                    <el-radio-group :disabled="isStatusUpdate" v-model="form.show_type" @change="showTypeChange">
                        <el-radio v-for="(value, key) in form.show_types" :key="key" :label="Number(value)">
                            {{ tableColumns["show_type"].options[value] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['show_type'].name"
                    prop="show_type"
                    v-if="isStatusUpdate && form.model_id"
                >
                    <el-radio-group :disabled="isStatusUpdate" v-model="form.show_type" @change="showTypeChange">
                        <el-radio
                            v-for="(item, index) in getShowTypes(form.model_id)"
                            :key="index"
                            :label="Number(item)"
                        >
                            {{ tableColumns["show_type"].options[item] }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item
                    v-if="form.award_type == 16 || form.award_type == '16'"
                    size="mini"
                    :label="LangUtil('派奖方式')"
                >
                    <div>
                        <el-row>
                            {{ tableColumns["daily_ratio"].name }}
                        </el-row>
                        <el-row :gutter="10">
                            <!-- <el-col :span="3">
                            <div>
                                <el-button
                                    @click="onDeleteDailyRatio()"
                                    :disabled="!form.daily_ratio || form.daily_ratio.length < 1"
                                    type="primary"
                                    icon="el-icon-refresh"
                                    >{{ LangUtil("删除") }}</el-button
                                >
                            </div>
                            <div style="margin-top: 8px;">
                                <el-button @click="onAddDailyRatio()" type="primary" icon="el-icon-refresh">{{
                                    LangUtil("添加")
                                }}</el-button>
                            </div>
                        </el-col> -->

                            <el-col :span="3" v-for="(value, key) in form.daily_ratio" :key="key">
                                <div style="height: 30px;">{{ LangUtil("第{0}天%", key + 1) }}</div>
                                <div style="margin-top: 8px; height:30px">
                                    <el-input-number
                                        v-model="form.daily_ratio[key]"
                                        size="mini"
                                        :precision="1"
                                        :step="1"
                                        :max="100"
                                        controls-position="right"
                                        style="width: 100%"
                                    ></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>

                <el-form-item size="mini" :label="LangUtil('上传图片')" v-if="form.show_type == 4" prop="link_url">
                    <div style="display: flex">
                        <el-upload
                            action="#"
                            list-type="picture-card"
                            :on-change="handleChange"
                            :auto-upload="false"
                            :multiple="false"
                            :show-file-list="false"
                            ref="upload"
                            v-if="!myProxy.dialogData.fileList[0].url"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="upload-box" @mouseover="showMask = true" @mouseleave="showMask = false" v-else>
                            <div class="mask" v-show="showMask">
                                <div class="icon-bar">
                                    <i class="el-icon-delete" @click="handleRemove"></i>
                                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview"></i>
                                </div>
                            </div>

                            <img :src="formatImageUrl(myProxy.dialogData.fileList[0].url)" />
                        </div>
                        <el-button
                            style="max-height: 35px; margin-left: 10px"
                            type="primary"
                            size="mini"
                            @click="handleLangImg()"
                        >
                            {{ LangUtil("多语言图片") }}
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item size="mini" v-if="form.show_type == 1">
                    <el-button size="mini" type="primary" @click="handleLangTinymce">
                        {{ LangUtil("添加内容") }}
                    </el-button>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['link_url'].name"
                    prop="link_url"
                    v-if="form.show_type == 2"
                >
                    <el-input v-model="form.link_url" :placeholder="LangUtil('请输入')"></el-input>
                </el-form-item>
                <!-- 扩展任务类型 -->
                <el-form-item size="mini" :label="tableColumns['extended_task_type'].name" prop="extended_task_type">
                    <el-radio-group v-model="form.extended_task_type" @change="onExtendTypeChange">
                        <el-radio
                            v-for="(value, key) in tableColumns['extended_task_type'].options"
                            :key="key"
                            :label="Number(key)"
                            :disabled="isStatusUpdate"
                        >
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="title" v-if="form.extended_task_type == 2">{{ LangUtil("奖励任务设置") }}</div>
                <div class="layout" v-if="form.extended_task_type == 2">
                    <div>
                        <el-form-item style="margin-bottom: 0px;" :label="LangUtil('基本设置')"></el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_days"
                            prop="task_days"
                            label-width="250px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入天数')"
                                    v-model="form.task_days"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>

                        <!-- <el-form-item
                            :label="tableColumns.activity_coin_task.options.transfer_amount_rate"
                            prop="transfer_amount_rate"
                            label-width="250px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.transfer_amount_rate"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item> -->

                        <el-form-item style="margin-bottom: 15px;padding-top: 20px;" :label="LangUtil('游戏厂商流水')">
                            <el-button
                                type="primary"
                                icon="el-icon-circle-plus-outline"
                                @click="handleAddVendor"
                                size="mini"
                                :disabled="!form.plat_id"
                                >{{ LangUtil("新增") }}</el-button
                            >
                        </el-form-item>
                        <el-form-item
                            v-for="(item, index) of form.vendorArr"
                            :key="index"
                            :label="tableColumns.vendor_ids.options[form.plat_id][item.vendor_id]"
                        >
                            <div class="flex d-flex">
                                <el-input-number
                                    size="mini"
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    controls-position="right"
                                    v-model="form.vendorArr[index].water"
                                    style="margin-right: 10px"
                                >
                                </el-input-number>
                                <!-- <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.vendorArr[index].water"
                                    style="margin-right: 10px"
                                ></el-input> -->
                                <el-button type="danger" @click="handleDeleteVendor(index)" size="mini">{{
                                    LangUtil("删除")
                                }}</el-button>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item style="margin-bottom: 0px;" :label="LangUtil('任务流水%')"> </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_2"
                            prop="task_water_rate_2"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_2"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_4"
                            prop="task_water_rate_4"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_4"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_8"
                            prop="task_water_rate_8"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_8"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_16"
                            prop="task_water_rate_16"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_16"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_32"
                            prop="task_water_rate_32"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_32"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_64"
                            prop="task_water_rate_64"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_64"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item
                            :label="tableColumns.activity_coin_task.options.task_water_rate_128"
                            prop="task_water_rate_128"
                            label-width="200px"
                        >
                            <div class="flex d-flex">
                                <el-input
                                    :placeholder="LangUtil('请输入')"
                                    v-model="form.task_water_rate_128"
                                    oninput="value=value.replace(/[^\d]/g,''); if(value>100){value=100}"
                                    :disabled="isStatusUpdate"
                                ></el-input>
                            </div>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <!-- 奖励规则 -->
            <div v-if="form.type == 1 && form.model_id" class="_title">
                {{ LangUtil("奖励规则") }}
            </div>
            <div v-if="form.type == 1" style="bordertop: 2px solid #dddddd">
                <div
                    class="rules-item"
                    v-for="(item, index) in form.rules"
                    :key="index"
                    style="color: #666666; font-size: 14px; font-weight: bold"
                >
                    <el-row type="flex" justify="start" align="middle" :gutter="24">
                        <el-col :span="2">
                            <div>{{ LangUtil("ID") }}: {{ item.rule_num }}</div>
                        </el-col>
                        <el-col :span="14">
                            <div>{{ item.name }}</div>
                        </el-col>
                    </el-row>
                    <div class="rule-list" v-for="(rule, secondIndex) in item.list" :key="secondIndex">
                        <el-row type="flex" justify="start" align="middle" :gutter="24">
                            <el-col :span="3">
                                <div>{{ LangUtil("ID") }}: {{ secondIndex + 1 }}</div>
                            </el-col>
                            <el-col :span="13">
                                <div>{{ rule.name }}</div>
                            </el-col>
                            <template v-if="form.extended_task_type == 2">
                                <el-col :span="3">
                                    <div>{{ tableColumns.activity_coin_task.options.transfer_amount_rate }}</div>
                                </el-col>
                                <el-col :span="4">
                                    <el-input
                                        size="small"
                                        :placeholder="LangUtil('请输入')"
                                        :min="0"
                                        :step="1"
                                        :precision="0"
                                        v-model="form.transfer_amount_rate_Arr[index + secondIndex]"
                                        :disabled="isStatusUpdate"
                                        style="width: 80px"
                                    ></el-input>
                                </el-col>
                            </template>
                            <el-col :span="4">
                                <div>{{ tableColumns["bonus_multiple"].name }}</div>
                            </el-col>
                            <el-col :span="4">
                                <el-input
                                    size="small"
                                    :placeholder="LangUtil('请输入')"
                                    v-model="rule.bonus_multiple"
                                    :disabled="isStatusUpdate"
                                    style="width: 80px"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <div class="child-rule-list" v-for="(childRule, thirdIndex) in rule.list" :key="thirdIndex">
                            <el-row type="flex" justify="start" align="middle" :gutter="24">
                                <el-col :span="4">
                                    <div>{{ typeOptions[childRule.type] }}</div>
                                </el-col>
                                <el-col :span="4">
                                    <div>{{ getRuleInfo(childRule).params_name }}</div>
                                </el-col>

                                <el-col :span="16">
                                    <el-input
                                        size="small"
                                        v-if="childRule.params_type == '1'"
                                        v-model="childRule.params"
                                        :placeholder="LangUtil('请输入')"
                                        :disabled="isStatusUpdate"
                                        style="width: 80px"
                                    ></el-input>

                                    <template v-if="childRule.type == 61 && childRule.params_type == 5">
                                        <!-- 币种选择 -->
                                        <el-select
                                            size="small"
                                            v-if="isShowSelectCoin(childRule)"
                                            v-model="childRule.coin_type"
                                            filterable
                                            :placeholder="LangUtil('请选择')"
                                            :disabled="isStatusUpdate"
                                            style="margin-right: 5px"
                                        >
                                            <el-option
                                                v-for="(value, key) in coinOption"
                                                :key="key"
                                                :label="value"
                                                :value="key"
                                            ></el-option>
                                        </el-select>
                                        <template v-if="getRuleInfo(childRule).key_value_type != 2">
                                            <el-input-number
                                                size="small"
                                                v-model="childRule.coin_amount"
                                                :placeholder="LangUtil('请输入')"
                                                :disabled="isStatusUpdate"
                                                :min="0"
                                                :step="1"
                                                controls-position="right"
                                            ></el-input-number>
                                        </template>
                                        <template v-else>
                                            <template v-if="status == dialogStatus.create">
                                                <el-input-number
                                                    size="small"
                                                    v-model="childRule.coin_amount"
                                                    :placeholder="LangUtil('请输入')"
                                                    :disabled="isStatusUpdate"
                                                    :min="0"
                                                    :step="1"
                                                    controls-position="right"
                                                ></el-input-number>
                                                <span style="margin-left: 10px;">{{ LangUtil("最大限制") }}</span>
                                                <el-input-number
                                                    style="margin-left: 10px;"
                                                    size="small"
                                                    v-if="childRule.type == 61 && childRule.params_type == 5"
                                                    v-model="childRule.max_limit"
                                                    :placeholder="LangUtil('请输入')"
                                                    :disabled="isStatusUpdate"
                                                    :min="0"
                                                    :step="1"
                                                    controls-position="right"
                                                ></el-input-number>
                                            </template>

                                            <template v-if="status == dialogStatus.update">
                                                <span v-for="(item, key) of childRule.params" :key="key">
                                                    <span>{{ key }}</span>
                                                    <el-input-number
                                                        size="small"
                                                        v-model="item.percent"
                                                        :placeholder="LangUtil('请输入')"
                                                        :disabled="isStatusUpdate"
                                                        :min="0"
                                                        :step="1"
                                                        controls-position="right"
                                                    ></el-input-number>
                                                    <span style="margin-left: 10px;">{{ LangUtil("最大限制") }}</span>
                                                    <el-input-number
                                                        style="margin-left: 10px;"
                                                        size="small"
                                                        v-model="item.max_limit"
                                                        :placeholder="LangUtil('请输入')"
                                                        :disabled="isStatusUpdate"
                                                        :min="0"
                                                        :step="1"
                                                        controls-position="right"
                                                    ></el-input-number>
                                                </span>
                                            </template>
                                        </template>
                                    </template>
                                    <el-radio-group
                                        v-model="childRule.params"
                                        v-if="childRule.params_type == '2'"
                                        :disabled="isStatusUpdate"
                                    >
                                        <el-radio v-for="(value, key) in boolOptions" :key="key" :label="Number(key)">
                                            {{ value }}
                                        </el-radio>
                                    </el-radio-group>
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="start" align="middle" :gutter="24">
                                <el-col :span="4"> </el-col>
                                <el-col :span="20" style="color: red">
                                    {{ getRuleInfo(childRule).desc }}
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <div slot="footer" class="dialog-footer">
            <el-button
                type="danger"
                size="mini"
                @click="handleCloseActive"
                v-if="isStatusUpdate && checkUnique(unique.plat_activity_close)"
            >
                {{ LangUtil("关闭") }}
            </el-button>
            <el-button
                type="primary"
                size="mini"
                @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                v-if="checkUnique(unique.plat_activity_update)"
                >{{ buttonText }}</el-button
            >
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityProxy from "@/views/plat_activity/proxy/PlatActivityProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, formatImageUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import { Message } from "element-ui";
import CommonLangImgProxy from "@/views/lang_img_dialog/proxy/CommonLangImgProxy";
import CommonLangTinymceProxy from "@/views/lang_tinymce_dialog/proxy/CommonLangTinymceProxy";
import i18n from "@/lang";

@Component
export default class PlatActivityDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    langImgProxy: CommonLangImgProxy = this.getProxy(CommonLangImgProxy);
    langTinymceProxy: CommonLangTinymceProxy = this.getProxy(CommonLangTinymceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    typeOptions: any = {
        "1": this.LangUtil("条件"),
        "21": this.LangUtil("消耗"),
        "61": this.LangUtil("奖励"),
        "71": this.LangUtil("概率奖池"),
    };

    //获取可以选择的币种类型
    get coinOption() {
        if (this.form.extended_task_type == 2) return this.tableColumns.activity_coin.options[this.form.plat_id];
        return this.tableColumns.reward_coin.options[this.form.plat_id];
    }
    get buttonText() {
        return this.isStatusUpdate ? this.LangUtil("确认保存") : this.LangUtil("新增");
    }

    //  paramsTypeOptions: any = {
    //     "1": "数值",
    //     "2": "布尔值",
    // };

    boolOptions: any = {
        0: this.LangUtil("否"),
        1: this.LangUtil("是"),
    };

    //  runTypeOptions: any = {
    //     1: "多次结算",
    //     2: "单次次结算",
    // };

    dialogStatus = DialogStatus;
    formatImageUrl = formatImageUrl;

    showMask = false;
    showMask1 = false;
    dialogImageUrl = "";
    dialogVisible = false;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    @Watch("myProxy.dialogData.update")
    onWatchUpdate() {
        this.$nextTick(() => {
            this.$forceUpdate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get isCustom() {
        return this.form.type === "2";
    }

    // 活动模板 下拉选单
    get activityModelList() {
        console.log("活动模板 下拉选单");
        return this.myProxy.activeModelData.options;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            activity_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            is_preheat: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            start_time: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            end_time: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            model_open_mode: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            settlement_type: [{ required: false }],
            award_type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            bonus_multiple: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            model_id: [{ required: false }],
            link_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            show_type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            rules: [{ required: false, message: this.LangUtil("必须填写"), trigger: "change" }],
            extended_task_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            task_days: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            transfer_amount_rate: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_2: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_4: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_8: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_16: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_32: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_64: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            task_water_rate_128: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleCloseActive() {
        this.myProxy.onCloseActive();
    }
    //图片相关---
    handleChange(file: any) {
        this.myProxy.dialogData.uploadType = "link_url";
        const data = {
            type: 2,
            file: file.raw,
        };
        this.myProxy.uploadImage(data);
    }

    handleRemove(file: any) {
        this.myProxy.dialogData.fileList = [{ rul: "" }];
        this.showMask = false;
    }
    handlePictureCardPreview() {
        GlobalVar.preview_image.url = this.myProxy.dialogData.fileList[0].url;
    }

    handleChange1(file: any) {
        this.myProxy.dialogData.uploadType = "icon";
        const data = {
            type: 2,
            file: file.raw,
        };
        this.myProxy.uploadImage(data);
    }

    handleRemove1(file: any) {
        this.myProxy.dialogData.form.icon = "";
        this.myProxy.dialogData.fileList1 = [{ rul: "" }];
        this.showMask1 = false;
    }
    handlePictureCardPreview1() {
        GlobalVar.preview_image.url = this.myProxy.dialogData.fileList1[0].url;
    }
    //---图片相关

    onPlatChange(id: any) {
        const data: any = {
            page_count: 1,
            page_size: 3000,
            plat_id: id,
        };
        this.myProxy.getActivityModel(data);
    }

    onTypeChange(type: any) {
        this.$nextTick(() => {
            (this.$refs["form"] as any & { clearValidate: () => void }).clearValidate();
        });
        if (type == 2) {
            this.myProxy.resetDialogForm();
        } else {
            this.myProxy.dialogData.form.show_type = 2;
        }
    }

    onExtendTypeChange(type: any) {
        if (type == 2) {
            for (const item of this.myProxy.dialogData.form.rules) {
                for (const child of item.list) {
                    for (const child_1 of child.list) {
                        if (child_1.params_type && child_1.type) {
                            if (child_1.type == 61 && child_1.params_type == 5) {
                                child_1.coin_type = "";
                                child_1.coin_amount = 0;
                            }
                        }
                    }
                }
            }
        }
    }

    onModelIdChange(id: any) {
        this.myProxy.getModelDetail(id);
    }

    showTypeChange() {
        this.form.link_url = "";
        (this.$refs["form"] as any & { clearValidate: () => void }).clearValidate();
    }

    spliceShowTypes(showTypes: any) {
        if (!showTypes) return "";
        return {
            1: showTypes[1],
            2: showTypes[2],
            4: showTypes[4],
        };
    }

    getRuleInfo(rule: any) {
        let result: any = [];
        result = this.myProxy.activeModelData.ruleList.filter((item: any) => parseInt(rule.rule_id) === item.id);
        return result.length > 0 ? result[0] : "";
    }

    getShowTypes(model_id: any) {
        const model: any = this.activityModelList.find((item: any) => item.id == model_id);
        if (model && model.show_types) {
            return model.show_types;
        }
        return "";
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_ACTIVITY;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }

    handleLangImg() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.link_url;
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    handleLangImg1() {
        const data: any = {};
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.icon;
        if (!data.key) {
            const str: any = LangUtil("请先上传默认图片");
            Message.warning(str);
            return;
        }
        this.langImgProxy.showDialog(data);
    }

    handleLangTinymce() {
        if (!this.isStatusUpdate) {
            Message.warning(LangUtil("新建活动时不能编辑，请在编辑活动时使用"));
            return;
        }
        const data: any = {};
        data.type = LanguageType.TYPE_PLAT_ACTIVITY;
        data.plat_id = this.form.plat_id;
        data.key = this.myProxy.dialogData.form.link_url;
        this.langTinymceProxy.showDialog(data);
    }
    /** 添加每日返水  */
    onAddDailyRatio() {
        console.log("点击添加");
        this.form.daily_ratio.push(0);
    }
    onDeleteDailyRatio() {
        console.log("点击删除");
        this.form.daily_ratio.pop();
    }
    handleAddVendor() {
        this.myProxy.showVendorDialog();
    }
    handleDeleteVendor(i: any) {
        this.form.vendorArr.splice(i, 1);
    }

    pickerOptions = {
        disabledDate(time: any) {
            // return time.getTime() < (Date.now() - 86400000);
            const now = new Date(); // 当前时间
            const lastWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2); // 上周时间
            const twentyYearsFromNow = new Date(now.getFullYear() + 20, now.getMonth(), now.getDate()); // 20年后的时间
            // 禁用选择上周之前的日期和20年后的日期
            return time.getTime() < lastWeek.getTime() || time.getTime() > twentyYearsFromNow.getTime();
        },
    };
    //是否显示币种选择，只有 为 key -value 且为 预览模式的 时候才不显示
    isShowSelectCoin(childRule: any) {
        return (
            (this.getRuleInfo(childRule).key_value_type == 2 &&
                childRule.type == 61 &&
                childRule.params_type == 5 &&
                this.status == this.dialogStatus.create) ||
            this.getRuleInfo(childRule).key_value_type != 2
        );
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.d-flex {
    display: flex;
    .model {
        width: 110px;
    }
}
.rules-item {
    margin-left: 12px;
    margin-top: 24px;
    border: 1px solid #f08080;
    padding: 12px;
    padding-bottom: 0;
    .rule-list {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #ddd;
        .child-rule-list {
            margin: 16px 0;
            padding: 10px;
            border: 1px solid #ddd;
        }
    }
}
.dialog-footer {
    // display: flex;
    justify-content: space-between;
    text-align: right;
    &.plat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.upload-box {
    width: 148px;
    height: 148px;
    border: 1px dashed #c0ccda;
    margin-left: 10px;
    cursor: pointer;
    position: relative;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
        .icon-bar {
            display: flex;
            justify-content: space-around;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            i {
                color: #fff;
                font-size: 20px;
            }
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
._title {
    color: #666666;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 14px;
    margin-left: 12px;
    margin-top: 48px;
}
.layout {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 20px;
    .el-form {
        width: 50%;
    }
    div {
        width: 100%;
    }
}
.title {
    font-weight: bold;
    font-size: 18px;
}
</style>
