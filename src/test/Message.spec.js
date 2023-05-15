import Message from '../components/Message.vue'
import { describe, it, expect } from "vitest";
import createWrapper, { mergeDeep } from './mockFacktory';
import { changeState } from './addValues';

describe('Message.vue', () => {

    let wrapper = createWrapper(Message)

    it('should display the correct title text in the header', async () => {
        wrapper = await mergeDeep(wrapper, changeState("message", { titleText: 'Success' }))
        expect(wrapper.find('.modal-title').text()).toBe('Success')
    })

    it('displays the correct body text in the body', async () => {
        wrapper = await mergeDeep(wrapper, changeState("message", { bodyText: 'Your action was successful!' }))
        expect(wrapper.find('.modal-body i').text()).toBe('Your action was successful!')
    })

    it('closes the message window', async () => {
        const button = wrapper.find('.btn')
        await button.trigger('click');
        expect(wrapper.find('.modal').isVisible()).toBeFalsy()
    })
})