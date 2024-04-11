import styled from "@emotion/styled";
import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import React, { Suspense } from "react";
import PanoScene from "./PanoScene";
import { Inter } from "next/font/google";
import { EffectComposer } from "@react-three/postprocessing";

extend({ EffectComposer });

const inter = Inter({ subsets: ["latin"] });

type TPanoLayoutProps = {
  src: string;
  children?: React.ReactNode;
  autoRotate?: boolean;
  actions01?: React.ReactNode;
};

const PanoLayout = ({ src, children, actions01, autoRotate }: TPanoLayoutProps) => {
  return (
    <StyledWrapper style={{ width: "100%", maxWidth: "100dvw" }} className={`${inter.className}`}>
      <div className="actions-bc" style={{ zIndex: 20 }}>
        {actions01}
      </div>

      <div className="actions-br" style={{ zIndex: 20 }}></div>

      <Canvas
        dpr={[1, 2]}
        shadows
        style={{ zIndex: 0 }}
        frameloop="demand"
        camera={{ position: [-300, 100, 0] }}
      >
        <OrbitControls
          enableZoom
          enablePan={false}
          enableDamping
          rotateSpeed={-0.5}
          makeDefault
          maxDistance={499}
          minDistance={100}
          zoomToCursor={false}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          // autoRotate={!isEditing || currentScene?.controlProps?.autoRotate}
        />

        <Suspense fallback={null}>
          <Preload all />

          <EffectComposer>
            <group>
              <PanoScene src={src} />
              {children}
            </group>
          </EffectComposer>
        </Suspense>
      </Canvas>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.main`
  position: relative;
  height: 100dvh;
  margin-left: auto;
  margin-right: auto;

  & > .actions-br {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 16px;
    /* color: ${({ theme }) => theme.colorPrimary}; */

    & > .form-wrapper {
    }
  }
  & > .actions-360 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > .actions-bc {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
`;

export default PanoLayout;
