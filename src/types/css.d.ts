declare module '*.css?inline=true' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
