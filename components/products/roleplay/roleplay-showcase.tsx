"use client";

import { RoleplayAgentShowcase } from "./roleplay-agent-showcase";
import { useRoleplayMode } from "./roleplay-mode-context";
import { RoleplayVoiceShowcase } from "./roleplay-voice-showcase";

export function RoleplayShowcase() {
  const { mode } = useRoleplayMode();

  if (mode === "voice") {
    return <RoleplayVoiceShowcase />;
  }

  return <RoleplayAgentShowcase />;
}
