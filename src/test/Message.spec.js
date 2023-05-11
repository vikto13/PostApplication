import { shallowMount } from '@vue/test-utils'
import Message from '../components/Message.vue'
import { describe, it, expect } from "vitest";

describe('Message', () => {
    let wrapper
    let props = {
        show: true,
        messageType: 'success',
        titleText: 'Success',
        bodyText: 'Your action was successful!',
        buttons: ['OK'],
    }

    // afterEach(() => {
    //     wrapper.destroy()
    // })

    it('does not renders the component', () => {
        props.show = false
        wrapper = shallowMount(Message, {
            computed: {
                message: () => props
            }
        })
        expect(wrapper.find('.modal').isVisible()).toBe(false)
    })
    it('displays the correct title text in the header', () => {
        expect(wrapper.find('.modal-title').text()).toBe('Success')
    })

    it('displays the correct body text in the body', () => {
        expect(wrapper.find('.modal-body i').text()).toBe(
            'Your action was successful!'
        )
    })
    it('closes the message window', async () => {
        let buttonIsPressed = () => null
        wrapper = shallowMount(Message, {
            computed: {
                message: () => props
            },
            methods: { buttonIsPressed }
        })
        const button = wrapper.find('.btn')
        await button.trigger('click');
        expect(wrapper.find('.modal').isVisible()).toBe(false)

    })

})