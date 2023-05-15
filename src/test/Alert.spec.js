import Alert from "../components/Alert.vue"
import { describe, it, expect } from "vitest";
import createWrapper, { mergeDeep } from "./mockFacktory";
import { changeState } from "./addValues"

describe("Alert.vue", () => {

    let wrapper = createWrapper(Alert)

    it('should render the alert message when the show property is changed to the boolean', async () => {
        expect(wrapper.isVisible()).toBeFalsy()
        wrapper.vm.$store.commit("changeAlert", true)
        await wrapper.vm.$nextTick()
        expect(wrapper.isVisible()).toBeTruthy()
    })

    it('should not render the alert when the show property is null', async () => {
        wrapper = await mergeDeep(wrapper, changeState('alert', { show: true }))
        expect(wrapper.isVisible()).toBeTruthy()
        wrapper.vm.$store.commit("changeAlert", null)
        await wrapper.vm.$nextTick()
        expect(wrapper.isVisible()).toBeFalsy()
    })

    it('should show the alert text when the show property is boolean type', async () => {
        wrapper = await mergeDeep(wrapper, changeState("alert", { text: 'Something went wrong' }))
        expect(wrapper.text()).toContain('Something went wrong')
    })

    it('should hide alert after 3 seconds', async () => {
        wrapper = await mergeDeep(wrapper, changeState("alert", { setTimer: true }))
        expect(wrapper.isVisible()).toBeFalsy()

        wrapper.vm.$store.commit("changeAlert", true)
        await wrapper.vm.$nextTick()
        expect(wrapper.isVisible()).toBeTruthy()

        await new Promise(resolve => setTimeout(resolve, 4000))
        expect(wrapper.isVisible()).toBeFalsy()
    })
});