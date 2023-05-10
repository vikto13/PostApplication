<template>
    <ul class="pagination" style="justify-content: center">
        <li class="page-item">
            <a
                class="page-link"
                :class="backIsDisabled"
                href="#"
                aria-label="Previous"
                @click="toNextPage(false)"
            >
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li
            class="page-item"
            v-for="(value, index) in countPagination"
            :key="index"
        >
            <a
                class="page-link"
                :class="isCurrent(value - 1)"
                href="#"
                @click="toNextPage(value - 1)"
                >{{ value }}</a
            >
        </li>
        <li class="page-item">
            <a
                class="page-link"
                :class="nextIsDisabled"
                href="#"
                aria-label="Next"
                @click="toNextPage(true)"
            >
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        itemsSize: {
            type: Number,
        },
    },
    computed: {
        ...mapGetters(['pagination']),
        backIsDisabled() {
            return this.pagination.currentPage == 0 ? 'disabled' : null
        },
        nextIsDisabled() {
            return this.pagination.currentPage * this.pagination.pageSlice +
                this.pagination.pageSlice >=
                this.itemsSize
                ? 'disabled'
                : null
        },
        countPagination() {
            let { currentPage, pageSlice } = this.pagination
            let size = Math.ceil(this.itemsSize / pageSlice)

            currentPage == size &&
            Number.isInteger(this.itemsSize / 4) &&
            currentPage
                ? (this.$store.commit('decreasePage'),
                  (currentPage = currentPage - 1))
                : null

            return new Array(size)
                .fill(null)
                .map((_, index) => index + 1)
                .slice(
                    currentPage > 1 ? currentPage - 1 : 0,
                    currentPage < 2 ? 3 : currentPage + 2
                )
        },
    },
    methods: {
        ...mapActions(['toNextPage']),
        isCurrent(index) {
            return index == this.pagination.currentPage ? 'active' : null
        },
    },
}
</script>
