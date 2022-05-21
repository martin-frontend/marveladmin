<template>
    <div class="content">
        <EmailTemplateHeader/>
        <EmailTemplateBody/>
        <EmailTemplateDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import EmailTemplateMediator from "@/views/email_template/mediator/EmailTemplateMediator";
import { Component } from "vue-property-decorator";
import EmailTemplateBody from "./EmailTemplateBody.vue";
import EmailTemplateHeader from "./EmailTemplateHeader.vue";
import EmailTemplateDialog from "./EmailTemplateDialog.vue";

@Component({
    components: {
        EmailTemplateBody,
        EmailTemplateHeader,
        EmailTemplateDialog,
    },
})
export default class EmailTemplate extends AbstractView {

    constructor() {
        super(EmailTemplateMediator);
    }

    destroyed(){
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
