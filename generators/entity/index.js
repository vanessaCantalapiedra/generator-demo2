'use strict' // declaring strict mode in js
var Generator = require('yeoman-generator') //yeoman environment
var utils = require('../shared/utils');
const Chalk = require('chalk'); // configuración de estilo de la consola
const Ora = require('ora'); // configuración de spinners
var rename = require("gulp-rename");

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts);
    //leer una variable de los arguments, podemos hacer que sea obligatoria o no
    this.argument('entityName', { type: String, required: false });
    this.argument('projectRoot', { type: String, required: false });
    this.option("disableHello");
    this.Ora = new Ora({
      color: 'green',
      spinner: 'aesthetic'
    });
  }
  
  async initializing () {
    if (!this.options.disableHello){
    	 utils.helloLog('Entity Add-on');
    }   
  }

  
  async prompting () {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "entityName",
        message: "Nombre de la entidad en CamelCase",
        default: this.options.entityName, // Default to current folder name
        validate: input =>
      			(!input || /^\s*$/.test(input))? 'El nombre de la entidad no es válido'
        : true
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
    	name: 'projectBase',
    	message: 'Directororio raiz que contiene el proyecto base',
       default: this.options.projectRoot,
        validate: input =>
      			(!input || /^\s*$/.test(input))? 'El path no es válido'
        : true
      }
    ]);
  }

  //cola 5
  async writing () {
    utils.startSpinner(this.Ora, 'Copia de la clases de la nueva entidad a añadir');
    this.log(this.answers);
    this.log( this.templatePath);
    //destinationRoot por defecto es el current working directory si contiene un fichero .yo-rc.json o en su defecto el direcotrio padre mas cercano que lo contenga
    this.destinationRoot(this.answers.projectBase);
    this.log(this.destinationRoot());
    var destinationDir = this.answers.name;
    var packageDir = this.answers.groupId.split(".").join("/");
    var entityClassName = this.answers.entityName.charAt(0).toUpperCase() + this.answers.entityName.slice(1);
    var entityPackage = this.answers.entityName.toLowerCase()
    var entityVarName = this.answers.entityName.charAt(0).toLowerCase() + this.answers.entityName.slice(1);
   
    if(this.env.rootGenerator()) {
    //si tenemos un padre, usamos el transformastream del padre, puesto que yeoman no soporta transformar streams en hijos
     this.env.rootGenerator().registerTransformStream(rename(function(path) {
            path.basename = path.basename.replace(/(DomainEntity)/g, entityClassName);
            path.dirname = path.dirname.replace(/(DomainEntity)/g, entityPackage);
        }));
    }else{
     this.registerTransformStream(rename(function(path) {
            path.basename = path.basename.replace(/(DomainEntity)/g, entityClassName);
            path.dirname = path.dirname.replace(/(DomainEntity)/g, entityPackage);
        }));
    }
        
    try {
    
    this.fs.copyTpl(
      this.templatePath('domain/**'),
      this.destinationPath('domain/src/main/java/' + packageDir),{
      groupId: this.answers.groupId,
      entityClassName: entityClassName,
      entityPackage: entityPackage,
      entityVarName: entityVarName
      }, null, null);
   	    
  
  
    this.fs.copyTpl(
      this.templatePath('infraestructure/**'),
      this.destinationPath('infraestructure/src/main/java/' + packageDir),{
      groupId: this.answers.groupId,
      entityClassName: entityClassName,
      entityPackage: entityPackage,
      entityVarName: entityVarName
      }, null, null);
   	    
   
 
    utils.endSpinnerOK(this.Ora,  'Copia de la clases de la nueva entidad a añadir');
    }
    catch (error){
    		utils.endSpinnerKO(this.Ora, error.message)		
  	        this.env.error('Error durante el paso de initializating : ' + error);
    }
    
   
  //el cambio de nombre de fihcero se podría haber hecho tb con gulp y los treams pero al ser composewith
  
}
  //cola 6
  async conflicts () {
    this.log('++++++ main conflicts');
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
