"use client";
import { useTheme } from "@mui/material";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ErrorFallback from "./ErrorFallback";
import Model from "./Model";
import ModelLoading from "./ModelLoading";
import SceneLightning from "./SceneLightning";

export default function Scene3DModel({ modelUrl }: { modelUrl: string}) {
  const { palette:{ background } } =  useTheme();
  return (
    <div id="canas-container" style={{ backgroundColor: background.default }} className="h-[600px] rounded-[15px]">
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<ModelLoading />}>
          <Canvas camera={{ fov: 35, zoom: 0.8, near: 1, far: 1000 }}>
          <SceneLightning />
          <Stage preset="rembrandt" intensity={1} environment="city">
            <Model
              url={modelUrl}
              />
          </Stage>
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}