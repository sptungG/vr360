import React from "react";
import { create } from "zustand";

type TSceneState = {
  id: number;
  autoRotate?: boolean;
};

type TState = {
  id: number;
  autoRotate?: boolean;
  isViewing?: boolean;
  setAutoRotate: (s?: boolean) => void;
  setIsViewing: (s?: boolean) => void;
};

const useSceneState = create<TState>()((set) => ({
  id: 1,
  autoRotate: true,
  isViewing: false,
  setAutoRotate: (s) => set({ autoRotate: !!s }),
  setIsViewing: (s) => set({ autoRotate: true, isViewing: !!s }),
}));

export default useSceneState;
