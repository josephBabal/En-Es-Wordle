import { create } from 'zustand'

export const useAppStore = create((set,get) => ({
  theme: 'light',
  setTheme: (value) => set({theme: value}),
  handleThemeChange: () => {
    set({
      theme: get().theme === 'light' ? 'dark' : 'light',
    })
  },
  language: '',
  setLanguage: (lang) => {
    set({language: lang })
  },
  handleLanguageChange: () => {
    set({
      language: get().language === 'en' ? 'es' : 'en' 
    })
  },
  wordAnswer: '',
  setWordAnswer: (value) => set({ wordAnswer: value}),
  isSolved: false,
  setIsSolved: (value => set({isSolved: value})),
  submitError: false,
  setSubmitError: (value) => set({submitError: value}),
  isInstructionOpen: false,
  handleInstruction: () => set({isInstructionOpen: !get().isInstructionOpen}),
  overlay: true,
  setOverlay: (value) => set({overlay: value}),
  isOpenLang: false,
  setOpenLang: (value) => set({isOpenLang: value}),
  handleOpenLang: () => set({isOpenLang: !get().isOpenLang}),
  isOpenTheme: false,
  setOpenTheme: (value) => set({isOpenTheme: value}),
  handleOpenTheme: () =>  set({isOpenTheme: !get().isOpenTheme})
}))