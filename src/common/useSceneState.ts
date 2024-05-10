import React from "react";
import { create } from "zustand";

export const LIST_SCENE_01 = [
  {
    id: 0,
    src: "/hospital/1.jpg",
    label: "Không gian chính",
    hotpots: [{ id: 0, src: "/hospital/2.jpg", label: "Không gian chính" }],
  },
  { id: 1, src: "/hospital/2.jpg", label: "Phòng khám" },
  { id: 2, src: "/hospital/3.jpg", label: "Phòng nghiên cứu" },
];

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

const useSceneState01 = create<TState>()((set) => ({
  id: 1,
  autoRotate: true,
  isViewing: false,
  setAutoRotate: (s) => set({ autoRotate: !!s }),
  setIsViewing: (s) => set({ autoRotate: true, isViewing: !!s }),
}));

export default useSceneState01;
