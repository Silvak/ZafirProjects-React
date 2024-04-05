export const storeAlert = (set) => ({
  stateAlert: false,
  stateAlertError: false,
  titleAlert: "Hi Boy",
  titleAlertError: "Hi Boy",
  ChangeStateAlert: (value) => set({ stateAlert: value }),
  ChangeStateAlertError: (value) => set({ stateAlertError: value }),
  ChangeTitleAlert: (value) => set({ titleAlert: value }),
  ChangeTitleAlertError: (value) => set({ titleAlertError: value }),
});
