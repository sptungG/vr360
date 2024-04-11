import * as TComponents from "@/components/templated";
import { OrbitControlsProps } from "@react-three/drei";

export type TMesh = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  componentName: keyof typeof TComponents;
  componentProps: any;
};

export type TScene = {
  id: number;
  src: string;
  label?: string;
  hotspots: TMesh[];
  routes: TMesh[];
  controlProps?: Pick<OrbitControlsProps, "autoRotate" | "zoom0">;
};

export const SCENES: TScene[] = [
  {
    id: 1,
    src: "/scene-00.png",
    label: "Không gian chính",
    hotspots: [
      {
        position: [-323.6924966880152, 90.0618357718875, -361.5822282043567],
        scale: [30, 30, 30],
        rotation: [0, 0.14382110375680413, 0.05],
        componentName: "ItemList01",
        componentProps: {
          label: "Bánh ngon hôm nay",
          maxResultCount: 100000,
        },
      },
      {
        position: [339.50274781179354, 0, -379.31028912809654],
        scale: [30, 30, 30],
        rotation: [0, -1.031477914284114, 0],
        componentName: "ItemList01",
        componentProps: {
          label: "Menu chính",
          maxResultCount: 100000,
        },
      },
      {
        position: [460.54321996649105, -17.38893685199908, -213.0998346416406],
        scale: [30, 30, 30],
        rotation: [0, -1.031477914284114, 0],
        componentName: "ItemList01",
        componentProps: {
          label: "Gian Coffee",
          maxResultCount: 100000,
        },
      },
      {
        position: [154.58167404290856, -59.49116436983485, -400.047670702984],
        scale: [30, 30, 30],
        rotation: [0, 0.14382110375680413, 0],
        componentName: "ItemList01",
        componentProps: {
          label: "Đặt bàn",
          maxResultCount: 100000,
        },
      },
    ],
    routes: [
      {
        position: [380, -100, -212],
        scale: [30, 30, 30],
        rotation: [0.18, -0.52, -0.1],
        componentName: "RouteArrow01",
        componentProps: {
          label: "Không gian phía sau",
          toSceneId: 2,
        },
      },
    ],
  },
  {
    id: 2,
    src: "/scene-02.png",
    label: "Không gian phía sau",
    hotspots: [],
    routes: [
      {
        position: [447.98136357465734, -7.342314498985516, 237.5816833533934],
        scale: [33, 33, 33],
        rotation: [-2.9286674834924535, -1.1968225257984662, -2.9706798966385484],
        componentName: "RouteArrow01",
        componentProps: {
          label: "Trở lại cửa hàng",
          toSceneId: 1,
        },
      },
    ],
    controlProps: { autoRotate: true, zoom0: 10 },
  },
  {
    id: 3,
    src: "/scene-03.png",
    label: "Phòng tắm",
    hotspots: [],
    routes: [
      {
        position: [447.98136357465734, -7.342314498985516, 237.5816833533934],
        scale: [33, 33, 33],
        rotation: [-2.9286674834924535, -1.1968225257984662, -2.9706798966385484],
        componentName: "RouteArrow01",
        componentProps: {
          label: "Trở lại cửa hàng",
          toSceneId: 1,
        },
      },
    ],
    controlProps: { autoRotate: true, zoom0: 10 },
  },
];

export const getSceneById = (id?: number) => (!!id ? SCENES.find((s) => id === s.id) : undefined);
