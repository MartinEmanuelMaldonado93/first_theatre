// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { ISequence, getProject } from "@theatre/core";
import { editable as e, PerspectiveCamera, SheetProvider } from "@theatre/r3f";
import { Mesh } from "three";
import demoProjectState from "./state.json";

const demoSheet = getProject("Demo Project", { state: demoProjectState }).sheet(
	"Demo Sheet"
);

function App() {
	const [playAnimation, setPlayAnimation] = useState(false);
	type configSec = Parameters<ISequence["play"]>[0]; // i know this is unnecesary xD
	const secuenceConfig: configSec = {
		iterationCount: Infinity,
		range: [0, 10],
	};
	useEffect(() => {
		playAnimation
			? demoSheet.sequence.play(secuenceConfig)
			: demoSheet.sequence.pause();
	}, [playAnimation]);
	return (
		<>
			<button onClick={() => setPlayAnimation((p) => !p)} className="play_btn">
				play animation{" "}
			</button>
			<Canvas
				gl={{ preserveDrawingBuffer: true }}
				camera={{
					position: [5, 5, -5],
					fov: 75,
				}}
				style={{ height: "100vh" }}
			>
				<SheetProvider sheet={demoSheet}>
					<color attach={"background"} args={["black"]} />
					<PerspectiveCamera
						theatreKey="Camera"
						makeDefault
						position={[5, 5, -5]}
						fov={75}
						lookAt={[0, 0, 0]}
						attachArray={undefined}
						attachObject={undefined}
						attachFns={undefined}
					/>
					<Cube />
					{/* <e.pointLight theatreKey="Light" position={[10, 10, 10]} /> */}
					<e.spotLight
						theatreKey="Spot Light"
						position={[10, 10, 10]}
						color={"blue"}
					/>
					{/* <ambientLight /> */}
					<e.mesh theatreKey="Floor">
						<planeGeometry args={[20, 20, 20]} />
						<meshPhongMaterial color={"gray"} wireframe={false} />
					</e.mesh>
					{/* <gridHelper /> */}
				</SheetProvider>
			</Canvas>
		</>
	);
}

function Cube(props: JSX.IntrinsicElements["mesh"]) {
	const cubeRef = useRef<Mesh>(null!);
	// const { scale, rotation } = useSpring({
	// 	scale: hover ? 2 : 1,
	// 	rotation: hover ? Math.PI : -Math.PI,
	// });
	useFrame((_root, delta) => {
		cubeRef.current.rotation.x += delta * (Math.PI / 4);
		cubeRef.current.rotation.y += delta * (Math.PI / 4);
	});
	return (
		<e.mesh {...props} ref={cubeRef} theatreKey="Cube">
			<boxGeometry />
			<meshLambertMaterial color={"orange"} />
		</e.mesh>
	);
}
export default App;
