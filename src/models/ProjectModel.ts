export class ProjectModel {
  title: string = "";
  description: string = "";
  select: boolean = false;
  tag: string = "";
  constructor(title: string, description: string, tag: string, select: boolean = false) {
    this.description = description;
    this.title = title;
    this.tag = tag;
    this.select = select;
  }
}
