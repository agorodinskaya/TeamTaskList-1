export default class Task {
  constructor(title, description, assignee, date, priority, status, id) {
    this.title = title;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.priority = priority;
    this.status = status;
    this.id = id;
  }
}
