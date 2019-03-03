export interface Blog {
  addPage(title: string, body: string): void;
  renderPage(id: string, nickname?: string): string;

  addPost(title: string, body: string, date: Date, author: string): void;
  renderPost(id: string): string;
}
