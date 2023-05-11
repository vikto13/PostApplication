<template>
    <div
        v-show="typeof alert.show == 'boolean'"
        class="alert"
        :class="`alert-${alert.alertType}`"
    >
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
            if (this.alert.show == null) {
                this.alertAction(null)
                return
            } else if (!this.isShowing && this.alert.setTimer) {
                this.isShowing = true
                setTimeout(() => {
                    this.isShowing = false
                    this.alertAction(null)
                    return
                }, 3000)
            } else {
                this.isShowing = false
                this.alertAction(true)
            }
        },
    },
}
</script>
