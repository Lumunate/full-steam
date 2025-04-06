import { render } from '@react-email/render';
import { ReactElement } from 'react';

interface RenderOptions {
  pretty?: boolean;
}

class ReactEmailRenderer {
  /**
   * Render a React Email component to HTML
   * @returns Promise resolving to the rendered HTML string
   */
  static async renderToHtml(
    emailComponent: ReactElement,
    options: RenderOptions = {},
  ): Promise<string> {
    const { pretty = true } = options;
    
    return await render(emailComponent, { pretty });
  }

  /**
   * Render a React Email component to plain text
   * @returns Promise resolving to the rendered plain text
   */
  static async renderToText(emailComponent: ReactElement): Promise<string> {
    return await render(emailComponent, { plainText: true });
  }
}

export default ReactEmailRenderer;