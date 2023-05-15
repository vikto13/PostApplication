
import Card from "../components/Card.vue"
import { describe, it, expect } from "vitest";
import createWrapper from "./mockFacktory";

describe("Card.vue", async () => {

    const wrapper = createWrapper(Card,
        { propsData: { id: 1 } }
    )

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