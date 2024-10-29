import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

function SceneLightning() {
    const directionalLightRef: any = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper, 5, "red");
    return (
      <>
        <ambientLight intensity={1} color={"white"} position={[0, 0, 0]} />
        {/* <pointLight color="white" intensity={1}  position={[1,2,0]}/> */}
      </>
    );
  }

export default SceneLightning;