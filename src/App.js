import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, OrbitControls } from "drei";
import * as THREE from "three/src/Three";

import Olanrewaju from "./Olanrewaju";

softShadows();
const Stars = () => {
  let group = useRef();
  let theta = 0;
  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    const s = Math.cos(THREE.Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("lightblue"),
    });
    const coords = new Array(2000)
      .fill()
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [geo, mat, coords];
  }, []);
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};

const ThreeLine = ({args,position,color}) => {
  const mesh2 = useRef();
  useFrame(() => (mesh2.current.rotation.x = mesh2.current.rotation.y += 0.01));
  return (
   <group  ref={mesh2}>
      <mesh scale={[1, 1, 1]} position={position} >
    <boxBufferGeometry  args={args} />
    <meshStandardMaterial  color="#ba68c8" />
  </mesh>
   </group>
  );
};
const App = () => {
  return (
    <>
      <div className="proposal_wrapper">
        <Canvas shadowMap camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={.3} />
        <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.4}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
            shadow-camera-far={50}
            shadow-camera-right={10}
            shadow-camera-left={-10}
            shadow-camera-bottom={-10}
            shadow-camera-top={10}
          />
          <pointLight position={[-10, 0, -20]} intensity={0} />
          <pointLight position={[0, -10, 0]} intensity={0} />
          <ThreeLine args={[4.2,1,5]} position={[-1.9,2,-1.0]} />
          <ThreeLine args={[3,1,1]} position={[-1.5,0,1]} />
          <ThreeLine args={[3,1,1]} position={[-1.5,-2,1]} />
          <ThreeLine args={[-1,5,1]} position={[-3.5, 0, 1]} />
           <Stars />
          <OrbitControls />
        </Canvas>
        <div className="proposal_text">
          <Olanrewaju />
        </div>
      </div>
    </>
  );
};

export default App;
