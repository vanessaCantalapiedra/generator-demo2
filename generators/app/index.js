'use strict' // declaring strict mode in js
var Generator = require('yeoman-generator') //yeoman environment
var utils = require('../shared/utils');
const Chalk = require('chalk'); // configuración de estilo de la consola
const Ora = require('ora'); // configuración de spinners

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    //leer una variable de los arguments, podemos hacer que sea obligatoria o no
    this.argument('appname', { type: String, required: false });
    // añade el `--checkJava` flag
    this.option("checkJava");
    this.Ora = new Ora({
      color: 'green',
      spinner: 'aesthetic'
    });
    //generador de las entities, le pasamos el flag para deshabilitar el saludo si lo lanzamos desde el padre
    
    utils.helloLog('Demo service with webflux');
  }
  
  async initializing () {
    //dependiendo del flag chequearemos la versión de java o no
    if (this.options.checkJava){
        utils.startSpinner(this.Ora, 'Comprobando versión Java');
        await utils.checkJava()
	    .then(message => utils.endSpinnerOK(this.Ora, 'Versión de Java correcta'))
	    .catch(error => { 
	    	utils.endSpinnerKO(this.Ora, error.message);
	    	this.env.error('Error durante el paso de initializating : ' + error);
	    	});
     }else{
     	this.log('Version de Java no comprobada');
     }
  }
  
  async configuring () {
   this.composeWith('demo2:entity', {disableHello:true, projectRoot: this.contextRoot + '/' + this.answers.projectName });
  }

  async prompting () {
    this.answers = await this.prompt([
    //posibles valores para el type: input, number, confirm, list, rawlist, expand, checkbox, password, editor
    //https://www.npmjs.com/package/inquirer?activeTab=readme más opciones para los prompts
      {
        type: "input",
        name: "projectName",
        message: "Nombre de proyecto",
        default: this.options.appname, // Default to current folder name
        store: true
      },
      {
        type: "input",
        name: "artifactId",
        message: "Nombre del artefacto",
        validate: input =>
      			(!input || /^\s*$/.test(input))? 'El nombre del artefacto no es válido'
        : true
      },
      {
        type: "input",
        name: "artifactVersion",
        message: "Version del artefacto",
        default: "1.0.0-SNAPSHOT"
      },
      {
    	type: 'input',
    	name: 'groupId',
    	message: 'Group Id del proyecto',
    	validate: input =>
      			/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/.test(input)? true
        : 'El Group Id no es válido',
        store: true
      },
  	{
	    type: 'input',
	    name: 'arqVersion',
	    message: 'Versión de la Arquitectura base',
	    default: '1.0.0',
	    store: true
},
      {
        type: "checkbox",
        name: "componentes",
        message: "Selecciona los modulos que quieres incluir",
         choices: [
        'swagger', 'monitoring', 'webclient'
      ],
      	store: true // 
      },
      
    ]);
  }

  //cola 5
  async writing () {
    utils.startSpinner(this.Ora, 'Copia de la estructura base del proyecto');
    this.log(this.answers);
    this.log( this.templatePath());
    //destinationRoot por defecto es el current working directory si contiene un fichero .yo-rc.json o en su defecto el direcotrio padre mas cercano que lo contenga
    this.destinationRoot(this.contextRoot + '/' + this.answers.projectName);
    this.log(this.destinationRoot());
    var destinationDir = this.answers.name;
    var packageDir = this.answers.groupId.split(".").join("/");
    
    //copy: copia del root
    try {
    	    //copia de los ficheros raiz , y de los poms del primer nivel
	    this.fs.copyTpl(
	      this.templatePath(),
	      this.destinationRoot(),{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true, onlyFiles: true, deep: 1}});
	      
	      this.fs.copyTpl(
	      this.templatePath() + '/domain/src/main/java',
	      this.destinationRoot() + '/domain/src/main/java/'+ packageDir,{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	     
	      
	      this.fs.copyTpl(
	      this.templatePath() + '/domain/src/test',
	      this.destinationRoot() + '/domain/src/test/'+ packageDir,{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	      
	      this.fs.copyTpl(
	      this.templatePath() + '/infraestructure/src/main/java',
	      this.destinationRoot() + '/infraestructure/src/main/java/' + packageDir,{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	      
	       this.fs.copyTpl(
	      this.templatePath() + '/infraestructure/src/main/resources',
	      this.destinationRoot() + '/infraestructure/src/main/resources',{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	      
	      this.fs.copyTpl(
	      this.templatePath() + '/infraestructure/src/test/java',
	      this.destinationRoot() + '/infraestructure/src/test/java/' + packageDir,{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	      
	      this.fs.copyTpl(
	      this.templatePath() + '/infraestructure/src/test/resources',
	      this.destinationRoot() + '/infraestructure/src/test/resources',{
	      projectName: this.answers.name, 
	      artifactId: this.answers.artifactId,
	      artifactVersion: this.answers.artifactVersion,
	      groupId: this.answers.groupId,
	      arqVersion: this.answers.arqVersion,
	      swagger: this.answers.componentes.includes('swagger'),
	      webclient: this.answers.componentes.includes('webclient'),
	      monitoring:this.answers.componentes.includes('monitoring'),
	      }, null, {globOptions: { dot: true}});
	      
	      utils.endSpinnerOK(this.Ora, 'Copia de la estructura base del proyecto')
	}catch (error){
    		utils.endSpinnerKO(this.Ora, error.message)		
  	        this.env.error('Error durante el paso de initializating : ' + error);
    }	      
	
  }

  //cola 7
  async install () {
    this.log('+++++++ main install');
    //this.composeWith('demo:subdemo')
  }

  //cola 8
  async end () {
    this.log('++++++++ main end');
    //this._privateMethod1();
  }
}
