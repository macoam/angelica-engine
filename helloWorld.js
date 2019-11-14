/*const canvas=document.getElementById("glcanvas");
const loadShader = (gl, type, source)=>
{
  const shader=gl.createShader(type);
  gl.shaderSource (shader, source)
            //variable que declaramos arriba el tipo, segundo viene del tecer nombre de loasd shader
  //para compilar, porque si no no sabermos si funciona o no 
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  } //si falla que se borre el shader, siempre tine que ir en la compilaicon
return shader;
//si no, regresa el shader ya dicho
  
}
//para inicializar el shader
const initShader = (gl,vsSource, fsSource)=>{
//cargar shaders, aqui se compilan ambos, y se llama dos veces, una para fragment y una para verter
const vertexShader=loadShader(gl, gl.VERTEX_SHADER, vsSource);//se compilan
const fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fsSource);
const shaderProgram=gl.createProgram(); //un programa vacio 
gl.attachShader(shaderProgram, vertexShader);//se agrega en el programa shader program, y se pasa primero el vertexshader
gl.attachShader(shaderProgram, fragmentShader);//despues el fragmentshader, pero en el mimso programa
gl.linkProgram(shaderProgram); //para ligar el program al contexto que es gl, ligarlo al proyecto
 // If creating the shader program failed, alert
 if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
  alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
  return null;
 }
 return shaderProgram;
}
const initBuffer=gl=>
{
const positionBuffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//la posicion empieza en el centro
const positions = [
  -1.0,  1.0,
   1.0,  1.0,
  -1.0, -1.0,
   1.0, -1.0,
];
gl.bufferData(gl.ARRAY_BUFFER, 
      //agarra una posicion, una lisa de posicion y lo carga como informacion para le buffer de la matriz
  new Float32Array(positions),  // los shaders trabajan con float32
  gl.STATIC_DRAW);//tipo de union, y que va a hacer
return {
position: positionBuffer//devuelve las posiciones 
};
 
}
const drawScene= (gl, programInfo, buffers)=>
{ //render
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything eso significa el 1
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //solo se le puede dar orden no modificar
  //camara
  //campo de vision con cons 
  const fieldOfView = 45 * Math.PI / 180;  //tiene que ser a radianes 
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1; //desde donde se empieza a ver 
  const zFar = 100.0;// y donde se terman de ver 
  const projectionMatrix = mat4.create();  //una matriz nueva vacio, y se lena con la perpectiva de la camara
  //llamar a una funcion estatica
  mat4.perspective(projectionMatrix,//recibe la matriz de 4
    fieldOfView,//como debe de posiconarse 
    aspect,
    zNear,
    zFar);
  };
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix,     // destination matrix
    modelViewMatrix,     // matrix to translate
    [-0.0, 0.0, -6.0]);
    {
      //make quad
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);  
    }
}
const main=()=>{
const gl=canvas.getContext("webgl");
if (!gl) {
    alert("Impossible d'initialiser WebGL. Votre navigateur ou votre machine peut ne pas le supporter.");
    return;
  }
const shaderProgram = initShader(gl, vsSource, fsSource);
const programInfo={
  program:shaderProgram,
  attribLocations: {
    vertexPosition : gl.getAttribLocation(shaderProgram, 'aVertexPosition'),//solo se ponen comas 
                      //primer parametro que recibe      la varibale que se va a buscar 
  },
  
  uniformLocations : //modal = como se acomodan,,,,, 
{
  projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
  modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
}
  //dos puntos para almacenar la caracteristica
};
const buffers=initialBuffer(gl);
drawScene (gl, programInfo, buffers);
}
window.onload=main;
// Vertex shader program
const vsSource = `         
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;  
  
}
`;
//fragment
const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;*/


  

  const canvas = document.getElementById('glcanvas');

  const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  
  varying lowp vec4 vColor;
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }`;
  
  const fsSource = `
  varying lowp vec4 vColor;
  void main() {
      
    gl_FragColor = vColor;
  }
  `;
  
  const loadShader = (gl, type, source)=>{
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
  
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
      }
  
      return shader;
  }
  
  const initShader = (gl, vsSource, fsSource)=>{
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const shaderProgram = gl.createProgram();
  
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
  
      gl.linkProgram(shaderProgram);
  
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
          return null;
      }
  
      return shaderProgram;
  }
  
  
  const initBuffers = gl =>{
      
      const positionBuffer = gl.createBuffer();
  
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
      const positions = [
          -1.0,  1.0,
           1.0,  1.0,
          -1.0, -1.0,
           1.0, -1.0,
        ];
  

        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);


        const colors=[
          1,1,1,1,
          1,0,0,1,
          0,1,0,1,
          0,0,1,1,
                     ];
        
        const colorBuffer=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW,
      );
  
      return {
          position: positionBuffer,
          color:colorBuffer,
      };
  }
  
  const drawScene = (gl, programInfo, buffers)=>{
  
      /* render */
      gl.clearColor(0, 0, 0, 1);
      gl.clearDepth(1);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
  
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
      /*Camera */
  
      const fieldOfView = 45 * Math.PI / 180;
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.1;
      const zFar = 100;
  
      const projectionMatrix = mat4.create();
  
      mat4.perspective(
          projectionMatrix,
          fieldOfView,
          aspect,
          zNear,
          zFar
      );
  
      const modelViewMatrix = mat4.create();
  
      mat4.translate(
          modelViewMatrix,
          modelViewMatrix,
          [0, 0, -6]
      );
  
      {
          /*make quad*/
  
          const numComponents = 2;
          const type = gl.FLOAT;
          const normalize = false;
          const stride = 0;
          const offset = 0;
          
          gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
          gl.vertexAttribPointer(
              programInfo.attribLocations.vertexPosition,
              numComponents,
              type,
              normalize,
              stride,
              offset
          );
          gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
          // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }
      }
    



  
      gl.useProgram(programInfo.program);
  
      gl.uniformMatrix4fv(
          programInfo.uniformLocations.projectionMatrix,
          false,
          projectionMatrix
      );
  
      gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix
      );
  
      {
          const offset = 0;
          const vertexCount = 4;
          gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
      }
  }
  
  const main = ()=>{
      const gl = canvas.getContext('webgl2');
  
      if (!gl) {
          alert("Unable to initialize WebGL. Your browser or machine may not support it.");
          return;
      }
  
      const shaderProgram = initShader(gl, vsSource, fsSource);
  
      const programInfo = {
          program : shaderProgram,
          attribLocations : {
              vertexPosition : gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
              vertexColor : gl.getAttribLocation(shaderProgram, 'aVertexColor'),
          },
          uniformLocations : {
              projectionMatrix : gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
              modelViewMatrix : gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
          }
      };
  
  
      const buffers = initBuffers(gl);
  
      drawScene(gl, programInfo, buffers);
  }
  
  window.onload = main;