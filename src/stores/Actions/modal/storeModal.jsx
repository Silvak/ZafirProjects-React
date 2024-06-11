export const storeModal = (set) => ({
  stateModal: false,
  titleModal: 'Modal',
  contentModal: null,
  isVisibleButton: false,
  contentTitle: '',
  titleWithBackButton: null,
  ChangeIsVisibleButton: (value) => set({ isVisibleButton: value }),
  ChangeStateModal: (value) => set({ stateModal: value }),
  ChangeTitleModal: (value) => set({ titleModal: value }),
  ChangeContentTitle: (value) => set({ contentTitle: value }),
  ChangeContentModal: (content) => set({ contentModal: content }),
  ChangeTitleWithBackButton: (value) => set({ titleWithBackButton: value }),
});
