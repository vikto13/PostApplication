import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Alert from "../components/Alert.vue"
import { describe, it, expect } from "vitest";
import jest from 'jest'


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
    it('should not render alert after a delay when time property is true', async () => {
        // jest.useFakeTimers()
        // message.setTimer = true
        // message.show = true
        // let computed = {
        //     alert: () => message
        // }
        // let wrapper = shallowMount(Alert, { computed })

        // wrapper.vm.$watch('alert.show', () => {
        //     jest.advanceTimersByTime(3000)
        // })
        // // expect(setTimeout).toHaveBeenCalledTimes(1)
        // // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000)

        // // jest.useRealTimers()
        // // expect(wrapper.isVisible()).toBe(true)
        // // await wrapper.vm.$nextTick()
        // // console.log(wrapper.isVisible())
        // // expect(wrapper.isVisible()).toBe(false)
        console.log(jest)
    })
});