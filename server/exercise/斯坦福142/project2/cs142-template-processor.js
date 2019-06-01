class Cs142TemplateProcessor{
    constructor(template){

    }

    fillIn(dictionary){
        txt.replace(/property/, dictionary.property)
        return template;
    }
}