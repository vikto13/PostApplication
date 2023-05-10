<template>
    <div v-show="alert.show" class="alert" :class="`alert-${alert.alertType}`">
        {{ alert.text }}
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            isShowing: false,
        }
    },
    computed: {
        ...mapGetters(['alert']),
    },
    methods: {
        ...mapActions(['alertAction']),
    },
    watch: {
        'alert.show'() {
            if (!this.isShowing && this.alert.setTimer) {
                this.isShowing = true
                setTimeout(() => {
                    this.isShowing = false
                    this.alertAction(false)
                }, 3000)
            } else if (!this.isShowing && !this.alert.setTimer) {
                this.isShowing = true
                this.alertAction(true)
            }
        },
    },
}
</script>
