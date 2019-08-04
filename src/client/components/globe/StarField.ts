import { AdditiveBlending, Color, Geometry, Points, PointsMaterial, TextureLoader, Vector3, VertexColors } from 'three';

const XAxis = new Vector3(1, 0, 0);
const YAxis = new Vector3(0, 1, 0);
const ZAxis = new Vector3(0, 0, 1);

function getStarPos(innerRadius: number, outterRadius: number) {
  const pos = new Vector3(Math.random() * outterRadius + innerRadius, 0, 0);
  pos.applyAxisAngle(YAxis, Math.random() * 360);
  pos.applyAxisAngle(ZAxis, Math.random() * 360);
  pos.applyAxisAngle(XAxis, Math.random() * 360);
  return pos;
}

export function generateStarField(innerRadius: number, outterRadius: number, count: number = 10_000): Points {
  const sgeometry = new Geometry();

  const loader = new TextureLoader();
  loader.setCrossOrigin('');
  const map = loader.load('https://jchabin.github.io/VR-ThreeJS-Test/milky.png');

  const colors = [0xffffff, 0x498eff, 0x2c7af9, 0x4183f4, 0xffffff, 0xf44b42];

  for (let i = 0; i < count; i++) {
    const vertex = getStarPos(innerRadius, outterRadius);
    sgeometry.vertices.push(vertex);
    sgeometry.colors.push(new Color(colors[Math.floor(Math.random() * colors.length)]).multiplyScalar(Math.random()));
  }

  const stars = new Points(
    sgeometry,
    new PointsMaterial({
      map,
      size: 1,
      depthTest: false,
      transparent: true,
      blending: AdditiveBlending,
      opacity: 2,
      vertexColors: VertexColors,
    }),
  );

  return stars;
}
