export const storeModal = (set) => ({
  stateModal: false,
  titleModal: "Hi Boy",
  contentModal: null,
  ChangeStateModal: (value) => set({ stateModal: value }),
  ChangeTitleModal: (value) => set({ titleModal: value }),
  ChangeContentModal: (content) => set({ contentModal: content }),
});
