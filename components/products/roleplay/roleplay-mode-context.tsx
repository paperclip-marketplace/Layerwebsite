"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type RoleplayAgentMode = "voice" | "video";

type RoleplayModeContextValue = {
  mode: RoleplayAgentMode;
  setMode: Dispatch<SetStateAction<RoleplayAgentMode>>;
};

const RoleplayModeContext = createContext<RoleplayModeContextValue | null>(null);

export function RoleplayModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<RoleplayAgentMode>("video");

  return (
    <RoleplayModeContext.Provider value={{ mode, setMode }}>
      {children}
    </RoleplayModeContext.Provider>
  );
}

export function useRoleplayMode() {
  const context = useContext(RoleplayModeContext);
  if (!context) {
    throw new Error("useRoleplayMode must be used within RoleplayModeProvider");
  }
  return context;
}
