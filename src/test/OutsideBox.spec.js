import OutsideBox from "../components/OutsideBox.vue"
import { describe, it, expect, vi } from "vitest";
import createWrapper from "./mockFacktory";

describe('OutsideBox.vue', () => {

    let wrapper = createWrapper(OutsideBox)

    it('shows message when clicked delete button', async () => {
        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.text()).toBe('')
        expect(modalHeader.classes().includes('bg-danger')).toBeFalsy()

        const button = wrapper.find('button')
        await button.trigger('click')

        wrapper.vm.$store.commit("changeBoxMessage", { text: 'Testing', type: 'danger' })
        await wrapper.vm.$nextTick()
        expect(modalHeader.text()).toBe('Testing')
        expect(modalHeader.classes().includes('bg-danger')).toBeTruthy()
    });

})