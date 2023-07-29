// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";
import "./index.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { getProject } from "@theatre/core";
import { editable as e, PerspectiveCamera, SheetProvider } from "@theatre/r3f";
import { Mesh } from "three";

function App() {
	const [hover, setHover] = useState(false);

	return (
		<>
			<Canvas
				gl={{ preserveDrawingBuffer: true }}
				camera={{
					position: [5, 5, -5],
					fov: 75,
				}}
				style={{ height: "100vh" }}
			>
				<SheetProvider sheet={getProject("Demo Project").sheet("Demo Sheet")}>
					<color attach={"background"} args={["black"]} />
					<PerspectiveCamera
						theatreKey="Camera"
						makeDefault
						position={[5, 5, -5]}
						fov={75}
						attachArray={undefined}
						attachObject={undefined}
						attachFns={undefined}
					/>
					<Cube />
					<e.pointLight theatreKey="Light" position={[10, 10, 10]} />
					<e.spotLight
						theatreKey="Spot Light"
						position={[10, 10, 10]}
						color={"blue"}
					/>
					<ambientLight />
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
