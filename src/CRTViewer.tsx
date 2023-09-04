import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { SVGLoader, SVGResult } from "three-stdlib";
import { Center, useTexture, Shape, Html } from "@react-three/drei";
import * as THREE from "three";
import { Resizer } from "./Resizer.tsx";

export type ElementProps = {
  shape: THREE.Shape;
  id: string;
  onClick: (id: string) => void;
  current: number;
};

function Element({ shape, id, onClick, current }: ElementProps) {
  const path = (name: string) => `/assets/${name}.png`;

  const textures = useTexture({
    display: `${import.meta.env.VITE_IMAGE_URL}${current}.png`,
    corpus: path("corpus"),
    left: path("left"),
    right: path("right"),
    power: path("power"),
  });

  const selectedTexture = textures[id as keyof typeof textures];

  const handleClick = () => {
    onClick(id);
  };

  if (id === "display") {
    selectedTexture.flipY = false;
  }

  const [hovered, hover] = useState(false);
  useEffect(() => {
    const controlsIds = ["left", "right", "power"];
    if (controlsIds.includes(id)) {
      document.body.style.cursor = hovered ? `pointer` : `auto`;
    }
  }, [hovered, id, textures]);

  return (
    <Shape
      args={[shape]}
      onClick={handleClick}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <meshBasicMaterial map={selectedTexture} />
    </Shape>
  );
}

const CRT = ({
  closePopUp,
  isLoader,
  ownedStars,
}: {
  closePopUp: () => void;
  isLoader?: boolean;
  ownedStars: number[];
}) => {
  const [current, setCurrent] = useState<number>(0);
  const { paths } = useLoader(SVGLoader, "/assets/crt.svg") as SVGResult;
  const groupRef = useRef<THREE.Group>(null);
  const [scaled, setScaled] = useState("false");

  const shapes = useMemo(() => {
    return paths.flatMap((p) =>
      p.toShapes(true).map((shape) => ({
        shape,
        // @ts-ignore
        id: (p as THREE.ShapePath).userData.node.id,
      }))
    );
  }, [paths]);

  const handleClick = (id: string) => {
    if (id === "left" || id === "right") {
      setCurrent((prevState) => {
        const nextValue = id === "right" ? prevState + 1 : prevState - 1;
        return nextValue >= 0 && nextValue <= ownedStars.length - 1
          ? nextValue
          : prevState;
      });
    }
    if (id === "power") {
      closePopUp();
    }
  };

  useEffect(() => {
    if (groupRef.current) {
      setScaled("true");
    }
  }, [groupRef]);

  const LoaderComponent = () => (
    <div style={{ transform: "scaleY(-1)" }}>
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        ...cursing
      </div>
    </div>
  );

  return (
    <Center key={scaled}>
      <group scale={Resizer(groupRef)} ref={groupRef}>
        {shapes.map((props) => {
          if (props.id === "display" && isLoader) {
            return (
              <mesh key={props.id}>
                <shapeGeometry args={[props.shape]} />
                <meshBasicMaterial>
                  <Html position={[0, 0, 0.5]}>
                    <LoaderComponent />
                  </Html>
                </meshBasicMaterial>
              </mesh>
            );
          }
          return (
            <Element
              key={props.shape.uuid}
              onClick={handleClick}
              current={ownedStars.at(current)!}
              {...props}
            />
          );
        })}
      </group>
    </Center>
  );
};

function CRTViewer({
  closePopUp,
  ownedStars,
}: {
  closePopUp: () => void;
  ownedStars: number[];
}) {
  const containerRef = useRef<HTMLCanvasElement>(null);

  const renderCanvas = (isLoader?: boolean) => {
    return (
      <Canvas
        style={{ transform: "scaleY(-1)" }}
        frameloop="always"
        orthographic
        ref={containerRef}
      >
        <ambientLight intensity={3.6} />
        <directionalLight />
        <CRT
          ownedStars={ownedStars}
          isLoader={isLoader}
          closePopUp={closePopUp}
        />
      </Canvas>
    );
  };

  return <Suspense fallback={renderCanvas(true)}>{renderCanvas()}</Suspense>;
}

export default CRTViewer;
