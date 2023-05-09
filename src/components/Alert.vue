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
            if (this.alert.setTimer) {
                this.alert.show ? this.alertAction(true) : null
                setTimeout(() => {
                    this.alertAction(false)
                }, 3000)
            } else {
                this.alertAction(true)
            }
        },
    },
}
</script>
