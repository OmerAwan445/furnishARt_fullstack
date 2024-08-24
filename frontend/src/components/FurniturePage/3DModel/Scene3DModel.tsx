"use client"
import { OrbitControls, useGLTF, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { BoxGeometryProps, Canvas, useFrame, Vector3 } from 'react-three-fiber';
import { DirectionalLightHelper } from 'three';

const Models = [
  { title: 'Chair', url: 'http://localhost:3001/api/furniture-item/3dmodel/1' },
  { title: 'Study Table', url: 'http://localhost:3001/api/furniture-item/3dmodel/2' },
  { title: 'Sofa', url: 'http://localhost:3001/api/furniture-item/3dmodel/3' },
  { title: 'Dining', url: 'http://localhost:3001/api/furniture-item/3dmodel/4' },
  { title: 'Chair2', url: 'http://localhost:3001/api/furniture-item/3dmodel/5' },
  { title: 'Bed', url: 'http://localhost:3001/api/furniture-item/3dmodel/7' },

]

export default function Scene3DModel() {

  return (
    <div id="canvas-container" className='mt-24 h-screen'>
    <Canvas >
        <Scene />
        <group>
        <Model
            url={Models[Models.findIndex((m) => m.title === "Chair")].url}
          />
        </group>
      {/* <Cube pos={[2,0,0]} colors="#5680E9" boxGeometryProps={{ args: [1,1,1]}} /> */}
      {/* <Cube pos={[0,0,-2]} colors="#8860D0" boxGeometryProps={{args: [3,3,3]}} /> */}
      <OrbitControls />
    </Canvas>
    </div>
  )
}


function Scene(){
  const directionalLightRef: any = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper, 5, 'red');
  return (
    <>
    <ambientLight intensity={5}  color={"white"} position={[0,0,0]}/>
    {/* <pointLight color="white" intensity={1}  position={[1,2,0]}/> */}
    </>
  )
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}


function Cube(props: { pos: Vector3, colors: string, boxGeometryProps: BoxGeometryProps}) {
  const ref:any = useRef();
  
  useFrame((state, delta)=>{
    if(!ref.current) return;
    // ref.current.rotation.x += delta * 2;
    // ref.current.rotation.y += 0.02;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <mesh position={props.pos} ref={ref} >
      <boxGeometry {...props.boxGeometryProps} />
      {/* <MeshWobbleMaterial attach="material" factor={1} speed={1} color={props.colors} /> */}
      <meshStandardMaterial color={props.colors}/>
    </mesh>
  )
}
