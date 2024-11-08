interface CopyClipboardTextPlainOptions {
    type: 'text/plain';
}
interface CopyClipboardTextHtmlOptions {
    type: 'text/html';
}
interface CopyClipboardImagePNGOptions {
    type: 'image/png';
}
export type CopyToClipboardOptions = CopyClipboardTextHtmlOptions | CopyClipboardTextPlainOptions | CopyClipboardImagePNGOptions;
type Content<Type> = Type extends CopyClipboardImagePNGOptions['type'] ? Blob : Type extends CopyClipboardTextPlainOptions['type'] ? string : Type extends CopyClipboardTextHtmlOptions['type'] ? string : never;
interface HookReturnType<Options extends CopyToClipboardOptions> {
    copy: (content: Content<Options['type']>) => Promise<void>;
}
/**
 * Method hook to copy content to clipboard, it should copy large type of content.
 * @param options.type MIME type of content to be copied.
 * */
export declare function useCopyToClipboard<Options extends CopyToClipboardOptions>({ type, }: Options): HookReturnType<Options>;
export {};
