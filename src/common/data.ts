import TComponents from "@/components/templated/component-types";
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
  hotspots: TMesh[];
  routes: TMesh[];
  controlProps?: Pick<OrbitControlsProps, "autoRotate">;
};

export const SCENES: TScene[] = [
  {
    id: 1,
    src: "/grodno_belarus_august_2019_full_spherical_seamless_hdri_360_panorama.jpg",
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
    ],
    routes: [
      {
        position: [-499.48254610572707, -98.44897692177705, 20.16108242002103],
        scale: [33, 33, 33],
        rotation: [0.1, 1.6, -0.05],
        componentName: "RouteArrow01",
        componentProps: {
          label: "Phòng ăn lớn",
          toSceneId: 2,
        },
      },
    ],
  },
  {
    id: 2,
    src: "/minsk_belarus_march_25_2015_full_360_panorama_equirectangular_spherical.jpg",
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
    controlProps: { autoRotate: true },
  },
];

export const getSceneById = (id?: number) => (!!id ? SCENES.find((s) => id === s.id) : undefined);
