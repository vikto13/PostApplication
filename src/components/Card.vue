<template>
    <div class="card" style="margin-bottom: 2%; padding: 0">
        <div class="accordion">
            <button
                class="button"
                style="
                    background-color: white;
                    width: 100%;
                    border-width: 0;
                    border-radius: 10%;
                "
                @click="$emit('pressedHeader', id)"
            >
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
                                @click.stop="
                                    $emit('pressed', { target: 0, id })
                                "
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                style="width: 5rem; margin: 2%"
                                @click.stop="
                                    $emit('pressed', { target: 1, id })
                                "
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </button>
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
