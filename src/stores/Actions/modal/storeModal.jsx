export const storeModal = (set) => ({
  stateModal: false,
  titleModal: "Hi Boy",
  contentModal: null,
  isVisibleButton: false,
  ChangeIsVisibleButton: (value) => set({ isVisibleButton: value }), 
  ChangeStateModal: (value) => set({ stateModal: value }),
  ChangeTitleModal: (value) => set({ titleModal: value }),
  ChangeContentModal: (content) => set({ contentModal: content }),
});
