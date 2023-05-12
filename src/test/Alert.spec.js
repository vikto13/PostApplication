import { shallowMount } from "@vue/test-utils";
import Alert from "../components/Alert.vue"
import { describe, it, expect } from "vitest";
import Vuex from 'vuex'
import Vue from "vue";
import { vi } from "vitest";

describe("Alert.vue", () => {
    Vue.use(Vuex)
    let data = {
        data: () => {
            return {
                isShowing: false
            }
        }
    }
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
    it('should show the alert text when the show property is boolean type', async () => {
        message.show = !message.show;
        let computed = {
            alert: () => message
        }
        let wrapper = shallowMount(Alert, { computed })
        expect(wrapper.text()).toContain('Something went wrong')
    })
    it('should hide alert after 3 seconds', async () => {
        const actions = {
            alertAction: ({ commit }, action) => {
                commit('disableAlert', action)
            }
        }
        const getters = {
            alert: (state) => ({ ...state })
        }

        const mutations = {
            disableAlert: (state, action) => {
                state.show = action
            }
        }
        message.show = null
        message.setTimer = true
        const store = new Vuex.Store({
            getters,
            actions,
            mutations,
            state: message,
        })
        let wrapper = shallowMount(Alert, {
            store, ...data
        })
        const isShowing = wrapper.find('.alert')

        expect(isShowing.isVisible()).toBeFalsy()
        wrapper.vm.$store.commit("disableAlert", true)

        vi.useFakeTimers()
        setTimeout(() => { }, 30000);
        vi.runAllTimersAsync()

        expect(isShowing.isVisible()).toBeFalsy()
    })
});