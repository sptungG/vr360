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
  hotspots: TMesh[];
  routes: TMesh[];
  controlProps?: Pick<OrbitControlsProps, "autoRotate" | "zoom0">;
};

export const SCENES: TScene[] = [
  {
    id: 1,
    src: "/scene-00.jpg",
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
    controlProps: { autoRotate: true, zoom0: 10 },
  },
];

export const getSceneById = (id?: number) => (!!id ? SCENES.find((s) => id === s.id) : undefined);

export const LIST_BREADS = [
  {
    id: 1,
    image: "https://www.starbucks.vn/media/ojjfykqo/pate-chaud_tcm89-24785_w1024_n.jpg",
    name: "Bánh nhân thịt",
  },
  {
    id: 2,
    image: "https://www.starbucks.vn/media/jpdj0sgh/almond-croissant_tcm89-24786_w1024_n.jpg",
    name: "Bánh Croissant hạnh nhân",
  },
  {
    id: 3,
    image: "https://www.starbucks.vn/media/0fjd2a4d/raisin-rolls_tcm89-24787_w1024_n.jpg",
    name: "Bánh cuốn nho",
  },
  {
    id: 4,
    image: "https://www.starbucks.vn/media/3oglqeq3/apricot-danish_tcm89-24788_w1024_n.jpg",
    name: "Bánh Đào Danish",
  },
  {
    id: 5,
    image: "https://www.starbucks.vn/media/jo1ooayy/pineapple-danish_tcm89-24789_w1024_n.jpg",
    name: "Bánh Dứa Danish",
  },
  {
    id: 6,
    image: "https://www.starbucks.vn/media/foidc5v1/butter-croissant_tcm89-24790_w1024_n.jpg",
    name: "Bánh Croissant Bơ",
  },
  {
    id: 7,
    image: "https://www.starbucks.vn/media/3ewpr1uj/chocolate-croissant_tcm89-24791_w1024_n.jpg",
    name: "Bánh Croissant Sô cô la",
  },
  {
    id: 8,
    image: "https://www.starbucks.vn/media/kdggfxm2/quiche-bacon-onion_tcm89-24792_w1024_n.jpg",
    name: "Quiche Bacon & Hành Tây",
  },
  {
    id: 9,
    image: "https://www.starbucks.vn/media/gcejuerl/quiche-mushroom-onion_tcm89-24793_w1024_n.jpg",
    name: "Quiche Nấm & Hành Tây",
  },
];
