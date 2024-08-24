"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense, useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import ErrorFallback from "./ErrorFallback";
import ModelLoading from "./ModelLoading";
import SceneLightning from "./SceneLightning";

/* const Models = [
  { title: "Chair", url: "http://localhost:3001/api/furniture-item/3dmodel/1" },
  {
    title: "Study Table",
    url: "http://localhost:3001/api/furniture-item/3dmodel/2",
  },
  { title: "Sofa", url: "http://localhost:3001/api/furniture-item/3dmodel/3" },
  {
    title: "Dining Table",
    url: "http://localhost:3001/api/furniture-item/3dmodel/4",
  },
  {
    title: "Dining Chair" ,
    url: "http://localhost:3001/api/furniture-item/3dmodel/5",
  },
  { title: "Bed", url: "http://localhost:3001/api/furniture-item/3dmodel/6" },
  { title: "Grey Dining Chair", url: "http://localhost:3001/api/furniture-item/3dmodel/7" },
  {
    title: "Simple Chair" ,
    url: "http://localhost:3001/api/furniture-item/3dmodel/9",
  },
]; */

export default function Scene3DModel({ modelUrl }: { modelUrl: string}) {
  return (
    <div id="" className="h-[600px] bg-black">
      <ErrorBoundary errorComponent={ErrorFallback}>
        <Suspense fallback={<ModelLoading />}>
          <Canvas>
          <SceneLightning />
            <Model
              url={modelUrl}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const controlsRef:any = useRef(null);

  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    console.log(size, "size");

    const maxAxis = Math.max(size.x, size.y, size.z);
    const scaleFactor = 4.7; // Increase this value to make the model larger
    scene.scale.multiplyScalar(scaleFactor / maxAxis);
    box.getCenter(scene.position).multiplyScalar(-1);

    // scene.rotation.set(0, 0, 0); // Example: rotate 90 degrees on X and 180 on Y

    // Set OrbitControls target to the center of the model
    // controlsRef.current?.target.set(0, -1, 0);
  }, [scene]);

  console.log(scene, "scene");
  if (!scene) return null;
  return <>
  <primitive className="w-full h-full" object={scene} />
  <OrbitControls autoRotate ref={controlsRef} />
</>
}
