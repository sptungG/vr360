import useSceneState, { LIST_SCENE_00, LIST_SCENE_01 } from "@/common/useSceneState";
import PanoLayout from "@/components/PanoLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useId } from "react";

const ControlBar01 = dynamic(() => import("@/components/templated/ControlBar01"), { ssr: false });

function Page() {
  const uid = useId();
  const {
    query: { id },
  } = useRouter();
  const ids = id || ["0"];

  const { autoRotate, setAutoRotate } = useSceneState((s) => s);

  return (
    <PanoLayout
      src={LIST_SCENE_00[+ids[0]].src}
      actions01={<ControlBar01 />}
      autoRotate={autoRotate}
    ></PanoLayout>
  );
}

export default Page;
