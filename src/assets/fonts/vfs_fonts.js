// En vfs_fonts.js
export function setVfs(pdfMake) {
    pdfMake.fonts = {
      Roboto: {
        normal: 'assets/fonts/Roboto-Regular.ttf',
        bold: 'assets/fonts/Roboto-Medium.ttf',
        italics: 'assets/fonts/Roboto-Italic.ttf',
        bolditalics: 'assets/fonts/Roboto-MediumItalic.ttf'
      }
    };
  }
  