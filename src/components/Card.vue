<template>
    <div class="col-sm-6" style="margin-bottom: 5%">
        <div class="card text-center">
            <div class="card-header" style="text-align: start">
                {{ headerText }}
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <p class="card-text">
                    {{ bodyText }}
                </p>
                <button
                    v-for="(button, index) in buttons"
                    href="#"
                    class="btn article-button"
                    :class="`btn-${index ? 'success' : 'danger'}`"
                    style="margin-left: 5%"
                    :key="index"
                    @click="$emit('pressed', { index, id })"
                >
                    {{ button }}
                </button>
            </div>
            <div class="card-footer text-body-secondary">
                {{ footerText }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        'header-text': {
            type: String,
            defaul: '',
        },
        title: {
            type: String,
            defaul: '',
        },
        'body-text': {
            type: String,
            defaul: '',
        },
        buttons: {
            type: Array,
            defaul: ['Ok'],
        },
        'footer-text': {
            type: String,
            defaul: '',
        },
        id: {
            type: Number,
        },
    },
}
</script>
