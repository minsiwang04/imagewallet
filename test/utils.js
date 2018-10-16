export const testSlots = (api, slots) => {
    slots.forEach((slot) => {
        expect(api[slot]).toBeDefined();
    });
}
