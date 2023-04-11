import * as exec from 'child_process';






// Ejecutar el comando
export function runJar(command:string, window:Function){
    exec.exec(command, (error, stdout, stdlog) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error}`);
            window();
          return;
        }
        console.log(`stdout:\n ${stdout}`);
        console.log(`java:\n ${stdlog}`);
      });
    

}
