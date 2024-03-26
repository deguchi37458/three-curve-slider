uniform float curlR;

varying vec2 vUv;
varying float vElevation;

void main() {
  float theta = position.y / curlR;
  float ty = curlR * sin(theta);
  float tx = position.x;
  float tz = curlR * (1.0 - cos(theta));
  vec3 p = vec3(tx, ty, tz);

  float elevation = tx + ty + tz;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vUv = uv;
  vElevation = elevation;
}
