import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Box3, Vector3 } from 'three';


function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    const controlsRef:any = useRef(null);
  
    useEffect(() => {
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);
  
      // const maxAxis = Math.max(size.x, size.y, size.z);
      // const scaleFactor = 4.7; // Increase this value to make the model larger
      // scene.scale.multiplyScalar(scaleFactor / maxAxis);
      // box.getCenter(scene.position).multiplyScalar(-1);
  
      scene.rotation.set(0, 0, 0); // Example: rotate 90 degrees on X and 180 on Y
  
    }, [scene]);
  
    console.log(scene, "scene");
    if (!scene) return null;
    return <>
    <primitive className="w-full h-full" object={scene} />
    <OrbitControls autoRotate ref={controlsRef} />
  </>
  }

export default Model
