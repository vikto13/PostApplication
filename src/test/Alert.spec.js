import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Alert from "../components/Alert.vue"
import { describe, it, expect } from "vitest";

describe("Alert.vue", () => {
    let message = {
        show: true,
        alertType: 'warning',
        text: "Something went wrong",
        setTimer: false
    }
    it('should render the alert message when the show property is changed to the boolean', async () => {
        let computed = {
            alert: () => message
        }
        let wrapper = shallowMount(Alert, { computed })
        expect(wrapper.isVisible()).toBe(true)

        message.show = false
        computed = {
            alert: () => message
        }
        expect(wrapper.isVisible()).toBe(true)
    })

    it('should not render the alert when the show property is null', async () => {
        message.show = null
        let computed = {
            alert: () => message
        }
        let wrapper = shallowMount(Alert, { computed })
        expect(wrapper.isVisible()).toBe(false)
    })
});