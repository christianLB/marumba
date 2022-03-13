export default class PersonaModel {
  name = "";
  age = 0;

  addAge() {
    this.age++;
  }

  constructor(data) {
    this.name = data.name;
    this.age = data.age;
  }
}

export class PersonaListModel {
  personas = [];

  update() {}

  remove(personaModel) {
    const index = this.personas.indexOf(personaModel);
    if (index > -1) {
      this.personas.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  add(personaModel) {
    const newPersona = new PersonaModel({
      name: personaModel.name,
      age: personaModel.age,
    });
    this.personas.push(newPersona);
  }

  constructor(data) {
    data &&
      data.forEach((persona) => {
        const _persona = new PersonaModel(persona);
        this.personas.push(_persona);
      });
  }
}
