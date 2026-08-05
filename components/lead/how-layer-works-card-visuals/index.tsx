import type { ComponentType } from "react";
import { BuildCardVisual } from "./build-card-visual";
import { ContextCardVisual } from "./context-card-visual";
import { DeployCardVisual } from "./deploy-card-visual";
import { ExecuteCardVisual } from "./execute-card-visual";
import { ImproveCardVisual } from "./improve-card-visual";

export type HowLayerWorksCardId =
  | "context"
  | "build"
  | "execute"
  | "deploy"
  | "improve";

const CARD_VISUALS: Record<HowLayerWorksCardId, ComponentType> = {
  context: ContextCardVisual,
  build: BuildCardVisual,
  execute: ExecuteCardVisual,
  deploy: DeployCardVisual,
  improve: ImproveCardVisual,
};

export function HowLayerWorksCardVisual({ id }: { id: HowLayerWorksCardId }) {
  const Visual = CARD_VISUALS[id];
  return <Visual />;
}
