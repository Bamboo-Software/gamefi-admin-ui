import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";
export interface AdminModule {
  label: string;
  value: string;
}
export interface ThemeState {
  theme: Theme;
  admin:AdminModule
}
type Team = {
  label: string;
  value: string;
};
function getModuleFromLocalStorage(): AdminModule {
  const stored = localStorage.getItem("admin");

  const teams: Team[] = [
    { label: "Lottery Game", value: "lottery" },
    { label: "AI Gen", value: "aigen" },
    { label: "AI Agent", value: "aiagent" },
  ];
  const found = teams.find(team => team.value === stored);
  return found ?? { label: "Lottery Game", value: "lottery" };
}


const initialState: ThemeState = {
  theme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  admin: getModuleFromLocalStorage(),
};

export const namespace = "theme";

const themeSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      localStorage.setItem("vite-ui-theme", action.payload);
    },
    setModule(state, action: PayloadAction<AdminModule>) {
      state.admin = action.payload;
       localStorage.setItem("admin", action.payload.value);
    },
  },
});

export const { setTheme ,setModule} = themeSlice.actions;
export default themeSlice.reducer;