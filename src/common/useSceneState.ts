import React from "react";
import { create } from "zustand";

export const LIST_SCENE_01 = [
  {
    id: 0,
    src: "/MASTER-BEDROOM/01.png",
    label: "Không gian chính",
    hotpots: [{ id: 0, src: "/MASTER-BEDROOM/02.png", label: "Không gian chính" }],
  },
  { id: 1, src: "/MASTER-BEDROOM/03.png", label: "Không gian cửa vào" },
  { id: 2, src: "/MASTER-BEDROOM/04.png", label: "Phòng tắm" },
];

export const LIST_SCENE_00 = [
  { id: 0, src: "/LIVING-ROOM/01.png", label: "Không gian chính" },
  { id: 1, src: "/LIVING-ROOM/02.png", label: "Không gian 02" },
  { id: 2, src: "/LIVING-ROOM/03.png", label: "Không gian 03" },
  { id: 3, src: "/LIVING-ROOM/04.png", label: "Không gian 04" },
  { id: 4, src: "/LIVING-ROOM/05.png", label: "Không gian 05" },
  { id: 5, src: "/LIVING-ROOM/06.png", label: "Không gian 06" },
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
  autoRotate: false,
  isViewing: false,
  setAutoRotate: (s) => set({ autoRotate: !!s }),
  setIsViewing: (s) => set({ autoRotate: true, isViewing: !!s }),
}));

export default useSceneState01;
