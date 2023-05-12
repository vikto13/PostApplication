import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Card from "../components/Card.vue"
import { describe, it, expect } from "vitest";
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("Card.vue", () => {
    const propsData = {
        texts: [1, 'Author', 'Date', 'Title'],
        id: 1,
        size: 10
    };

    const wrapper = mount(Card, { propsData })
    it('pass correct arguments when edit button is clicked', async () => {
        const editButton = wrapper.find('.btn-primary');
        await editButton.trigger('click');
        expect(wrapper.emitted('pressed')[0][0]).toEqual({ target: 0, id: 1 });
    });

    it('pass correct arguments when delete button is clicked', async () => {
        const editButton = wrapper.find('.btn-danger');
        await editButton.trigger('click');
        expect(wrapper.emitted('pressed')[0][0]).toEqual({ target: 0, id: 1 });
    });

    it('pass correct arguments when header button is clicked', async () => {
        const editButton = wrapper.find('.btn-primary');
        await editButton.trigger('click');
        expect(wrapper.emitted('pressed')[0][0]).toEqual({ target: 0, id: 1 });
    });
});