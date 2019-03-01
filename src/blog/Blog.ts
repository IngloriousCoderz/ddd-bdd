import { Page } from './Page';
import { Post } from './Post';
import { User } from './User';

export interface Blog {
  getUsers(): User[];

  getPages(): Page[];
  addPage(title: string, body: string);
  renderPage(id: string, nickname?: string): string;

  getPosts(user?: User): Post[];
  addPost(title: string, body: string, date: Date, author: string);
  renderPost(id: string): string;
}
