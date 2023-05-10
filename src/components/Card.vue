<template>
    <div class="card" style="margin-bottom: 2%">
        <div class="card-body">
            <div class="row row-cols-2 row-cols-lg-6 g-2 g-lg-3">
                <div class="col">
                    <div class="p-3">{{ size }}</div>
                </div>
                <div v-for="(text, index) in texts" :key="index" class="col">
                    <div class="p-3">{{ text }}</div>
                </div>

                <div class="p-3">
                    <select
                        class="form-select"
                        style="width: 15%; border-radius: 15%; border-width: 0"
                    >
                        <option value="1">Edit</option>
                        <option value="2">Delete</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="col-sm-6" style="margin-bottom: 5%">
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
    </div> -->
</template>
<script>
export default {
    props: {
        texts: {
            type: Array,
        },
        id: {
            type: Number,
        },
        size: {
            type: Number,
        },
    },
}
</script>
