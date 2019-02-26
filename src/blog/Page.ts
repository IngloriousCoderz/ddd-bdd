export interface Page {
  getId(): string
  getTitle(): string
  getBody(): string
  render(): string
}
