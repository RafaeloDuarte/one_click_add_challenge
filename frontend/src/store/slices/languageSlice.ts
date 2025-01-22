import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "pt" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;
