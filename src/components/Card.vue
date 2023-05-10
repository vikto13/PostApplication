<template>
    <div class="card" style="margin-bottom: 2%; padding: 0">
        <div class="accordion">
            <div class="accordion-item" style="border-radius: 0">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        style="
                            background-color: rgba(13, 110, 253, 0.1);
                            border-radius: 0;
                        "
                        @click="$emit('pressedHeader', id)"
                    ></button>
                </h2>
            </div>
        </div>
        <div class="card-body">
            <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <div class="col" style="align-self: center">
                    <div class="p-3">{{ size }}</div>
                </div>
                <div
                    v-for="(text, index) in texts"
                    :key="index"
                    class="col"
                    style="align-self: center"
                >
                    <div class="p-3">{{ text }}</div>
                </div>
                <div class="col" style="align-self: center">
                    <div class="p-3">
                        <button
                            type="button"
                            class="btn btn-primary"
                            style="width: 5rem; margin: 2%"
                            @click="$emit('pressed', { target: 0, id })"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            style="width: 5rem; margin: 2%"
                            @click="$emit('pressed', { target: 1, id })"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
