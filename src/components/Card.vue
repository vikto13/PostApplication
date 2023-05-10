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

                <!-- <select
                        class="form-select"
                        style="border-width: 0; background-color: brown"
                        @click="
                            ({ target }) => $emit('pressed', { target, id })
                        "
                    >
                        <option value="1">Edit</option>
                        <option value="2">Delete</option> -->

                <div
                    class="column"
                    style="
                        background-color: black;
                        justify-content: center;
                        align-items: center;
                        align-content: center;
                    "
                >
                    <button
                        type="button"
                        class="btn btn-primary"
                        style="align-self: center"
                    >
                        Edit
                    </button>
                    <button type="button" class="btn btn-primary">Edit</button>
                </div>
                <!-- </select> -->
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
