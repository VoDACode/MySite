export class ProjectModel {
  title: string = "";
  description: string = "";
  select: boolean = false;
  constructor(title: string, description: string, select: boolean = false) {
    this.description = description;
    this.title = title;
    this.select = select;
  }
}
