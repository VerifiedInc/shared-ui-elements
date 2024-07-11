interface CopyClipboardTextPlainOptions {
  type: 'text/plain';
}
interface CopyClipboardTextHtmlOptions {
  type: 'text/html';
}
interface CopyClipboardImagePNGOptions {
  type: 'image/png';
}

export type CopyToClipboardOptions =
  | CopyClipboardTextHtmlOptions
  | CopyClipboardTextPlainOptions
  | CopyClipboardImagePNGOptions;

type Content<Type> = Type extends CopyClipboardImagePNGOptions['type']
  ? Blob
  : Type extends CopyClipboardTextPlainOptions['type']
    ? string
    : Type extends CopyClipboardTextHtmlOptions['type']
      ? string
      : never;

interface HookReturnType<Options extends CopyToClipboardOptions> {
  copy: (content: Content<Options['type']>) => Promise<void>;
}

/**
 * Method hook to copy content to clipboard, it should copy large type of content.
 * @param options.type MIME type of content to be copied.
 * */
export function useCopyToClipboard<Options extends CopyToClipboardOptions>({
  type = 'text/plain',
}: Options): HookReturnType<Options> {
  const copy = async (content: Content<Options['type']>): Promise<void> => {
    // Check first if Clipboard API is supported.
    if (navigator.clipboard?.write) {
      // This object will group by MIME the contents to be saved on clipboard by ClipboardItem.
      const clipboardItems: Record<
        string,
        string | Blob | PromiseLike<string | Blob>
      > = {};

      // Based on what MIME type is, a blob will be created accordingly.
      switch (type) {
        case 'text/html':
          // We add plain text content here also, so it can be pasted as raw text.
          clipboardItems['text/plain'] = new Blob([content], {
            type: 'text/plain',
          });
          // The html content will be pasted on places that expect the type of data.
          clipboardItems[type] = new Blob([content], { type });
          break;
        default:
          // Any other MIME type will go here.
          clipboardItems[type] = new Blob([content], { type });
      }

      const data = [new ClipboardItem(clipboardItems)];
      await navigator.clipboard.write(data);
    } else {
      // When Clipboard API is not supported, use fallback approach.
      const textAreaElement = document.createElement('textarea');

      if (content instanceof Blob) {
        textAreaElement.value = await content.text();
      } else {
        textAreaElement.value = content.toString();
      }
      textAreaElement.select();
      document.execCommand('copy');
    }
  };

  return { copy };
}
