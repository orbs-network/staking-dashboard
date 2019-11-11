import { Vector3, Color, ShaderMaterial, Mesh } from 'three';

const FresnelShader = {
  uniforms: {
    camPos: { type: 'v3', value: new Vector3(0.0, 0.0, 4.0) },
    lightPos: { type: 'v3', value: new Vector3(5.0, 5.0, 20.0) },
    lightColor: { type: 'c', value: new Color(0.8, 0.8, 0.8) },
    ambientColor: { type: 'c', value: new Color(0.1, 0.5, 0.5) },
    diffuseColor: { type: 'c', value: new Color(0.3, 0.1, 0.1) },
    specularColor: { type: 'c', value: new Color(0.8, 0.8, 0.8) },
    shininess: { type: 'f', value: 5 },
    F0: { type: 'f', value: 1.0 },
    fresnelPower: { type: 'f', value: 2.0 },
  },
  vertexShader: [
    'uniform vec3 camPos;',
    'uniform vec3 lightPos;',
    'uniform float F0;',
    'uniform float fresnelPower;',
    'varying float NdotL;',
    'varying float NdotH;',
    'varying float fresnel;',

    // vertex shader
    'void main() {',
    '	vec3 V = normalize(camPos - position);',
    '	vec3 L = normalize(lightPos - position);',
    '	vec3 H = normalize(V+L);',
    '	NdotH = dot(normal, H);',
    '	NdotL = dot(normal, L);	',
    '	float NdotV = dot(normal, V);',

    // fresnel - schlick approximation
    // R = R0 + (1.0 - R0) * pow( 1.0 - dot(V,H), 5.0);
    '	float base = 1.0 - NdotH;',
    '	float exp = 0.0;',
    '	if (base <= 0.0){',
    '		exp = -1.0 * pow(abs(base), fresnelPower);',
    '	}',
    '	else{',
    // shouldn't need abs() here, but without it, warning comes up
    '		exp = pow(abs(base), fresnelPower);',
    '	}',
    '	fresnel = exp + F0*(1.0-exp);//F0 + (1.0 - F0)*exp; ',
    '	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}',
  ].join('\n'),
  fragmentShader: [
    'uniform vec3 lightColor;',
    'uniform vec3 ambientColor;',
    'uniform vec3 diffuseColor;',
    'uniform vec3 specularColor;',
    'varying float NdotL;',
    'varying float fresnel;',

    'void main() {',
    // calculate diffuse contribution
    '	vec3 diffuse = max(NdotL, 0.0)* vec3(diffuseColor.r*lightColor.r, diffuseColor.g*lightColor.g, diffuseColor.b*lightColor.b);',
    '	float facing = 1.0;',
    '	if (NdotL <= 0.0)',
    '		facing = 0.0;',
    // calculate specular contribution
    '	vec3 specular = fresnel * vec3(specularColor.r*lightColor.r, specularColor.g*lightColor.g, specularColor.b*lightColor.b);',
    // add it all up along with ambient
    '	gl_FragColor = vec4(ambientColor+diffuse+specular, 1.0);',
    '}',
  ].join('\n'),
};

export function createFresnelShaderMaterial() {
  // initialize uniform variables for fresnel shader
  //   FresnelShader.uniforms.lightColor.value = light1.color;
  FresnelShader.uniforms.ambientColor.value = new Color(0.1, 0.5, 0.5);
  FresnelShader.uniforms.diffuseColor.value = new Color(0.3, 0.1, 0.1);
  FresnelShader.uniforms.specularColor.value = new Color(0.8, 0.8, 0.8);
  FresnelShader.uniforms.camPos.value = new Vector3(0.0, 0.0, 4.0);
  //   FresnelShader.uniforms.lightPos.value = light1.position;
  FresnelShader.uniforms.shininess.value = 5.0;
  // see more values to use to calculate F0 here:
  // https://www.terathon.com/wiki/index.php/Building_a_Fresnel_shader
  FresnelShader.uniforms.F0.value = (1.0 - 1.333) / (1.0 + 1.333); // air to glass ~ -0.143
  FresnelShader.uniforms.fresnelPower.value = 2.0;
  const material = new ShaderMaterial(FresnelShader);
  return material;
}
